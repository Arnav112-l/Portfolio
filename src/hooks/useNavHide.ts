import { useEffect, useRef } from "react";
import { subscribeScroll } from "../scroll";

export function useNavHide() {
  const lastY = useRef(0);

  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(".nav-pill");
    if (!nav) return;

    nav.style.transition = "transform 0.5s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.35s ease";

    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      if (y > 500 && y > lastY.current) {
        nav.style.transform = "translateX(-50%) translateY(-160%)";
        nav.style.opacity = "0";
      } else {
        nav.style.transform = "translateX(-50%) translateY(0)";
        nav.style.opacity = "1";
      }
      lastY.current = y;
    };

    onScroll();
    return subscribeScroll(onScroll);
  }, []);
}

export function usePartyMode() {
  useEffect(() => {
    let lastK = 0;

    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key.toLowerCase() !== "k" || e.metaKey || e.ctrlKey || e.altKey) return;
      const now = Date.now();
      if (now - lastK < 450) {
        partyBurst();
        lastK = 0;
        return;
      }
      lastK = now;
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}

function partyBurst() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#2438FF", "#7A2BF5", "#0CAF9B", "#FFAA00", "#FF4D5E"];
  for (let i = 0; i < 36; i++) {
    const el = document.createElement("div");
    const x = window.innerWidth * 0.5 + (Math.random() - 0.5) * 200;
    const y = window.innerHeight * 0.35;
    el.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:${6 + Math.random() * 6}px;height:${6 + Math.random() * 6}px;z-index:10006;pointer-events:none;background:${colors[i % colors.length]};border-radius:${Math.random() > 0.5 ? "50%" : "2px"};`;
    document.body.appendChild(el);
    const angle = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 220;
    el.animate(
      {
        transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist + 80}px) rotate(${Math.random() * 360}deg)`,
        opacity: 0,
      },
      { duration: 800 + Math.random() * 400, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" },
    );
    window.setTimeout(() => el.remove(), 1300);
  }
}

export function useWelcomeBack() {
  useEffect(() => {
    try {
      const key = "portfolio_visit";
      const prev = localStorage.getItem(key);
      localStorage.setItem(key, String(Date.now()));
      if (!prev) return;

      const banner = document.querySelector(".availability-banner");
      if (banner && Date.now() - parseInt(prev, 10) > 86400000) {
        const el = document.createElement("span");
        el.className = "welcome-back";
        el.textContent = "welcome back · ";
        banner.prepend(el);
      }
    } catch {
      /* ignore */
    }
  }, []);
}
