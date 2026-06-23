import Lenis from "lenis";

let lenis: Lenis | null = null;
let velTarget = 0;
let velBus = 0;
let velAbs = 0;
let velRaf = 0;

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

function tickVelocity() {
  velTarget *= 0.86;
  velBus += (velTarget - velBus) * 0.12;
  if (Math.abs(velBus) < 0.0008) velBus = 0;
  velAbs = Math.abs(velBus);

  document.documentElement.style.setProperty("--vel", velBus.toFixed(4));
  document.documentElement.style.setProperty("--velabs", velAbs.toFixed(4));

  velRaf = requestAnimationFrame(tickVelocity);
}

export function initLenis() {
  if (typeof window === "undefined" || lenis) return lenis;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;

  lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.15,
    autoRaf: true,
    prevent: (node) => !!(node as Element).closest?.("[data-lenis-prevent]"),
  });

  lenis.on("scroll", (instance) => {
    velTarget = Math.max(-1, Math.min(1, (instance.velocity ?? 0) / 38));
  });

  document.documentElement.classList.add("lenis", "lenis-smooth");
  cancelAnimationFrame(velRaf);
  velRaf = requestAnimationFrame(tickVelocity);

  return lenis;
}

export function destroyLenis() {
  cancelAnimationFrame(velRaf);
  velTarget = 0;
  velBus = 0;
  velAbs = 0;
  document.documentElement.style.setProperty("--vel", "0");
  document.documentElement.style.setProperty("--velabs", "0");
  lenis?.destroy();
  lenis = null;
  document.documentElement.classList.remove("lenis", "lenis-smooth");
}

export function getLenis() {
  return lenis;
}

export function getScrollY() {
  return lenis?.scroll ?? window.scrollY;
}

export function getVelBus() {
  return velBus;
}

export function subscribeScroll(onScroll: () => void) {
  const instance = lenis;
  if (instance) {
    instance.on("scroll", onScroll);
    return () => instance.off("scroll", onScroll);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}

export function scrollToY(y: number, immediate = false) {
  if (lenis) {
    lenis.scrollTo(y, {
      duration: immediate ? 0 : 1.35,
      easing: easeOutQuart,
      immediate,
    });
    return;
  }

  window.scrollTo({ top: y, behavior: immediate ? "instant" : "smooth" });
}

export function scrollToElement(el: HTMLElement, offset = -100) {
  if (lenis) {
    lenis.scrollTo(el, {
      offset,
      duration: 1.35,
      easing: easeOutQuart,
    });
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export function refreshLenis() {
  lenis?.resize();
}

export function mixPaperWithAccent(hex: string, amount = 0.045) {
  const dark = document.documentElement.dataset.theme === "dark";
  const paper = dark ? { r: 13, g: 13, b: 18 } : { r: 252, g: 251, b: 255 };
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const mix = (c: number, p: number) => Math.round(c * amount + p * (1 - amount));
  return `rgb(${mix(r, paper.r)}, ${mix(g, paper.g)}, ${mix(b, paper.b)})`;
}

export function getActiveAccent() {
  const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-accent]"));
  const line = window.innerHeight * 0.5;
  let best: HTMLElement | null = null;

  for (const section of sections) {
    const r = section.getBoundingClientRect();
    if (r.top <= line && r.bottom >= line) {
      best = section;
      break;
    }
    if (r.top < line) best = section;
  }

  let accent = best?.dataset.accent ?? "#2438FF";

  if (best?.id === "work") {
    for (const card of document.querySelectorAll<HTMLElement>("[data-work-row]")) {
      const r = card.getBoundingClientRect();
      if (r.top <= line && r.bottom >= line) {
        accent = card.dataset.accent ?? accent;
        break;
      }
    }
  }

  return accent;
}
