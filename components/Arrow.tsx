const paths = {
  right: "M3 8h10M9 4l4 4-4 4",
  down: "M8 3v10M4 9l4 4 4-4",
  up: "M8 13V3M4 7l4-4 4 4",
  "up-right": "M4.5 11.5l7-7M5.5 4.5h6v6",
} as const;

export default function Arrow({ dir = "right", size = 16 }: { dir?: keyof typeof paths; size?: number }) {
  return (
    <svg className="arrow" data-dir={dir} width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d={paths[dir]} stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}
