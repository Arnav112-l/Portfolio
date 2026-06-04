import { useState } from "react";
import { currentVenture } from "../data/profile";

export default function VentureGallery() {
  const shots = currentVenture.screenshots;
  const [active, setActive] = useState(0);

  if (!shots.length) return null;

  return (
    <div className="mt-8">
      <div className="overflow-hidden rounded-lg border border-border bg-surface-raised/30">
        <img
          src={shots[active].src}
          alt={shots[active].alt}
          className="block h-auto w-full"
          loading="lazy"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {shots.map((shot, index) => (
          <button
            key={shot.caption}
            type="button"
            onClick={() => setActive(index)}
            className={`min-h-9 rounded-md px-3 py-2 text-xs transition-colors duration-200 sm:py-1.5 ${
              active === index
                ? "bg-accent text-white"
                : "border border-white/10 text-subtle hover:border-accent/40 hover:text-accent"
            }`}
          >
            {shot.caption}
          </button>
        ))}
      </div>
    </div>
  );
}
