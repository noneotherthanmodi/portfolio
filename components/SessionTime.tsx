"use client";

import { useEffect, useRef } from "react";

export function formatElapsed(ms: number) {
  const total = Math.floor(ms / 1000);
  const minutes = String(Math.floor(total / 60)).padStart(2, "0");
  const seconds = String(total % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// Writes to the DOM directly so the ticking clock never re-renders React.
export default function SessionTime() {
  const node = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tick = () => {
      if (node.current) node.current.textContent = formatElapsed(performance.now());
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span ref={node} className="tabular">
      00:00
    </span>
  );
}
