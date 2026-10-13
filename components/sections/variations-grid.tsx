"use client";

import {
  easeInOut,
  motion,
  motionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { useRange } from "@/hooks/use-range";
import { variations } from "@/lib/content";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Scroll timeline (fractions of the section's scroll progress, 0 → 1)       */
/* -------------------------------------------------------------------------- */

/** 1 — everything stays stacked as a single image until this point. */
const EXPAND_START = 0.05;
/** The last (farthest) cell reaches its slot here. */
const EXPAND_END = 0.48;
/** How long a single cell takes to travel from the centre to its slot. */
const CELL_DURATION = 0.28;
/** While stacked, the pile is a bit larger — it settles to 1 as it fans out. */
const STACK_SCALE = 1.35;
/** Labels fade in right after each cell lands. */
const LABEL_FADE = 0.04;
/** 2 — favourite highlight + caption under the grid. */
const FAVORITE = [0.5, 0.57] as const;
const CAPTION_IN = [0.48, 0.56] as const;
/** 3 — exit: the favourite zooms to centre stage while the rest fade away. */
const EXIT = [0.74, 0.94] as const;
const EXIT_TITLE = [0.8, 0.92] as const;
const EXIT_CAPTION = [0.88, 0.96] as const;

/**
 * Where the zoomed favourite lands: the box between the exit title and the bottom
 * of the screen, measured live so it fits phones, tablets and wide monitors alike.
 */
const STAGE_GAP = 20; // px between the title and the image
const STAGE_BOTTOM = 20; // px kept free at the bottom of the screen
const STAGE_MAX_W_RATIO = 0.9; // of the viewport width…
const STAGE_MAX_W_PX = 1400; // …but never wider than this on large monitors
/** Base corner radius (px) of a cell; kept visually constant while zooming. */
const CELL_RADIUS = 16;

const COUNT = variations.cells.length;
const FAVORITE_INDEX = variations.favoriteIndex;

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

type Vector = { x: MotionValue<number>; y: MotionValue<number> };
type Focus = Vector & { zoom: MotionValue<number> };

export function VariationsGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  const { scrollYProgress: p } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Per cell: vector from its natural slot to the grid centre (used while stacked).
  const offsets = useMemo<Vector[]>(
    () => variations.cells.map(() => ({ x: motionValue(0), y: motionValue(0) })),
    [],
  );
  // Favourite only: vector from its slot to the stage centre + the zoom that fills the stage.
  const focus = useMemo<Focus>(
    () => ({ x: motionValue(0), y: motionValue(0), zoom: motionValue(1) }),
    [],
  );

  // Order in which cells leave the stack — nearest to the centre first.
  const [ranks, setRanks] = useState<number[]>(() => variations.cells.map((_, i) => i));

  useEffect(() => {
    const stage = stageRef.current;
    const grid = gridRef.current;
    if (!stage || !grid) return;

    const measure = () => {
      const items = Array.from(grid.children) as HTMLElement[];
      // offsetLeft/Top are layout positions: they ignore the transforms we animate,
      // so measuring stays stable even while cells are mid-flight.
      const gridCenterX = grid.clientWidth / 2;
      const gridCenterY = grid.clientHeight / 2;

      const distances = items.map((el, i) => {
        const dx = gridCenterX - (el.offsetLeft + el.offsetWidth / 2);
        const dy = gridCenterY - (el.offsetTop + el.offsetHeight / 2);
        offsets[i].x.set(dx);
        offsets[i].y.set(dy);
        return Math.hypot(dx, dy);
      });

      // Favourite → stage. Its centre in the sticky stage's coordinates:
      const fav = items[FAVORITE_INDEX];
      if (fav) {
        const favCenterX = grid.offsetLeft + fav.offsetLeft + fav.offsetWidth / 2;
        const favCenterY = grid.offsetTop + fav.offsetTop + fav.offsetHeight / 2;
        // Free box for the image: below the exit title, above the bottom margin.
        // offsetTop/Height ignore the title's own y-animation, so this is stable.
        const title = titleRef.current;
        const boxTop = (title ? title.offsetTop + title.offsetHeight : 0) + STAGE_GAP;
        const boxBottom = stage.clientHeight - STAGE_BOTTOM;
        const boxHeight = Math.max(boxBottom - boxTop, 1);
        const boxWidth = Math.min(stage.clientWidth * STAGE_MAX_W_RATIO, STAGE_MAX_W_PX);

        // Largest scale that fits both dimensions (portrait phones are width-bound,
        // short landscape screens are height-bound).
        focus.zoom.set(Math.min(boxWidth / fav.offsetWidth, boxHeight / fav.offsetHeight));
        focus.x.set(stage.clientWidth / 2 - favCenterX);
        focus.y.set(boxTop + boxHeight / 2 - favCenterY);
      }

      const order = distances
        .map((d, i) => ({ d, i }))
        .sort((a, b) => a.d - b.d)
        .map(({ i }) => i);
      const nextRanks = new Array<number>(items.length);
      order.forEach((cellIndex, rank) => (nextRanks[cellIndex] = rank));
      // The original always leads, so it stays on top of the pile.
      const originalRank = nextRanks[0];
      nextRanks.forEach((r, i) => {
        if (r < originalRank) nextRanks[i] = r + 1;
      });
      nextRanks[0] = 0;

      setRanks((prev) => (prev.join() === nextRanks.join() ? prev : nextRanks));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    observer.observe(grid);
    // The exit title can wrap onto more lines when the width changes.
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, [offsets, focus]);

  // Shared exit progress (0 → 1), eased so the zoom starts and lands softly.
  const exitLinear = useRange(p, [...EXIT], [0, 1]);
  const exit = useTransform(exitLinear, easeInOut);

  // Caption under the grid: in after the fan-out, out as the exit begins.
  const captionOpacity = useRange(p, [CAPTION_IN[0], CAPTION_IN[1], EXIT[0], EXIT[0] + 0.06], [0, 1, 1, 0]);
  const captionY = useRange(p, [...CAPTION_IN], [16, 0]);

  // Exit headline at the top.
  const titleOpacity = useRange(p, [...EXIT_TITLE], [0, 1]);
  const titleY = useRange(p, [...EXIT_TITLE], [24, 0]);
  const titleBlur = useRange(p, [...EXIT_TITLE], [10, 0]);
  const titleFilter = useTransform(titleBlur, (b) => `blur(${b}px)`);

  return (
    <section
      ref={sectionRef}
      id="features"
      aria-labelledby="features-heading"
      data-header-theme="dark"
      className="dark relative h-[420vh] bg-background text-foreground"
    >
      <h2 id="features-heading" className="sr-only">
        {variations.title}
      </h2>

      <div
        ref={stageRef}
        className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-visible px-3 pt-[4.5rem] pb-4 sm:px-6 sm:pt-24 sm:pb-6"
      >
        <ul
          ref={gridRef}
          className="relative grid min-h-0 w-full max-w-[1440px] flex-1 gap-2 overflow-visible portrait:grid-cols-3 portrait:grid-rows-4 landscape:grid-cols-4 landscape:grid-rows-3 sm:gap-3"
        >
          {variations.cells.map((cell, index) => (
            <VariationCell
              key={cell.label}
              index={index}
              label={cell.label}
              src={cell.src ?? variations.image.src}
              filter={cell.filter}
              offset={offsets[index]}
              focus={index === FAVORITE_INDEX ? focus : null}
              rank={ranks[index]}
              progress={p}
              exit={exit}
            />
          ))}
        </ul>

        <motion.p
          style={{ opacity: captionOpacity, y: captionY }}
          className="mt-3 max-w-xl shrink-0 text-center text-[13px] text-muted-foreground sm:mt-5 sm:text-[15px]"
        >
          {variations.caption}
        </motion.p>

        {/* Exit headline — sits above the zoomed favourite */}
        <motion.p
          ref={titleRef}
          aria-hidden
          style={{ opacity: titleOpacity, y: titleY, filter: titleFilter }}
          className="pointer-events-none absolute inset-x-0 top-[calc(4.5rem+2vh)] z-30 mx-auto max-w-4xl px-4 text-center font-serif text-[clamp(1.75rem,4.2vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-balance sm:top-[calc(5.5rem+2vh)]"
        >
          {variations.exitTitle}
        </motion.p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Cell                                                                      */
/* -------------------------------------------------------------------------- */

type VariationCellProps = {
  index: number;
  label: string;
  src: string;
  filter: string;
  offset: Vector;
  /** Only set for the favourite — drives its zoom to centre stage. */
  focus: Focus | null;
  rank: number;
  progress: MotionValue<number>;
  exit: MotionValue<number>;
};

function VariationCell({ index, label, src, filter, offset, focus, rank, progress, exit }: VariationCellProps) {
  const isOriginal = index === 0;
  const isFavorite = focus !== null;

  // Stagger: rank 0 starts at EXPAND_START, the last rank finishes at EXPAND_END.
  const step = (EXPAND_END - EXPAND_START - CELL_DURATION) / Math.max(COUNT - 1, 1);
  const start = EXPAND_START + rank * step;
  const end = start + CELL_DURATION;

  // 1 = stacked in the centre, 0 = resting in its grid slot.
  const collapse = useRange(progress, [start, end], [1, 0]);

  // Phase 1 (fan-out): offset × collapse brings each cell from the centre to (0, 0).
  // Phase 3 (exit, favourite only): + focus × exit carries it to centre stage.
  // `collapse` is 0 by the time `exit` starts, so the two never fight.
  const x = useTransform(() => offset.x.get() * collapse.get() + (focus ? focus.x.get() * exit.get() : 0));
  const y = useTransform(() => offset.y.get() * collapse.get() + (focus ? focus.y.get() * exit.get() : 0));
  const scale = useTransform(
    () => 1 + (STACK_SCALE - 1) * collapse.get() + (focus ? (focus.zoom.get() - 1) * exit.get() : 0),
  );

  // Everyone but the favourite fades out during the exit.
  const opacity = useTransform(() => (isFavorite ? 1 : 1 - exit.get()));

  // Divide the radius by the scale so corners look the same size on screen while zooming.
  const radius = useTransform(scale, (s) => CELL_RADIUS / Math.max(s, 0.01));
  // Counter-scale for overlays that must keep their on-screen size (the exit caption).
  const inverseScale = useTransform(scale, (s) => 1 / Math.max(s, 0.01));
  // …and widen its box by the same factor so it can span ~92% of the zoomed image.
  const counterWidth = useTransform(scale, (s) => `${92 * Math.max(s, 0.01)}%`);

  // The original sits on top of the pile; the favourite jumps above everything once it zooms.
  const baseZ = isOriginal ? COUNT + 1 : COUNT - rank;
  const zIndex = useTransform(exit, (e) => (isFavorite && e > 0 ? COUNT + 5 : baseZ));

  // Grid label + favourite marker: visible once landed, gone during the exit.
  const labelOpacity = useRange(progress, [end, end + LABEL_FADE, EXIT[0], EXIT[0] + 0.04], [0, 1, 1, 0]);
  const favoriteMark = useRange(progress, [FAVORITE[0], FAVORITE[1], EXIT[0], EXIT[0] + 0.04], [0, 1, 1, 0]);
  const exitCaption = useRange(progress, [...EXIT_CAPTION], [0, 1]);

  return (
    <motion.li
      style={{ x, y, scale, opacity, zIndex }}
      className={cn(
        "relative min-h-0 overflow-visible will-change-transform",
        // Pin the original to a central slot in both layouts (3×4 mobile, 4×3 desktop).
        isOriginal && "col-start-2 row-start-2",
      )}
    >
      <motion.figure
        style={{ borderRadius: radius }}
        className="relative size-full overflow-hidden bg-muted shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10"
      >
        <Image
          src={src}
          alt={`${variations.image.alt} — ${label}`}
          fill
          // The favourite is shown almost full-screen at the end — request a large file for it.
          sizes={isFavorite ? "90vw" : "(max-width: 1024px) 34vw, 26vw"}
          className="object-cover"
          style={{ filter }}
          priority={isOriginal}
          // The favourite's large file must already be there when the grid lands.
          loading={isFavorite ? "eager" : undefined}
        />

        <motion.figcaption
          style={{ opacity: labelOpacity }}
          className="absolute bottom-2 left-2 rounded-md bg-black/45 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-md sm:bottom-3 sm:left-3 sm:text-xs"
        >
          {label}
        </motion.figcaption>

        {isFavorite ? (
          <>
            <motion.div
              aria-hidden
              style={{ opacity: favoriteMark, borderRadius: radius }}
              className="pointer-events-none absolute inset-0 ring-2 ring-white ring-inset"
            />
            <motion.span
              style={{ opacity: favoriteMark }}
              className="absolute top-2 right-2 rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-black sm:top-3 sm:right-3 sm:text-xs"
            >
              {variations.favoriteLabel}
            </motion.span>

            {/* Exit caption — counter-scaled so it reads at normal size on the zoomed image */}
            <motion.div
              aria-hidden
              style={{ opacity: exitCaption }}
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent"
            />
            <motion.p
              style={{ opacity: exitCaption, scale: inverseScale, width: counterWidth }}
              className="absolute bottom-[5%] left-[4%] origin-bottom-left text-[clamp(0.85rem,1.2vw,1.05rem)] font-medium text-pretty text-white"
            >
              {variations.exitCaption}
            </motion.p>
          </>
        ) : null}
      </motion.figure>
    </motion.li>
  );
}
