"use client";

import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import { ArrowLink } from "@/components/shared/arrow-button";
import { finalCta } from "@/lib/content";

/* -------------------------------------------------------------------------- */
/*  Wave geometry                                                             */
/* -------------------------------------------------------------------------- */

const IMAGES = finalCta.images;
const N = IMAGES.length;
/**
 * Whole sine cycles per image set. Must be an integer: the set is rendered twice
 * and the track loops at -50%, so the wave has to end exactly where it started.
 */
const CYCLES = 2;
const PHASE_STEP = (Math.PI * 2 * CYCLES) / N;
/** Max tilt (deg) — cards lean along the slope of the wave. */
const MAX_TILT = 7;
/** Seconds for one full set to scroll past. */
const LOOP_SECONDS = 70;

/** Per-card wave values, precomputed once (same for both copies of the set). */
const WAVE = IMAGES.map((_, i) => ({
  sin: Math.sin(i * PHASE_STEP),
  // derivative of sin → cos: the tilt follows the slope of the curve
  tilt: Math.cos(i * PHASE_STEP) * -MAX_TILT,
}));

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE, delay: i * 0.08 },
  }),
};

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export function FinalCta() {
  return (
    <section
      aria-labelledby="cta-heading"
      data-header-theme="dark"
      className="dark relative isolate overflow-visible bg-background pt-20 pb-28 text-foreground sm:pt-28 sm:pb-36"
    >
      <Backdrop />
      <ImageWave />

      <div className="relative z-10 mx-auto mt-10 max-w-[1440px] px-4 text-center sm:mt-20 sm:px-6">
        <motion.h2
          id="cta-heading"
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          custom={0}
          className="mx-auto max-w-4xl font-serif text-[clamp(2.25rem,8.5vw,4.75rem)] leading-[1.02] tracking-[-0.025em] text-balance [overflow-wrap:anywhere] sm:text-[clamp(2.75rem,5.6vw,4.75rem)]"
        >
          {finalCta.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </motion.h2>

        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          custom={1}
          className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-pretty text-muted-foreground"
        >
          {finalCta.description}
        </motion.p>

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          custom={2}
          className="mx-auto mt-9 flex max-w-sm flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center"
        >
          <ArrowLink href={finalCta.primary.href} size="lg">
            {finalCta.primary.label}
          </ArrowLink>
          <ArrowLink href={finalCta.secondary.href} size="lg" variant="secondary" withArrow={false}>
            {finalCta.secondary.label}
          </ArrowLink>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Infinite sine-wave marquee                                                */
/* -------------------------------------------------------------------------- */

function ImageWave() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // Only spend frames while the wave is on screen.
  const inView = useInView(ref, { margin: "200px 0px" });
  const playing = inView && !reduceMotion;

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative overflow-visible [--amp:clamp(22px,3.6vw,60px)] [--card-w:clamp(120px,14vw,220px)]"
    >
      {/* vertical room for the crests and troughs */}
      <div className="py-[calc(var(--amp)+1.5rem)]">
        <motion.ul
          className="flex w-max will-change-transform"
          initial={{ x: "0%" }}
          animate={playing ? { x: ["0%", "-50%"] } : undefined}
          transition={{ duration: LOOP_SECONDS, ease: "linear", repeat: Infinity }}
        >
          {/* The set is rendered twice; -50% lands exactly on the start of the copy. */}
          {[0, 1].map((copy) =>
            IMAGES.map((image, i) => (
              <li
                key={`${copy}-${image.src}`}
                // Padding (not gap) keeps every item the same width, so -50% is exact.
                className="shrink-0 px-2 sm:px-2.5"
              >
                <div
                  style={{
                    transform: `translateY(calc(var(--amp) * ${WAVE[i].sin.toFixed(4)})) rotate(${WAVE[i].tilt.toFixed(2)}deg)`,
                  }}
                  className="relative aspect-[3/4] w-[var(--card-w)] overflow-hidden rounded-2xl bg-muted shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10"
                >
                  <Image src={image.src} alt="" fill sizes="220px" className="object-cover" />
                </div>
              </li>
            )),
          )}
        </motion.ul>
      </div>

      {/* Side fades — overlays (not masks) so nothing gets clipped */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[14vw] bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[14vw] bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Background                                                                */
/* -------------------------------------------------------------------------- */

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.12)_1px,transparent_1.6px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_60%,black_10%,transparent_75%)]" />
      <div className="absolute bottom-0 left-1/2 h-[40vh] w-[80vw] -translate-x-1/2 translate-y-1/3 rounded-full bg-spectrum opacity-[0.08] blur-3xl motion-safe:animate-spectrum" />
    </div>
  );
}
