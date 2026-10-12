"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { ArrowLink } from "@/components/shared/arrow-button";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { pricing, site, type Plan } from "@/lib/content";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "annual";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("annual");

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="scroll-mt-20 py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="pricing-heading"
          title={pricing.title}
          description={pricing.description}
          aside={<BillingToggle value={billing} onChange={setBilling} />}
        />

        <ul className="mx-auto mt-12 grid max-w-xl grid-cols-1 gap-4 lg:mt-14 lg:max-w-none lg:grid-cols-3 lg:gap-5">
          {pricing.plans.map((plan) => (
            <li key={plan.id} className="flex">
              <PlanCard plan={plan} billing={billing} />
            </li>
          ))}
        </ul>

        <Enterprise />

        <p className="mt-8 text-center text-sm text-muted-foreground">{pricing.footnote}</p>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Monthly / Annual switch                                                   */
/* -------------------------------------------------------------------------- */

function BillingToggle({ value, onChange }: { value: Billing; onChange: (v: Billing) => void }) {
  const options: { value: Billing; label: string }[] = [
    { value: "monthly", label: "Monthly" },
    { value: "annual", label: "Annual" },
  ];

  return (
    <div role="radiogroup" aria-label="Billing period" className="inline-flex rounded-xl bg-muted p-1">
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative h-9 rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              selected ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {selected ? (
              <motion.span
                layoutId="billing-pill"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                className="absolute inset-0 rounded-lg bg-background shadow-sm ring-1 ring-border"
              />
            ) : null}
            <span className="relative inline-flex items-center gap-1.5">
              {option.label}
              {option.value === "annual" ? (
                <span className="rounded-md bg-emerald-400/15 px-1.5 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  −{pricing.annualDiscount}%
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Plan card                                                                 */
/* -------------------------------------------------------------------------- */

function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const price = billing === "annual" ? plan.annual : plan.monthly;
  const featured = plan.featured === true;

  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={cn(
        "relative flex w-full flex-col rounded-2xl p-6 sm:p-7",
        // The highlighted plan is inverted (dark on light, light on dark).
        featured
          ? "bg-foreground text-background shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)] lg:-my-3 lg:py-10"
          : "border border-border bg-background",
      )}
    >
      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 id={`plan-${plan.id}`} className="text-[1.375rem] leading-tight font-medium tracking-[-0.01em]">
            {plan.name}
          </h3>
          <p className={cn("mt-1 text-[15px]", featured ? "text-background/65" : "text-muted-foreground")}>
            {plan.tagline}
          </p>
        </div>
        {featured ? (
          <span className="shrink-0 rounded-full bg-spectrum px-2.5 py-1 text-xs font-medium text-black motion-safe:animate-spectrum">
            {pricing.featuredBadge}
          </span>
        ) : null}
      </header>

      {/* Price — digits slide when switching billing */}
      <div className="mt-8 flex flex-wrap items-baseline gap-1.5">
        <span className="text-2xl font-medium">$</span>
        <span className="relative inline-flex overflow-hidden text-5xl leading-none font-medium tracking-[-0.03em] tabular-nums">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={price}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              {price}
            </motion.span>
          </AnimatePresence>
        </span>
        {billing === "annual" ? (
          <span className={cn("ml-1 text-lg line-through", featured ? "text-background/40" : "text-muted-foreground/70")}>
            ${plan.monthly}
          </span>
        ) : null}
        <span className={cn("ml-auto text-sm", featured ? "text-background/65" : "text-muted-foreground")}>
          per month
        </span>
      </div>
      <p className={cn("mt-2 h-5 text-sm", featured ? "text-background/65" : "text-muted-foreground")}>
        {billing === "annual" ? `Billed yearly — save ${pricing.annualDiscount}%` : "Billed monthly"}
      </p>

      {/* Allowance */}
      <div
        className={cn(
          "mt-6 flex items-center gap-3 rounded-xl p-2.5",
          featured ? "bg-background/10" : "bg-muted",
        )}
      >
        <Image src={plan.thumb} alt="" width={48} height={48} className="size-12 shrink-0 rounded-lg object-cover" />
        <div className="min-w-0">
          <p className="text-[15px] font-medium">{plan.allowance}</p>
          <p className={cn("text-sm", featured ? "text-background/65" : "text-muted-foreground")}>
            {plan.allowanceNote}
          </p>
        </div>
      </div>

      <p className={cn("mt-7 text-xs font-medium tracking-[0.08em] uppercase", featured ? "text-background/60" : "text-muted-foreground")}>
        Includes
      </p>
      <ul className="mt-4 mb-8 space-y-2.5 text-[15px]">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check
              aria-hidden
              className={cn("mt-0.5 size-4 shrink-0", featured ? "text-background/70" : "text-muted-foreground")}
            />
            {feature}
          </li>
        ))}
      </ul>

      <ArrowLink
        href={`${site.appUrl}/sign-up?plan=${plan.id}`}
        variant={featured ? "secondary" : "primary"}
        className={cn(
          "mt-auto w-full",
          featured && "bg-background text-foreground hover:bg-background/90 dark:bg-background dark:hover:bg-background/90",
        )}
      >
        {plan.cta}
      </ArrowLink>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Enterprise strip                                                          */
/* -------------------------------------------------------------------------- */

function Enterprise() {
  const { enterprise } = pricing;
  const half = Math.ceil(enterprise.features.length / 2);

  return (
    <div className="mx-auto mt-5 grid max-w-xl overflow-hidden rounded-2xl border border-border bg-muted lg:max-w-none lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      {/* Collage */}
      <div className="relative grid h-44 grid-cols-3 gap-1.5 p-1.5 sm:h-56 lg:h-auto lg:min-h-72">
        {enterprise.images.map((src, i) => (
          <div key={src} className={cn("relative overflow-hidden rounded-xl", i === 1 && "translate-y-4")}>
            <Image src={src} alt="" fill sizes="(max-width: 768px) 33vw, 15vw" className="object-cover" />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-8 p-6 sm:p-8 lg:p-10 xl:flex-row xl:items-start xl:justify-between xl:gap-10">
        <div className="max-w-xs">
          <h3 className="font-serif text-[2.25rem] leading-none tracking-[-0.02em]">{enterprise.title}</h3>
          <p className="mt-3 text-[15px] text-muted-foreground">{enterprise.description}</p>
          <ArrowLink href={enterprise.cta.href} className="mt-7">
            {enterprise.cta.label}
          </ArrowLink>
        </div>

        <div className="grid flex-1 gap-2.5 sm:grid-cols-2 sm:gap-x-8">
          {[enterprise.features.slice(0, half), enterprise.features.slice(half)].map((column, c) => (
            <ul key={c} className="space-y-2.5 text-[15px]">
              {column.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  {feature}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
