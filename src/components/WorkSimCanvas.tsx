import { useEffect, useRef } from "react";

export type SimKind = "recall" | "triage" | "watershed";

type Particle = {
  hx?: number;
  hy?: number;
  tx?: number;
  ty?: number;
  a: number;
  b: number;
  f1: number;
  f2: number;
  amp: number;
  x?: number;
  y0?: number;
  ln?: number;
  v?: number;
  sd?: number;
};

type SimState = {
  kind: SimKind;
  cv: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  t: number;
  sp: number;
  tg: number;
  dt: number;
  vis: boolean;
  lt: number;
  acc: string;
  P: Particle[] | null;
};

function smoothstep(t: number) {
  const c = t < 0 ? 0 : t > 1 ? 1 : t;
  return c * c * (3 - 2 * c);
}

function drawSim(s: SimState, autoDrift: boolean) {
  const { ctx, cv: { width: w, height: h }, t, acc } = s;
  ctx.clearRect(0, 0, w, h);
  const drift = autoDrift ? (t * 34) % (w + 80) : 0;

  if (s.kind === "recall") {
    if (!s.P) {
      s.P = [];
      const cols = 8;
      const rows = 5;
      const gw = w * 0.64;
      const gh = h * 0.5;
      const ox = (w - gw) / 2;
      const oy = (h - gh) / 2;
      for (let i = 0; i < 40; i++) {
        const c = i % cols;
        const r = (i / cols) | 0;
        s.P.push({
          hx: ox + c * (gw / (cols - 1)),
          hy: oy + r * (gh / (rows - 1)),
          a: Math.random() * 6.28,
          b: Math.random() * 6.28,
          f1: 0.25 + Math.random() * 0.3,
          f2: 0.2 + Math.random() * 0.3,
          amp: 0.16 + Math.random() * 0.2,
        });
      }
    }
    const ph = t % 10;
    let A = 0;
    if (ph > 6 && ph < 7) A = ph - 6;
    else if (ph >= 7 && ph < 9.2) A = 1;
    else if (ph >= 9.2) A = 1 - (ph - 9.2) / 0.8;
    A = A < 0 ? 0 : A > 1 ? 1 : A;
    const E = smoothstep(A);

    s.P.forEach((p, i) => {
      const dx = Math.sin(p.a + t * p.f1) * w * p.amp;
      const dy = Math.cos(p.b + t * p.f2) * h * p.amp;
      let x = (p.hx ?? 0) + dx * (1 - E) + drift;
      while (x > w + 24) x -= w + 48;
      while (x < -24) x += w + 48;
      const y = (p.hy ?? 0) + dy * (1 - E);
      ctx.globalAlpha = 0.5 + 0.4 * E;
      ctx.fillStyle = i % 7 === 0 ? "rgba(13,13,18,.6)" : acc;
      ctx.fillRect(x - 4.5, y - 3, 9, 6);
    });
    ctx.globalAlpha = 1;
    return;
  }

  if (s.kind === "triage") {
    if (!s.P) {
      s.P = [];
      for (let i = 0; i < 64; i++) {
        s.P.push({
          x: Math.random() * w,
          y0: 0.15 + Math.random() * 0.7,
          ln: i % 5,
          v: 0.55 + Math.random() * 0.5,
          sd: Math.random() * 6.28,
          a: 0,
          b: 0,
          f1: 0,
          f2: 0,
          amp: 0,
        });
      }
    }
    const gate = w * 0.52;
    ctx.strokeStyle = "rgba(13,13,18,.18)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(gate, h * 0.1);
    ctx.lineTo(gate, h * 0.9);
    ctx.stroke();

    s.P.forEach((p) => {
      p.x! += p.v! * (w / 8) * s.dt * (autoDrift ? 4.2 : 3);
      if (p.x! > w + 8) {
        p.x = -8;
        p.y0 = 0.15 + Math.random() * 0.7;
      }
      let y: number;
      if (p.x! < gate) {
        y = h * p.y0! + Math.sin(p.sd! + t * 2.2 + p.x! * 0.04) * h * 0.13;
      } else {
        const f = Math.min(1, (p.x! - gate) / (w * 0.2));
        const laneY = h * (0.2 + p.ln! * 0.15);
        const yn = h * p.y0! + Math.sin(p.sd! + t * 2.2 + gate * 0.04) * h * 0.13;
        y = yn + (laneY - yn) * smoothstep(f);
      }
      ctx.globalAlpha = p.x! < gate ? 0.55 : 0.9;
      ctx.fillStyle = p.x! < gate ? "rgba(13,13,18,.5)" : acc;
      ctx.beginPath();
      ctx.arc(p.x!, y, 2.1, 0, 6.3);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    return;
  }

  const total = h * 0.56;
  const top0 = (h - total) / 2;
  const N = 28;
  let w1 = 0.33 + 0.17 * Math.sin(t * 0.5);
  let w2 = 0.33 + 0.17 * Math.sin(t * 0.37 + 2.1);
  let w3 = 1 - w1 - w2;
  if (w3 < 0.12) {
    const d = 0.12 - w3;
    w3 = 0.12;
    w1 -= d / 2;
    w2 -= d / 2;
  }
  const fr = [w1, w2, w3];
  const alph = [0.6, 0.42, 0.3];
  const shift = autoDrift ? drift : 0;
  ctx.save();
  ctx.translate(shift, 0);
  let yTop = top0;
  for (let b = 0; b < 3; b++) {
    const bh = total * fr[b];
    ctx.fillStyle = acc;
    ctx.globalAlpha = alph[b];
    ctx.beginPath();
    for (let i = 0; i <= N; i++) {
      const x = (i / N) * w;
      const yy = yTop + Math.sin(x * 0.025 + t * 1.1 + b * 1.7) * 3;
      if (i === 0) ctx.moveTo(x, yy);
      else ctx.lineTo(x, yy);
    }
    for (let i = N; i >= 0; i--) {
      const x = (i / N) * w;
      const yy = yTop + bh + Math.sin(x * 0.025 + t * 1.1 + (b + 1) * 1.7) * 3;
      ctx.lineTo(x, yy);
    }
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = alph[b] * 0.5;
    ctx.fillStyle = "#FBFAF7";
    const off = (t * 24 * (b + 1)) % (w / 3);
    for (let k = 0; k < 3; k++) {
      const sx = (k * (w / 3) + off) % w;
      ctx.fillRect(sx, yTop + bh * 0.45, 26, 1.5);
    }
    yTop += bh;
  }
  ctx.restore();
  ctx.globalAlpha = 1;
}

type Props = {
  kind: SimKind;
  accent: string;
  className?: string;
  autoDrift?: boolean;
};

export default function WorkSimCanvas({ kind, accent, className = "", autoDrift = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simRef = useRef<SimState | null>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const sim: SimState = {
      kind,
      cv,
      ctx,
      t: Math.random() * 5,
      sp: 1,
      tg: 1,
      dt: 0.016,
      vis: false,
      lt: 0,
      acc: accent,
      P: null,
    };
    simRef.current = sim;

    const size = () => {
      const r = cv.getBoundingClientRect();
      const w = Math.max(60, Math.min(560, r.width | 0));
      const h = Math.max(60, Math.min(420, r.height | 0));
      if (cv.width !== w || cv.height !== h) {
        cv.width = w;
        cv.height = h;
        sim.P = null;
      }
    };

    size();
    window.addEventListener("resize", size);

    const plate = cv.closest("[data-plate]");
    const onEnter = () => {
      sim.tg = 1.6;
    };
    const onLeave = () => {
      sim.tg = 1;
    };
    plate?.addEventListener("mouseenter", onEnter);
    plate?.addEventListener("mouseleave", onLeave);

    const obs = new IntersectionObserver(
      ([entry]) => {
        sim.vis = entry.isIntersecting;
        if (sim.vis && !cv.width) size();
      },
      { threshold: 0.1 },
    );
    obs.observe(cv);

    if (reduced) {
      sim.t = 3.2;
      drawSim(sim, autoDrift);
      return () => {
        window.removeEventListener("resize", size);
        plate?.removeEventListener("mouseenter", onEnter);
        plate?.removeEventListener("mouseleave", onLeave);
        obs.disconnect();
      };
    }

    const loop = (now: number) => {
      if (sim.vis && !document.hidden) {
        if (now - sim.lt >= 33) {
          const dt = Math.min(0.05, (now - sim.lt) / 1000) || 0.016;
          sim.lt = now;
          sim.sp += (sim.tg - sim.sp) * 0.08;
          sim.dt = dt * sim.sp;
          sim.t += sim.dt;
          drawSim(sim, autoDrift);
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    drawSim(sim, autoDrift);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", size);
      plate?.removeEventListener("mouseenter", onEnter);
      plate?.removeEventListener("mouseleave", onLeave);
      obs.disconnect();
      simRef.current = null;
    };
  }, [kind, accent, autoDrift]);

  return <canvas ref={canvasRef} className={`work-sim-canvas ${className}`.trim()} data-sim={kind} aria-hidden="true" />;
}
