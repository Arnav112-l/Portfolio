import { now } from "../data/profile";

export default function NowStrip() {
  return (
    <div className="mb-20 max-w-xl">
      <p className="text-sm leading-relaxed text-muted">
        <span className="font-serif italic text-accent">Right now</span> — {now.focus}
      </p>
      <p className="mt-3 font-serif text-sm italic text-subtle">{now.lookingFor}</p>
    </div>
  );
}
