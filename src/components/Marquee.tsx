import { useEffect, useRef } from "react";
import { marquee } from "../content";
import { getVelBus } from "../scroll";

const ITEMS = [...marquee, ...marquee];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const halfRef = useRef(0);
  const xRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      track.style.transform = "none";
      return;
    }

    const measure = () => {
      halfRef.current = track.scrollWidth / 2;
    };

    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready?.then(measure);

    let last = 0;
    let raf = 0;
    const baseSpeed = 72;

    const loop = (time: number) => {
      const dt = last ? Math.min(0.05, (time - last) / 1000) : 0.016;
      last = time;

      const vel = getVelBus();
      const speed = baseSpeed + Math.abs(vel) * 14;
      xRef.current -= speed * dt;

      const half = halfRef.current;
      if (half > 0) {
        while (xRef.current <= -half) xRef.current += half;
      }

      const skew = Math.max(-7, Math.min(7, -vel * 0.9));
      track.style.transform = `translate3d(${xRef.current.toFixed(2)}px,0,0) skewX(${skew.toFixed(2)}deg)`;

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className="marquee-band" data-ribbon aria-hidden="true">
      <div ref={trackRef} className="marquee-track">
        {ITEMS.map((word, i) => (
          <span key={`${word}-${i}`} className="marquee-item">
            {word}
            <span className="marquee-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
