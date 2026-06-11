"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { asset } from "@/lib/asset";

/**
 * Floating product cluster — the shop window at night. Three of their
 * real product shots as tilted glowing cards on layered depths:
 * CSS idle drift + mouse parallax (desktop), spring-smoothed.
 */
export function FloatingProducts() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  // depth factors: far layer moves least
  const x1 = useTransform(sx, (v) => v * 28);
  const y1 = useTransform(sy, (v) => v * 22);
  const x2 = useTransform(sx, (v) => v * -18);
  const y2 = useTransform(sy, (v) => v * -14);
  const x3 = useTransform(sx, (v) => v * 10);
  const y3 = useTransform(sy, (v) => v * 8);

  function onMove(e: React.MouseEvent) {
    if (reduce) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mx-auto h-[380px] w-full max-w-md select-none sm:h-[460px] lg:h-[540px] lg:max-w-none"
      aria-label="Products in the shop window"
      role="img"
    >
      {/* glow pool under the cluster */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/20 blur-[100px]"
      />

      {/* far layer — tanks */}
      <motion.div
        style={reduce ? undefined : { x: x2, y: y2 }}
        className="absolute left-[2%] top-[6%] w-[46%]"
      >
        <div className="float-c overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
          <Image
            src={asset("/images/cat-tanks.png")}
            alt=""
            width={600}
            height={400}
            className="h-auto w-full"
            priority
          />
        </div>
      </motion.div>

      {/* mid layer — mods */}
      <motion.div
        style={reduce ? undefined : { x: x3, y: y3 }}
        className="absolute right-0 top-[24%] w-[52%]"
      >
        <div className="float-b overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
          <Image
            src={asset("/images/cat-mods.png")}
            alt=""
            width={600}
            height={400}
            className="h-auto w-full"
            priority
          />
        </div>
      </motion.div>

      {/* near layer — disposables (hero of the cluster) */}
      <motion.div
        style={reduce ? undefined : { x: x1, y: y1 }}
        className="absolute bottom-[4%] left-[8%] w-[62%]"
      >
        <div className="float-a overflow-hidden rounded-2xl border border-ember/30 shadow-[0_32px_80px_rgba(0,0,0,0.65),0_0_40px_rgba(242,101,34,0.18)]">
          <Image
            src={asset("/images/cat-disposables.png")}
            alt=""
            width={600}
            height={400}
            className="h-auto w-full"
            priority
          />
        </div>
      </motion.div>

      {/* price-tag chip riding the cluster */}
      <div className="glass absolute bottom-[0%] right-[6%] rotate-3 rounded-2xl px-4 py-2.5">
        <p className="font-display text-xl font-bold uppercase leading-none text-ember">
          2 / $40
        </p>
        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-silver">
          Select disposables
        </p>
      </div>
    </div>
  );
}
