"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useId, useState } from "react";

import { ArrowGlyph } from "@/components/shared/arrow-button";
import { BrandMark } from "@/components/shared/brand-mark";
import { useActiveSection } from "@/hooks/use-active-section";
import { useOverElement } from "@/hooks/use-over-element";
import { useScrolledPast } from "@/hooks/use-scrolled-past";
import { headerCta, mainNav, site } from "@/lib/content";
import { cn } from "@/lib/utils";

import { MobileNav } from "./mobile-nav";

const EASE = [0.22, 1, 0.36, 1] as const;

const barVariants: Variants = {
  hidden: { opacity: 0, y: -18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, when: "beforeChildren", staggerChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const collapse = {
  open: { width: "auto", opacity: 1 },
  closed: { width: 0, opacity: 0 },
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const sectionIds = mainNav.map((item) => item.href.slice(1));

export function SiteHeader() {
  const scrolled = useScrolledPast(80);
  const active = useActiveSection(sectionIds);
  // Some sections are always dark: flip the header palette while it sits on top of one.
  const overDark = useOverElement();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  // Close the mobile menu on Escape and when the viewport grows past `md`.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [menuOpen]);

  // The brand name and "Sign in" tuck away once the page is scrolled, unless the menu is open.
  const compact = scrolled && !menuOpen;

  return (
    <header
      aria-label="Site"
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex items-start justify-between gap-3 px-4 pt-4 sm:px-5 sm:pt-5",
        overDark && "dark",
      )}
    >
      {/* Left: dark pill with brand, nav and mobile toggle */}
      <div className="relative">
        <motion.div
          variants={barVariants}
          initial="hidden"
          animate="show"
          className="flex h-11 items-center gap-1 rounded-xl bg-foreground p-1 text-background shadow-[0_12px_36px_-14px_rgba(0,0,0,0.45)] dark:shadow-[0_12px_36px_-14px_rgba(0,0,0,0.8)]"
        >
          <motion.div variants={itemVariants} className="flex items-center pr-1 pl-2">
            <a
              href="#top"
              aria-label={`${site.name} home`}
              className={cn(
                "inline-flex h-9 items-center rounded-lg text-[15px] font-medium tracking-[-0.01em]",
                focusRing,
              )}
            >
              <BrandMark className="size-[18px]" />
              <motion.span
                initial={false}
                animate={compact ? collapse.closed : collapse.open}
                transition={{ duration: 0.45, ease: EASE }}
                className="overflow-hidden whitespace-nowrap"
              >
                <span className="block pl-2">{site.name}</span>
              </motion.span>
            </a>
          </motion.div>

          <ul className="relative hidden items-center md:flex">
            {mainNav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <motion.li key={item.href} variants={itemVariants} className="relative">
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative z-[1] inline-flex h-8 items-center rounded-lg px-3 text-[13px] font-medium whitespace-nowrap transition-colors",
                      isActive ? "text-background" : "text-background/65 hover:text-background",
                      focusRing,
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute bottom-[3px] left-1/2 size-[3px] -translate-x-1/2 rounded-full bg-background transition-[opacity,transform] duration-300",
                        isActive ? "scale-100 opacity-100" : "scale-0 opacity-0",
                      )}
                    />
                  </a>
                </motion.li>
              );
            })}
          </ul>

          <motion.button
            variants={itemVariants}
            type="button"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-lg text-background/80 transition-colors hover:bg-background/10 hover:text-background md:hidden",
              focusRing,
            )}
          >
            <span aria-hidden className="relative block h-[9px] w-[15px]">
              <motion.span
                className="absolute left-0 h-[1.5px] w-full rounded-full bg-current"
                initial={false}
                animate={menuOpen ? { top: "50%", y: "-50%", rotate: 45 } : { top: "0%", y: "0%", rotate: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              />
              <motion.span
                className="absolute left-0 h-[1.5px] w-full rounded-full bg-current"
                initial={false}
                animate={
                  menuOpen ? { top: "50%", y: "-50%", rotate: -45 } : { top: "100%", y: "-100%", rotate: 0 }
                }
                transition={{ duration: 0.3, ease: EASE }}
              />
            </span>
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {menuOpen ? (
            <MobileNav id={menuId} activeId={active} onNavigate={() => setMenuOpen(false)} />
          ) : null}
        </AnimatePresence>
      </div>

      {/* Right: sign in + primary CTA */}
      <motion.div
        variants={barVariants}
        initial="hidden"
        animate="show"
        className="flex h-11 items-center"
      >
        <motion.div
          initial={false}
          animate={compact ? collapse.closed : collapse.open}
          transition={{ duration: 0.45, ease: EASE }}
          className="hidden overflow-hidden sm:block"
        >
          <a
            href={headerCta.signIn.href}
            tabIndex={compact ? -1 : undefined}
            className={cn(
              "mr-2 inline-flex h-11 items-center rounded-xl bg-foreground/[0.07] px-4 text-sm font-medium whitespace-nowrap text-foreground backdrop-blur-md transition-colors hover:bg-foreground/[0.11] dark:bg-white/[0.13] dark:hover:bg-white/[0.18]",
              focusRing,
            )}
          >
            {headerCta.signIn.label}
          </a>
        </motion.div>
        <a
          href={headerCta.primary.href}
          className={cn(
            "group inline-flex h-11 items-center gap-1 rounded-xl bg-foreground pr-3 pl-4 text-sm font-medium whitespace-nowrap text-background shadow-[0_12px_36px_-14px_rgba(0,0,0,0.45)] transition-opacity hover:opacity-90 dark:shadow-[0_12px_36px_-14px_rgba(0,0,0,0.8)]",
            focusRing,
          )}
        >
          {headerCta.primary.label}
          <ArrowGlyph />
        </a>
      </motion.div>
    </header>
  );
}
