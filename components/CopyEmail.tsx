"use client";

import { useEffect, useRef, useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2400);
  }

  return (
    <div className="copy">
      <button type="button" className="btn btn-line" onClick={copy} data-state={state}>
        <span className="copy-label">{state === "copied" ? "Copied" : state === "failed" ? "Select to copy" : "Copy address"}</span>
      </button>
      <span className="sr-only" role="status">
        {state === "copied" ? "Email address copied to clipboard." : state === "failed" ? "Couldn’t copy — select the address instead." : ""}
      </span>
    </div>
  );
}
