import { profile } from "../data/profile";
import SectionHeader from "./SectionHeader";
import SocialLinks from "./SocialLinks";

const linkItems = [
  { label: "Email", href: `mailto:${profile.email}`, value: profile.email },
  { label: "Phone", href: `tel:${profile.phone.replace(/\s/g, "")}`, value: profile.phone },
  { label: "GitHub", href: profile.links.github, value: `@${profile.githubUsername}` },
  { label: "LinkedIn", href: profile.links.linkedin, value: "LinkedIn" },
  { label: "Twitter", href: profile.links.twitter, value: "@Arnav_Singh_1" },
].filter((item) => item.href && item.href !== "#");

export default function Contact() {
  return (
    <section className="mb-8">
      <SectionHeader
        eyebrow="Contact"
        title="Get in touch"
        subtitle="Open to co-founder intros, StayID pilots, internships, and collaborations."
      />

      <SocialLinks className="mb-8" />

      <ul className="divide-y divide-border rounded-xl border border-border">
        {linkItems.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target={item.label === "Email" || item.label === "Phone" ? undefined : "_blank"}
              rel={
                item.label === "Email" || item.label === "Phone"
                  ? undefined
                  : "noopener noreferrer"
              }
              className="group flex min-h-[3.25rem] items-center justify-between gap-3 px-4 py-3 transition-colors duration-200 hover:bg-surface-raised/50 sm:px-5 sm:py-4"
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-wider text-subtle">{item.label}</p>
                <p className="mt-0.5 break-all text-sm text-foreground group-hover:text-accent sm:break-normal">
                  {item.value}
                </p>
              </div>
              <span className="text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-6">
        {profile.calLink && (
          <a
            href={profile.calLink}
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow"
          >
            Book a 15-min call
          </a>
        )}
        <a href={profile.resumeUrl} download="Arnav-Singh-Resume.pdf" className="link-arrow">
          Download resume
        </a>
      </div>
    </section>
  );
}
