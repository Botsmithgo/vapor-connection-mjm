"use client";

import { motion, type Variants } from "motion/react";
import { ReactNode } from "react";

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Wraps a single grid/list item for staggered reveal animation.
 * Use inside a parent that has staggerChildren set (via AnimatedSection).
 *
 * Why this exists: server-component pages can't use motion.div directly.
 * StaggerItem is the client wrapper that makes motion work.
 */
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeUpItem}>
      {children}
    </motion.div>
  );
}
