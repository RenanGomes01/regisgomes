import { Benchmarks } from "@/components/sections/benchmarks";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Formats } from "@/components/sections/formats";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { PromptReveal } from "@/components/sections/prompt-reveal";
import { Stories } from "@/components/sections/stories";
import { VariationsGrid } from "@/components/sections/variations-grid";

export default function Home() {
  return (
    <>
      <Hero />
      <PromptReveal />
      <VariationsGrid />
      <Benchmarks />
      <Formats />
      <Stories />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}

