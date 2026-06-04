import { useEffect, useState } from "react";

const SECTIONS = ["work", "about", "contact"] as const;
const MOBILE_MQ = "(max-width: 767px)";

export function getNavScrollOffset() {
  if (window.matchMedia(MOBILE_MQ).matches) {
    return 52;
  }

  const header = document.querySelector<HTMLElement>(".nav-header");
  return (header?.getBoundingClientRect().height ?? 72) + 16;
}

export function scrollToSection(id: string) {
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", window.location.pathname);
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  const offset = getNavScrollOffset();
  const top = el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  history.replaceState(null, "", `#${id}`);
}

export function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const updateFromScroll = () => {
      const offset = getNavScrollOffset() + 24;
      const workEl = document.getElementById("work");

      if (workEl && workEl.getBoundingClientRect().top > offset) {
        setActive("home");
        return;
      }

      let current = "work";

      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;

        if (el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }

      setActive(current);
    };

    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);

    return () => {
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
    };
  }, []);

  return active;
}
