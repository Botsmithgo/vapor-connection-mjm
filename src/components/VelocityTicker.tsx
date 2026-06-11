"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { Flame } from "lucide-react";
import { TICKER_ITEMS } from "@/data/business";

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/**
 * Display-scale deal marquee that reacts to scroll velocity —
 * scroll fast and the board rushes past. Filled/outline alternating
 * condensed type. Transform-only; static row on reduced motion.
 */
export function VelocityTicker() {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [-1500, 0, 1500], [4, 1, 4], {
    clamp: true,
  });
  const directionRef = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const v = velocityFactor.get();
    // flip direction with scroll direction for extra life
    const raw = smoothVelocity.get();
    if (raw > 80) directionRef.current = 1;
    else if (raw < -80) directionRef.current = -1;
    // baseX is consumed as a percentage (wrap -50..0), so units are %/sec.
    // ~1.5%/sec → a full loop every ~33s at rest; scroll velocity multiplies it.
    const moveBy = directionRef.current * -1.5 * v * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const row = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      className="relative z-10 -rotate-[0.7deg] overflow-hidden border-y border-ember/25 bg-coal/90 py-5 shadow-[0_0_50px_rgba(242,101,34,0.1)]"
      aria-label="Current deals"
    >
      <motion.div style={reduce ? undefined : { x }} className="flex w-max items-center">
        {row.map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= TICKER_ITEMS.length}
            className="flex shrink-0 items-center"
          >
            <span
              className={
                "whitespace-nowrap px-5 font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl " +
                (i % 2 === 0 ? "text-cream" : "text-outline")
              }
            >
              {item}
            </span>
            <Flame className="h-6 w-6 shrink-0 text-ember" aria-hidden />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
