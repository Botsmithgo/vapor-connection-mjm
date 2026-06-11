"use client";

import { useEffect, useState } from "react";
import { getOpenStatus, type OpenStatus } from "@/lib/hours";
import { cn } from "@/lib/utils";

/**
 * Hours-aware live status pill. Computes against America/Chicago
 * (Cantonment FL = Central Time) — never the visitor's clock.
 * Renders a neutral hours line until mounted to avoid hydration drift.
 */
export function OpenNowBadge({
  className,
  link = true,
}: {
  className?: string;
  link?: boolean;
}) {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpenStatus());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const inner = (
    <span
      className={cn(
        "glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-medium",
        className
      )}
    >
      <span
        className={cn(
          "relative inline-block h-2.5 w-2.5 rounded-full",
          !status && "bg-silver/60",
          status?.isOpen && "dot-ping bg-open text-open",
          status && !status.isOpen && "bg-red-400"
        )}
      />
      <span className={cn("whitespace-nowrap", status?.isOpen ? "text-cream" : "text-silver")}>
        {status ? status.label : "Open 7 days a week"}
      </span>
    </span>
  );

  if (!link) return inner;
  return (
    <a href="#visit" aria-label="See store hours" className="transition-opacity hover:opacity-85">
      {inner}
    </a>
  );
}
