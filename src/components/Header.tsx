"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import { BUSINESS } from "@/data/business";
import { OpenNowBadge } from "@/components/OpenNowBadge";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

const NAV = [
  { href: "#deals", label: "Deals" },
  { href: "#shop", label: "Shop" },
  { href: "#reviews", label: "Reviews" },
  { href: "#visit", label: "Visit" },
];

/** Sticky header: transparent over hero → solid glass once scrolled. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-smoke/85 py-2 backdrop-blur-xl"
          : "bg-transparent py-4"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" aria-label={`${BUSINESS.name} — home`} className="flex items-center gap-3">
          <Image
            src={asset("/images/vc-logo-nav.png")}
            alt={BUSINESS.name}
            width={64}
            height={45}
            className="h-10 w-auto sm:h-11"
            priority
          />
          <span className="hidden font-display text-lg font-semibold uppercase tracking-wider text-cream md:block">
            Vapor <span className="text-ember">Connection</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium uppercase tracking-widest text-silver transition-colors duration-200 hover:text-cream"
            >
              {item.label}
              <span
                aria-hidden
                className="absolute -bottom-1.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-ember transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <OpenNowBadge />
          </div>
          <a
            href={BUSINESS.phoneHref}
            className="glow-cta inline-flex items-center gap-2 rounded-full bg-ember px-4 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.04] active:scale-[0.97] sm:px-5"
          >
            <Phone className="h-4 w-4" aria-hidden />
            <span className="max-sm:hidden">{BUSINESS.phone}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </div>
    </header>
  );
}
