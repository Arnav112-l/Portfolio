import { useEffect, useRef, useState, type CSSProperties } from "react";
import { roles } from "../content";
import Motion from "./Motion";

function tint(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

export default function Currently() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [availHover, setAvailHover] = useState(false);
  const keylinesDrawn = useRef(false);
  const ledgerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ledger = ledgerRef.current;
    if (!ledger || keylinesDrawn.current) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ledger.classList.add("keylines-in");
          keylinesDrawn.current = true;
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    obs.observe(ledger);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="currently-section">
      <div className="currently-watermark" aria-hidden="true">
        ARNAV
      </div>

      <Motion delay={0}>
        <div className="currently-head">
          <p className="currently-label" data-scramble>currently</p>
          <div
            className="currently-badge"
            onMouseEnter={() => setAvailHover(true)}
            onMouseLeave={() => setAvailHover(false)}
          >
            <span className="currently-badge-dot" />
            {availHover ? "let's talk →" : "open to opportunities"}
          </div>
        </div>
      </Motion>

      <div ref={ledgerRef} className="currently-ledger">
        {roles.map((r, i) => (
          <Motion key={r.org} delay={i * 80}>
            <div
              className={`ledger-row ${hovered === i ? "is-hovered" : ""} ${hovered !== null && hovered !== i ? "is-dimmed" : ""}`}
              style={
                {
                  "--row-accent": r.accent,
                  "--row-tint": tint(r.accent, 0.05),
                  "--keyline-delay": `${i * 100}ms`,
                } as CSSProperties
              }
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="ledger-keyline" />

              <div className="ledger-main">
                <p className="ledger-title">{r.title}</p>
                <p className="ledger-detail">↳ {r.detail}</p>
              </div>

              <div className="ledger-org">
                <p className="ledger-org-name">{r.org}</p>
                <p className="ledger-period">{r.period}</p>
              </div>

              <div className="ledger-status">
                <span className="ledger-status-ring">
                  <span className="ledger-status-dot" />
                </span>
                <span className="ledger-status-text">{r.status}</span>
              </div>
            </div>
          </Motion>
        ))}
      </div>
    </section>
  );
}
