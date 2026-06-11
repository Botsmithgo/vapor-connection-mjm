"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * Rotating word in the headline. First word renders statically (no
 * mount animation — avoids the Motion 12 hydration trap); cycling
 * starts after mount.
 */
export function WordRotate({
  words,
  className,
  interval = 2400,
}: {
  words: string[];
  className?: string;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [cycling, setCycling] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setCycling(true);
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval, words.length, reduce]);

  return (
    <span
      className={className}
      style={{ display: "inline-grid", overflow: "hidden", verticalAlign: "bottom" }}
    >
      {/* width reserver: longest word keeps layout stable */}
      <span aria-hidden className="invisible" style={{ gridArea: "1 / 1" }}>
        {words.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          style={{ gridArea: "1 / 1" }}
          initial={cycling ? { y: "105%", opacity: 0 } : false}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-105%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
