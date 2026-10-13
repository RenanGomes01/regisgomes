"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { stories, ui } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Stories() {
  const baseId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.4 });
  const reduceMotion = useReducedMotion();

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const count = stories.items.length;
  const story = stories.items[active];
  // Auto-advance only while visible, not hovered/focused, and motion is allowed.
  const autoplay = inView && !paused && !reduceMotion;

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % count), stories.interval);
    return () => window.clearTimeout(id);
  }, [autoplay, active, count]);

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (active + delta + count) % count;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section
      ref={sectionRef}
      id="stories"
      aria-labelledby="stories-heading"
      className="scroll-mt-20 py-24 sm:py-32"
    >
      <Container>
        <SectionHeading id="stories-heading" title={stories.title} description={stories.description} />

        <div
          className="mt-10 grid gap-10 sm:mt-12 lg:mt-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* Left: quote + tabs */}
          <div className="flex flex-col justify-between gap-10 lg:min-h-[26rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={active}
                id={`${baseId}-panel-${active}`}
                role="tabpanel"
                aria-labelledby={`${baseId}-tab-${active}`}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="font-serif text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.12] tracking-[-0.015em] text-pretty">
                  {/* Quote marks only for real quotes (`cite: true`); descriptions render plain. */}
                  {story.cite ? <span aria-hidden className="text-muted-foreground">“</span> : null}
                  <span>{story.quote}</span>
                  {story.cite ? <span aria-hidden className="text-muted-foreground">”</span> : null}
                </p>
                <footer className="mt-8 text-[15px]">
                  <span className="font-medium">{story.name}</span>
                  <span className="text-muted-foreground">, {story.byline}</span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            {/* Tabs — a progress line fills above the active company */}
            <div
              role="tablist"
              aria-label={ui.storiesTabsLabel}
              className="scrollbar-none -mx-4 flex gap-6 overflow-x-auto border-t border-border px-4 sm:mx-0 sm:gap-8 sm:px-0"
            >
              {stories.items.map((item, i) => {
                const selected = i === active;
                return (
                  <button
                    key={item.company}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    id={`${baseId}-tab-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`${baseId}-panel-${i}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={onTabKeyDown}
                    className={cn(
                      "relative -mt-px shrink-0 rounded-sm pt-5 text-[15px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                      selected ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {/*
                      The progress track is always mounted (only its opacity changes) and the
                      label is wrapped in a <span>: never insert/remove nodes next to bare text,
                      or browser auto-translate (which swaps text nodes) breaks React's DOM updates.
                    */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-0 top-0 h-px overflow-hidden bg-foreground/15 transition-opacity",
                        selected ? "opacity-100" : "opacity-0",
                      )}
                    >
                      <motion.span
                        key={selected ? `${active}-${autoplay}` : "idle"}
                        className="block h-full origin-left bg-foreground"
                        initial={{ scaleX: selected && autoplay ? 0 : 1 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: selected && autoplay ? stories.interval / 1000 : 0, ease: "linear" }}
                      />
                    </span>
                    <span>{item.company}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: image card */}
          <figure className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted ring-1 ring-border sm:aspect-[16/10] lg:aspect-[5/6]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                >
                  <Image
                    src={story.image}
                    alt={story.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    unoptimized
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.figcaption
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3 font-mono text-xs text-muted-foreground"
              >
                {story.caption}
              </motion.figcaption>
            </AnimatePresence>
          </figure>
        </div>
      </Container>
    </section>
  );
}
