"use client";

import { useEffect, useState } from "react";

const TZ = "America/Chicago";

function chicagoNow(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: TZ }));
}

type Phase =
  | { live: true; h: number; m: number }
  | { live: false; d: number; h: number; m: number };

/** Time until next Throwdown Thursday (Thu 8am–9pm CT). Honest weekly cadence. */
function compute(): Phase {
  const now = chicagoNow();
  const day = now.getDay(); // Thu = 4
  const mins = now.getHours() * 60 + now.getMinutes();

  if (day === 4 && mins >= 8 * 60 && mins < 21 * 60) {
    const left = 21 * 60 - mins;
    return { live: true, h: Math.floor(left / 60), m: left % 60 };
  }

  let daysAhead = (4 - day + 7) % 7;
  if (day === 4 && mins >= 21 * 60) daysAhead = 7;
  const target = new Date(now);
  target.setDate(now.getDate() + daysAhead);
  target.setHours(8, 0, 0, 0);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const totalM = Math.floor(diff / 60000);
  return {
    live: false,
    d: Math.floor(totalM / 1440),
    h: Math.floor((totalM % 1440) / 60),
    m: totalM % 60,
  };
}

export function ThursdayCountdown() {
  const [phase, setPhase] = useState<Phase | null>(null);

  useEffect(() => {
    const tick = () => setPhase(compute());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  // SSR / pre-mount fallback: static truth, no layout shift
  if (!phase) {
    return (
      <p className="text-sm font-semibold uppercase tracking-widest text-ember">
        Every Thursday · 8 AM – 9 PM
      </p>
    );
  }

  if (phase.live) {
    return (
      <p className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-widest text-open">
        <span className="relative inline-block h-2.5 w-2.5 rounded-full bg-open dot-ping text-open" />
        Live now — ends in {phase.h}h {phase.m}m
      </p>
    );
  }

  return (
    <p className="text-sm font-semibold uppercase tracking-widest text-ember">
      Next throwdown in{" "}
      <span className="tabular-nums text-cream">
        {phase.d > 0 && `${phase.d}d `}
        {phase.h}h {phase.m}m
      </span>
    </p>
  );
}
