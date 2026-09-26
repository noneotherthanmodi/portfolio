"use client";

import { useEffect, useRef, useState } from "react";
import { spans } from "@/lib/trace";
import { formatElapsed } from "./SessionTime";

// The page is one request; each section is a span. The pill is its live trace.
export default function TracePill() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const fills = useRef<(HTMLSpanElement | null)[]>([]);
  const time = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sections = spans.map((span) => document.getElementById(span.id));
    let bounds: { top: number; height: number }[] = [];
    let frame = 0;

    const measure = () => {
      bounds = sections.map((section) => {
        const rect = section?.getBoundingClientRect();
        return { top: (rect?.top ?? 0) + window.scrollY, height: rect?.height ?? 1 };
      });
      update();
    };

    const update = () => {
      frame = 0;
      const probe = window.scrollY + window.innerHeight * 0.45;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let active = 0;
      bounds.forEach((bound, index) => {
        const progress = atBottom ? 1 : Math.min(1, Math.max(0, (probe - bound.top) / bound.height));
        fills.current[index]?.style.setProperty("--fill", progress.toFixed(3));
        if (probe >= bound.top) active = index;
      });
      setCurrent(atBottom ? spans.length - 1 : active);
      setVisible(window.scrollY > window.innerHeight * 0.35);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      if (time.current) time.current.textContent = formatElapsed(performance.now());
    };
    tick();
    const timer = setInterval(tick, 1000);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      clearInterval(timer);
    };
  }, []);

  const span = spans[current];

  return (
    <nav className="trace" data-visible={visible} aria-label="Page trace">
      <span className="trace-id" aria-hidden="true">
        <span className="pulse" />
        trace
      </span>
      <span className="trace-current" aria-live="off">
        <span className="trace-n">{span.n}</span> {span.label}
      </span>
      <ol className="trace-bars">
        {spans.map((item, index) => (
          <li key={item.id}>
            <a href={`#${item.id}`} aria-label={`${item.n} ${item.title}`} aria-current={index === current ? "location" : undefined}>
              <span className="trace-fill" ref={(node) => { fills.current[index] = node; }} />
            </a>
          </li>
        ))}
      </ol>
      <span className="trace-time" ref={time} aria-hidden="true">
        00:00
      </span>
    </nav>
  );
}
