"use client";

import { useEffect, useState } from "react";
import { getOpenStatus } from "@/lib/hours";

/**
 * Live-wired giant banner above the map: "OPEN TIL 9 PM TONIGHT".
 * Restates the longest-hours-in-the-metro advantage as display type.
 */
export function TonightBanner() {
  const [line, setLine] = useState("OPEN 7 DAYS A WEEK");

  useEffect(() => {
    const update = () => {
      const s = getOpenStatus();
      if (s.isOpen) {
        const until = s.label.replace(/^Open now · until /i, "");
        setLine(`OPEN TIL ${until.toUpperCase()} TONIGHT`);
      } else {
        const opens = s.label.replace(/^Closed · opens /i, "");
        setLine(`OPENS ${opens.toUpperCase()}`);
      }
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="font-display text-3xl font-bold uppercase leading-none tracking-tight sm:text-5xl">
      <span className="text-shimmer">{line}</span>
      <span className="ml-4 inline-block align-middle">
        <span className="relative inline-block h-3 w-3 rounded-full bg-open dot-ping text-open" />
      </span>
    </p>
  );
}
