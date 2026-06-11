import { Flame, ArrowUpRight } from "lucide-react";
import { BUSINESS, DEALS } from "@/data/business";
import { AnimatedSection } from "@/components/AnimatedSection";
import { StaggerItem } from "@/components/StaggerItem";
import { ThursdayCountdown } from "@/components/ThursdayCountdown";
import { GlowCard } from "@/components/GlowCard";
import { FacebookIcon } from "@/components/icons";

export function DealsSection() {
  const [throwdown, ...rest] = DEALS;

  return (
    <section id="deals" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <AnimatedSection>
        <p className="eyebrow-rule text-sm font-bold uppercase tracking-[0.25em] text-ember">
          <span className="mr-3 font-display text-base text-silver/50">01</span>
          The Deal Board
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-none tracking-tight text-cream sm:text-6xl">
          Deals worth the drive
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-silver sm:text-lg">
          The board changes weekly. Prices are marked in store — these are this
          month&apos;s headliners. In store only, while supplies last.
        </p>
      </AnimatedSection>

      <AnimatedSection className="mt-12" staggerChildren={0.12}>
        <div className="grid gap-5 lg:grid-cols-2">
          {/* Throwdown Thursday — the flagship */}
          <StaggerItem className="lg:row-span-2">
            <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-ember/40 bg-gradient-to-br from-ember/15 via-coal to-coal p-8 transition-transform duration-300 hover:-translate-y-1 sm:p-10">
              <span aria-hidden className="beam-ring" />
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-ember/20 opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-ember px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
                  <Flame className="h-3.5 w-3.5" aria-hidden /> Flagship
                </span>
                <h3 className="mt-6 font-display text-4xl font-bold uppercase leading-[0.95] text-cream sm:text-5xl">
                  {throwdown.title}
                </h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-silver">
                  {throwdown.cadence}
                </p>
                <p className="mt-5 max-w-md text-base leading-relaxed text-silver">
                  {throwdown.detail}
                </p>
              </div>
              <div className="relative mt-8 border-t border-white/10 pt-6">
                <ThursdayCountdown />
              </div>
            </article>
          </StaggerItem>

          {rest.map((deal) => (
            <StaggerItem key={deal.title}>
              <GlowCard className="rounded-3xl">
                <article className="glass group flex h-full flex-col justify-between rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ember/40">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-ember">
                        {deal.cadence}
                      </p>
                      <h3 className="mt-3 font-display text-2xl font-bold uppercase text-cream sm:text-3xl">
                        {deal.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-silver">
                        {deal.detail}
                      </p>
                    </div>
                    <p
                      aria-hidden
                      className="shrink-0 -rotate-3 font-display text-3xl font-bold uppercase leading-none text-ember/90 transition-transform duration-300 group-hover:rotate-0 group-hover:scale-110 sm:text-4xl"
                    >
                      {deal.tag}
                    </p>
                  </div>
                </article>
              </GlowCard>
            </StaggerItem>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-8" delay={0.1}>
        <a
          href={BUSINESS.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-silver transition-colors hover:text-cream"
        >
          <FacebookIcon className="h-4 w-4 text-ember" />
          Fresh deals drop on Facebook first
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </a>
      </AnimatedSection>
    </section>
  );
}
