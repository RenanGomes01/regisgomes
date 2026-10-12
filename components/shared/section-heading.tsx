import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Used as the heading id so the parent <section> can point `aria-labelledby` at it. */
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  as?: "h1" | "h2" | "h3";
  /** Slot rendered to the right of the copy on large screens (toggles, links…). */
  aside?: ReactNode;
  className?: string;
  titleClassName?: string;
};

/** Serif display heading + muted lead paragraph used at the top of every section. */
export function SectionHeading({
  id,
  title,
  description,
  align = "start",
  as: Heading = "h2",
  aside,
  className,
  titleClassName,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-8",
        aside && "lg:flex-row lg:items-end lg:justify-between",
        centered && "items-center text-center",
        className,
      )}
    >
      <div className={cn("max-w-3xl", centered && "mx-auto")}>
        <Heading
          id={id}
          className={cn(
            "font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.02em] text-balance",
            titleClassName,
          )}
        >
          {title}
        </Heading>
        {description ? (
          <p
            className={cn(
              "mt-5 max-w-xl text-[17px] leading-relaxed text-pretty text-muted-foreground",
              centered && "mx-auto",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}
