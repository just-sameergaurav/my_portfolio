"use client";

import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;

  constructor(x: number, y: number, isDark: boolean) {
    this.x = x;
    this.y = y;
    
    // Trail effect: slight random velocity, mostly staying put
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
    
    this.size = Math.random() * 4 + 1; // 1 to 5px
    this.life = 0;
    this.maxLife = Math.random() * 40 + 20; // shorter life for a tight trail
    
    // Vibrant colors: Violet, Pink, Cyan for light and dark
    const colors = isDark 
      ? ["#8B5CF6", "#EC4899", "#06B6D4", "#C084FC"] 
      : ["#7C3AED", "#DB2777", "#0891B2", "#A855F7"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life++;
    // Float up slightly
    this.vy -= 0.02;
    // Shrink
    if (this.size > 0.1) this.size *= 0.95;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export default function FluidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const isMoving = useRef(false);
  const particles = useRef<Particle[]>([]);
  const raf = useRef<number>();
  const idleTime = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isTouch) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    target.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      isMoving.current = true;
      idleTime.current = 0;
    };
    window.addEventListener("mousemove", handleMove);

    const checkDarkMode = () => document.documentElement.classList.contains("dark");

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = checkDarkMode();

      ctx.globalCompositeOperation = isDark ? "screen" : "source-over";

      // Glow behind the cursor
      const glow = ctx.createRadialGradient(
        target.current.x, target.current.y, 0,
        target.current.x, target.current.y, 250
      );
      glow.addColorStop(0, isDark ? "rgba(139, 92, 246, 0.12)" : "rgba(139, 92, 246, 0.08)");
      glow.addColorStop(1, "rgba(139, 92, 246, 0)");
      ctx.beginPath();
      ctx.arc(target.current.x, target.current.y, 250, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      if (isMoving.current) {
        // Emit trail particles
        for (let i = 0; i < 3; i++) {
          particles.current.push(new Particle(target.current.x, target.current.y, isDark));
        }
        idleTime.current++;
        if (idleTime.current > 5) {
          isMoving.current = false;
        }
      }

      // Render particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.update();
        
        ctx.globalAlpha = Math.max(0, 1 - p.life / p.maxLife);
        p.draw(ctx);

        if (p.life >= p.maxLife || p.size <= 0.1) {
          particles.current.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full"
    />
  );
}
