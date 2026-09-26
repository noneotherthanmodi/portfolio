"use client";

import { useEffect, useRef, useState } from "react";
import Arrow from "./Arrow";

const links = [
  { href: "#work", label: "Work", n: "03" },
  { href: "#design", label: "Design", n: "04" },
  { href: "#path", label: "Path", n: "06" },
  { href: "#ideas", label: "Ideas", n: "07" },
];

const clock = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export default function Header({ email }: { email: string }) {
  const [time, setTime] = useState("");
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () => setTime(clock.format(new Date()));
    tick();
    const timer = setInterval(tick, 15_000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const element = header.current;
      if (!element) return;
      element.dataset.scrolled = String(y > 24);
      if (Math.abs(y - last) > 6) {
        element.dataset.hidden = String(y > last && y > 240);
        last = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.dataset.locked = "true";
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 860) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      delete document.documentElement.dataset.locked;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="site-header" ref={header} data-open={open}>
      <div className="header-inner">
        <a className="brand" href="#intake" aria-label="Udit Narayan Modi — back to top">
          <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="19" cy="16" r="11" />
            <rect x="4" y="5" width="8" height="22" />
          </svg>
          <span className="brand-name">Udit Narayan Modi</span>
        </a>

        <nav className="header-nav" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              <span className="nav-n">{link.n}</span>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-end">
          <span className="header-clock" aria-label={time ? `Local time in Bengaluru: ${time}` : undefined}>
            <span className="pulse" aria-hidden="true" />
            BLR {time || "--:--"}
          </span>
          <a className="btn btn-ink btn-sm" href="#contact">
            Say hello <Arrow dir="up-right" size={14} />
          </a>
          <button
            ref={toggle}
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="menu-lines" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" ref={menu} hidden={!open}>
        <nav aria-label="Mobile">
          {[...links, { href: "#contact", label: "Contact", n: "08" }].map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              <span className="nav-n">{link.n}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="mobile-email" href={`mailto:${email}`}>
          {email}
        </a>
      </div>
    </header>
  );
}
