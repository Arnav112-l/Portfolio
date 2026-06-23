import { useState } from "react";
import { projects, stayid } from "../content";
import Motion from "./Motion";
import WorkCard from "./WorkCard";
import WorkStackSlot from "./WorkStackSlot";

const TOTAL = 1 + projects.length;
const totalStr = String(TOTAL).padStart(3, "0");

function StayIDShots() {
  const [shot, setShot] = useState(0);

  return (
    <div className="work-row-shots">
      <div className="work-row-shot-frame">
        {stayid.shots[shot] && (
          <img
            src={stayid.shots[shot].src}
            alt={stayid.shots[shot].alt}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxYjFjMjQiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZmlsbD0iIzM4Mzg0OCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNHB4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U2NyZWVuc2hvdDwvdGV4dD48L3N2Zz4=";
            }}
          />
        )}
      </div>
      <div className="work-row-shot-tabs">
        {stayid.shots.map((s, i) => (
          <button
            key={s.label}
            type="button"
            className={i === shot ? "is-active" : ""}
            onClick={() => setShot(i)}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Work() {
  const cards = [
    {
      key: stayid.name,
      props: {
        tag: stayid.category,
        index: "001",
        total: totalStr,
        name: stayid.name,
        tagline: stayid.tagline,
        why: stayid.why,
        highlights: stayid.solution,
        stack: stayid.stack,
        signal: stayid.signal,
        github: stayid.github,
        accent: "#2438FF",
        sim: "recall" as const,
        extra: <StayIDShots />,
      },
    },
    ...projects.map((p, i) => ({
      key: p.name,
      props: {
        tag: p.tag,
        index: String(i + 2).padStart(3, "0"),
        total: totalStr,
        name: p.name,
        tagline: p.desc,
        why: p.why,
        highlights: p.highlights,
        stack: p.stack,
        signal: p.signal,
        github: p.github,
        accent: p.accent,
        sim: p.sim,
      },
    })),
  ];

  return (
    <div className="work-stack">
      <Motion delay={0}>
        <p className="work-ship-count font-mono text-[11px] tracking-widest uppercase text-muted">
          {totalStr} systems shipped
        </p>
      </Motion>

      <div className="work-stack-scroll">
        {cards.map((card, i) => (
          <WorkStackSlot key={card.key} index={i} isLast={i === cards.length - 1}>
            <WorkCard {...card.props} />
          </WorkStackSlot>
        ))}
      </div>
    </div>
  );
}
