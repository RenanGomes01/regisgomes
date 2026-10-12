"use client";

import { ArrowRight, Check } from "lucide-react";
import { useId, useState, type FormEvent } from "react";

import { newsletter } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Email capture. Submission is mocked — wire `onSubmit` to the real provider later. */
export function NewsletterForm() {
  const inputId = useId();
  const [status, setStatus] = useState<"idle" | "done">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) return;
    setStatus("done");
    form.reset();
  }

  return (
    <form onSubmit={onSubmit} className="relative mt-6" noValidate={false}>
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <input
        id={inputId}
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder={newsletter.placeholder}
        onChange={() => status === "done" && setStatus("idle")}
        className="h-13 w-full rounded-xl border border-border bg-background pr-14 pl-4 text-[15px] text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="absolute top-1.5 right-1.5 inline-flex size-10 items-center justify-center rounded-lg bg-foreground text-background transition-[opacity,transform] hover:opacity-85 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {status === "done" ? <Check className="size-4" /> : <ArrowRight className="size-4" />}
      </button>
      <p
        aria-live="polite"
        className={cn(
          "mt-2 text-sm text-muted-foreground transition-opacity",
          status === "done" ? "opacity-100" : "opacity-0",
        )}
      >
        {status === "done" ? newsletter.success : " "}
      </p>
    </form>
  );
}
