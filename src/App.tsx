import Layout from "./components/Layout";
import Hero from "./components/Hero";
import NowStrip from "./components/NowStrip";
import Venture from "./components/Venture";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";

export default function App() {
  return (
    <Layout>
      <Hero />

      <Reveal>
        <NowStrip />
      </Reveal>

      <section id="work">
        <Reveal>
          <Venture />
        </Reveal>
        <Reveal delay={60}>
          <Projects />
        </Reveal>
      </section>

      <section id="about">
        <Reveal>
          <About />
        </Reveal>
      </section>

      <section id="contact">
        <Reveal>
          <Contact />
        </Reveal>
      </section>

      <Reveal delay={40}>
        <Footer />
      </Reveal>
    </Layout>
  );
}
