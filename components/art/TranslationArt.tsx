import type { CSSProperties } from "react";

// Fig. 01 — a document fans out to parallel workers; each streams progress in steps; results converge on delivery.
const tracks = [
  { y: 128, steps: 6, rest: 0.72 },
  { y: 192, steps: 9, rest: 0.45 },
  { y: 256, steps: 5, rest: 0.88 },
  { y: 320, steps: 8, rest: 0.6 },
];

export default function TranslationArt() {
  return (
    <svg className="art art-translation" viewBox="0 0 480 480" role="img" aria-label="A document splits into four parallel workers whose progress bars fill in steps, then converge into a single delivery point.">
      <rect className="ink" x="44" y="96" width="112" height="288" />
      {[0, 1, 2, 3, 4, 5, 6].map((line) => (
        <rect key={line} className="doc-line" x="64" y={124 + line * 34} width={line % 3 === 2 ? 44 : 72} height="3" />
      ))}
      {tracks.map((track, index) => (
        <g key={track.y}>
          <path className="wire" d={`M156 ${240} C176 ${240} 170 ${track.y + 14} 188 ${track.y + 14}`} />
          <rect className="track" x="188" y={track.y} width="180" height="28" />
          <rect
            className={`track-fill track-fill-${index}`}
            x="188"
            y={track.y}
            width="180"
            height="28"
            style={{ "--steps": track.steps, "--rest": track.rest } as CSSProperties}
          />
          <path className="wire" d={`M368 ${track.y + 14} C392 ${track.y + 14} 380 240 398 240`} />
        </g>
      ))}
      <circle className="deliver" cx="428" cy="240" r="30" />
      <circle className="deliver-ring" cx="428" cy="240" r="30" />
    </svg>
  );
}
