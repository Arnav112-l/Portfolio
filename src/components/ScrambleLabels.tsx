import { useEffect } from "react";

const SCRAMBLE_CHARS = "█▓▒░<>/*\\";

export default function ScrambleLabels() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = document.querySelectorAll<HTMLElement>("[data-scramble]");

    elements.forEach((el) => {
      const original = el.textContent ?? "";
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          obs.disconnect();

          const start = performance.now();
          const duration = 500;

          const tick = () => {
            const p = Math.min(1, (performance.now() - start) / duration);
            const revealed = Math.floor(original.length * p);
            let text = original.slice(0, revealed);

            for (let i = revealed; i < original.length; i++) {
              text += original[i] === " " ? " " : SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
            }

            el.textContent = text;
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = original;
          };

          tick();
        },
        { threshold: 0.12 },
      );

      obs.observe(el);
    });
  }, []);

  return null;
}
