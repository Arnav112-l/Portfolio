import { useEffect, useState } from "react";
import { scrollTo } from "../hooks";
import { getScrollY, subscribeScroll } from "../scroll";

export default function BackTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(getScrollY() > 500);
    onScroll();
    return subscribeScroll(onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-md border border-black/10 text-[#0D0D12] shadow-xl hover:-translate-y-1 hover:bg-white transition-all font-mono text-[10px] uppercase tracking-widest"
      onClick={() => scrollTo("home")}
      aria-label="Back to top"
    >
      ↑ top
    </button>
  );
}
