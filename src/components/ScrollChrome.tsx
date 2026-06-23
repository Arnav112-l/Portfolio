import { useEffect, useRef } from "react";
import {
  getActiveAccent,
  getScrollY,
  mixPaperWithAccent,
  subscribeScroll,
} from "../scroll";

export default function ScrollChrome() {
  const barRef = useRef<HTMLDivElement>(null);
  const lastAccent = useRef("#2438FF");

  useEffect(() => {
    const surface = document.getElementById("site-surface");
    const logo = document.querySelector<HTMLElement>(".nav-logo");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const update = () => {
      const bar = barRef.current;
      if (!bar) return;

      const y = getScrollY();
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, y / max))})`;

      const accent = getActiveAccent();
      if (accent !== lastAccent.current) {
        lastAccent.current = accent;
        bar.style.background = accent;
        document.documentElement.style.setProperty("--spine-accent", accent);
        if (logo) logo.style.color = accent;
      }

      if (surface && !reduced) {
        surface.style.backgroundColor = mixPaperWithAccent(accent);
      }
    };

    update();
    const unsub = subscribeScroll(update);

    const themeObs = new MutationObserver(update);
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      unsub();
      themeObs.disconnect();
    };
  }, []);

  return <div ref={barRef} className="progress-spine" aria-hidden="true" />;
}
