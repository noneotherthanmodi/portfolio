"use client";

import { useEffect, useState } from "react";
import { basePath, links } from "@/lib/links";

// Plain anchors on purpose: a client-side transition would skip the redirect script on the target page.
export default function LiveLinks() {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(`${window.location.host}${basePath}`);
  }, []);

  return (
    <div className="live">
      <div className="demo-head">
        <h4>The read path, live.</h4>
        <p>
          These are real short links on this site. GitHub Pages has no server, so each code is compiled at build time
          into a static redirect served from GitHub’s CDN — the design’s cache, taken to its extreme. The one honest gap:
          static hosting answers 200 and redirects in the page, where a real server would send a 302.
        </p>
      </div>
      <ul className="live-list">
        {links.map((link) => (
          <li key={link.code}>
            <a href={`${basePath}/s/${link.code}/`}>
              <span className="live-host">{origin}</span>/s/<strong>{link.code}</strong>
            </a>
            <a href={`${basePath}/s/${link.alias}/`} className="live-alias">
              /s/{link.alias}
            </a>
            <span className="live-target">→ {link.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
