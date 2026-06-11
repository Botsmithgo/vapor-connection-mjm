"use client";

import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { VaporHaze } from "@/components/VaporHaze";

/**
 * Email deals club. Email (not SMS) is deliberate: carriers block vape SMS
 * under CTIA SHAFT rules, and paid ads are banned — email is THE channel.
 * Demo: client-side validate + success state; wires to ESP post-sale.
 */
export function EmailClub() {
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!confirmed) {
      setError("Please confirm you're 21 or older.");
      return;
    }
    setError(null);
    setDone(true);
  }

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-ember/[0.12] via-coal to-coal">
      <VaporHaze intensity="section" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <AnimatedSection>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-ember">
            The Deals Club
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-none tracking-tight text-cream sm:text-5xl">
            Deals hit your inbox
            <br /> before they hit the board
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-silver">
            One email a week. Throwdown Thursday previews, new drops, members-only
            pricing. No spam — unsubscribe anytime.
          </p>

          {done ? (
            <div
              role="status"
              className="glass mx-auto mt-8 flex max-w-md items-center justify-center gap-3 rounded-full px-6 py-4"
            >
              <Check className="h-5 w-5 text-open" aria-hidden />
              <p className="font-semibold text-cream">
                You&apos;re in. See you Thursday.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="mx-auto mt-8 max-w-md" noValidate>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="club-email" className="sr-only">
                  Email address
                </label>
                <div className="relative flex-1">
                  <Mail
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-silver"
                    aria-hidden
                  />
                  <input
                    id="club-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass w-full rounded-full py-3.5 pl-11 pr-4 text-[15px] text-cream placeholder:text-silver/60 focus:border-ember/60"
                  />
                </div>
                <button
                  type="submit"
                  className="glow-cta rounded-full bg-ember px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
                >
                  Join Free
                </button>
              </div>
              <label className="mt-4 flex cursor-pointer items-center justify-center gap-2.5 text-sm text-silver">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="h-4 w-4 cursor-pointer accent-[#f26522]"
                />
                I confirm I&apos;m 21 or older
              </label>
              {error && (
                <p role="alert" className="mt-3 text-sm font-medium text-closing">
                  {error}
                </p>
              )}
            </form>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
