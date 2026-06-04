import { type MouseEvent, useEffect, useState } from "react";
import { display } from "../resources/config";
import NavIcon, { type NavIconName } from "./NavIcon";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const preferred =
      stored ??
      (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(preferred);
    document.documentElement.dataset.theme = preferred;
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  };

  if (!display.themeSwitcher) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="nav-toggle-btn theme-toggle-btn"
    >
      {theme === "dark" ? (
        <svg className="h-4 w-4 theme-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg className="h-4 w-4 theme-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M21 14.5A8.5 8.5 0 1112.5 3a6.5 6.5 0 008.5 11.5z" />
        </svg>
      )}
    </button>
  );
}

type NavToggleProps = {
  href: string;
  label: string;
  icon: NavIconName;
  navId: string;
  selected: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

export function NavToggle({
  href,
  label,
  icon,
  navId,
  selected,
  onClick,
}: NavToggleProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={label}
      aria-current={selected ? "page" : undefined}
      data-nav-id={navId}
      className={`nav-toggle-btn ${selected ? "nav-toggle-btn-active" : ""}`}
      title={label}
    >
      <NavIcon name={icon} />
      <span className="hidden md:inline">{label}</span>
    </a>
  );
}
