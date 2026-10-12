"use client";

import { motion } from "motion/react";

import { headerCta, mainNav } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type MobileNavProps = {
  id: string;
  activeId: string | null;
  onNavigate: () => void;
};

/** Dropdown panel that unfolds under the header pill on small screens. */
export function MobileNav({ id, activeId, onNavigate }: MobileNavProps) {
  return (
    <motion.nav
      id={id}
      aria-label="Mobile"
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.3, ease: EASE }}
      style={{ transformOrigin: "top left" }}
      className="absolute top-[calc(100%+0.5rem)] left-0 w-[min(20rem,calc(100vw-2rem))] rounded-2xl bg-foreground p-2 text-background shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] md:hidden"
    >
      <ul className="flex flex-col">
        {mainNav.map((item, i) => {
          const isActive = activeId === item.href.slice(1);
          return (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.04 * i + 0.05, duration: 0.35, ease: EASE }}
            >
              <a
                href={item.href}
                onClick={onNavigate}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "flex h-12 items-center justify-between rounded-xl px-3 font-serif text-2xl tracking-[-0.01em] transition-colors hover:bg-background/10",
                  isActive ? "text-background" : "text-background/70",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                )}
              >
                {/* Wrapped label + always-mounted dot: safe with browser auto-translate */}
                <span>{item.label}</span>
                <span
                  aria-hidden
                  className={cn("size-1.5 rounded-full bg-background transition-opacity", isActive ? "opacity-100" : "opacity-0")}
                />
              </a>
            </motion.li>
          );
        })}
      </ul>
      <div className="mt-2 border-t border-background/15 pt-2">
        <a
          href={headerCta.signIn.href}
          onClick={onNavigate}
          className="flex h-11 items-center justify-center rounded-xl bg-background/10 text-sm font-medium transition-colors hover:bg-background/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {headerCta.signIn.label}
        </a>
      </div>
    </motion.nav>
  );
}
