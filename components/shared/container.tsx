import type { ComponentProps, ElementType } from "react";

import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType> = {
  as?: T;
} & Omit<ComponentProps<T>, "as">;

/** Page-width wrapper: 1440px max with the site's horizontal gutters. */
export function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";
  return (
    <Component
      className={cn("mx-auto w-full max-w-[1440px] px-4 sm:px-6", className)}
      {...props}
    />
  );
}
