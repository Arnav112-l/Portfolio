import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { display } from "../resources/config";
import { navItems, person } from "../data/profile";
import { scrollToSection, useActiveSection } from "../hooks/useActiveSection";
import ThemeToggle, { NavToggle } from "./ThemeToggle";
import TimeDisplay from "./TimeDisplay";

function NavDivider() {
  return <span className="nav-divider" aria-hidden="true" />;
}

type IndicatorStyle = {
  left: number;
  width: number;
  opacity: number;
};

export default function Navbar() {
  const active = useActiveSection();
  const trackRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<IndicatorStyle>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const isSelected = (id: string) => active === id;

  const updateIndicator = () => {
    const track = trackRef.current;
    if (!track) return;

    const btn = track.querySelector<HTMLElement>(`[data-nav-id="${active}"]`);
    if (!btn) {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    setIndicator({
      left: btn.offsetLeft,
      width: btn.offsetWidth,
      opacity: 1,
    });
  };

  useLayoutEffect(() => {
    updateIndicator();
  }, [active]);

  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [active]);

  return (
    <>
      <div className="nav-fade nav-fade-top" aria-hidden="true" />
      <div className="nav-fade nav-fade-bottom" aria-hidden="true" />

      <header className="nav-header nav-header-enter">
        <div className="nav-header-bar">
          <div className="nav-edge nav-edge-left nav-edge-enter">
            {display.currentLocation && (
              <span className="text-sm text-muted">{person.currentLocation}</span>
            )}
          </div>

          <div className="nav-center">
            <nav className="nav-pill nav-pill-enter" aria-label="Main">
              <div className="nav-pill-track" ref={trackRef}>
                <span
                  className="nav-active-indicator"
                  style={{
                    width: indicator.width,
                    transform: `translateX(${indicator.left}px)`,
                    opacity: indicator.opacity,
                  }}
                  aria-hidden="true"
                />

                {navItems.map((item, index) => (
                  <span key={item.id} className="contents">
                    {index === 1 && <NavDivider />}
                    <NavToggle
                      href={item.href}
                      label={item.label}
                      icon={item.icon}
                      navId={item.id}
                      selected={isSelected(item.id)}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                    />
                  </span>
                ))}
              </div>

              {display.themeSwitcher && (
                <>
                  <NavDivider />
                  <ThemeToggle />
                </>
              )}
            </nav>
          </div>

          <div className="nav-edge nav-edge-right nav-edge-enter">
            {display.time && <TimeDisplay />}
          </div>
        </div>
      </header>
    </>
  );
}
