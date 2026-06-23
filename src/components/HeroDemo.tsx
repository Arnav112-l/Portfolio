import { useEffect, useRef, useState } from "react";
import Motion from "./Motion";

const TERMINAL_LINES = [
  { type: "cmd", text: "stayid session start --env beta" },
  { type: "info", text: "loading tenant registry…" },
  { type: "ok", text: "847 tenants indexed across 12 properties" },
  { type: "cmd", text: "verify --tenant T-2041 --aadhaar" },
  { type: "ok", text: "identity hash matched · room 204 cleared" },
  { type: "info", text: "syncing rent ledger for march…" },
  { type: "ok", text: "₹2.4L collected · 3 pending reminders sent" },
  { type: "cmd", text: "deploy dashboard --canary 10%" },
  { type: "ok", text: "build passed · shipping to operators" },
] as const;

export default function HeroDemo() {
  const [visibleLines, setVisibleLines] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisibleLines(TERMINAL_LINES.length);
      return;
    }

    if (visibleLines >= TERMINAL_LINES.length) return;

    const delay = TERMINAL_LINES[visibleLines]?.type === "cmd" ? 600 : 300;
    const id = setTimeout(() => setVisibleLines((n) => n + 1), delay);
    return () => clearTimeout(id);
  }, [visibleLines]);

  useEffect(() => {
    if (!bodyRef.current) return;
    bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [visibleLines]);

  return (
    <Motion enter delay={220} className="relative w-full">
      <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-2xl rounded-full pointer-events-none" />
      <div className="console-window relative z-10 min-h-[300px] flex flex-col">
        <header className="console-header justify-between">
          <div className="flex items-center gap-3">
            <div className="console-dots">
              <span />
              <span />
              <span />
            </div>
            <span className="console-title">stayid — build session</span>
          </div>
          <div className="font-mono text-[10px] uppercase demo-faint tracking-wider">
            Terminal
          </div>
        </header>

        <div ref={bodyRef} className="console-body flex-1 overflow-auto max-h-[240px]">
          {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
            <div key={i} className="flex gap-3 mb-2 animate-[demo-scene-in_0.3s_ease_both]">
              {line.type === "cmd" && <span className="demo-cmd flex-shrink-0 w-4">›</span>}
              {line.type === "ok" && <span className="demo-ok flex-shrink-0 w-4">✓</span>}
              {line.type === "info" && <span className="demo-faint flex-shrink-0 w-4">·</span>}
              <span className={line.type === "cmd" ? "demo-cmd" : line.type === "info" ? "demo-dim" : "demo-text"}>
                {line.text}
              </span>
            </div>
          ))}
          {visibleLines < TERMINAL_LINES.length && (
            <div className="flex">
              <span className="console-cursor" />
            </div>
          )}
        </div>

        <footer className="console-footer flex justify-between items-center px-4 py-2 font-mono text-[10px] uppercase tracking-wider demo-dim">
          <div className="flex items-center gap-2 demo-ok">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0CAF9B] animate-[blink_1.5s_infinite]" />
            shipping
          </div>
          <span>nest · postgres · react</span>
        </footer>
      </div>
    </Motion>
  );
}
