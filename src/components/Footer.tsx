import { person } from "../data/profile";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border pt-8">
      <SocialLinks className="mb-6" />
      <p className="text-xs text-subtle">
        © {new Date().getFullYear()} {person.name}
      </p>
    </footer>
  );
}
