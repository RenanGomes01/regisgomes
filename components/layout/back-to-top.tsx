"use client";

import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";
import { motion } from "motion/react";

import { useScrolledPast } from "@/hooks/use-scrolled-past";
import { cn } from "@/lib/utils";

/** Floating "back to top" button, inert until the visitor has scrolled a screen. */
export function BackToTop() {
  const lenis = useLenis();
  const enabled = useScrolledPast(600);

  function scrollToTop() {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <motion.button
        type="button"
        aria-label="Back to top"
        disabled={!enabled}
        onClick={scrollToTop}
        initial={false}
        animate={{ opacity: enabled ? 1 : 0.3, scale: enabled ? 1 : 0.92 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-full backdrop-blur-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          enabled
            ? "bg-foreground text-background shadow-[0_12px_36px_-14px_rgba(0,0,0,0.45)] hover:opacity-90"
            : "cursor-not-allowed bg-foreground/10 text-foreground",
        )}
      >
        <ArrowUp className="size-4" />
      </motion.button>
    </div>
  );
}
