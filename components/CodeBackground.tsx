"use client";

import { useEffect, useRef } from "react";

const SNIPPETS = [
  "const x = () => {}",
  "git commit -m 'fix'",
  "npm run build",
  "SELECT * FROM users",
  "async / await",
  "useState(null)",
  "useEffect(() => {}, [])",
  "res.json({ ok: true })",
  "border-radius: 8px",
  "flex-direction: column",
  "export default function",
  "return <Component />",
  "console.log('hi')",
  "if (err) throw err",
  "type Props = {}",
  "@apply text-sm",
  "docker build .",
  "Promise.all([])",
  "?.optional?.chain",
  "...spread",
  "import { X } from 'y'",
  "grid-template-columns",
  "z-index: 9999",
  "padding: 1rem",
  "node server.js",
];

// Colors matching the site palette
const COLORS = [
  [139, 92,  246], // violet
  [6,   182, 212], // cyan
  [236, 72,  153], // pink
  [52,  211, 153], // emerald
  [196, 181, 253], // soft violet
];

type Snippet = {
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;         // px/ms
  alpha: number;
  peakAlpha: number;
  size: number;
  color: number[];
  born: number;       // ms timestamp
  life: number;       // ms total lifespan
  fadeIn: number;     // ms
  fadeOut: number;    // ms
};

const COUNT = 30;
const SPEED = 0.022; // px/ms

function makeSnippet(now: number, canvasW: number, canvasH: number): Snippet {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const life = 6000 + Math.random() * 8000; // 6–14 seconds
  const fadeIn  = 1200;
  const fadeOut = 1800;
  return {
    text: SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)],
    x: Math.random() * canvasW,
    y: Math.random() * canvasH,
    vx: (Math.random() - 0.5) * SPEED,
    vy: -(0.008 + Math.random() * 0.010), // drift upward
    alpha: 0,
    peakAlpha: 0.045 + Math.random() * 0.04,
    size: 9 + Math.random() * 6,
    color,
    born: now - Math.random() * life, // stagger start so they don't all appear at once
    life,
    fadeIn,
    fadeOut,
  };
}

export default function CodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);
    window.addEventListener("resize", resize);

    const now0 = performance.now();
    const snippets: Snippet[] = Array.from({ length: COUNT }, () =>
      makeSnippet(now0, canvas.width, canvas.height)
    );

    let raf: number;
    let prev = now0;

    const draw = (now: number) => {
      const dt = Math.min(now - prev, 50);
      prev = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < snippets.length; i++) {
        const s = snippets[i];
        const age = now - s.born;

        // Recycle when lifespan exceeded
        if (age > s.life) {
          snippets[i] = makeSnippet(now, canvas.width, canvas.height);
          snippets[i].born = now; // fresh start
          continue;
        }

        // Smooth fade-in / hold / fade-out using eased progress
        let alpha: number;
        if (age < s.fadeIn) {
          // ease-out cubic for fade in
          const t = age / s.fadeIn;
          alpha = s.peakAlpha * (1 - Math.pow(1 - t, 3));
        } else if (age > s.life - s.fadeOut) {
          // ease-in cubic for fade out
          const t = (age - (s.life - s.fadeOut)) / s.fadeOut;
          alpha = s.peakAlpha * Math.pow(1 - t, 2);
        } else {
          alpha = s.peakAlpha;
        }

        // Move time-based
        s.x += s.vx * dt;
        s.y += s.vy * dt;

        // Wrap horizontally
        const approxW = s.text.length * s.size * 0.6;
        if (s.x > canvas.width + approxW) s.x = -approxW;
        if (s.x < -approxW) s.x = canvas.width + approxW;

        ctx.font = `${s.size}px 'JetBrains Mono', 'Fira Mono', monospace`;
        ctx.fillStyle = `rgba(${s.color[0]},${s.color[1]},${s.color[2]},${alpha.toFixed(4)})`;
        ctx.fillText(s.text, s.x, s.y);
      }

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
