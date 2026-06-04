import { currentVenture, home } from "../data/profile";
import SocialLinks from "./SocialLinks";

export default function Hero() {
  return (
    <section className="animate-fade-up mb-12 sm:mb-16">
      <div className="mb-4 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-border bg-surface-raised/60 px-3 py-1.5 text-[11px] text-muted sm:mb-5 sm:px-4 sm:text-xs">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent animate-pulse" />
        Building {currentVenture.name} · {currentVenture.status}
      </div>

      <h1 className="animate-fade-up-delay-1 font-serif text-[2.5rem] leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        <span className="italic text-accent">Arnav</span>{" "}
        <span className="gradient-text">Singh</span>
      </h1>

      <p className="animate-fade-up-delay-2 mt-4 max-w-xl font-serif text-lg italic leading-relaxed text-muted sm:mt-5 sm:text-xl md:text-2xl">
        {home.headline}
      </p>

      <p className="animate-fade-up-delay-3 mt-3 max-w-xl text-sm leading-relaxed text-subtle sm:text-base">
        {home.subline}
      </p>

      <SocialLinks className="animate-fade-up-delay-3 mt-5 sm:mt-6" />

      {home.featured.display && (
        <a
          href={home.featured.href}
          target="_blank"
          rel="noopener noreferrer"
          className="animate-fade-up-delay-3 hover-soft mt-5 inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs text-accent hover:border-accent/50 hover:bg-accent/15 sm:mt-6"
        >
          {home.featured.title}
          <span>→</span>
        </a>
      )}

      <div className="animate-fade-up-delay-3 mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
        <a
          href="#work"
          className="hover-soft inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-muted sm:w-auto"
        >
          View work
        </a>
        <a
          href="#about"
          className="hover-soft inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground hover:border-accent/40 hover:bg-surface-raised sm:w-auto"
        >
          About me
        </a>
      </div>
    </section>
  );
}
