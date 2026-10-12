import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const arrowButtonVariants = cva(
  [
    "group inline-flex items-center justify-center gap-1.5 rounded-xl font-medium whitespace-nowrap",
    "transition-[opacity,background-color,transform] duration-200 active:scale-[0.98]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-foreground text-background shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_12px_36px_-14px_rgba(0,0,0,0.45)] hover:opacity-90 dark:shadow-[0_12px_36px_-14px_rgba(0,0,0,0.8)]",
        secondary:
          "bg-foreground/[0.06] text-foreground hover:bg-foreground/[0.1] dark:bg-white/[0.1] dark:hover:bg-white/[0.15]",
        outline: "border border-border bg-background text-foreground hover:bg-muted",
      },
      size: {
        sm: "h-9 px-3.5 text-[13px]",
        md: "h-11 px-4 text-sm",
        lg: "h-12 px-5 text-[15px]",
      },
      withArrow: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { withArrow: true, size: "md", className: "pr-3 pl-4" },
      { withArrow: true, size: "lg", className: "gap-2.5 pr-4 pl-5" },
    ],
    defaultVariants: { variant: "primary", size: "md", withArrow: true },
  },
);

/** Arrow that nudges right on hover of the parent `group`. */
export function ArrowGlyph({ className }: { className?: string }) {
  return (
    <ArrowRight
      aria-hidden
      strokeWidth={2}
      className={cn(
        "size-4 shrink-0 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5",
        className,
      )}
    />
  );
}

type ArrowLinkProps = ComponentProps<"a"> & VariantProps<typeof arrowButtonVariants>;

/** Anchor styled as a button. Use for CTAs and in-page section links. */
export function ArrowLink({
  className,
  variant,
  size,
  withArrow = true,
  children,
  ...props
}: ArrowLinkProps) {
  return (
    <a className={cn(arrowButtonVariants({ variant, size, withArrow }), className)} {...props}>
      {children}
      {withArrow ? <ArrowGlyph /> : null}
    </a>
  );
}

type ArrowButtonProps = ComponentProps<"button"> & VariantProps<typeof arrowButtonVariants>;

export function ArrowButton({
  className,
  variant,
  size,
  withArrow = true,
  type = "button",
  children,
  ...props
}: ArrowButtonProps) {
  return (
    <button
      type={type}
      className={cn(arrowButtonVariants({ variant, size, withArrow }), className)}
      {...props}
    >
      {children}
      {withArrow ? <ArrowGlyph /> : null}
    </button>
  );
}
