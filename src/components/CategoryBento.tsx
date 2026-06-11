import Image from "next/image";
import { MapPin, Star, ArrowUpRight } from "lucide-react";
import { BUSINESS, CATEGORIES, ALSO_CARRY, REVIEWS } from "@/data/business";
import { AnimatedSection } from "@/components/AnimatedSection";
import { StaggerItem } from "@/components/StaggerItem";
import { GlowCard } from "@/components/GlowCard";
import { OpenNowBadge } from "@/components/OpenNowBadge";
import { cn } from "@/lib/utils";

const TILE_BASE =
  "group relative flex h-full min-h-[230px] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-ash transition-all duration-300 hover:-translate-y-1 hover:border-ember/50";

function ProductTile({
  cat,
}: {
  cat: (typeof CATEGORIES)[number];
}) {
  return (
    <GlowCard className="rounded-3xl">
      <article className={TILE_BASE}>
        <Image
          src={cat.image}
          alt={cat.name}
          fill
          sizes={cat.big ? "(max-width: 640px) 80vw, 50vw" : "(max-width: 640px) 80vw, 25vw"}
          className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-smoke via-smoke/40 to-transparent"
        />
        <div className="relative p-6">
          <h3 className="font-display text-2xl font-bold uppercase text-cream sm:text-3xl">
            {cat.name}
          </h3>
          <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-silver">
            {cat.blurb}
          </p>
        </div>
      </article>
    </GlowCard>
  );
}

/** LIVE tiles mixed into the product grid — the 2026 bento move. */
function HoursTile() {
  return (
    <GlowCard className="rounded-3xl">
      <article className={cn(TILE_BASE, "justify-between bg-gradient-to-br from-ember/15 via-coal to-coal p-6")}>
        <p className="font-neon text-3xl tracking-[0.25em] text-[#fff3ea] neon-tube neon-hum">
          OPEN
        </p>
        <div>
          <p className="font-display text-2xl font-bold uppercase leading-tight text-cream">
            13 hours a day.
            <br />
            7 days a week.
          </p>
          <div className="mt-3">
            <OpenNowBadge />
          </div>
        </div>
      </article>
    </GlowCard>
  );
}

function ReviewTile() {
  const r = REVIEWS[0];
  return (
    <GlowCard className="rounded-3xl">
      <article className={cn(TILE_BASE, "justify-between p-6")}>
        <div className="flex items-center gap-2">
          <span className="font-display text-4xl font-bold text-cream">
            {BUSINESS.rating}
          </span>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-ember text-ember" aria-hidden />
            ))}
          </div>
        </div>
        <blockquote className="mt-4 text-sm leading-relaxed text-silver">
          &ldquo;{r.quote.slice(0, 110)}…&rdquo;
          <footer className="mt-2 font-semibold text-cream/80">— {r.name}, Google</footer>
        </blockquote>
      </article>
    </GlowCard>
  );
}

function MapTile() {
  return (
    <GlowCard className="rounded-3xl">
      <a
        href={BUSINESS.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(TILE_BASE, "cursor-pointer justify-between bg-gradient-to-br from-ash via-coal to-coal p-6")}
      >
        <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-ember/15">
          <span className="dot-ping absolute inline-block h-3 w-3 rounded-full text-ember" />
          <MapPin className="h-6 w-6 text-ember" aria-hidden />
        </span>
        <span>
          <span className="font-display text-2xl font-bold uppercase leading-tight text-cream">
            {BUSINESS.address.street}
            <br />
            Cantonment, FL
          </span>
          <span className="mt-2 flex items-center gap-1.5 text-sm font-semibold uppercase tracking-widest text-ember">
            Get directions
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </span>
        </span>
      </a>
    </GlowCard>
  );
}

export function CategoryBento() {
  const [disposables, mods, tanks, coils] = CATEGORIES;

  return (
    <section id="shop" className="relative overflow-hidden bg-coal/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <AnimatedSection>
          <p className="eyebrow-rule text-sm font-bold uppercase tracking-[0.25em] text-ember">
            <span className="mr-3 font-display text-base text-silver/50">02</span>
            The Wall
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-none tracking-tight text-cream sm:text-6xl">
            More stock than you can
            <br className="max-sm:hidden" /> shake a stick at
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-silver sm:text-lg">
            That&apos;s a real customer review. If it vapes, we carry it — and
            if we don&apos;t have it, ask. We&apos;ll get it.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mt-12" staggerChildren={0.08}>
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
            <StaggerItem className="w-[80vw] shrink-0 snap-center sm:w-auto sm:shrink lg:col-span-2 lg:row-span-2">
              <ProductTile cat={disposables} />
            </StaggerItem>
            <StaggerItem className="w-[80vw] shrink-0 snap-center sm:w-auto sm:shrink">
              <ProductTile cat={mods} />
            </StaggerItem>
            <StaggerItem className="w-[80vw] shrink-0 snap-center sm:w-auto sm:shrink">
              <HoursTile />
            </StaggerItem>
            <StaggerItem className="w-[80vw] shrink-0 snap-center sm:w-auto sm:shrink">
              <ProductTile cat={tanks} />
            </StaggerItem>
            <StaggerItem className="w-[80vw] shrink-0 snap-center sm:w-auto sm:shrink">
              <ProductTile cat={coils} />
            </StaggerItem>
            <StaggerItem className="w-[80vw] shrink-0 snap-center sm:w-auto sm:shrink lg:col-span-2">
              <ReviewTile />
            </StaggerItem>
            <StaggerItem className="w-[80vw] shrink-0 snap-center sm:w-auto sm:shrink lg:col-span-2">
              <MapTile />
            </StaggerItem>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-10" delay={0.1}>
          <div className="glass rounded-3xl p-7">
            <p className="text-xs font-bold uppercase tracking-widest text-ember">
              Also on the shelves
            </p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {ALSO_CARRY.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-cream"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
