import { ShieldCheck } from "lucide-react";
import { STATS } from "@/data/business";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Counter } from "@/components/Counter";
import { VaporHaze } from "@/components/VaporHaze";

/** Story trust quantified: the numbers no competitor can match. */
export function StatsBand() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-coal/60">
      <VaporHaze intensity="section" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <AnimatedSection>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-5xl font-bold text-cream sm:text-6xl">
                  {"raw" in stat && stat.raw ? (
                    <span>{stat.value}</span>
                  ) : (
                    <Counter
                      to={stat.value}
                      suffix={"suffix" in stat ? stat.suffix : ""}
                    />
                  )}
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-ember">
                  {stat.label}
                </p>
                {"note" in stat && stat.note ? (
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-silver">
                    {stat.note}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <p className="mx-auto mt-12 flex max-w-3xl flex-col items-center justify-center gap-3 text-center text-base leading-relaxed text-silver sm:flex-row sm:text-lg">
            <ShieldCheck className="h-6 w-6 shrink-0 text-ember" aria-hidden />
            <span>
              Open earlier and later than any vape shop in the Pensacola metro
              — and active duty &amp; veterans save every single day.
            </span>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
