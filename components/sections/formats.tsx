import Image from "next/image";
import type { CSSProperties } from "react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { formats } from "@/lib/content";

/**
 * Four aspect ratios of the same take, each with its label underneath.
 *
 * - Phones / tablets: horizontal scroller. Every image has the same fixed height
 *   and its width follows the aspect ratio.
 * - Desktop (lg+): one row. Each card's flex-grow equals width/height, so all images
 *   end up with the same height and the row fills the container exactly.
 */
export function Formats() {
  return (
    <section aria-labelledby="formats-heading" className="py-24 sm:py-32">
      <Container>
        <SectionHeading id="formats-heading" title={formats.title} description={formats.description} />

        <ul className="scrollbar-none -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 sm:-mx-6 sm:mt-12 sm:scroll-px-6 sm:px-6 md:gap-5 lg:mx-0 lg:mt-14 lg:snap-none lg:items-start lg:overflow-visible lg:px-0 lg:pb-0">
          {formats.items.map((item) => (
            <li
              key={item.label}
              style={{ "--ratio": item.w / item.h } as CSSProperties}
              className="group shrink-0 snap-start self-end lg:min-w-0 lg:shrink lg:self-start lg:[flex:var(--ratio)_1_0%]"
            >
              <figure>
                <div
                  style={{ aspectRatio: `${item.w} / ${item.h}` }}
                  className="relative h-[min(15rem,calc(80vw/var(--ratio)))] overflow-hidden rounded-2xl bg-muted ring-1 ring-border sm:h-[min(18rem,calc(70vw/var(--ratio)))] md:h-[min(20rem,calc(60vw/var(--ratio)))] lg:h-auto lg:w-full"
                >
                  <Image
                    src={item.src ?? formats.image.src}
                    alt={`${formats.image.alt} — ${item.label} ${item.ratio}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={100}
                    style={{ objectPosition: item.focus }}
                    className="object-cover transition-transform duration-700 ease-out-expo will-change-transform group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-3 flex items-baseline justify-between gap-3 text-[15px]">
                  <span className="font-medium">{item.label}</span>
                  <span className="font-mono text-xs text-muted-foreground">{item.ratio}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
