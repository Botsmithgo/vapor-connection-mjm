import Image from "next/image";
import {
  BUSINESS,
  FDA_WARNING,
  AGE_POLICY,
} from "@/data/business";
import { FacebookIcon, InstagramIcon } from "@/components/icons";
import { asset } from "@/lib/asset";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-coal/60 pb-28 pt-14 md:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <Image
              src={asset("/images/vc-logo-nav.png")}
              alt={BUSINESS.name}
              width={96}
              height={67}
              className="h-14 w-auto"
            />
            <p className="mt-4 text-sm leading-relaxed text-silver">
              Family-owned and serving the Cantonment &amp; Pensacola community
              with the best selection of quality vaping products since{" "}
              {BUSINESS.foundedYear}.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={BUSINESS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vapor Connection on Facebook"
                className="glass flex h-10 w-10 items-center justify-center rounded-full text-silver transition-colors hover:text-ember"
              >
                <FacebookIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href={BUSINESS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vapor Connection on Instagram"
                className="glass flex h-10 w-10 items-center justify-center rounded-full text-silver transition-colors hover:text-ember"
              >
                <InstagramIcon className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-16 gap-y-3">
            {[
              { href: "#deals", label: "Deals" },
              { href: "#shop", label: "Shop" },
              { href: "#reviews", label: "Reviews" },
              { href: "#visit", label: "Hours & Directions" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-silver transition-colors hover:text-cream"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="max-w-xs text-sm leading-relaxed text-silver">
            <p className="font-semibold text-cream">{BUSINESS.address.full}</p>
            <a
              href={BUSINESS.phoneHref}
              className="mt-1 block font-semibold text-ember transition-opacity hover:opacity-80"
            >
              {BUSINESS.phone}
            </a>
            <p className="mt-3">
              Mon–Sat 8 AM – 9 PM
              <br />
              Sun 9 AM – 8 PM
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-4 border-t border-white/10 pt-8">
          <p className="rounded-xl bg-white px-4 py-3 text-center text-[13px] font-bold leading-snug text-black" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
            {FDA_WARNING}
          </p>
          <p className="text-center text-xs leading-relaxed text-silver/80">
            {AGE_POLICY}
          </p>
          <p className="text-center text-xs text-silver/60">
            © {new Date().getFullYear()} {BUSINESS.name} · All rights reserved
            · Cantonment, FL
          </p>
        </div>
      </div>
    </footer>
  );
}
