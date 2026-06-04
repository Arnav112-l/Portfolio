import { currentVenture } from "../data/profile";
import ProjectLinks from "./ProjectLinks";
import SectionHeader from "./SectionHeader";
import VentureGallery from "./VentureGallery";

export default function Venture() {
  return (
    <div className="mb-20">
      <SectionHeader
        eyebrow="Current venture"
        title={currentVenture.name}
        subtitle={currentVenture.tagline}
      />

      <article className="work-card">
        <p className="leading-relaxed text-foreground/90">{currentVenture.pitch}</p>

        <VentureGallery />

        <ProjectLinks links={currentVenture.links} className="mt-6" />

        <div className="mt-10 grid gap-8 border-t border-border pt-10 md:grid-cols-2">
          <div>
            <h4 className="mb-3 font-serif text-sm italic text-accent">
              {currentVenture.problem.title}
            </h4>
            <ul className="space-y-2">
              {currentVenture.problem.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-serif text-sm italic text-accent">
              {currentVenture.solution.title}
            </h4>
            <ul className="space-y-2">
              {currentVenture.solution.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 sm:mt-10 sm:pt-10">
          <p className="font-serif text-sm italic text-accent">Beta testing</p>
          <p className="mt-2 max-w-2xl font-serif text-sm italic leading-relaxed text-muted sm:text-base">
            {currentVenture.betaStatus}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {currentVenture.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
}
