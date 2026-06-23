import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { hackathons } from "../content";
import { getLenis } from "../scroll";
import Motion from "./Motion";

const CARD_WIDTH = 300;
const CARD_GAP = 16;
const AUTO_SPEED = 58;
const COPIES = 3;

const LOOP_ITEMS = Array.from({ length: COPIES }, (_, copy) =>
  hackathons.map((item, index) => ({ ...item, copy, index })),
).flat();

export default function Hackathons() {
  const railRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    down: false,
    startX: 0,
    startLeft: 0,
    moved: false,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  });
  const pauseRef = useRef(false);
  const pauseTimerRef = useRef(0);
  const visibleRef = useRef(false);
  const setWidthRef = useRef(0);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);
  const [activeKey, setActiveKey] = useState("1-0");

  const getCards = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return [];
    return Array.from(rail.querySelectorAll<HTMLElement>("[data-hack-card]"));
  }, []);

  const measureSetWidth = useCallback(() => {
    const cards = getCards();
    if (cards.length < hackathons.length * 2) return 0;
    const first = cards[0];
    const afterSet = cards[hackathons.length];
    return afterSet.offsetLeft - first.offsetLeft;
  }, [getCards]);

  const syncActive = useCallback(() => {
    const rail = railRef.current;
    const cards = getCards();
    if (!rail || !cards.length) return;

    const railCenter = rail.scrollLeft + rail.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;

    cards.forEach((card, i) => {
      const center = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(center - railCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    const logical = cards[closest]?.dataset.hackKey;
    if (logical) setActiveKey(logical);
  }, [getCards]);

  const wrapScroll = useCallback(() => {
    const rail = railRef.current;
    const setWidth = setWidthRef.current;
    if (!rail || setWidth <= 0) return;

    if (rail.scrollLeft >= setWidth * 2) {
      rail.scrollLeft -= setWidth;
    } else if (rail.scrollLeft < setWidth * 0.15) {
      rail.scrollLeft += setWidth;
    }
  }, []);

  const snapToClosest = useCallback(() => {
    const rail = railRef.current;
    const cards = getCards();
    if (!rail || !cards.length) return;

    const railCenter = rail.scrollLeft + rail.clientWidth / 2;
    let closest = cards[0];
    let minDist = Infinity;

    cards.forEach((card) => {
      const center = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(center - railCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = card;
      }
    });

    const target = closest.offsetLeft - (rail.clientWidth - closest.offsetWidth) / 2;
    rail.scrollTo({ left: target, behavior: "smooth" });
    syncActive();
  }, [getCards, syncActive]);

  const pauseAuto = useCallback((ms?: number) => {
    pauseRef.current = true;
    window.clearTimeout(pauseTimerRef.current);
    if (ms) {
      pauseTimerRef.current = window.setTimeout(() => {
        pauseRef.current = false;
      }, ms);
    }
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const init = () => {
      setWidthRef.current = measureSetWidth();
      if (setWidthRef.current > 0) {
        rail.scrollLeft = setWidthRef.current;
      }
      syncActive();
    };

    init();
    const fontReady = document.fonts?.ready?.then(init);
    window.addEventListener("resize", init);

    const onScroll = () => {
      wrapScroll();
      syncActive();
    };
    rail.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      void fontReady;
      window.removeEventListener("resize", init);
      rail.removeEventListener("scroll", onScroll);
    };
  }, [measureSetWidth, syncActive, wrapScroll]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const loop = (time: number) => {
      const dt = lastTimeRef.current ? Math.min(0.05, (time - lastTimeRef.current) / 1000) : 0.016;
      lastTimeRef.current = time;

      if (
        visibleRef.current &&
        !pauseRef.current &&
        !dragRef.current.down &&
        !document.hidden &&
        setWidthRef.current > 0
      ) {
        rail.scrollLeft += AUTO_SPEED * dt;
        wrapScroll();
        syncActive();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafRef.current);
  }, [syncActive, wrapScroll]);

  useEffect(() => {
    const wrap = railRef.current?.closest(".hack-carousel-wrap");
    if (!wrap) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05, rootMargin: "80px" },
    );
    obs.observe(wrap);

    const onVisibility = () => {
      if (document.hidden) pauseRef.current = true;
      else pauseRef.current = false;
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      obs.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let momentumId = 0;
    let wheelTimer = 0;

    const stopMomentum = () => {
      if (momentumId) {
        cancelAnimationFrame(momentumId);
        momentumId = 0;
      }
    };

    const runMomentum = (velocity: number) => {
      stopMomentum();
      let v = velocity;

      const step = () => {
        if (Math.abs(v) < 0.35) {
          snapToClosest();
          pauseAuto(2500);
          return;
        }
        rail.scrollLeft -= v;
        wrapScroll();
        v *= 0.92;
        syncActive();
        momentumId = requestAnimationFrame(step);
      };

      momentumId = requestAnimationFrame(step);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      stopMomentum();
      pauseRef.current = true;
      dragRef.current = {
        down: true,
        startX: e.clientX,
        startLeft: rail.scrollLeft,
        moved: false,
        lastX: e.clientX,
        lastTime: performance.now(),
        velocity: 0,
      };
      rail.setPointerCapture(e.pointerId);
      rail.classList.add("is-dragging");
      getLenis()?.stop();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragRef.current.down) return;
      const now = performance.now();
      const dx = e.clientX - dragRef.current.startX;
      if (Math.abs(dx) > 4) dragRef.current.moved = true;

      const dt = Math.max(now - dragRef.current.lastTime, 1);
      dragRef.current.velocity = (e.clientX - dragRef.current.lastX) / dt;
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastTime = now;

      rail.scrollLeft = dragRef.current.startLeft - dx;
      wrapScroll();
      syncActive();
    };

    const endDrag = (e: PointerEvent) => {
      if (!dragRef.current.down) return;
      dragRef.current.down = false;
      rail.classList.remove("is-dragging");
      rail.releasePointerCapture(e.pointerId);
      getLenis()?.start();

      if (dragRef.current.moved) {
        runMomentum(dragRef.current.velocity * 14);
      } else {
        snapToClosest();
        pauseAuto(2500);
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      e.stopPropagation();
      stopMomentum();
      pauseRef.current = true;
      rail.scrollLeft += e.deltaY;
      wrapScroll();
      syncActive();
      window.clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(() => {
        snapToClosest();
        pauseAuto(2500);
      }, 140);
    };

    const onKey = (e: KeyboardEvent) => {
      if (document.activeElement instanceof HTMLInputElement) return;
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      pauseAuto(4000);
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const step = CARD_WIDTH + CARD_GAP;
      rail.scrollBy({ left: dir * step, behavior: "smooth" });
    };

    const onEnter = () => getLenis()?.stop();
    const onLeave = () => {
      if (!dragRef.current.down) getLenis()?.start();
    };

    rail.addEventListener("pointerdown", onPointerDown);
    rail.addEventListener("pointermove", onPointerMove);
    rail.addEventListener("pointerup", endDrag);
    rail.addEventListener("pointercancel", endDrag);
    rail.addEventListener("wheel", onWheel, { passive: false, capture: true });
    rail.addEventListener("mouseenter", onEnter);
    rail.addEventListener("mouseleave", onLeave);
    window.addEventListener("keydown", onKey);

    return () => {
      stopMomentum();
      window.clearTimeout(wheelTimer);
      rail.removeEventListener("pointerdown", onPointerDown);
      rail.removeEventListener("pointermove", onPointerMove);
      rail.removeEventListener("pointerup", endDrag);
      rail.removeEventListener("pointercancel", endDrag);
      rail.removeEventListener("wheel", onWheel, { capture: true });
      rail.removeEventListener("mouseenter", onEnter);
      rail.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("keydown", onKey);
      getLenis()?.start();
    };
  }, [pauseAuto, snapToClosest, syncActive, wrapScroll]);

  const edgePad = `calc(50% - ${CARD_WIDTH / 2}px)`;

  return (
    <div className="hack-carousel-wrap">
      <Motion delay={0}>
        <p className="hack-carousel-hint" data-scramble>
          auto · drag · or use ← →
        </p>
      </Motion>

      <div
        ref={railRef}
        className="hack-carousel is-auto"
        data-lenis-prevent
        data-show-rail
        style={{ "--hack-edge": edgePad } as CSSProperties}
        role="region"
        aria-label="Hackathon highlights"
        tabIndex={0}
      >
        <div className="hack-carousel-edge" aria-hidden />
        {LOOP_ITEMS.map((h) => {
          const key = `${h.copy}-${h.index}`;
          return (
          <article
            key={`${h.copy}-${h.name}`}
            className={`hack-card-slide ${key === activeKey ? "is-active" : ""}`}
            data-hack-card
            data-hack-key={key}
            data-hack-index={h.index}
          >
            <span className="hack-symbol">{h.symbol}</span>
            <p className="hack-name">{h.name}</p>
            <p className="hack-org">{h.org}</p>
          </article>
          );
        })}
        <div className="hack-carousel-edge" aria-hidden />
      </div>
    </div>
  );
}
