import CountUp from "@/components/reactbits/count-up";
import { Container } from "@/components/shared/container";
import { LineChart } from "@/components/shared/line-chart";
import { LogBarChart } from "@/components/shared/log-bar-chart";
import { SectionHeading } from "@/components/shared/section-heading";
import { benchmarks } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Benchmarks() {
  const { headline, stats, comparison } = benchmarks;

  return (
    <section
      id="benchmarks"
      aria-labelledby="benchmarks-heading"
      data-header-theme="dark"
      className="dark scroll-mt-0 bg-background py-24 text-foreground sm:py-32"
    >
      <Container>
        <SectionHeading id="benchmarks-heading" title={benchmarks.title} description={benchmarks.description} />

        {/* Headline metric + 30-day trend */}
        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-16">
          <div>
            <p className="flex items-baseline font-serif text-[clamp(5rem,12vw,9rem)] leading-[0.85] tracking-[-0.04em] tabular-nums">
              <CountUp to={headline.value} from={headline.from} direction="up" duration={1.6} />
              <span className="ml-1 text-[0.5em] text-muted-foreground">{headline.unit}</span>
            </p>
            <h3 className="mt-6 text-lg font-medium">{headline.label}</h3>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              {headline.description}
            </p>
          </div>

          <LineChart
            data={headline.series}
            yTicks={headline.yTicks}
            unit={headline.chartUnit}
            xLabels={[headline.xLabels[0], headline.xLabels[1]]}
          />
        </div>

        {/* Stat tiles */}
        <ul className="mt-16 grid grid-cols-1 divide-y divide-border rounded-2xl border border-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {stats.map((stat) => (
            <li key={stat.label} className="p-6 sm:p-8">
              <p className="flex items-baseline text-5xl font-medium tracking-[-0.03em] tabular-nums">
                <CountUp to={stat.value} duration={1.4} />
                <span className="ml-0.5 text-3xl text-muted-foreground">{stat.suffix}</span>
              </p>
              <p className="mt-3 text-[15px] text-muted-foreground">{stat.label}</p>
            </li>
          ))}
        </ul>

        {/* Workflow comparison on a log scale */}
        <div className="mt-20 rounded-2xl border border-border bg-muted/40 p-6 sm:p-10">
          <div className="max-w-xl">
            <h3 className="font-serif text-[2rem] leading-[1.05] tracking-[-0.02em]">{comparison.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{comparison.description}</p>
          </div>

          <LogBarChart
            className="mt-10 hidden md:grid"
            items={comparison.items}
            ticks={comparison.ticks}
            minSeconds={comparison.minSeconds}
          />

          {/* Small screens: the same data as a list */}
          <ul className="mt-8 divide-y divide-border md:hidden">
            {comparison.items.map((item) => (
              <li key={item.label} className="flex items-center justify-between py-3 text-[15px]">
                <span className={cn(item.highlight ? "font-medium" : "text-muted-foreground")}>{item.label}</span>
                <span className={cn("font-mono text-sm", item.highlight ? "text-foreground" : "text-muted-foreground")}>
                  {item.display}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
