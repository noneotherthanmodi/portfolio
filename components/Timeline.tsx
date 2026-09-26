import type { CSSProperties } from "react";
import { portfolio } from "@/data/portfolio";

const month = (value: string) => {
  const [year, m] = value.split("-").map(Number);
  return year * 12 + (m - 1);
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const label = (value: number) => `${months[value % 12]} ${Math.floor(value / 12)}`;

const duration = (months: number) => {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [years ? `${years} yr` : "", rest ? `${rest} mo` : ""].filter(Boolean).join(" ");
};

// Rendered at build time; "now" is the build date, which is what the bars need to be accurate at deploy.
export default function Timeline() {
  const today = new Date();
  const now = today.getFullYear() * 12 + today.getMonth() + 1;
  const start = month("2024-01");
  const end = now + 2;
  const range = end - start;
  const years: number[] = [];
  for (let year = 2024; year * 12 <= end; year++) years.push(year);

  const rows = [...portfolio.experience].reverse().map((item) => {
    const from = month(item.start);
    const to = item.end ? month(item.end) + 1 : now;
    return { ...item, from, to, live: !item.end };
  });

  return (
    <div className="timeline">
      <div className="timeline-axis" aria-hidden="true">
        {years.map((year) => (
          <span key={year} style={{ "--x": `${((year * 12 - start) / range) * 100}%` } as CSSProperties}>
            {year}
          </span>
        ))}
        <span className="axis-now" style={{ "--x": `${((now - start) / range) * 100}%` } as CSSProperties}>
          now
        </span>
      </div>
      <ol className="timeline-rows">
        {rows.map((row, index) => (
          <li key={row.role} className="span-row" data-reveal style={{ "--d": index } as CSSProperties}>
            <div className="span-meta">
              <span className="span-date">
                {label(row.from)} — {row.live ? "now" : label(row.to - 1)}
              </span>
              <h3>{row.company}</h3>
              <p className="span-role">{row.role}</p>
            </div>
            <div className="span-track" aria-hidden="true">
              {years.map((year) => (
                <i key={year} style={{ "--x": `${((year * 12 - start) / range) * 100}%` } as CSSProperties} />
              ))}
              <span
                className="span-bar"
                data-live={row.live}
                style={{ "--l": `${((row.from - start) / range) * 100}%`, "--w": `${((row.to - row.from) / range) * 100}%` } as CSSProperties}
              >
                <span className="span-dur">{duration(row.to - row.from)}</span>
              </span>
            </div>
            <p className="span-desc">{row.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
