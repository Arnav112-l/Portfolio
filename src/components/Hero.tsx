import HeroDemo from "./HeroDemo";
import Motion from "./Motion";
import { hero, site } from "../content";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function HeroContent() {
  const [word, setWord] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = setInterval(() => {
      setWord((w) => (w + 1) % hero.rotating.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative z-10 w-full max-w-4xl">
      <Motion enter delay={0}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-black/10 rounded-xl font-mono text-[11px] tracking-widest text-[#9a9aa3] uppercase mb-8 bg-black/5 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0CAF9B]" />
          <span>{hero.badge}</span>
        </div>
      </Motion>

      <Motion enter delay={100}>
        <h1 className="hero-title hero-title-charge flex flex-col md:block" data-hero-h1>
          {hero.headline}{" "}
          <span className="inline-flex overflow-hidden h-[1.1em] align-bottom items-start relative ml-2 min-w-[280px]">
            <AnimatePresence mode="popLayout">
              <motion.em
                key={word}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="hero-title-italic absolute inset-0 text-left text-[#B233FF]"
              >
                {hero.rotating[word]}
                <span className="text-[#FF33A1]">.</span>
              </motion.em>
            </AnimatePresence>
          </span>
        </h1>
      </Motion>

      <Motion enter delay={200}>
        <p className="max-w-xl mt-6 text-[15px] md:text-lg leading-relaxed text-[#9a9aa3]">
          Hey, I&apos;m Arnav — <strong className="text-gray-900 font-medium">CS @ BITS Pilani</strong>. I build products that reach real users and spend most of my time on <strong className="text-gray-900 font-medium">StayID</strong>.
        </p>
      </Motion>

      <Motion enter delay={300}>
        <div className="flex flex-wrap items-center gap-4 mt-10">
          <a href="#work" data-magnetic className="inline-flex items-center gap-2 font-sans font-semibold text-[15px] text-white bg-gray-900 px-6 py-3.5 rounded-full transition-transform hover:-translate-y-0.5">
            See the work <span className="font-mono text-xs">↓</span>
          </a>
          <a href={site.resume} download data-magnetic className="inline-flex items-center gap-2 font-sans font-semibold text-[15px] text-gray-900 bg-transparent border border-black/20 px-6 py-3.5 rounded-full transition-colors hover:bg-black/5">
            Résumé ↗
          </a>
        </div>
      </Motion>

      <Motion enter delay={380}>
        <div className="hero-quicklinks">
          <a href={`mailto:${site.email}`}>Email ↗</a>
          <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href={site.resume} download>Résumé ↗</a>
        </div>
      </Motion>

      <Motion enter delay={460}>
        <div className="flex items-center gap-3 mt-14 font-mono text-[11px] tracking-widest uppercase text-gray-900/60">
          <span className="w-6 h-px bg-black/20" />
          {hero.now}
        </div>
      </Motion>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="hero-wrap relative overflow-hidden">
      <div className="hero-aurora" />
      <div className="relative z-10 section-inner grid grid-cols-1 lg:grid-cols-[1.1fr_minmax(300px,32rem)] gap-12 lg:gap-16 items-center">
        <HeroContent />
        <div className="justify-self-center lg:justify-self-end w-full">
          <HeroDemo />
        </div>
      </div>
      
      {/* Giant Name Watermark */}
      <div
        aria-hidden="true"
        className="hero-giant absolute left-0 right-0 bottom-0 z-[1] opacity-30 flex items-baseline justify-center gap-[0.18em] font-sans font-extrabold text-[13vw] leading-[0.82] tracking-[-0.04em] whitespace-nowrap pointer-events-none select-none"
      >
        <span className="hero-giant-fill">ARNAV</span>
        <span className="hero-giant-stroke">SINGH</span>
        <span className="font-mono font-normal text-[0.12em] text-[#9a9aa3] self-start tracking-normal">©{new Date().getFullYear().toString().slice(2)}</span>
      </div>
    </section>
  );
}
