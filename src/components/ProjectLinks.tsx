import type { ProjectLink } from "../data/profile";

type Props = {
  links: ProjectLink;
  className?: string;
};

export default function ProjectLinks({ links, className = "" }: Props) {
  const items = [
    { label: "GitHub", href: links.github },
    { label: "Live demo", href: links.demo },
    { label: "Video", href: links.video },
  ].filter((item) => item.href);

  if (!items.length) return null;

  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link-arrow"
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}
