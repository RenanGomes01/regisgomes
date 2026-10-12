"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

/** True once the page has scrolled further than `offset` pixels. */
export function useScrolledPast(offset = 80) {
  const { scrollY } = useScroll();
  const [past, setPast] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > offset;
    setPast((prev) => (prev === next ? prev : next));
  });

  return past;
}
