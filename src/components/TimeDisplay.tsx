import { useEffect, useState } from "react";
import { person } from "../data/profile";

export default function TimeDisplay() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-IN", {
        timeZone: person.timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(new Date());

    setTime(format());
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="text-sm tabular-nums text-muted">{time || "—:—:—"}</span>
  );
}
