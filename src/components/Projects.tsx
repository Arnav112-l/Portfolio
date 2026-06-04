import { otherProjects } from "../data/profile";
import ProjectLinks from "./ProjectLinks";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
}

export default function Projects() {
  const sorted = [...otherProjects].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <section className="mb-20">
      <SectionHeader
        eyebrow="Other builds"
        title="A few documented projects"
        subtitle="A mix of school projects, hackathon builds, and stuff I shipped for fun."
      />

      <ul className="flex flex-col gap-3">
        {sorted.map((project, index) => (
          <li key={project.name}>
            <Reveal delay={index * 50}>
              <article className="work-card group">
                <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-medium text-foreground transition group-hover:text-accent sm:text-lg">
                    {project.name}
                  </h3>
                  <p className="mt-1 font-serif text-sm italic text-accent">{project.tagline}</p>
                </div>
                <time className="shrink-0 text-xs text-subtle">
                  {formatDate(project.publishedAt)}
                </time>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border px-2 py-0.5 text-[11px] text-subtle"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <ProjectLinks links={project.links} className="mt-4" />
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
