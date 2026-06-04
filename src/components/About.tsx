import {
  achievements,
  education,
  experience,
  founderStory,
  productImpact,
  skills,
} from "../data/profile";
import SectionHeader from "./SectionHeader";

export default function About() {
  const skillGroups = [
    { label: "Languages", items: skills.languages },
    { label: "Backend", items: skills.backend },
    { label: "AI / ML", items: skills.ai },
    { label: "Frontend", items: skills.frontend },
    { label: "Cloud", items: skills.cloud },
  ];

  return (
    <section className="mb-20">
      <SectionHeader
        eyebrow="About"
        title="Who is Arnav Singh?"
        subtitle="Builder · BITS Pilani · Shipping products end to end."
      />

      <div className="space-y-5">
        {founderStory.paragraphs.map((paragraph, index) => (
          <p
            key={paragraph.slice(0, 40)}
            className={`leading-relaxed ${
              index === 0
                ? "font-serif text-lg italic text-foreground/90"
                : "text-muted"
            }`}
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-10 work-card">
        <h3 className="font-serif text-sm italic text-accent">Education</h3>
        <p className="mt-2 font-medium text-foreground">{education.degree}</p>
        <p className="text-sm text-muted">{education.school}</p>
        <p className="mt-1 text-xs text-subtle">
          {education.period} · {education.note}
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="work-card">
          <h3 className="font-serif text-sm italic text-accent">Strengths</h3>
          <ul className="mt-4 space-y-3">
            {founderStory.strengths.map((strength) => (
              <li key={strength} className="text-sm text-muted">
                — {strength}
              </li>
            ))}
          </ul>
        </div>

        <div className="work-card">
          <h3 className="font-serif text-sm italic text-accent">Experience</h3>
          <ul className="mt-4 space-y-5">
            {experience.map((item) => (
              <li key={item.org}>
                <p className="text-sm font-medium text-foreground">{item.role}</p>
                <p className="text-xs text-subtle">{item.org}</p>
                <ul className="mt-2 space-y-1">
                  {item.points.map((point) => (
                    <li key={point} className="text-xs leading-relaxed text-muted">
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="mb-4 font-serif text-sm italic text-accent">Technical skills</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.label} className="rounded-lg border border-border p-4">
              <p className="font-serif text-xs italic text-accent">{group.label}</p>
              <p className="mt-2 text-sm text-muted">{group.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 font-serif text-sm italic text-accent">Product impact</h3>
          <ul className="space-y-2">
            {productImpact.map((item) => (
              <li key={item} className="text-sm text-muted">
                — {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-serif text-sm italic text-accent">Hackathons</h3>
          <ul className="space-y-3">
            {achievements.map((item) => (
              <li key={item.name} className="rounded-lg border border-border p-4">
                <div className="flex justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <span className="text-xs text-subtle">{item.year}</span>
                </div>
                <p className="text-xs text-subtle">{item.org}</p>
                <p className="mt-2 text-xs text-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
