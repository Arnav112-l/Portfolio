import { type CSSProperties, type ReactNode } from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function Reveal({ children, className = "", delay = 0 }: Props) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();

  const style: CSSProperties | undefined =
    delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}
