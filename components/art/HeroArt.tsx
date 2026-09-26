// Fig. 00 — a soft circle (intent) meeting a rigid bar (structure); a request crosses both.
export default function HeroArt() {
  const dots = [];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      dots.push(<circle key={`${row}-${col}`} cx={44 + col * 22} cy={60 + row * 22} r="2.2" />);
    }
  }

  return (
    <svg className="hero-svg" viewBox="0 0 640 680" aria-hidden="true" focusable="false">
      <g className="ha-dots">{dots}</g>
      <circle className="ha-orbit" cx="372" cy="372" r="262" />
      <circle className="ha-sun" cx="372" cy="372" r="232" />
      <circle className="ha-moon" cx="566" cy="104" r="44" />
      <rect className="ha-bar" x="160" y="96" width="68" height="500" />
      <path className="ha-quarter" d="M640 680H468A172 172 0 0 1 640 508Z" />
      <line className="ha-line" x1="0" y1="372" x2="640" y2="372" />
      <circle className="ha-ring" cx="372" cy="372" r="13" />
      <circle className="ha-dot" cx="0" cy="372" r="7" />
    </svg>
  );
}
