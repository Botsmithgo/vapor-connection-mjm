"use client";

import { useEffect, useState } from "react";
import { Phone, MapPin, Clock } from "lucide-react";
import { BUSINESS, HOURS } from "@/data/business";
import { AnimatedSection } from "@/components/AnimatedSection";
import { TonightBanner } from "@/components/TonightBanner";
import { cn } from "@/lib/utils";

function fmt(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12} ${ampm}` : `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}

/** The foot-traffic close: map, hours (today highlighted), one-tap actions. */
export function VisitSection() {
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    setToday(
      new Date(
        new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })
      ).getDay()
    );
  }, []);

  return (
    <section id="visit" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <AnimatedSection>
        <p className="eyebrow-rule text-sm font-bold uppercase tracking-[0.25em] text-ember">
          <span className="mr-3 font-display text-base text-silver/50">04</span>
          Come See Us
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-none tracking-tight text-cream sm:text-6xl">
          Right on Highway 29
        </h2>
        <div className="mt-5">
          <TonightBanner />
        </div>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-silver sm:text-lg">
          Northbound or southbound, we&apos;re your easy stop in Cantonment —
          minutes north of Nine Mile Road.
        </p>
      </AnimatedSection>

      <div className="mt-12 grid gap-5 lg:grid-cols-5">
        <AnimatedSection className="lg:col-span-3" direction="right">
          <div className="glass h-full min-h-[320px] overflow-hidden rounded-3xl">
            <iframe
              title="Map to MJM's Vapor Connection"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                "MJM's Vapor Connection, 2456 S Highway 29, Cantonment, FL 32533"
              )}&output=embed`}
              className="h-full min-h-[320px] w-full border-0 grayscale-[35%] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </AnimatedSection>

        <AnimatedSection className="lg:col-span-2" direction="left" delay={0.1}>
          <div className="glass flex h-full flex-col rounded-3xl p-7">
            <address className="not-italic">
              <p className="flex items-start gap-3 text-base leading-snug text-cream">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-ember" aria-hidden />
                <span>
                  {BUSINESS.address.street}
                  <br />
                  {BUSINESS.address.city}, {BUSINESS.address.state}{" "}
                  {BUSINESS.address.zip}
                </span>
              </p>
              <a
                href={BUSINESS.phoneHref}
                className="mt-4 flex items-center gap-3 text-base font-semibold text-cream transition-colors hover:text-ember"
              >
                <Phone className="h-5 w-5 shrink-0 text-ember" aria-hidden />
                {BUSINESS.phone}
              </a>
            </address>

            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-ember">
                <Clock className="h-4 w-4" aria-hidden /> Hours
              </p>
              <table className="mt-4 w-full text-sm">
                <tbody>
                  {HOURS.map((h, i) => (
                    <tr
                      key={h.day}
                      className={cn(
                        "border-b border-white/5 last:border-0",
                        today === i && "text-cream"
                      )}
                    >
                      <td
                        className={cn(
                          "py-2 font-medium",
                          today === i ? "text-ember" : "text-silver"
                        )}
                      >
                        {h.day}
                        {today === i && (
                          <span className="ml-2 rounded-full bg-ember/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ember">
                            Today
                          </span>
                        )}
                      </td>
                      <td
                        className={cn(
                          "py-2 text-right tabular-nums",
                          today === i ? "font-semibold text-cream" : "text-silver"
                        )}
                      >
                        {fmt(h.opens)} – {fmt(h.closes)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-cta mt-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-ember px-6 py-3.5 pt-3.5 text-sm font-bold uppercase tracking-wide text-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
            >
              <MapPin className="h-4 w-4" aria-hidden />
              Get Directions
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
