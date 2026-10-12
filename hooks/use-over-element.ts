"use client";

import { useEffect, useState } from "react";

/**
 * True while any element matching `selector` sits under the top strip of the
 * viewport (where the fixed header lives). Used to flip the header's palette
 * over dark sections — mark them with `data-header-theme="dark"`.
 */
export function useOverElement(selector = '[data-header-theme="dark"]', stripPx = 72) {
  const [over, setOver] = useState(false);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (elements.length === 0) return;

    const intersecting = new Set<Element>();
    let observer: IntersectionObserver | null = null;

    const observe = () => {
      observer?.disconnect();
      intersecting.clear();
      const bottom = Math.max(window.innerHeight - stripPx, 0);
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) intersecting.add(entry.target);
            else intersecting.delete(entry.target);
          }
          setOver(intersecting.size > 0);
        },
        { rootMargin: `0px 0px -${bottom}px 0px` },
      );
      elements.forEach((el) => observer?.observe(el));
    };

    observe();
    window.addEventListener("resize", observe);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", observe);
    };
  }, [selector, stripPx]);

  return over;
}
