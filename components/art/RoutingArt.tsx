import type { CSSProperties } from "react";

// Fig. 02 — one intent, one router, three specialists. Each request travels to exactly one of them.
const targets = [
  { x: 392, y: 124 },
  { x: 392, y: 356 },
  { x: 392, y: 240 },
];

export default function RoutingArt() {
  return (
    <svg className="art art-routing" viewBox="0 0 480 480" role="img" aria-label="A circle representing user intent sends a request through a diamond-shaped router, which hands each request to exactly one of three specialist tools.">
      <line className="wire" x1="128" y1="240" x2="174" y2="240" />
      {targets.map((target) => (
        <line key={target.y} className="wire" x1="286" y1="240" x2={target.x - 34} y2={target.y} />
      ))}
      <circle className="clay" cx="84" cy="240" r="44" />
      <polygon className="ink router" points="230,184 286,240 230,296 174,240" />

      <rect className="tool tool-0" x="362" y="94" width="60" height="60" />
      <path className="tool tool-2" d="M358 256a34 34 0 0 1 68 0Z" transform="translate(0 -2)" />
      <polygon className="tool tool-1" points="392,322 426,386 358,386" />

      {targets.map((target, index) => (
        <circle
          key={index}
          className={`packet packet-${index}`}
          cx="0"
          cy="0"
          r="7"
          style={{ "--tx": `${target.x - 34}px`, "--ty": `${target.y}px` } as CSSProperties}
        />
      ))}
    </svg>
  );
}
