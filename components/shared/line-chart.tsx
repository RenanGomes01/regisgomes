"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";

type LineChartProps = {
  data: number[];
  yTicks: number[];
  /** Unit appended to y-axis labels. */
  unit?: string;
  xLabels?: [string, string];
  className?: string;
};

const W = 600;
const H = 240;

/** Catmull-Rom → cubic Bézier, for a smooth line through every point. */
function smoothPath(points: [number, number][]) {
  if (points.length < 2) return "";
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

/**
 * Responsive SVG line chart. The SVG stretches (preserveAspectRatio="none") with a
 * non-scaling stroke; labels are HTML so text never distorts.
 */
export function LineChart({ data, yTicks, unit = "", xLabels, className }: LineChartProps) {
  const gradientId = useId();
  const reduceMotion = useReducedMotion();

  const min = Math.min(...yTicks);
  const max = Math.max(...yTicks);
  const yFor = (v: number) => H - ((v - min) / (max - min)) * H;
  const points = data.map((v, i) => [(i / (data.length - 1)) * W, yFor(v)] as [number, number]);
  const line = smoothPath(points);
  const area = `${line} L ${W} ${H} L 0 ${H} Z`;
  const last = points[points.length - 1];

  return (
    <div className={className}>
      <div className="relative flex gap-3">
        {/* y-axis labels */}
        <div className="relative w-8 shrink-0 font-mono text-[11px] text-muted-foreground">
          {yTicks.map((t) => (
            <span
              key={t}
              className="absolute right-0 -translate-y-1/2"
              style={{ top: `${(yFor(t) / H) * 100}%` }}
            >
              {t}
              {unit}
            </span>
          ))}
        </div>

        <div className="relative aspect-[5/2] flex-1">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 size-full overflow-visible"
            aria-hidden
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity="0.28" />
                <stop offset="100%" stopColor="var(--chart-1)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {yTicks.map((t) => (
              <line
                key={t}
                x1={0}
                x2={W}
                y1={yFor(t)}
                y2={yFor(t)}
                stroke="var(--border)"
                strokeDasharray="3 5"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            <motion.path
              d={area}
              fill={`url(#${gradientId})`}
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
            <motion.path
              d={line}
              fill="none"
              stroke="var(--chart-1)"
              strokeWidth={2}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={reduceMotion ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>

          {/* "Today" marker — HTML so it stays round when the SVG stretches */}
          <span
            className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2"
            style={{ left: "100%", top: `${(last[1] / H) * 100}%` }}
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-chart-1/60 motion-reduce:hidden" />
            <span className="absolute inset-0 rounded-full bg-chart-1 ring-4 ring-background" />
          </span>
        </div>
      </div>

      {xLabels ? (
        <div className="mt-3 ml-11 flex justify-between font-mono text-[11px] text-muted-foreground">
          <span>{xLabels[0]}</span>
          <span>{xLabels[1]}</span>
        </div>
      ) : null}
    </div>
  );
}
