import { type ReactNode } from "react";
import Navbar from "./Navbar";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-surface text-foreground">
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(77,159,255,0.12),transparent_55%)]" />
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-24 top-[18%] h-72 w-72 rounded-full bg-accent/10 blur-3xl md:-left-16 md:h-96 md:w-96" />
        <div className="absolute -right-24 top-[28%] h-72 w-72 rounded-full bg-accent/[0.07] blur-3xl md:-right-16 md:h-96 md:w-96" />
      </div>
      <Navbar />
      <main className="relative mx-auto w-full max-w-3xl px-4 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-[calc(3rem+env(safe-area-inset-top))] sm:px-6 md:pb-16 md:pt-28 lg:px-12 lg:pt-32">
        {children}
      </main>
    </div>
  );
}
