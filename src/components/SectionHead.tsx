import type { CSSProperties } from "react";
import Motion from "./Motion";

type Props = {
  label: string;
  title: string;
  subtitle?: string;
  accent?: string;
};

export default function SectionHead({ label, title, subtitle, accent = "#2438FF" }: Props) {
  return (
    <header className="mb-16 md:mb-24 w-full">
      <Motion delay={0}>
        <p className="section-eyebrow" data-scramble style={{ "--section-accent": accent } as CSSProperties}>
          <span className="section-marker" style={{ background: accent }} aria-hidden="true" />
          [ {label} ]
        </p>
      </Motion>
      <Motion delay={80}>
        <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-gray-900 leading-[1.1] mb-6" data-vel-skew>
          {title}
        </h2>
      </Motion>
      {subtitle && (
        <Motion delay={160}>
          <p className="font-serif italic text-xl md:text-2xl text-gray-900/70">{subtitle}</p>
        </Motion>
      )}
    </header>
  );
}
