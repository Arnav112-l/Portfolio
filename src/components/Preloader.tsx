import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "../content";

const PRELOADER_WORDS = [
  "trusting",
  "scaling",
  "building",
  "shipping",
  site.name.toLowerCase()
];

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    // Fast counter
    let start = 0;
    const end = 100;
    const duration = 2000; // 2 seconds
    const intervalTime = duration / end;

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
        setTimeout(() => setLoading(false), 400);
      }
    }, intervalTime);

    // Word cycler
    const wordTimer = setInterval(() => {
      setWordIndex((prev) => {
        if (prev < PRELOADER_WORDS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, duration / (PRELOADER_WORDS.length + 1));

    return () => {
      clearInterval(timer);
      clearInterval(wordTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[10002] bg-[#0D0D12] flex items-center justify-center overflow-hidden"
        >
          <div className="h-[1.1em] overflow-hidden font-serif italic text-[clamp(42px,9vw,120px)] leading-[1.1]">
            <motion.div
              animate={{ y: `-${wordIndex * 1.1}em` }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            >
              {PRELOADER_WORDS.map((w, i) => {
                let color = "text-[#FBFAF7]"; // default white
                if (i === 0) color = "text-[#B233FF]";
                else if (i === 1) color = "text-[#FF33A1]";
                else if (i === 2) color = "text-[#0CAF9B]";
                else if (i === 3) color = "text-[#FFAA00]";

                return (
                  <div key={w} className={`h-[1.1em] whitespace-nowrap ${color}`}>
                    {w}
                  </div>
                );
              })}
            </motion.div>
          </div>

          <div className="absolute left-[clamp(20px,4vw,56px)] bottom-[clamp(20px,4vw,48px)] font-mono text-[11px] tracking-[0.18em] text-[#3a3a46] uppercase">
            AS © {new Date().getFullYear()} — PILANI
          </div>

          <div className="absolute right-[clamp(20px,4vw,56px)] bottom-[clamp(20px,4vw,48px)] font-mono text-[13px] tracking-[0.1em] text-[#6b6b78]">
            {count.toString().padStart(3, "0")}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
