import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/shared/container";
import { footerLegal, footerNav, newsletter, site, systemStatus, ui } from "@/lib/content";

import { NewsletterForm } from "./newsletter-form";
import { ThemeToggle } from "./theme-toggle";

const linkFocus =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function SiteFooter() {
  return (
    <footer aria-labelledby="footer-heading" className="relative overflow-hidden bg-background text-foreground">
      <h2 id="footer-heading" className="sr-only">
        {ui.footerHeading}
      </h2>

      <Container>
        <Wordmark />

        <div className="relative -mt-px mb-4 rounded-2xl border border-border bg-muted px-6 pt-10 pb-6 sm:mb-6 sm:px-10 sm:pt-12 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-8">
            <div className="max-w-[26rem]">
              <h2 className="font-serif text-[2rem] leading-none tracking-[-0.01em] text-foreground">
                {newsletter.title}
              </h2>
              <p className="mt-2 text-[15px] text-muted-foreground">{newsletter.description}</p>
              <NewsletterForm />
            </div>

            <nav aria-label={ui.footerNavLabel}>
              <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
                {footerNav.map((group) => (
                  <div key={group.title}>
                    <h3 className="text-xs font-medium tracking-[0.08em] text-foreground/85 uppercase">
                      {group.title}
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className={`group inline-flex items-center gap-1 text-[15px] text-muted-foreground transition-colors hover:text-foreground ${linkFocus}`}
                          >
                            {link.label}
                            {link.external ? (
                              <ArrowUpRight
                                aria-hidden
                                className="size-3.5 opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                              />
                            ) : null}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 pb-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:pb-0">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="inline-flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60 motion-reduce:hidden" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                {systemStatus}
              </span>
              <span>
                © {site.copyrightYear} {site.name}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <ul className="flex flex-wrap items-center gap-5">
                {footerLegal.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={`transition-colors hover:text-foreground ${linkFocus}`}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

/**
 * Oversized brand lockup that sits on top of the footer card, cropped at the
 * bottom. The mark is rendered twice: a solid copy for layout and a masked copy
 * filled with the animated spectrum gradient.
 */
function Wordmark() {
  return (
    <div aria-hidden className="relative h-[15vw] overflow-hidden select-none">
      <div className="absolute bottom-[-0.3em] left-1/2 flex -translate-x-1/2 items-end gap-[0.12em] text-[22vw] leading-none font-medium tracking-[-0.05em] whitespace-nowrap text-foreground/[0.07] dark:text-foreground/[0.09]">
        <span
          className="inline-block size-[0.86em] shrink-0 translate-y-[-0.13em] bg-spectrum [mask-image:url(/brand-mask.svg)] [mask-size:100%_100%] [mask-repeat:no-repeat] motion-safe:animate-spectrum"
        />
        <span>{site.name}</span>
      </div>
    </div>
  );
}
