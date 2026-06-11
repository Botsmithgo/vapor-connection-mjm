"use client";

import { useEffect, useState } from "react";
import { getOpenStatus } from "@/lib/hours";
import { cn } from "@/lib/utils";

/**
 * Live-wired neon storefront sign — THE signature element.
 * Open: ember tubes flicker on, then hum. Closed: dim silver tube with
 * next-opening time. Status computed in store time (America/Chicago).
 */
export function NeonOpenSign({ className }: { className?: string }) {
  const [state, setState] = useState<{
    isOpen: boolean;
    until: string;
  } | null>(null);

  useEffect(() => {
    const update = () => {
      const s = getOpenStatus();
      // "Open now · until 9 PM" → "TIL 9 PM" | "Closed · opens 8 AM today" → "OPENS 8 AM"
      const until = s.isOpen
        ? s.label.replace(/^Open now · until /i, "TIL ")
        : s.label.replace(/^Closed · opens /i, "OPENS ").replace(/ (today|tomorrow|\w{3})$/i, "");
      setState({ isOpen: s.isOpen, until: until.toUpperCase() });
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const isOpen = state?.isOpen ?? true; // optimistic until mounted (no flicker restart: anim is on mount)

  return (
    <a
      href="#visit"
      aria-label={state ? (state.isOpen ? `Open now, ${state.until}` : `Closed, ${state.until}`) : "Store hours"}
      className={cn(
        "group inline-flex items-center gap-4 rounded-2xl border-2 px-5 py-3 transition-transform duration-200 hover:scale-[1.03]",
        isOpen
          ? "border-ember/60 shadow-[0_0_24px_rgba(242,101,34,0.35),inset_0_0_18px_rgba(242,101,34,0.12)]"
          : "border-silver/25 shadow-[inset_0_0_12px_rgba(184,188,196,0.08)]",
        className
      )}
    >
      <span
        className={cn(
          "neon-on font-neon text-2xl tracking-[0.3em] sm:text-3xl",
          isOpen
            ? "neon-hum neon-tube text-[#fff3ea]"
            : "neon-tube-dim text-silver/70"
        )}
      >
        OPEN
      </span>
      <span
        className={cn(
          "border-l-2 pl-4 font-display text-sm font-semibold uppercase tracking-widest sm:text-base",
          isOpen ? "border-ember/40 text-ember" : "border-silver/20 text-silver/70"
        )}
      >
        {state ? state.until : "7 DAYS"}
      </span>
    </a>
  );
}
