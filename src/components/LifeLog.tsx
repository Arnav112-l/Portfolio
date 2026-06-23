import { useEffect, useRef, useState } from "react";
import { log } from "../content";
import { subscribeScroll } from "../scroll";

const IDLE_LINES = [
  "waiting for input…",
  "still here. scroll when ready.",
  "buffer warm · append-only",
];

export default function LifeLog() {
  const [lines, setLines] = useState(log);
  const [visibleCount, setVisibleCount] = useState(0);
  const idleRef = useRef(0);
  const lastScrollRef = useRef(Date.now());
  const revealedRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisibleCount(lines.length);
      return;
    }

    const body = document.querySelector(".console-body");
    if (!body) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealedRef.current) {
          revealedRef.current = true;
          let i = 0;
          const reveal = () => {
            i += 1;
            setVisibleCount(i);
            if (i < log.length) window.setTimeout(reveal, 120);
          };
          reveal();
        }
      },
      { threshold: 0.25 },
    );

    obs.observe(body);
    return () => obs.disconnect();
  }, [lines.length]);

  useEffect(() => {
    const bump = () => {
      lastScrollRef.current = Date.now();
    };

    const unsub = subscribeScroll(bump);
    window.addEventListener("wheel", bump, { passive: true });
    window.addEventListener("keydown", bump);

    idleRef.current = window.setInterval(() => {
      if (Date.now() - lastScrollRef.current < 4000) return;
      if (lines.length > log.length + 2) return;

      const extra = IDLE_LINES[(lines.length - log.length) % IDLE_LINES.length];
      setLines((prev) => [
        ...prev,
        { date: " idle ", text: extra },
      ]);
      setVisibleCount((c) => c + 1);
      lastScrollRef.current = Date.now();
    }, 5000);

    return () => {
      unsub();
      window.removeEventListener("wheel", bump);
      window.removeEventListener("keydown", bump);
      window.clearInterval(idleRef.current);
    };
  }, [lines.length]);

  return (
    <div className="w-full">
      <p className="section-eyebrow" data-scramble>
        <span className="section-marker" style={{ background: "#0CAF9B" }} aria-hidden="true" />
        [ the log — append-only ]
      </p>

      <div className="console-window">
        <header className="console-header">
          <div className="console-dots">
            <span />
            <span />
            <span />
          </div>
          <span className="console-title">~/arnav — tail -f life.log</span>
        </header>
        <div className="console-body">
          {lines.map((e, i) => (
            <div
              key={`${e.date}-${e.text}-${i}`}
              className={`console-line ${i < visibleCount ? "is-visible" : ""}`}
            >
              <span className="console-time">[{e.date}]</span>
              <span className="console-dot" />
              <span>
                {e.text}
                {i === lines.length - 1 && i < visibleCount && <span className="console-cursor" />}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
