import { Plus } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { faq, site } from "@/lib/content";

/**
 * FAQ — heading on the left (sticky on desktop), accordion on the right.
 * Built on the Radix primitive (same one shadcn's Accordion wraps) to get a
 * card-per-question look with a rotating "+" instead of the default chevrons.
 */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-20 py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-heading"
            title={faq.title}
            description={
              <>
                {faq.description}{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-foreground underline underline-offset-4 transition-colors hover:text-foreground/70"
                >
                  {site.email}
                </a>
              </>
            }
          />
        </div>

        <AccordionPrimitive.Root type="single" collapsible className="flex flex-col gap-3">
          {faq.items.map((item, i) => (
            <AccordionPrimitive.Item
              key={item.q}
              value={`item-${i}`}
              className="rounded-2xl bg-muted transition-colors data-[state=open]:bg-muted/70"
            >
              <AccordionPrimitive.Header asChild>
                <h3>
                  <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-6 rounded-2xl px-5 py-5 text-left text-[17px] leading-6 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                    {item.q}
                    <span
                      aria-hidden
                      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-background transition-transform duration-300 ease-out-expo group-data-[state=open]:rotate-45"
                    >
                      <Plus className="size-4" />
                    </span>
                  </AccordionPrimitive.Trigger>
                </h3>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted-foreground">{item.a}</p>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </Container>
    </section>
  );
}
