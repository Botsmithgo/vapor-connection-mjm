"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AGE_POLICY, BUSINESS } from "@/data/business";

const STORAGE_KEY = "vc-age-verified";

/**
 * 21+ age verification interstitial. Required best practice for
 * nicotine retail marketing sites. Remembers choice for the session.
 */
export function AgeGate() {
  const [status, setStatus] = useState<"unknown" | "verified" | "blocked">(
    "unknown"
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem(STORAGE_KEY) === "1") setStatus("verified");
  }, []);

  useEffect(() => {
    if (mounted && status !== "verified") {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mounted, status]);

  if (!mounted || status === "verified") return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Age verification"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-smoke/95 backdrop-blur-xl"
    >
      <div className="agegate-panel relative mx-4 w-full max-w-md rounded-2xl border border-white/10 bg-coal p-8 text-center shadow-2xl shadow-black/60">
        <Image
          src="/images/vc-logo-nav.png"
          alt={BUSINESS.name}
          width={120}
          height={84}
          className="mx-auto mb-5 h-auto w-28"
          priority
        />
        {status === "unknown" ? (
          <>
            <p className="font-display text-3xl font-bold uppercase tracking-wide text-white">
              Are you 21 or older?
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {AGE_POLICY}
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  sessionStorage.setItem(STORAGE_KEY, "1");
                  setStatus("verified");
                }}
                className="rounded-full bg-ember px-6 py-3.5 font-semibold text-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                Yes, I&apos;m 21+
              </button>
              <button
                onClick={() => setStatus("blocked")}
                className="rounded-full border border-white/15 px-6 py-3.5 font-semibold text-white/80 transition-colors hover:bg-white/5"
              >
                No
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="font-display text-2xl font-bold uppercase text-white">
              Sorry, come back later
            </p>
            <p className="mt-3 text-sm text-white/60">
              You must be 21 or older to view this site.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
