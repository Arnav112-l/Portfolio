import { type ReactNode, useEffect, useRef } from "react";
import { subscribeScroll } from "../scroll";

const STICKY_TOP = 96;
const SCALE_END = STICKY_TOP + 120;

type Props = {
  children: ReactNode;
  index: number;
  isLast: boolean;
};

function canAnimateStack() {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function WorkStackSlot({ children, index, isLast }: Props) {
  const slotRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLast || !canAnimateStack()) return;

    const slot = slotRef.current;
    const inner = innerRef.current;
    if (!slot || !inner) return;

    const update = () => {
      const next = slot.nextElementSibling as HTMLElement | null;
      if (!next) {
        inner.style.transform = "";
        inner.style.filter = "";
        return;
      }

      const nextTop = next.getBoundingClientRect().top;
      const start = window.innerHeight;
      const span = Math.max(1, start - SCALE_END);
      const progress = Math.max(0, Math.min(1, 1 - (nextTop - SCALE_END) / span));
      const scale = 1 - progress * 0.06;
      const brightness = 1 - progress * 0.035;

      inner.style.transform = `scale(${scale})`;
      inner.style.filter = `brightness(${brightness})`;
    };

    update();
    window.addEventListener("resize", update);
    const unsub = subscribeScroll(update);

    return () => {
      unsub();
      window.removeEventListener("resize", update);
      window.removeEventListener("resize", update);
      inner.style.transform = "";
      inner.style.filter = "";
    };
  }, [isLast]);

  return (
    <div
      ref={slotRef}
      className="work-stack-slot"
      style={{ zIndex: index + 1 }}
      data-stack-index={index}
    >
      <div ref={innerRef} className="work-stack-inner">
        {children}
      </div>
    </div>
  );
}
