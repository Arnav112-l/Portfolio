import { useEffect, useState } from "react";
import {
  destroyLenis,
  initLenis,
  refreshLenis,
  scrollToElement,
  scrollToY,
  subscribeScroll,
} from "./scroll";

const SECTIONS = ["work", "about", "build", "contact"] as const;

export function useClock(tz: string) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: tz,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tz]);

  return time;
}

export function useActiveSection() {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => {
      const offset = 120;
      const work = document.getElementById("work");
      if (work && work.getBoundingClientRect().top > offset) {
        setActive("home");
        return;
      }
      let current = "work";
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      setActive(current);
    };
    onScroll();
    return subscribeScroll(onScroll);
  }, []);

  return active;
}

export function scrollTo(id: string) {
  if (id === "home") {
    scrollToY(0);
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  scrollToElement(el, -100);
}

export function useSmoothScroll() {
  useEffect(() => {
    initLenis();
    const refreshTimer = window.setTimeout(() => refreshLenis(), 2600);

    return () => {
      clearTimeout(refreshTimer);
      destroyLenis();
    };
  }, []);
}
export function useReveal() {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref]);

  return { setRef, visible };
}

export function useMagnetic(strength = 0.22) {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const bind = (el: Element) => {
      const node = el as HTMLElement;
      const onMove = (e: MouseEvent) => {
        const rect = node.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * strength;
        const y = (e.clientY - rect.top - rect.height / 2) * strength;
        node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      };
      const onLeave = () => {
        node.style.transform = "";
      };
      node.addEventListener("mousemove", onMove);
      node.addEventListener("mouseleave", onLeave);
      return () => {
        node.removeEventListener("mousemove", onMove);
        node.removeEventListener("mouseleave", onLeave);
      };
    };

    const cleanups: (() => void)[] = [];
    const attach = () => {
      cleanups.forEach((fn) => fn());
      cleanups.length = 0;
      document.querySelectorAll("[data-magnetic]").forEach((el) => {
        cleanups.push(bind(el));
      });
    };

    attach();
    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      obs.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, [strength]);
}

export function useSoundToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(localStorage.getItem("sound") === "on");
  }, []);

  const toggle = () => {
    setOn((prev) => {
      const next = !prev;
      localStorage.setItem("sound", next ? "on" : "off");
      return next;
    });
  };

  const click = () => {
    if (!on) return;
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      /* ignore */
    }
  };

  return { on, toggle, click };
}
