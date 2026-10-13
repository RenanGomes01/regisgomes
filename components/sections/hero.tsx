"use client";

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
  type Variants,
} from "motion/react";
import Image from "next/image";
import { useRef, type PointerEvent } from "react";

import { ArrowLink } from "@/components/shared/arrow-button";
import { useRange } from "@/hooks/use-range";
import { hero, ui } from "@/lib/content";

/* -------------------------------------------------------------------------- */
/*  Arc geometry                                                              */
/* -------------------------------------------------------------------------- */

const COUNT = hero.images.length;
/** Angular distance between two neighbouring cards on the cylinder. */
const STEP = 360 / COUNT;
/** Cards are fully opaque inside ±FADE_START° and gone beyond ±HIDE_AT°. */
const FADE_START = 50;
const HIDE_AT = 78;
/** Idle drift, in degrees per second. */
const BASE_SPEED = 3.2;
/** Extra drift while the page is being scrolled (deg/s), capped. */
const MAX_SCROLL_BOOST = 28;
/** How far the pointer can steer the arc left/right, in degrees. */
const POINTER_YAW = 9;
const POINTER_TILT = 4;

const EASE = [0.22, 1, 0.36, 1] as const;

/** Normalises any angle into the (-180, 180] range. */
function wrapAngle(angle: number) {
  return ((((angle + 180) % 360) + 360) % 360) - 180;
}

function fadeForAngle(angle: number) {
  const d = Math.abs(angle);
  if (d <= FADE_START) return 1;
  if (d >= HIDE_AT) return 0;
  return 1 - (d - FADE_START) / (HIDE_AT - FADE_START);
}

/* -------------------------------------------------------------------------- */
/*  Entrance choreography                                                     */
/* -------------------------------------------------------------------------- */

const copyVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE, delay: 0.15 + i * 0.08 },
  }),
};

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(sectionRef);

  // Continuous rotation of the cylinder, in degrees.
  const rotation = useMotionValue(0);

  // Scrolling makes the arc spin faster for a moment.
  const { scrollY } = useScroll();
  const scrollVelocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 });

  // Pointer position, normalised to -1…1 and smoothed.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 50, damping: 18 });
  const smoothY = useSpring(pointerY, { stiffness: 50, damping: 18 });

  const yaw = useTransform(() => rotation.get() + smoothX.get() * POINTER_YAW);
  const tilt = useTransform(smoothY, [-1, 1], [POINTER_TILT, -POINTER_TILT]);

  // Light parallax as the hero leaves the viewport.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const stageY = useRange(scrollYProgress, [0, 1], [0, -90]);
  const stageScale = useRange(scrollYProgress, [0, 1], [1, 0.94]);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || !inView) return;
    const dt = Math.min(delta, 100) / 1000; // avoid jumps after a background tab
    const boost = Math.min(Math.abs(scrollVelocity.get()) / 40, MAX_SCROLL_BOOST);
    rotation.set(rotation.get() - (BASE_SPEED + boost) * dt);
  });

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function onPointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-header-theme="dark"
      aria-labelledby="hero-heading"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="dark relative isolate flex min-h-dvh flex-col items-center overflow-visible bg-background pt-24 pb-10 text-foreground sm:pt-28 sm:pb-12"
    >
      <HeroBackdrop />

      {/* 1 — Headline */}
      <div className="relative z-10 px-4 text-center">
        <h1
          id="hero-heading"
          className="font-serif text-[min(2.5rem,10.25vw)] leading-[1.02] tracking-[-0.02em] text-balance sm:text-[3.5rem] lg:text-[4.25rem]"
        >
          {hero.titleLines.map((line, i) => (
            <motion.span
              key={line}
              className="block"
              variants={copyVariants}
              initial="hidden"
              animate="show"
              custom={i}
            >
              {line}
            </motion.span>
          ))}
        </h1>
      </div>

      {/* 2 — Curved 3D carousel, full-bleed */}
      <motion.div
        style={{ y: stageY, scale: stageScale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.35 }}
        className="relative z-0 my-4 flex w-full flex-1 items-center overflow-visible sm:my-6"
      >
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label={ui.showcaseLabel}
          className="relative mx-auto h-[calc(var(--card-h)*1.45)] w-full overflow-visible [--arc-r:calc(var(--card-w)*2.75)] [--card-h:calc(var(--card-w)*1.3333)] [--card-w:clamp(104px,min(15vw,21svh),248px)] [perspective:calc(var(--arc-r)*2)]"
        >
          <motion.div
            style={{ rotateX: tilt }}
            className="absolute inset-0 overflow-visible [transform-style:preserve-3d]"
          >
            <ul className="absolute inset-0 overflow-visible [transform-style:preserve-3d] [transform:translateZ(var(--arc-r))]">
              {hero.images.map((image, index) => (
                <ArcCard
                  key={image.src}
                  image={image}
                  index={index}
                  yaw={yaw}
                  eager={index <= 3 || index >= COUNT - 3}
                />
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Side fades — overlays rather than a mask, so the 3D cards are never clipped */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-[12vw] bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-[12vw] bg-gradient-to-l from-background to-transparent"
      />

      {/* 3 — Supporting copy + CTA */}
      <div className="relative z-10 flex max-w-xl flex-col items-center px-4 text-center">
        <motion.p
          variants={copyVariants}
          initial="hidden"
          animate="show"
          custom={3}
          className="text-[17px] font-medium text-foreground"
        >
          {hero.eyebrow}
        </motion.p>
        <motion.p
          variants={copyVariants}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-2 text-[15px] leading-relaxed text-pretty text-muted-foreground sm:text-[17px]"
        >
          {hero.description}
        </motion.p>
        <motion.div variants={copyVariants} initial="hidden" animate="show" custom={5} className="mt-6">
          <ArrowLink href={hero.cta.href} size="lg">
            {hero.cta.label}
          </ArrowLink>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Card on the cylinder                                                      */
/* -------------------------------------------------------------------------- */

type ArcCardProps = {
  image: (typeof hero.images)[number];
  index: number;
  yaw: MotionValue<number>;
  eager: boolean;
};

function ArcCard({ image, index, yaw, eager }: ArcCardProps) {
  const base = index * STEP;
  const angle = useTransform(yaw, (r) => wrapAngle(base + r));
  const opacity = useTransform(angle, fadeForAngle);
  const visibility = useTransform(opacity, (o) => (o <= 0.001 ? "hidden" : "visible"));
  // Rotate onto the inside of the cylinder, then push back by its radius:
  // the centre card sits on the screen plane and the sides curve towards the viewer.
  const transform = useMotionTemplate`rotateY(${angle}deg) translateZ(calc(var(--arc-r) * -1))`;

  return (
    <motion.li
      style={{ transform, opacity, visibility }}
      className="absolute top-1/2 left-1/2 -mt-[calc(var(--card-h)/2)] -ml-[calc(var(--card-w)/2)] h-[var(--card-h)] w-[var(--card-w)] [backface-visibility:hidden]"
    >
      <figure className="relative size-full overflow-hidden rounded-2xl bg-muted shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 640px) 220px, 500px"
          unoptimized
          loading={eager ? "eager" : "lazy"}
          className="object-cover"
          draggable={false}
        />
        {/* soft sheen so flat images still read as physical cards */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.14),transparent_40%,rgba(0,0,0,0.25))]"
        />
      </figure>
    </motion.li>
  );
}

/* -------------------------------------------------------------------------- */
/*  Background                                                                */
/* -------------------------------------------------------------------------- */

function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* dot grid, faded towards the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.16)_1px,transparent_1.6px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,black_20%,transparent_75%)]" />
      {/* faint colour bloom behind the arc */}
      <div className="absolute top-1/2 left-1/2 h-[45vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-spectrum opacity-[0.07] blur-3xl motion-safe:animate-spectrum" />
      {/* bottom fade into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
