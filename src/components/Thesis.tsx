import { useEffect, useRef } from "react";
import { thesis } from "../content";
import { subscribeScroll } from "../scroll";

const WORDS = thesis.split(/(\s+)/).filter(Boolean);

export default function Thesis() {
  const blockRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wordRefs.current.forEach((w) => {
        w.style.opacity = "1";
      });
      return;
    }

    const textWords = wordRefs.current.filter((w) => w.dataset.word === "1");

    const update = () => {
      const block = blockRef.current;
      if (!block) return;

      const rect = block.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.78;
      const end = vh * 0.55;
      const range = rect.height + start - end;
      if (range <= 0) return;

      const progress = Math.max(0, Math.min(1, (start - rect.top) / range));
      const total = textWords.length;

      textWords.forEach((el, i) => {
        const threshold = (i + 1) / total;
        const local = Math.max(0, Math.min(1, (progress - (i / total)) * total));
        const opacity = 0.13 + local * 0.87;
        el.style.opacity = progress >= threshold ? "1" : String(opacity);
      });
    };

    update();
    return subscribeScroll(update);
  }, []);

  let wordIndex = 0;

  return (
    <section className="full-section" data-accent="#7A2BF5" data-section="thesis">
      <div className="section-inner">
        <p className="section-eyebrow scramble-in" data-scramble>
          [ 00 — the thesis ]
        </p>
        <div
          ref={blockRef}
          className="manifesto"
          data-manifesto
          data-vel-skew
        >
          {WORDS.map((token, i) => {
            if (/^\s+$/.test(token)) {
              return <span key={`sp-${i}`}>{token}</span>;
            }
            const idx = wordIndex++;
            const emTeal = token === "practice" || token === "faster.";
            const emPurple =
              token === "real" || token === "users" || token === "StayID" || token === "user";

            return (
              <span
                key={`w-${i}`}
                ref={(el) => {
                  if (el) wordRefs.current[idx] = el;
                }}
                data-word="1"
                className={
                  emTeal ? "manifesto-em manifesto-em-teal" : emPurple ? "manifesto-em" : "manifesto-word"
                }
              >
                {token}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
