import { MapPin, Phone, Star, ShieldCheck } from "lucide-react";
import { BUSINESS } from "@/data/business";
import { VaporHaze } from "@/components/VaporHaze";
import { VaporCanvas } from "@/components/VaporCanvas";
import { NeonOpenSign } from "@/components/NeonOpenSign";
import { WordRotate } from "@/components/WordRotate";
import { FloatingProducts } from "@/components/FloatingProducts";

/**
 * "The Shop at Night" hero — asymmetric split. Left: neon sign + kinetic
 * headline + actions. Right: floating product cluster (the shop window).
 * Entrances via CSS keyframes (.anim-rise) — Motion hydration trap avoided.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <VaporHaze />
      <VaporCanvas />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-24 lg:pt-20">
        {/* ——— Left: the pitch ——— */}
        <div className="text-center lg:text-left">
          <div className="anim-rise anim-d-1 flex justify-center lg:justify-start">
            <NeonOpenSign />
          </div>

          <h1 className="anim-rise anim-d-2 mt-8 font-display text-[3.4rem] font-bold uppercase leading-[0.92] tracking-tight text-cream sm:text-7xl xl:text-[5.4rem]">
            Your next{" "}
            <WordRotate
              className="text-shimmer"
              words={["setup", "flavor", "mod", "coil", "cloud"]}
            />
            <br />
            is on the wall.
          </h1>

          <p className="anim-rise anim-d-3 mx-auto mt-6 max-w-xl text-base leading-relaxed text-silver sm:text-lg lg:mx-0">
            Disposables, mods, tanks, coils and 100+ juice flavors — stocked
            deep on Highway 29 in Cantonment. Family-owned since{" "}
            {BUSINESS.foundedYear}, with staff who know your setup by name.
          </p>

          <div className="anim-rise anim-d-4 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href={BUSINESS.phoneHref}
              className="glow-cta inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-ember px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition-transform duration-200 hover:scale-[1.04] active:scale-[0.97] sm:w-auto"
            >
              <Phone className="h-5 w-5" aria-hidden />
              Call the Shop
            </a>
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex w-full items-center justify-center gap-2.5 rounded-full px-8 py-4 text-base font-bold uppercase tracking-wide text-cream transition-colors duration-200 hover:bg-white/10 sm:w-auto"
            >
              <MapPin className="h-5 w-5 text-ember" aria-hidden />
              Get Directions
            </a>
          </div>

          <div className="anim-rise anim-d-5 mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a
              href={BUSINESS.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-cream transition-opacity hover:opacity-85"
            >
              <Star className="h-4 w-4 fill-ember text-ember" aria-hidden />
              {BUSINESS.rating}★ · {BUSINESS.reviewCount} Google reviews
            </a>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-cream">
              <ShieldCheck className="h-4 w-4 text-ember" aria-hidden />
              Military discount every day
            </span>
          </div>
        </div>

        {/* ——— Right: the shop window ——— */}
        <div className="anim-rise anim-d-3">
          <FloatingProducts />
        </div>
      </div>
    </section>
  );
}
