import type { CSSProperties } from "react";

// Fig. 04 — two agents write code in parallel; a review pass approves it line by line; only then does it ship.
// Line k types at k·0.25s and is approved when the scan reaches it (same 8s cycle), so both stay in sync.
const lines = [
  { indent: 0, width: 150, agent: 0 },
  { indent: 24, width: 196, agent: 0 },
  { indent: 24, width: 128, agent: 1 },
  { indent: 48, width: 172, agent: 0 },
  { indent: 48, width: 112, agent: 1 },
  { indent: 24, width: 184, agent: 1 },
  { indent: 0, width: 96, agent: 0 },
  { indent: 0, width: 160, agent: 1 },
];

export default function AgentArt() {
  return (
    <svg className="art art-agents" viewBox="0 0 480 480" role="img" aria-label="An owner and two agents. The agents write lines of code in parallel, each in its own colour; a review line sweeps down and approves each line; then the result deploys.">
      <path className="wire" d="M114 96H150" strokeDasharray="3 5" />
      <path className="wire" d="M100 226C128 226 124 180 150 180" strokeDasharray="3 5" />
      <path className="wire" d="M100 328C128 328 124 290 150 290" strokeDasharray="3 5" />

      <circle className="clay" cx="80" cy="96" r="34" />
      <rect className="agent-a" x="62" y="208" width="36" height="36" />
      <polygon className="agent-b" points="80,308 100,346 60,346" />

      <rect className="panel" x="150" y="56" width="290" height="310" rx="3" />
      {lines.map((line, index) => (
        <rect
          key={index}
          className={`code code-${line.agent}`}
          x={174 + line.indent}
          y={80 + index * 34}
          width={line.width}
          height="12"
          rx="1"
          style={{ "--k": index } as CSSProperties}
        />
      ))}
      <rect className="scan" x="160" y="74" width="270" height="2" />

      <path className="wire" d="M295 366V412H380" />
      <circle className="ship" cx="410" cy="412" r="30" />
      <circle className="ship-ring" cx="410" cy="412" r="30" />
    </svg>
  );
}
