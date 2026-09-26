"use client";

import { useEffect } from "react";

// Wires scroll behaviour for server-rendered markup. Content is visible without JS;
// `html.io` opts elements into reveal only once an observer exists to reveal them.
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          reveal.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    root.classList.add("io");
    document.querySelectorAll("[data-reveal]").forEach((element) => reveal.observe(element));

    const art = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle("is-playing", entry.isIntersecting));
    });
    document.querySelectorAll("[data-art]").forEach((element) => art.observe(element));

    const plates = Array.from(document.querySelectorAll<HTMLElement>("[data-plate]"));
    const stacking = window.matchMedia("(min-width: 1100px) and (min-height: 800px)");
    let frame = 0;

    const stack = () => {
      frame = 0;
      if (!stacking.matches || reduced.matches) {
        plates.forEach((plate) => plate.style.removeProperty("--cover"));
        return;
      }
      const viewport = window.innerHeight;
      plates.forEach((plate, index) => {
        const next = plates[index + 1];
        if (!next) return;
        const top = parseFloat(getComputedStyle(plate).top) || 0;
        const distance = next.getBoundingClientRect().top - top;
        const cover = Math.min(1, Math.max(0, 1 - distance / (viewport - top)));
        plate.style.setProperty("--cover", cover.toFixed(3));
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(stack);
    };
    stack();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      reveal.disconnect();
      art.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      root.classList.remove("io");
    };
  }, []);

  return null;
}
