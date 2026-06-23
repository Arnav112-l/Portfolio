import { skills } from "../content";
import Motion from "./Motion";

export default function Skills() {
  return (
    <div className="skills-stack">
      <Motion delay={0}>
        <p className="font-mono text-[10px] tracking-widest uppercase text-muted mb-6">
          every project, roughly this shape.
        </p>
      </Motion>
      {skills.map((s, i) => (
        <Motion key={s.label} delay={i * 80}>
          <div className="skills-layer" style={{ zIndex: skills.length - i }}>
            <p className="skills-layer-label">{s.label}</p>
            <p className="skills-layer-items">{s.items}</p>
          </div>
        </Motion>
      ))}
    </div>
  );
}
