import { useEffect, useState } from "react";
import { nav, site } from "../content";
import { scrollTo, useActiveSection, useClock } from "../hooks";
import { usePhase } from "../hooks/usePhase";

type Props = {
  onOpenPalette: () => void;
};

export default function Nav({ onOpenPalette }: Props) {
  const active = useActiveSection();
  const time = useClock(site.timezone);
  const { phaseLabel, cycle, icon } = usePhase();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav
      className={`nav-pill ${mounted ? "nav-pill-in" : ""}`}
      aria-label="Main"
    >
      <a
        href="#home"
        className="nav-logo"
        data-magnetic
        onClick={(e) => {
          e.preventDefault();
          scrollTo("home");
        }}
      >
        {site.initials}
      </a>

      <span className="nav-clock">
        {site.location} — {time || "—:—:—"}
      </span>

      <div className="nav-links">
        {nav.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={active === item.id ? "nav-link active" : "nav-link"}
            onClick={(e) => {
              e.preventDefault();
              scrollTo(item.id);
            }}
          >
            {item.label}
          </a>
        ))}
      </div>

      <button
        type="button"
        className="nav-icon-btn nav-phase"
        onClick={cycle}
        aria-label={`Theme: ${phaseLabel} (click to toggle)`}
        title={`${phaseLabel} mode`}
      >
        <span className="nav-phase-icon">{icon}</span>
      </button>

      <button type="button" className="nav-icon-btn nav-cmd" onClick={onOpenPalette} aria-label="Command palette">
        ⌘K
      </button>

      <a
        href="#contact"
        className="nav-cta"
        data-magnetic
        onClick={(e) => {
          e.preventDefault();
          scrollTo("contact");
        }}
      >
        Say hello
      </a>
    </nav>
  );
}
