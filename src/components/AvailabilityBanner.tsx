import { site } from "../content";
import Motion from "./Motion";

export default function AvailabilityBanner() {
  return (
    <Motion enter delay={600}>
      <div className="availability-banner">
        <span className="availability-dot" />
        <span>{site.availability}</span>
        <span className="availability-loc">{site.location}</span>
      </div>
    </Motion>
  );
}
