import { useEffect, type CSSProperties } from "react";
import { about, roles, site } from "../content";
import GitHubSparkline from "./GitHubSparkline";
import Motion from "./Motion";

const TILE_ACCENTS: Record<string, string> = {
  profile: "#2438FF",
  cta: "#B233FF",
  building: "#2438FF",
  education: "#0CAF9B",
  experience: "#FFAA00",
  github: "#FF5E00",
  skills: "#7A2BF5",
  awards: "#B233FF",
  leadership: "#0CAF9B",
};

export default function About() {
  const bioParts = about.bio.split(about.bioEmphasis);

  useEffect(() => {
    const root = document.querySelector("[data-bento]");
    if (!root) return;

    const onMove = (e: Event) => {
      if (!(e instanceof MouseEvent)) return;
      const tile = (e.target as Element).closest<HTMLElement>("[data-tile]");
      if (!tile) return;
      const rect = tile.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      tile.style.setProperty("--bleed-x", `${x}%`);
      tile.style.setProperty("--bleed-y", `${y}%`);
    };

    root.addEventListener("mousemove", onMove, { passive: true });
    return () => root.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="bento" data-bento>
      <div className="bento-head">
        <div>
          <p className="bento-head-eyebrow" data-scramble>
            [ {about.title} ]
          </p>
          <p className="bento-head-title">{about.headline}</p>
        </div>
        <p className="bento-head-status">
          <span className="bento-live-dot" />
          {about.availability}
        </p>
      </div>

      <div className="bento-grid bento-grid-recruiter">
        <Motion delay={0} className="bento-tile-profile">
          <article className="bento-tile" data-tile style={{ "--tile-accent": TILE_ACCENTS.profile } as CSSProperties}>
            <span className="bento-label">who i am</span>
            <p className="bento-who-text">
              {bioParts[0]}
              <em>{about.bioEmphasis}</em>
              {bioParts[1]}
            </p>
            <ul className="bento-chips">
              {about.chips.map((chip) => (
                <li key={chip}>{chip}</li>
              ))}
            </ul>
          </article>
        </Motion>

        <Motion delay={80} className="bento-tile-cta">
          <article
            className="bento-tile bento-tile-actions"
            data-tile
            style={{ "--tile-accent": TILE_ACCENTS.cta } as CSSProperties}
          >
            <span className="bento-label">quick links</span>
            <div className="bento-link-stack">
              {about.quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="bento-action-link"
                  data-magnetic
                  {...(link.download ? { download: true } : {})}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </article>
        </Motion>

        <Motion delay={160} className="bento-tile-building">
          <article className="bento-tile" data-tile style={{ "--tile-accent": TILE_ACCENTS.building } as CSSProperties}>
            <span className="bento-label bento-label-live">
              <span className="bento-live-dot" />
              flagship product
            </span>
            <p className="bento-value-lg">{about.building.name}</p>
            <p className="bento-sub">{about.building.detail}</p>
            <p className="bento-pitch">{about.building.pitch}</p>
            <ul className="bento-stack">
              {about.building.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a href={about.building.github} className="bento-inline-link" target="_blank" rel="noopener noreferrer">
              View repo ↗
            </a>
          </article>
        </Motion>

        <Motion delay={240} className="bento-tile-education">
          <article className="bento-tile" data-tile style={{ "--tile-accent": TILE_ACCENTS.education } as CSSProperties}>
            <span className="bento-label">education</span>
            <p className="bento-value-lg">{about.education.school}</p>
            <p className="bento-sub">{about.education.degree}</p>
            <p className="bento-edu-period">{about.education.period}</p>
          </article>
        </Motion>

        <Motion delay={320} className="bento-tile-experience">
          <article className="bento-tile" data-tile style={{ "--tile-accent": TILE_ACCENTS.experience } as CSSProperties}>
            <span className="bento-label">experience</span>
            <ul className="bento-exp-list">
              {roles.map((role) => (
                <li key={role.org}>
                  <span className="bento-exp-title">{role.title}</span>
                  <span className="bento-exp-org">{role.org}</span>
                  <span className="bento-exp-meta">{role.period}</span>
                </li>
              ))}
            </ul>
          </article>
        </Motion>

        <Motion delay={400} className="bento-tile-github">
          <article className="bento-tile" data-tile style={{ "--tile-accent": TILE_ACCENTS.github } as CSSProperties}>
            <span className="bento-label">
              github · <a href={site.github}>{about.proof.githubHandle}</a>
            </span>
            <GitHubSparkline handle={about.proof.githubHandle} fallbackRepos={about.proof.repos} />
          </article>
        </Motion>

        <Motion delay={480} className="bento-tile-skills">
          <article className="bento-tile" data-tile style={{ "--tile-accent": TILE_ACCENTS.skills } as CSSProperties}>
            <span className="bento-label">core stack</span>
            <ul className="bento-stack bento-stack-wrap">
              {about.coreStack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </Motion>

        <Motion delay={560} className="bento-tile-awards">
          <article
            className="bento-tile bento-tile-featured"
            data-tile
            data-glow
            style={{ "--tile-accent": TILE_ACCENTS.awards } as CSSProperties}
          >
            <span className="bento-label">recognition</span>
            <ul className="bento-award-list">
              {about.achievements.map((item) => (
                <li key={item.name} className={item.featured ? "is-featured" : ""}>
                  <span className="bento-award-name">{item.name}</span>
                  <span className="bento-award-detail">{item.detail}</span>
                </li>
              ))}
            </ul>
          </article>
        </Motion>

        <Motion delay={640} className="bento-tile-leadership">
          <article className="bento-tile" data-tile style={{ "--tile-accent": TILE_ACCENTS.leadership } as CSSProperties}>
            <span className="bento-label">beyond code</span>
            <ul className="bento-lead-list">
              {about.leadership.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </Motion>
      </div>
    </div>
  );
}
