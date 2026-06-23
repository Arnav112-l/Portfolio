import type { CSSProperties, ReactNode } from "react";
import WorkSimCanvas, { type SimKind } from "./WorkSimCanvas";

type Props = {
  tag: string;
  index: string;
  total: string;
  name: string;
  tagline: string;
  why: string;
  highlights: string[];
  stack: string[];
  signal: string;
  github: string;
  accent: string;
  sim: SimKind;
  extra?: ReactNode;
};

export default function WorkCard({
  tag,
  index,
  total,
  name,
  tagline,
  why,
  highlights,
  stack,
  signal,
  github,
  accent,
  sim,
  extra,
}: Props) {
  return (
    <article
      className="work-row"
      data-work-row
      data-accent={accent}
      style={{ "--plate-accent": accent, "--row-accent": accent } as CSSProperties}
    >
      <div className="work-row-content">
        <div className="work-row-head">
          <span className="work-row-tag">{tag}</span>
          <span className="work-row-index">
            {index} / {total}
          </span>
        </div>

        <h3 className="work-row-title">{name}</h3>
        <p className="work-row-tagline">{tagline}</p>

        <div className="work-row-why">
          <span className="work-row-why-label">why:</span>
          <span className="work-row-why-text">{why}</span>
        </div>

        <ul className="work-row-highlights">
          {highlights.map((item) => (
            <li key={item}>
              <span className="work-row-bullet" style={{ background: accent }} />
              {item}
            </li>
          ))}
        </ul>

        {extra}

        <div className="work-row-stack">
          {stack.map((t) => (
            <span key={t} className="badge">
              {t}
            </span>
          ))}
        </div>

        <a href={github} target="_blank" rel="noopener noreferrer" className="work-row-code" data-magnetic>
          Code ↗
        </a>
      </div>

      <div className="work-row-signal" data-plate style={{ "--plate-accent": accent } as React.CSSProperties}>
        <span className="work-signal-label">signal</span>
        <WorkSimCanvas kind={sim} accent={accent} autoDrift />
        <p className="work-signal-caption">{signal}</p>
      </div>
    </article>
  );
}
