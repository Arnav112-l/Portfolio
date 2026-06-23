import { useMagnetic, useSmoothScroll } from "./hooks";
import { useNavHide, usePartyMode, useWelcomeBack } from "./hooks/useNavHide";
import About from "./components/About";
import AvailabilityBanner from "./components/AvailabilityBanner";
import BackTop from "./components/BackTop";
import CommandPalette, { useCommandPalette } from "./components/CommandPalette";
import Contact from "./components/Contact";
import Currently from "./components/Currently";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import Hackathons from "./components/Hackathons";
import Hero from "./components/Hero";
import LifeLog from "./components/LifeLog";
import Marquee from "./components/Marquee";
import Motion from "./components/Motion";
import Nav from "./components/Nav";
import Preloader from "./components/Preloader";
import SectionHead from "./components/SectionHead";
import ScrollChrome from "./components/ScrollChrome";
import ScrambleLabels from "./components/ScrambleLabels";
import Skills from "./components/Skills";
import Thesis from "./components/Thesis";
import Work from "./components/Work";

export default function App() {
  const { open, setOpen, close } = useCommandPalette();
  useMagnetic();
  useSmoothScroll();
  useNavHide();
  usePartyMode();
  useWelcomeBack();

  return (
    <>
      <Preloader />
      <ScrollChrome />
      <ScrambleLabels />
      <CustomCursor />
      <CommandPalette open={open} onClose={close} />

      <div id="site-surface">
        <div className="grain-overlay" aria-hidden="true" />
        <Nav onOpenPalette={() => setOpen(true)} />
        <BackTop />

        <main className="page">
          <Hero />
          <AvailabilityBanner />

          <Motion delay={0}>
            <Marquee />
          </Motion>

          <section className="full-section" data-accent="#2438FF">
            <div className="section-inner">
              <Currently />
            </div>
          </section>

          <Thesis />

          <section className="full-section" data-accent="#0CAF9B">
            <div className="section-inner">
              <LifeLog />
            </div>
          </section>

          <section id="work" className="full-section section-block work-section" data-accent="#2438FF">
            <div className="section-inner work-section-intro">
              <SectionHead
                label="work"
                title="Stuff worth shipping."
                subtitle="StayID first — then hackathon builds and side quests."
                accent="#2438FF"
              />
            </div>
            <Work />
          </section>

          <section id="about" className="full-section section-block" data-accent="#FFAA00">
            <div className="section-inner">
              <About />
            </div>
          </section>

          <section id="build" className="full-section section-block" data-accent="#7A2BF5">
            <div className="section-inner">
              <SectionHead
                label="how i build"
                title="The stack I ship with."
                subtitle="Every project, roughly this shape."
                accent="#7A2BF5"
              />
              <Skills />
              <div className="subsection mt-16">
                <Motion delay={0}>
                  <p className="font-mono text-sm tracking-widest uppercase text-muted mb-6">[ the lighter stuff ]</p>
                </Motion>
                <Hackathons />
              </div>
            </div>
          </section>

          <section id="contact" className="full-section section-block contact-section" data-accent="#B233FF">
            <div className="section-inner">
              <Contact />
            </div>
            <Footer />
          </section>
        </main>
      </div>
    </>
  );
}
