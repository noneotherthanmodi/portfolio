"use client";

import { useState } from "react";
import Arrow from "./Arrow";

type Option = { readonly id: string; readonly label: string };

export default function FreelanceBrief({
  email,
  types,
  timelines,
}: {
  email: string;
  types: readonly Option[];
  timelines: readonly Option[];
}) {
  const [picked, setPicked] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string | null>(null);

  const labels = types.filter((type) => picked.includes(type.id)).map((type) => type.label);
  const when = timelines.find((item) => item.id === timeline)?.label;
  const subject = `Project idea — ${labels.length ? labels.join(", ") : "let’s talk"}`;
  const body = [
    "Hi Udit,",
    "",
    "I have an idea I’d like to talk through.",
    "",
    `What: ${labels.join(", ") || "—"}`,
    `Timeline: ${when ?? "—"}`,
    "",
    "A few lines about it:",
    "",
  ].join("\r\n");
  const href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const toggle = (id: string) =>
    setPicked((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  return (
    <div className="brief">
      <div className="brief-form">
        <div className="brief-intro">
          <h3>Pitch me an idea.</h3>
          <p>Ten seconds. It opens your email with the details filled in.</p>
        </div>

        <fieldset className="chips">
          <legend className="label">What are you building?</legend>
          {types.map((type) => (
            <label key={type.id} className="chip">
              <input type="checkbox" checked={picked.includes(type.id)} onChange={() => toggle(type.id)} />
              <span>{type.label}</span>
            </label>
          ))}
        </fieldset>

        <fieldset className="chips">
          <legend className="label">When?</legend>
          {timelines.map((item) => (
            <label key={item.id} className="chip">
              <input type="radio" name="timeline" checked={timeline === item.id} onChange={() => setTimeline(item.id)} />
              <span>{item.label}</span>
            </label>
          ))}
        </fieldset>
      </div>

      <div className="brief-send">
        <pre className="brief-preview" aria-hidden="true">
          <span className="method">POST</span> /projects{"\n"}
          {"{\n"}
          {"  "}<span className="key">&quot;type&quot;</span>: [{picked.map((id) => JSON.stringify(id)).join(", ")}],{"\n"}
          {"  "}<span className="key">&quot;timeline&quot;</span>: {JSON.stringify(timeline)}{"\n"}
          {"}"}
        </pre>
        <a className="btn btn-ink brief-cta" href={href} data-goatcounter-click="send-idea">
          Send the idea <Arrow dir="up-right" size={14} />
        </a>
        <p className="brief-alt">
          Or write directly — <a className="link-draw" href={`mailto:${email}?subject=${encodeURIComponent("Project idea")}`}>{email}</a>
        </p>
      </div>
    </div>
  );
}
