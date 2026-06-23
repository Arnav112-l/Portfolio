import { useCallback, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

const THEMES: Record<ThemeMode, { label: string; icon: string; bg: string }> = {
  light: { label: "light", icon: "☀️", bg: "#FCFBFF" },
  dark: { label: "dark", icon: "🌙", bg: "#0d0d12" },
};

function loadMode(): ThemeMode {
  try {
    const raw = localStorage.getItem("theme");
    if (raw === "light" || raw === "dark") return raw;
  } catch {
    /* ignore */
  }
  if (typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

function applyTheme(mode: ThemeMode) {
  const theme = THEMES[mode];
  const root = document.documentElement;
  root.dataset.theme = mode;
  root.style.setProperty("--color-bg", theme.bg);
  root.style.backgroundColor = theme.bg;

  const surface = document.getElementById("site-surface");
  if (surface) surface.style.backgroundColor = theme.bg;
}

export function usePhase() {
  const [mode, setMode] = useState<ThemeMode>("light");

  const cycle = useCallback(() => {
    setMode((prev) => {
      const next: ThemeMode = prev === "light" ? "dark" : "light";
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* ignore */
      }
      applyTheme(next);
      return next;
    });
  }, []);

  useEffect(() => {
    const initial = loadMode();
    setMode(initial);
    applyTheme(initial);

    const onCycle = () => cycle();
    window.addEventListener("cycle-phase", onCycle);
    return () => window.removeEventListener("cycle-phase", onCycle);
  }, [cycle]);

  return {
    mode,
    phaseLabel: THEMES[mode].label,
    cycle,
    icon: THEMES[mode].icon,
  };
}

export function cyclePhaseGlobal() {
  window.dispatchEvent(new CustomEvent("cycle-phase"));
}
