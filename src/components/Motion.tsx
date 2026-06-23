import { type CSSProperties, type ReactNode } from "react";
import { useReveal } from "../hooks";

type Props = {
  children: ReactNode;
  delay?: number;
  /** Play on page load (hero) instead of on scroll */
  enter?: boolean;
  className?: string;
};

export default function Motion({ children, delay = 0, enter = false, className = "" }: Props) {
  const { setRef, visible } = useReveal();
  const style = { "--motion-delay": `${delay}ms` } as CSSProperties;

  if (enter) {
    return (
      <div className={`motion-enter ${className}`.trim()} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={setRef}
      className={`motion ${visible ? "motion-on" : ""} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}

/** Stagger scroll-reveal children */
export function MotionGroup({
  children,
  className = "",
  stagger = 80,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <div className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <Motion key={i} delay={i * stagger}>
              {child}
            </Motion>
          ))
        : children}
    </div>
  );
}
