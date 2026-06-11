"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  ember: boolean;
};

/**
 * Canvas particle "vapor" — soft puffs rising and drifting off the bottom
 * of the hero (where the product cluster sits). On-brand for a vape shop,
 * but kept fast + legible:
 *  - particle count capped by viewport, DPR capped at 1.5
 *  - density weighted to the lower half, faded out near the top so the
 *    headline contrast is never touched
 *  - paused when the hero scrolls away or the tab is hidden
 *  - prefers-reduced-motion → one static frame, no loop
 *  - composited 'screen' blend, transform/draw only (no layout/paint thrash)
 */
export function VaporCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let W = 0;
    let H = 0;
    let particles: Particle[] = [];

    // Pre-render two soft puff sprites once (white smoke + ember vapor).
    const makeSprite = (rgb: string) => {
      const s = document.createElement("canvas");
      const S = 128;
      s.width = s.height = S;
      const sc = s.getContext("2d")!;
      const g = sc.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
      g.addColorStop(0, `rgba(${rgb},0.9)`);
      g.addColorStop(0.4, `rgba(${rgb},0.3)`);
      g.addColorStop(1, `rgba(${rgb},0)`);
      sc.fillStyle = g;
      sc.fillRect(0, 0, S, S);
      return s;
    };
    const spriteSmoke = makeSprite("214,220,228");
    const spriteEmber = makeSprite("255,128,40");

    const spawn = (initial: boolean): Particle => {
      const max = 7000 + Math.random() * 6000;
      return {
        x: Math.random() * W,
        // start in the lower band (vapor rising off the floor/products)
        y: initial ? Math.random() * H : H * (0.72 + Math.random() * 0.33),
        r: 44 + Math.random() * 96,
        vx: (Math.random() - 0.5) * 9,
        vy: -(16 + Math.random() * 26),
        life: initial ? Math.random() * max : 0,
        max,
        ember: Math.random() < 0.26,
      };
    };

    const resize = () => {
      W = parent.clientWidth;
      H = parent.clientHeight;
      if (!W || !H) return;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = W < 640 ? 20 : W < 1024 ? 30 : 40;
      particles = Array.from({ length: count }, () => spawn(true));
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "screen";
      for (const p of particles) {
        p.life += dt * 1000;
        if (p.life >= p.max) Object.assign(p, spawn(false));
        p.x += p.vx * dt + Math.sin(p.life / 900) * 0.4;
        p.y += p.vy * dt;
        p.r += dt * 7; // expand as it rises

        const k = p.life / p.max;
        let a = k < 0.2 ? k / 0.2 : k > 0.6 ? (1 - k) / 0.4 : 1;
        // vertical falloff — faint in the top half (protect the headline)
        a *= Math.max(0.1, Math.min(1, p.y / (H * 0.5)));
        ctx.globalAlpha = Math.max(0, a * (p.ember ? 0.17 : 0.14));
        ctx.drawImage(
          p.ember ? spriteEmber : spriteSmoke,
          p.x - p.r,
          p.y - p.r,
          p.r * 2,
          p.r * 2
        );
      }
    };

    let raf = 0;
    let last = 0;
    let running = false;

    const loop = (t: number) => {
      if (!running) return;
      const dt = last ? Math.min((t - last) / 1000, 0.05) : 0.016;
      last = t;
      draw(dt);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();

    if (reduce) {
      draw(0); // one static frame for texture
      const roStatic = new ResizeObserver(() => {
        resize();
        draw(0);
      });
      roStatic.observe(parent);
      return () => roStatic.disconnect();
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(parent);

    const onVisibility = () => {
      if (document.hidden) stop();
      else io.takeRecords(), start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(() => resize());
    ro.observe(parent);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("absolute inset-0 h-full w-full", className)}
    />
  );
}
