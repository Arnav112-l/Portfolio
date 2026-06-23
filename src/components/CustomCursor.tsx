import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [data-magnetic], input, textarea, select, label";
const TRAIL_COLORS = ["#2438FF", "#7A2BF5", "#0CAF9B", "#FFAA00"];

function canUseCustomCursor() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const ringScaleRef = useRef(1);
  const trailPoolRef = useRef<HTMLDivElement[]>([]);
  const trailIndexRef = useRef(0);
  const lastTrailRef = useRef(0);
  const shownRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!canUseCustomCursor()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add("custom-cursor");

    if (trailPoolRef.current.length === 0) {
      for (let i = 0; i < 10; i++) {
        const el = document.createElement("div");
        el.className = "cursor-trail";
        document.body.appendChild(el);
        trailPoolRef.current.push(el);
      }
    }

    const dropTrail = (x: number, y: number) => {
      const now = performance.now();
      if (now - lastTrailRef.current < 70) return;
      lastTrailRef.current = now;

      const pool = trailPoolRef.current;
      if (!pool.length) return;

      const el = pool[trailIndexRef.current];
      trailIndexRef.current = (trailIndexRef.current + 1) % pool.length;

      const color = TRAIL_COLORS[(Math.random() * TRAIL_COLORS.length) | 0];
      el.style.background = color;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.opacity = "0.32";
      el.style.transform = "translate(-50%, -50%) scale(1)";

      el.getAnimations().forEach((a) => a.cancel());
      el.animate(
        [
          { opacity: 0.32, transform: "translate(-50%, -50%) scale(1)" },
          { opacity: 0, transform: "translate(-50%, -50%) scale(0.3)" },
        ],
        { duration: 700, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" },
      );
    };

    const paint = () => {
      const { x: tx, y: ty } = targetRef.current;
      const ringPos = ringPosRef.current;

      ringPos.x += (tx - ringPos.x) * 0.18;
      ringPos.y += (ty - ringPos.y) * 0.18;

      const targetScale = ring.classList.contains("is-hover") ? 1.7 : 1;
      ringScaleRef.current += (targetScale - ringScaleRef.current) * 0.2;

      dot.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${ringScaleRef.current})`;

      rafRef.current = requestAnimationFrame(paint);
    };

    rafRef.current = requestAnimationFrame(paint);

    const show = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const hide = () => {
      shownRef.current = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };

      if (!shownRef.current) {
        shownRef.current = true;
        ringPosRef.current = { x: e.clientX, y: e.clientY };
        show();
      }

      dropTrail(e.clientX, e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      ring.classList.toggle("is-hover", !!e.target.closest(INTERACTIVE));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    return () => {
      document.body.classList.remove("custom-cursor");
      cancelAnimationFrame(rafRef.current);
      trailPoolRef.current.forEach((el) => el.remove());
      trailPoolRef.current = [];
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
    };
  }, []);

  if (!canUseCustomCursor()) return null;

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" style={{ opacity: 0 }} />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" style={{ opacity: 0 }} />
    </>
  );
}
