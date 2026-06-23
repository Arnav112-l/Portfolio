import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { paletteCommands, site } from "../content";
import { scrollTo } from "../hooks";
import { cyclePhaseGlobal } from "../hooks/usePhase";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CommandPalette({ open, onClose }: Props) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return paletteCommands;
    return paletteCommands.filter((c) => c.label.toLowerCase().includes(q));
  }, [query]);

  const run = (cmd: (typeof paletteCommands)[number]) => {
    onClose();
    if ("section" in cmd) scrollTo(cmd.section);
    else if ("action" in cmd) {
      if (cmd.action === "copy-email") navigator.clipboard?.writeText(site.email).catch(() => {});
      if (cmd.action === "cycle-phase") cyclePhaseGlobal();
    } else if ("href" in cmd) {
      if (cmd.id === "resume") {
        const a = document.createElement("a");
        a.href = cmd.href;
        a.download = "";
        a.click();
      } else if (cmd.href.startsWith("mailto:")) {
        window.location.href = cmd.href;
      } else {
        window.open(cmd.href, "_blank", "noopener,noreferrer");
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cmd-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="cmd-panel"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Command palette"
          >
            <input
              autoFocus
              className="cmd-input"
              placeholder="Jump to section or link…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <ul className="cmd-list">
              {filtered.map((cmd) => (
                <li key={cmd.id}>
                  <button type="button" className="cmd-item" onClick={() => run(cmd)}>
                    <span>{cmd.label}</span>
                    {"section" in cmd || "action" in cmd ? (
                      <span className="cmd-kbd">↵</span>
                    ) : (
                      <span className="cmd-kbd">↗</span>
                    )}
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="cmd-empty">No matches</li>
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return { open, setOpen, close: () => setOpen(false) };
}
