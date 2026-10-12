"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

type Bar = { label: string; seconds: number; display: string; highlight?: boolean };
type Tick = { label: string; seconds: number };

type LogBarChartProps = {
  items: Bar[];
  ticks: Tick[];
  minSeconds: number;
  className?: string;
};

/**
 * Horizontal bars on a log₁₀ time axis (seconds → months fit on one row).
 * Desktop only — callers render a plain list on small screens.
 */
export function LogBarChart({ items, ticks, minSeconds, className }: LogBarChartProps) {
  const reduceMotion = useReducedMotion();
  const maxSeconds = ticks[ticks.length - 1].seconds;
  const lo = Math.log10(minSeconds);
  const hi = Math.log10(maxSeconds);
  const pct = (s: number) => Math.min(Math.max((Math.log10(s) - lo) / (hi - lo), 0), 1) * 100;

  return (
    <div className={cn("grid grid-cols-[9rem_minmax(0,1fr)] gap-x-6", className)}>
      {/* Tick labels row */}
      <div />
      <div className="relative h-6 font-mono text-[11px] text-muted-foreground">
        {ticks.map((t) => (
          <span key={t.label} className="absolute -translate-x-1/2" style={{ left: `${pct(t.seconds)}%` }}>
            {t.label}
          </span>
        ))}
      </div>

      {items.map((item, i) => (
        <div key={item.label} className="contents">
          <div
            className={cn(
              "flex h-14 items-center text-[15px]",
              item.highlight ? "font-medium text-foreground" : "text-muted-foreground",
            )}
          >
            {item.label}
          </div>
          <div className="relative flex h-14 items-center">
            {/* tick guides */}
            {ticks.map((t) => (
              <span
                key={t.label}
                aria-hidden
                className="absolute inset-y-0 w-px border-l border-dashed border-border"
                style={{ left: `${pct(t.seconds)}%` }}
              />
            ))}
            <motion.div
              className={cn(
                "relative h-8 rounded-lg",
                item.highlight ? "bg-spectrum motion-safe:animate-spectrum" : "bg-foreground/15",
              )}
              initial={reduceMotion ? false : { width: 0 }}
              whileInView={{ width: `${Math.max(pct(item.seconds), 1.5)}%` }}
              style={reduceMotion ? { width: `${Math.max(pct(item.seconds), 1.5)}%` } : undefined}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.1, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className={cn(
                  "absolute top-1/2 left-full ml-3 -translate-y-1/2 font-mono text-xs whitespace-nowrap",
                  item.highlight ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.display}
              </span>
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
}
