"use client";

import { useRef, useState, type FormEvent } from "react";
import { base62, encode, scatter } from "@/lib/links";

const CODE_LENGTH = 7;
const RANGE_START = 1_048_576;

type Result = {
  url: string;
  id: number;
  scattered: string;
  code: string;
  hashCode: string | null;
};

async function hashCode(url: string) {
  if (!globalThis.crypto?.subtle) return null;
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(url)));
  let value = 0n;
  for (const byte of digest.slice(0, 6)) value = (value << 8n) | BigInt(byte);
  return base62(value % 62n ** BigInt(CODE_LENGTH), CODE_LENGTH);
}

export default function ShortenerDemo() {
  const [url, setUrl] = useState("https://example.com/blog/2026/09/designing-systems-that-survive-production?ref=portfolio");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const nextId = useRef(RANGE_START);

  async function shorten(event: FormEvent) {
    event.preventDefault();
    let parsed: URL;
    try {
      parsed = new URL(url.trim());
      if (!/^https?:$/.test(parsed.protocol)) throw new Error();
    } catch {
      setError("Enter a full http(s) URL, like https://example.com/page.");
      return;
    }
    setError("");
    const id = nextId.current++;
    setResult({
      url: parsed.href,
      id,
      scattered: scatter(id, CODE_LENGTH).toLocaleString("en-US"),
      code: encode(id, CODE_LENGTH),
      hashCode: await hashCode(parsed.href),
    });
  }

  return (
    <div className="demo">
      <div className="demo-head">
        <h4>Try the write path.</h4>
        <p>Runs in your browser — a static site can’t accept writes, so nothing is stored.</p>
      </div>
      <form className="demo-form" onSubmit={shorten} noValidate>
        <label className="sr-only" htmlFor="demo-url">Long URL</label>
        <input
          id="demo-url"
          type="url"
          inputMode="url"
          autoComplete="off"
          spellCheck={false}
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "demo-error" : undefined}
        />
        <button className="btn btn-ink" type="submit">Shorten</button>
      </form>
      {error && <p id="demo-error" className="demo-error">{error}</p>}

      <div className="demo-out" aria-live="polite">
        {result ? (
          <>
            <ol className="demo-steps">
              <li><span>lease id</span><code>{result.id.toLocaleString("en-US")}</code></li>
              <li><span>scatter</span><code>{result.scattered}</code></li>
              <li><span>base62</span><code className="demo-code">/{result.code}</code></li>
            </ol>
            <p className="demo-compare">
              {result.url.length} characters in, {CODE_LENGTH} out. Shorten again and the next id is{" "}
              {(result.id + 1).toLocaleString("en-US")} — a different code, never a collision.
            </p>
            {result.hashCode && (
              <p className="demo-alt">
                <span>Hash-and-truncate would give</span> <code>/{result.hashCode}</code> — the same code every time for this URL,
                but a collision check on every write.
              </p>
            )}
          </>
        ) : (
          <p className="demo-empty">Press Shorten to watch an id become a code.</p>
        )}
      </div>
    </div>
  );
}
