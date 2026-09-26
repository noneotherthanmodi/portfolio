import { Fragment, type CSSProperties } from "react";

// The space must sit outside the inline-block mask, or it collapses and words run together.
export default function SplitWords({ text, offset = 0 }: { text: string; offset?: number }) {
  const words = text.split(" ");
  return words.map((word, index) => (
    <Fragment key={index}>
      <span className="w">
        <span className="wi" style={{ "--i": offset + index } as CSSProperties}>
          {word}
        </span>
      </span>
      {index < words.length - 1 ? " " : null}
    </Fragment>
  ));
}
