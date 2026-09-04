
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
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi",
  },
  {
    text: "Great things are done by a series of small things brought together.",
    author: "Vincent van Gogh",
  },
  {
    text: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier",
  },
  {
    text: "Don't limit your challenges. Challenge your limits.",
    author: "Jerry Dunn",
  },
];

type Props = {
  onClose: () => void;
};

export default function SurpriseOverlay({ onClose }: Props) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    // Choose the quote only after mounting.
    // This avoids hydration mismatch caused by Math.random().
    setQuoteIndex(Math.floor(Math.random() * QUOTES.length));

    const holdTimer = setTimeout(() => {
      setPhase("hold");
    }, 600);

    const outTimer = setTimeout(() => {
      setPhase("out");
    }, 5200);

    const doneTimer = setTimeout(() => {
      onClose();
    }, 5900);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPhase("out");

        setTimeout(() => {
          onClose();
        }, 600);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(outTimer);
      clearTimeout(doneTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleClose = () => {
    setPhase("out");

    setTimeout(() => {
      onClose();
    }, 600);
  };

  const quote = QUOTES[quoteIndex];

  const opacity = phase === "in" ? 0 : phase === "hold" ? 1 : 0;
  const scale = phase === "in" ? 0.94 : phase === "hold" ? 1 : 0.98;
  const blur = phase === "in" ? "8px" : phase === "hold" ? "0px" : "4px";

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden p-6 sm:p-8"
      style={{
        opacity,
        backdropFilter: `blur(${blur})`,
        WebkitBackdropFilter: `blur(${blur})`,
        background: `
          radial-gradient(
            circle at 50% 45%,
            rgba(251, 191, 36, 0.12) 0%,
            transparent 30%
          ),
          radial-gradient(
            circle at 15% 20%,
            rgba(234, 88, 12, 0.25) 0%,
            transparent 35%
          ),
          radial-gradient(
            circle at 85% 80%,
            rgba(239, 68, 68, 0.20) 0%,
            transparent 35%
          ),
          linear-gradient(
            135deg,
            #12051f 0%,
            #2a0b45 28%,
            #5c1d32 62%,
            #7c2d12 100%
          )
        `,
        transition:
          "opacity 700ms cubic-bezier(0.4,0,0.2,1), backdrop-filter 700ms ease",
        pointerEvents: phase === "out" ? "none" : "all",
      }}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Surprise motivation"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(251,191,36,0.08), transparent 45%)",
          animation: "pulseGlow 4s ease-in-out infinite",
        }}
      />

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 24 }).map((_, i) => {
          const size = 2 + ((i * 7) % 5);
          const left = (i * 41) % 100;
          const top = (i * 67) % 100;
          const duration = 4 + (i % 5);
          const delay = (i * 0.25) % 3;

          return (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                background:
                  i % 3 === 0
                    ? "rgba(251,191,36,0.7)"
                    : i % 3 === 1
                      ? "rgba(249,115,22,0.6)"
                      : "rgba(255,237,213,0.45)",
                boxShadow: "0 0 12px rgba(251,191,36,0.25)",
                animation: `floatUp ${duration}s ease-in-out ${delay}s infinite`,
              }}
            />
          );
        })}
      </div>

      {/* Quote content */}
      <div
        className="relative z-10 w-full max-w-3xl text-center"
        style={{
          transform: `scale(${scale})`,
          transition:
            "transform 900ms cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* Top decorative element */}
        <div className="mb-7 flex items-center justify-center gap-3 sm:mb-9">
          <div
            className="h-px w-12 sm:w-20"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(251,191,36,0.8))",
            }}
          />

          <span
            className="text-lg"
            style={{
              color: "rgba(251,191,36,0.9)",
              textShadow: "0 0 20px rgba(251,191,36,0.5)",
            }}
          >
            ✦
          </span>

          <div
            className="h-px w-12 sm:w-20"
            style={{
              background:
                "linear-gradient(90deg, rgba(251,191,36,0.8), transparent)",
            }}
          />
        </div>

        {/* Quote */}
        <p
          className="font-display text-2xl font-medium leading-snug tracking-tight sm:text-4xl md:text-5xl"
          style={{
            color: "rgba(255,237,213,0.97)",
            textShadow:
              "0 2px 35px rgba(251,191,36,0.22)",
          }}
        >
          &ldquo;{quote.text}&rdquo;
        </p>

        {/* Author */}
        <p
          className="mt-7 font-mono text-xs uppercase tracking-[0.25em] sm:mt-9 sm:text-sm"
          style={{
            color: "rgba(251,191,36,0.78)",
          }}
        >
          — {quote.author}
        </p>

        {/* Bottom decorative line */}
        <div
          className="mx-auto mt-8 h-px w-20 sm:mt-10 sm:w-24"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(251,191,36,0.8), transparent)",
          }}
        />

        {/* Close hint */}
        <p
          className="mt-7 text-[10px] uppercase tracking-[0.18em] sm:mt-8 sm:text-xs"
          style={{
            color: "rgba(255,237,213,0.35)",
          }}
        >
          tap anywhere or press Esc to close
        </p>
      </div>

      <style>{`
        @keyframes floatUp {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.35;
          }

          50% {
            transform: translateY(-35px) scale(1.25);
            opacity: 1;
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.45;
            transform: scale(1);
          }

          50% {
            opacity: 0.9;
            transform: scale(1.08);
          }
        }
      `}</style>
    </div>
  );
}