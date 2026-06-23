import { useEffect, useRef, useState } from "react";
import { contact as contactCopy, site } from "../content";
import Motion from "./Motion";

function burst(x: number, y: number) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#2438FF", "#7A2BF5", "#0CAF9B", "#FFAA00"];
  for (let i = 0; i < 8; i++) {
    const el = document.createElement("div");
    el.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:8px;height:8px;z-index:10005;pointer-events:none;background:${colors[i % 4]};transform:rotate(45deg);`;
    document.body.appendChild(el);
    const angle = (i / 8) * Math.PI * 2 + Math.random() * 0.5;
    const dist = 40 + Math.random() * 55;
    el.animate(
      {
        transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist - 22}px) rotate(200deg) scale(0.35)`,
        opacity: 0,
      },
      { duration: 600, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" },
    );
    window.setTimeout(() => el.remove(), 650);
  }
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const lastClickRef = useRef(0);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2400);
    return () => window.clearTimeout(id);
  }, [copied]);

  const onEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const now = Date.now();
    if (now - lastClickRef.current < 3200) {
      lastClickRef.current = 0;
      return;
    }
    e.preventDefault();
    lastClickRef.current = now;
    navigator.clipboard?.writeText(site.email).catch(() => {});
    setCopied(true);
    burst(e.clientX, e.clientY);
  };

  return (
    <div className="contact-end">
      <Motion delay={0}>
        <p className="contact-eyebrow">one more thing</p>
        <h2 className="contact-headline" data-vel-skew>
          Let&apos;s build something <em>worth shipping.</em>
        </h2>
      </Motion>

      <Motion delay={100}>
        <a
          href={`mailto:${site.email}`}
          className="contact-email"
          onClick={onEmailClick}
        >
          {copied ? "copied ✓" : site.email}
        </a>
        <p className="contact-hint">click once to copy · twice to open mail</p>
      </Motion>

      <Motion delay={180}>
        <ul className="contact-bullets">
          {contactCopy.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </Motion>

      <Motion delay={260}>
        <div className="contact-links">
          <a href={site.github} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          <a href={site.resume} download>
            Résumé ↗
          </a>
          {site.cal && (
            <a href={site.cal} target="_blank" rel="noopener noreferrer">
              Book a call ↗
            </a>
          )}
        </div>
      </Motion>
    </div>
  );
}
