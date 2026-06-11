import { Star, ArrowUpRight } from "lucide-react";
import { BUSINESS, REVIEWS } from "@/data/business";
import { AnimatedSection } from "@/components/AnimatedSection";
import { StaggerItem } from "@/components/StaggerItem";
import { GlowCard } from "@/components/GlowCard";
import { Counter } from "@/components/Counter";
import { GoogleIcon } from "@/components/icons";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-ember text-ember" aria-hidden />
      ))}
    </div>
  );
}

/** Peer trust: real Google review quotes, static (no third-party script tax). */
export function Reviews() {
  return (
    <section id="reviews" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <AnimatedSection className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow-rule text-sm font-bold uppercase tracking-[0.25em] text-ember">
            <span className="mr-3 font-display text-base text-silver/50">03</span>
            The Word Around Town
          </p>
          <div className="mt-4 flex items-end gap-5">
            <p className="font-display text-[6rem] font-bold leading-[0.8] text-cream sm:text-[8rem]">
              {BUSINESS.rating}
            </p>
            <div className="pb-2">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 fill-ember text-ember sm:h-7 sm:w-7"
                    aria-hidden
                  />
                ))}
              </div>
              <p className="mt-2 font-display text-xl font-semibold uppercase tracking-wide text-silver">
                from <Counter to={BUSINESS.reviewCount} suffix="+" className="text-cream" /> Google
                reviews
              </p>
            </div>
          </div>
          <h2 className="mt-4 max-w-xl font-display text-3xl font-bold uppercase leading-none tracking-tight text-cream sm:text-4xl">
            People who actually shop here
          </h2>
        </div>
        <a
          href={BUSINESS.googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="glass group inline-flex shrink-0 items-center gap-2.5 rounded-full px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-white/10"
        >
          <GoogleIcon className="h-4 w-4 text-silver" />
          Read them all
          <ArrowUpRight className="h-4 w-4 text-ember transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </a>
      </AnimatedSection>

      <AnimatedSection className="mt-12" staggerChildren={0.12}>
        <div className="grid gap-5 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <StaggerItem key={review.name}>
              <GlowCard className="rounded-3xl">
                <figure className="glass flex h-full flex-col justify-between rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ember/40">
                <div>
                  <Stars count={review.stars} />
                  <blockquote className="mt-5 text-[15px] leading-relaxed text-cream/90">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                </div>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ember/15 font-display text-sm font-bold uppercase text-ember">
                    {review.name[0]}
                  </span>
                  <span className="text-sm font-semibold text-silver">
                    {review.name} · Google
                  </span>
                </figcaption>
              </figure>
              </GlowCard>
            </StaggerItem>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
