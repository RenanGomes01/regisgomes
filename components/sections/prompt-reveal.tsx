"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import { useRange } from "@/hooks/use-range";
import { promptReveal, ui } from "@/lib/content";

/* -------------------------------------------------------------------------- */
/*  Scroll timeline (fractions of the section's scroll progress, 0 → 1)       */
/* -------------------------------------------------------------------------- */

const T = {
  /** 1 — words light up one after another */
  wordsStart: 0.04,
  wordsEnd: 0.46,
  /** 2 — small, blurred image appears under the prompt */
  imageIn: [0.44, 0.54],
  /** 3 — the image zooms to near full-screen while focusing; the prompt leaves */
  zoom: [0.52, 0.76],
  focus: [0.52, 0.72],
  promptOut: [0.52, 0.66],
  /** 4 — caption on the image, only once it is large */
  caption: [0.74, 0.8],
  /** 5 — image slides up and away, revealing the next headline */
  slideOut: [0.84, 1],
  nextTitle: [0.86, 0.97],
} as const;

/** Each word fades over this many "word slots", so neighbours overlap slightly. */
const WORD_OVERLAP = 2.5;
/** Start / end scale of the image card (its base width is ≈80vw, so 1.12 ≈ 90vw). */
const SCALE_FROM = 0.42;
const SCALE_TO = 1.12;

const words = promptReveal.prompt.split(/\s+/);

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export function PromptReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  // 0 when the section's top reaches the viewport top, 1 when its bottom reaches the viewport bottom.
  const { scrollYProgress: p } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* Prompt — drifts up as the image arrives, then fades and blurs out at the top. */
  const promptY = useRange(p, [T.imageIn[0], T.promptOut[1]], ["0vh", "-30vh"]);
  const promptOpacity = useRange(p, [...T.promptOut], [1, 0]);
  const promptBlur = useRange(p, [...T.promptOut], [0, 10]);
  const promptFilter = useTransform(promptBlur, (b) => `blur(${b}px)`);

  /* Image card — appears small & blurred below the prompt, zooms to fill the screen, then leaves upwards. */
  const imageOpacity = useRange(p, [...T.imageIn], [0, 1]);
  const imageScale = useRange(p, [T.imageIn[0], T.zoom[0], T.zoom[1]], [SCALE_FROM * 0.85, SCALE_FROM, SCALE_TO]);
  const imageY = useRange(
    p,
    [T.imageIn[0], T.zoom[0], T.zoom[1], T.slideOut[0], T.slideOut[1]],
    ["30vh", "24vh", "0vh", "0vh", "-115vh"],
  );
  const imageBlur = useRange(p, [T.imageIn[0], ...T.focus], [28, 18, 0]);
  const imageFilter = useTransform(imageBlur, (b) => (b > 0.05 ? `blur(${b}px)` : "none"));
  // Corners soften as the card grows so the radius looks constant on screen despite the scale.
  const imageRadius = useRange(p, [...T.zoom], [40, 18]);

  /* Caption — bottom-left of the image, only once it is big. */
  const captionOpacity = useRange(p, [...T.caption], [0, 1]);
  const captionY = useRange(p, [...T.caption], [12, 0]);

  /* Next headline — surfaces on the dark background as the image slides away. */
  const titleOpacity = useRange(p, [...T.nextTitle], [0, 1]);
  const titleY = useRange(p, [...T.nextTitle], [40, 0]);
  const titleBlur = useRange(p, [...T.nextTitle], [12, 0]);
  const titleFilter = useTransform(titleBlur, (b) => `blur(${b}px)`);

  return (
    <section
      ref={sectionRef}
      aria-label={ui.promptSectionLabel}
      data-header-theme="dark"
      className="dark relative h-[440vh] bg-background text-foreground"
    >
      <div className="sticky top-0 h-svh overflow-visible">
        {/* Dotted texture shared with the hero */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.12)_1px,transparent_1.6px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_10%,transparent_75%)]"
        />

        {/* Layer 1 — next headline, sits behind the image */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY, filter: titleFilter }}
          className="absolute inset-0 flex items-center justify-center px-4"
        >
          <h2 className="text-center font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] tracking-[-0.02em] text-balance">
            {promptReveal.nextTitle}
          </h2>
        </motion.div>

        {/* Layer 2 — prompt, word by word */}
        <motion.div
          style={{ y: promptY, opacity: promptOpacity, filter: promptFilter }}
          className="absolute inset-0 flex items-center justify-center px-4 sm:px-6"
        >
          <blockquote className="max-w-4xl text-center font-serif text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.12] tracking-[-0.015em] text-balance">
            {/* Screen readers get the sentence once, not word by word */}
            <span className="sr-only">{promptReveal.prompt}</span>
            <span aria-hidden>
              {words.map((word, i) => (
                <Word key={`${word}-${i}`} index={i} progress={p}>
                  {word}
                </Word>
              ))}
            </span>
          </blockquote>
        </motion.div>

        {/* Layer 3 — the rendered image, on top of everything */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-visible">
          <motion.figure
            style={{
              opacity: imageOpacity,
              scale: imageScale,
              y: imageY,
              filter: imageFilter,
              borderRadius: imageRadius,
            }}
            className="relative aspect-video w-[min(80vw,142svh)] shrink-0 overflow-hidden bg-muted shadow-[0_60px_120px_-40px_rgba(0,0,0,0.95)] ring-1 ring-white/10 will-change-transform"
          >
            <Image
              src={promptReveal.image.src}
              alt={promptReveal.image.alt}
              fill
              sizes="100vw"
              // Fills the whole screen — serve the original file untouched.
              unoptimized
              className="object-cover"
            />
            {/* Bottom shade so the caption stays legible on any image */}
            <motion.div
              aria-hidden
              style={{ opacity: captionOpacity }}
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"
            />
            <motion.figcaption
              style={{ opacity: captionOpacity, y: captionY }}
              className="absolute bottom-[4%] left-[3.5%] text-[clamp(0.8rem,1.1vw,1rem)] font-medium text-white"
            >
              {promptReveal.caption}
            </motion.figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Word                                                                      */
/* -------------------------------------------------------------------------- */

type WordProps = {
  children: string;
  index: number;
  progress: MotionValue<number>;
};

/**
 * Two stacked copies of the word: a dim base (muted-foreground/30) and a bright
 * copy (foreground) whose opacity follows scroll. Layering keeps both colours as
 * theme tokens — Motion can't interpolate CSS variables directly.
 */
function Word({ children, index, progress }: WordProps) {
  const slot = (T.wordsEnd - T.wordsStart) / words.length;
  const start = T.wordsStart + index * slot;
  const end = Math.min(start + slot * WORD_OVERLAP, T.wordsEnd + slot);
  const opacity = useRange(progress, [start, end], [0, 1]);

  return (
    <>
      <span className="relative inline-block">
        <span className="text-muted-foreground/30">{children}</span>
        <motion.span style={{ opacity }} className="absolute inset-0 text-foreground">
          {children}
        </motion.span>
      </span>{" "}
    </>
  );
}
