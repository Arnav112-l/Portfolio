import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { scrollToSection } from "./hooks/useActiveSection";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

const hash = window.location.hash.slice(1);
if (hash && ["work", "about", "contact"].includes(hash)) {
  requestAnimationFrame(() => scrollToSection(hash));
}