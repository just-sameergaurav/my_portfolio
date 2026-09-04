"use client";

import { useEffect, useState } from "react";

const QUOTES = [
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
  },
  {
    text: "You don't have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar",
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson",
  },
  {
    text: "Simplicity is the soul of efficiency.",
    author: "Austin Freeman",
  },
  {
    text: "Make it work, make it right, make it fast.",
    author: "Kent Beck",
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    text: "Every expert was once a beginner.",
    author: "Helen Hayes",
  },
  {
    text: "Ships in harbor are safe, but that's not what ships are built for.",
    author: "John A. Shedd",
  },
  {
    text: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky",
  },
  {
    text: "The difference between ordinary and extraordinary is that little extra.",
    author: "Jimmy Johnson",
  },
  {
    text: "Hard work beats talent when talent doesn't work hard.",
    author: "Tim Notke",
  },
  {
    text: "Fall seven times, stand up eight.",
    author: "Japanese Proverb",
  },
  {
    text: "Your limitation — it's only your imagination.",
    author: "Unknown",
  },
  {
    text: "Push yourself, because no one else is going to do it for you.",
    author: "Unknown",
  },
  {
    text: "Dream it. Wish it. Do it.",
    author: "Unknown",
  },
];

type Props = {
  onClose: () => void;
};

export default function SurpriseOverlay({ onClose }: Props) {
  const [quote] = useState(
    () => QUOTES[Math.floor(Math.random() * QUOTES.length)]
  );
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    // Fade in → hold → fade out → unmount
    const holdTimer = setTimeout(() => setPhase("hold"), 600);
    const outTimer  = setTimeout(() => setPhase("out"),  4200);
    const doneTimer = setTimeout(() => onClose(),         5000);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPhase("out");
        setTimeout(onClose, 600);
      }
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(outTimer);
      clearTimeout(doneTimer);
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const opacity = phase === "in" ? 0 : phase === "hold" ? 1 : 0;
  const scale   = phase === "in" ? 0.94 : 1;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-8"
      style={{
        background:
          "linear-gradient(135deg, #1a0533 0%, #3b0764 25%, #7c2d12 60%, #92400e 100%)",
        opacity,
        transition: "opacity 600ms cubic-bezier(0.4,0,0.2,1)",
        pointerEvents: phase === "out" ? "none" : "all",
      }}
      onClick={() => {
        setPhase("out");
        setTimeout(onClose, 600);
      }}
    >
      {/* Glowing particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              width:  `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left:   `${Math.random() * 100}%`,
              top:    `${Math.random() * 100}%`,
              background: i % 3 === 0
                ? "rgba(251,191,36,0.6)"
                : i % 3 === 1
                  ? "rgba(249,115,22,0.5)"
                  : "rgba(239,68,68,0.4)",
              filter: "blur(1px)",
              animation: `floatUp ${3 + (i % 4)}s ease-in-out ${(i * 0.3) % 2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Quote card */}
      <div
        className="relative max-w-2xl text-center"
        style={{
          transform: `scale(${scale})`,
          transition: "transform 700ms cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* Decorative top line */}
        <div
          className="mx-auto mb-8 h-px w-24"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.8), transparent)",
          }}
        />

        <p
          className="font-display text-3xl font-medium leading-snug tracking-tight sm:text-4xl"
          style={{
            color: "rgba(255,237,213,0.95)",
            textShadow: "0 2px 40px rgba(251,191,36,0.3)",
          }}
        >
          &ldquo;{quote.text}&rdquo;
        </p>

        <p
          className="mt-8 font-mono text-sm tracking-widest uppercase"
          style={{ color: "rgba(251,191,36,0.7)" }}
        >
          — {quote.author}
        </p>

        {/* Decorative bottom line */}
        <div
          className="mx-auto mt-8 h-px w-24"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.8), transparent)",
          }}
        />

        <p
          className="mt-8 text-xs tracking-wide"
          style={{ color: "rgba(255,237,213,0.35)" }}
        >
          tap anywhere or press Esc to close
        </p>
      </div>

      <style>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50%       { transform: translateY(-30px) scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
