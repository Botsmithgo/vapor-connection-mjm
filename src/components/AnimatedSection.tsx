"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  once?: boolean;
  amount?: number;
  staggerChildren?: number;
}

/**
 * Wraps children with a scroll-triggered fade-up reveal.
 * Use staggerChildren to space out child <StaggerItem>s.
 *
 * For HERO entrance animations, use CSS keyframes (.anim-rise) instead —
 * Motion 12 + React 19 has a hydration timing trap with initial: { opacity: 0 }.
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
  duration = 0.7,
  direction = "up",
  distance = 24,
  once = true,
  amount = 0.2,
  staggerChildren,
}: AnimatedSectionProps) {
  const reduce = useReducedMotion();

  const offset =
    direction === "up" ? { y: distance }
    : direction === "down" ? { y: -distance }
    : direction === "left" ? { x: distance }
    : direction === "right" ? { x: -distance }
    : {};

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: reduce ? 0 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
        ...(staggerChildren ? { staggerChildren } : {}),
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};
