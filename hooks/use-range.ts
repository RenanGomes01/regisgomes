"use client";

import { transform, useTransform, type MotionValue } from "motion/react";

/**
 * Range → range mapping of a motion value (clamped), like
 * `useTransform(value, input, output)` — but always computed on the JS side.
 *
 * Why: when `useTransform` receives `useScroll()` progress with plain ranges, Motion
 * may hand opacity/filter to the browser's native ScrollTimeline. Inside long sticky
 * sections driven by Lenis that native timeline disagrees with Motion's own progress,
 * leaving values stuck at their first keyframe. A function transformer is never
 * accelerated, so every property stays in sync with the same progress value.
 */
export function useRange<T extends number | string>(
  value: MotionValue<number>,
  input: readonly number[],
  output: readonly T[],
): MotionValue<T> {
  return useTransform(value, (v) => transform(v, [...input], [...output]) as T);
}
