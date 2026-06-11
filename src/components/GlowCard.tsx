"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Mouse-follow ember glow. Sets --mx/--my CSS vars on move;
 * the ::before radial (in globals.css) fades in on hover.
 * Desktop-only by nature (hover: hover media query gates the effect).
 */
export function GlowCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div ref={ref} onMouseMove={onMove} className={cn("glow-card h-full", className)}>
      {children}
    </div>
  );
}
