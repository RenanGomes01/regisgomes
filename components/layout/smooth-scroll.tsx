"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Global smooth scrolling. Hash links (#pricing, #faq…) are handled by Lenis
 * through the `anchors` option. Disabled entirely for reduced-motion users.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        anchors: { offset: 0 },
      }}
    >
      {children}
    </ReactLenis>
  );
}
