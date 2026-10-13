"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { ui } from "@/lib/content";
import { cn } from "@/lib/utils";

const options = [
  { value: "light", label: ui.themeLight, Icon: Sun },
  { value: "system", label: ui.themeSystem, Icon: Monitor },
  { value: "dark", label: ui.themeDark, Icon: Moon },
] as const;

const subscribe = () => () => {};

/** Three-way theme switch (light / system / dark). */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  // Theme is only known on the client — avoid a hydration mismatch on the pressed state.
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  return (
    <div
      role="radiogroup"
      aria-label={ui.themeGroup}
      className={cn("inline-flex items-center gap-0.5 rounded-lg border border-border p-0.5", className)}
    >
      {options.map(({ value, label, Icon }) => {
        const selected = mounted && theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={label}
            onClick={() => setTheme(value)}
            className={cn(
              "inline-flex size-7 items-center justify-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              selected
                ? "bg-foreground/[0.08] text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="size-3.5" />
          </button>
        );
      })}
    </div>
  );
}
