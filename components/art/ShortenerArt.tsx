import type { CSSProperties } from "react";

// Fig. 05 — the shortener's architecture. Reads mostly stop at the cache; one in four misses to the shards;
// writes lease IDs from a range allocator; click events leave the hot path through a queue.
type Packet = { cls: string; points: [number, number][]; delay: number };

const packets: Packet[] = [
  { cls: "read", points: [[78, 190], [130, 190], [230, 118], [340, 118]], delay: 0 },
  { cls: "read", points: [[78, 190], [130, 190], [230, 118], [340, 118]], delay: 1 },
  { cls: "read", points: [[78, 190], [130, 190], [230, 118], [340, 118]], delay: 2 },
  { cls: "miss", points: [[78, 190], [130, 190], [230, 118], [340, 118], [462, 170]], delay: 3.5 },
  { cls: "write", points: [[78, 190], [130, 190], [230, 262], [340, 262], [462, 238]], delay: 5 },
  { cls: "event", points: [[254, 130], [284, 130], [284, 330], [372, 330], [470, 330]], delay: 1.5 },
  { cls: "event", points: [[254, 130], [284, 130], [284, 330], [372, 330], [470, 330]], delay: 4.5 },
];

export default function ShortenerArt() {
  return (
    <svg className="art art-shortener" viewBox="0 0 560 380" role="img" aria-label="Architecture of the URL shortener: clients reach a load balancer; the redirect service reads from a cache and falls back to sharded storage on a miss; the write API takes IDs from a range allocator and writes to storage; click events flow through a queue to analytics.">
      <g className="wires">
        <path d="M76 190H120" />
        <path d="M134 190L206 118M134 190L206 262" />
        <path d="M254 118H312M368 118C410 118 420 170 440 170" />
        <path d="M254 262H316M344 262C400 262 420 238 440 238" />
        <path d="M254 130H284V330H350M394 330H448" strokeDasharray="3 5" />
      </g>

      <circle className="n-client" cx="50" cy="190" r="26" />
      <rect className="n-lb" x="120" y="120" width="14" height="140" />
      <rect className="n-read" x="206" y="94" width="48" height="48" />
      <rect className="n-write" x="206" y="238" width="48" height="48" />
      <circle className="n-cache" cx="340" cy="118" r="28" />
      <polygon className="n-ids" points="330,248 344,262 330,276 316,262" />
      <g className="n-db">
        <rect x="440" y="140" width="72" height="24" rx="2" />
        <rect x="440" y="192" width="72" height="24" rx="2" />
        <rect x="440" y="244" width="72" height="24" rx="2" />
        <rect x="440" y="166" width="72" height="24" rx="2" />
        <rect x="440" y="218" width="72" height="24" rx="2" />
      </g>
      <g className="n-queue">
        {[0, 1, 2, 3].map((index) => (
          <rect key={index} x={352 + index * 11} y="322" width="7" height="16" />
        ))}
      </g>
      <polygon className="n-analytics" points="470,312 492,348 448,348" />

      <g className="art-labels">
        <text x="50" y="236" textAnchor="middle">client</text>
        <text x="127" y="280" textAnchor="middle">lb</text>
        <text x="230" y="84" textAnchor="middle">redirect</text>
        <text x="230" y="306" textAnchor="middle">write api</text>
        <text x="340" y="80" textAnchor="middle">cache</text>
        <text x="330" y="298" textAnchor="middle">id ranges</text>
        <text x="476" y="128" textAnchor="middle">shards</text>
        <text x="372" y="362" textAnchor="middle">queue</text>
        <text x="470" y="370" textAnchor="middle">analytics</text>
      </g>

      {packets.map((packet, index) => (
        <circle
          key={index}
          className={`sp sp-${packet.cls}`}
          r="5.5"
          style={
            {
              "--delay": `${packet.delay}s`,
              ...Object.fromEntries(packet.points.flatMap(([x, y], k) => [[`--x${k}`, `${x}px`], [`--y${k}`, `${y}px`]])),
            } as CSSProperties
          }
        />
      ))}
    </svg>
  );
}
