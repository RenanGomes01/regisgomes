import { cn } from "@/lib/utils";

/**
 * Placeholder brand symbol (an "aperture" built from two arcs).
 * Keep the same path in /public/brand-mask.svg — it's used as a CSS mask for the
 * spectrum-filled version in the footer.
 */
export const BRAND_MARK_PATH =
  "M12 2a10 10 0 1 0 10 10h-4.5A5.5 5.5 0 1 1 12 6.5V2Zm2 0v8h8A10 10 0 0 0 14 2Z";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("size-5 shrink-0", className)}
      fill="currentColor"
    >
      <path d={BRAND_MARK_PATH} />
    </svg>
  );
}
