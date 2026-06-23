import { site } from "../content";
import { scrollTo, useSoundToggle } from "../hooks";

export default function Footer() {
  const year = new Date().getFullYear();
  const { on: soundOn, toggle: toggleSound } = useSoundToggle();

  return (
    <footer className="site-footer">
      <div className="site-footer-meta">
        <p>log running · phase tracked · nothing forgotten</p>
      </div>
      <div className="site-footer-actions">
        <button type="button" className="footer-btn" onClick={() => scrollTo("home")}>
          ↑ back to top
        </button>
        <button type="button" className="footer-btn" onClick={toggleSound}>
          ♪ sound: {soundOn ? "on" : "off"}
        </button>
        <p className="footer-copy">© {year} {site.name.toLowerCase()}</p>
      </div>
      <p className="footer-tagline">built this himself — ask me how</p>
    </footer>
  );
}
