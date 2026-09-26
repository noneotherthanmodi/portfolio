import type { CSSProperties } from "react";

// Fig. 03 — scattered records fall through a filter and settle into ordered columns by kind.
const columns = [120, 240, 360];
const kinds = ["circle", "square", "triangle"] as const;

function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

const random = seeded(42);
const records = Array.from({ length: 12 }, (_, index) => {
  const kind = index % 3;
  const slot = Math.floor(index / 3);
  return {
    kind: kinds[kind],
    x0: 64 + random() * 352,
    y0: 52 + random() * 104,
    r0: Math.round(random() * 180 - 90),
    xg: columns[kind],
    xs: columns[kind],
    ys: 414 - slot * 36,
  };
});

function Shape({ kind }: { kind: (typeof kinds)[number] }) {
  if (kind === "circle") return <circle r="14" />;
  if (kind === "square") return <rect x="-13" y="-13" width="26" height="26" />;
  return <polygon points="0,-15 15,12 -15,12" />;
}

export default function IngestArt() {
  return (
    <svg className="art art-ingest" viewBox="0 0 480 480" role="img" aria-label="Scattered shapes representing raw data fall through a filter with three openings and settle into three neat columns, one per kind.">
      <g className="filter">
        <rect x="44" y="206" width="58" height="10" />
        <rect x="138" y="206" width="84" height="10" />
        <rect x="258" y="206" width="84" height="10" />
        <rect x="378" y="206" width="58" height="10" />
      </g>
      {columns.map((x) => (
        <line key={x} className="guide" x1={x} y1="236" x2={x} y2="432" />
      ))}
      <line className="wire" x1="44" y1="440" x2="436" y2="440" />
      {records.map((record, index) => (
        <g
          key={index}
          className={`record record-${record.kind}`}
          style={
            {
              "--i": index,
              "--x0": `${record.x0.toFixed(1)}px`,
              "--y0": `${record.y0.toFixed(1)}px`,
              "--r0": `${record.r0}deg`,
              "--xg": `${record.xg}px`,
              "--xs": `${record.xs}px`,
              "--ys": `${record.ys}px`,
            } as CSSProperties
          }
        >
          <Shape kind={record.kind} />
        </g>
      ))}
    </svg>
  );
}
