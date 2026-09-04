"use client";

import { useEffect, useRef } from "react";

type Orb = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  r: number;
  g: number;
  b: number;
  baseAlpha: number;
  phase: number;    // phase offset for sinusoidal pulse
  pulseSpeed: number; // radians per ms
};

const PALETTE = [
  { r: 139, g: 92,  b: 246 }, // violet
  { r: 236, g: 72,  b: 153 }, // pink
  { r: 6,   g: 182, b: 212 }, // cyan
  { r: 99,  g: 102, b: 241 }, // indigo
  { r: 168, g: 85,  b: 247 }, // purple
  { r: 52,  g: 211, b: 153 }, // emerald accent
];

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);
    window.addEventListener("resize", resize);

    // Build orbs — speed in px/ms so they move the same regardless of FPS
    const PX_PER_MS = 0.04; // ~2.4 px/frame at 60fps
    const orbs: Orb[] = PALETTE.map((c, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: ((Math.random() - 0.5) * 2) * PX_PER_MS,
      vy: ((Math.random() - 0.5) * 2) * PX_PER_MS,
      radius: 220 + i * 55,
      r: c.r,
      g: c.g,
      b: c.b,
      baseAlpha: 0.055 + (i % 3) * 0.015,
      phase: (i / PALETTE.length) * Math.PI * 2, // evenly spaced phases
      pulseSpeed: 0.0004 + i * 0.00008, // all slightly different but close
    }));

    let raf: number;
    let prev = performance.now();

    const draw = (now: number) => {
      const dt = Math.min(now - prev, 50); // cap dt to avoid jumps after tab-switch
      prev = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle dot-grid overlay
      ctx.fillStyle = "rgba(255,255,255,0.012)";
      const gs = 80;
      for (let x = 0; x < canvas.width; x += gs) {
        for (let y = 0; y < canvas.height; y += gs) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalCompositeOperation = "screen";

      for (const orb of orbs) {
        // Time-based sinusoidal pulse — consistent across all frame rates
        const pulse = 0.7 + 0.3 * Math.sin(orb.phase + now * orb.pulseSpeed);
        const alpha = orb.baseAlpha * pulse;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        grad.addColorStop(0,   `rgba(${orb.r},${orb.g},${orb.b},${alpha.toFixed(4)})`);
        grad.addColorStop(0.45,`rgba(${orb.r},${orb.g},${orb.b},${(alpha * 0.35).toFixed(4)})`);
        grad.addColorStop(1,   `rgba(${orb.r},${orb.g},${orb.b},0)`);

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Move with time-delta so speed is frame-rate independent
        orb.x += orb.vx * dt;
        orb.y += orb.vy * dt;
        orb.phase; // no-op, phase advances via `now`

        // Wrap around edges smoothly
        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius;
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius;
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;
      }

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
