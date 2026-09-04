"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

// ─── Terminal cycling data ───────────────────────────────────────────────────

type TLine = {
  prefix?: string;
  text?: string;
  label?: string;
  val?: string;
  bare?: boolean;
  indent?: boolean;
};

type TerminalState = {
  lines: TLine[];
};

const TERMINAL_STATES: TerminalState[] = [
  {
    lines: [
      { prefix: "const", text: " developer = {" },
      { indent: true, label: "name:", val: "Sameer Gaurav" },
      { indent: true, label: "status:", val: "always building" },
      { indent: true, label: "shipping:", val: "true", bare: true },
      { text: "}" },
    ],
  },
  {
    lines: [
      { prefix: "const", text: " ambition = {" },
      { indent: true, label: "goal:", val: "build things that matter" },
      { indent: true, label: "fuel:", val: "curiosity + caffeine" },
      { indent: true, label: "mode:", val: "grind" },
      { text: "}" },
    ],
  },
  {
    lines: [
      { prefix: "const", text: " stack = [" },
      { indent: true, val: "Next.js" },
      { indent: true, val: "Node.js" },
      { indent: true, val: "SQL / SQLite" },
      { indent: true, val: "Cloud" },
      { text: "]" },
    ],
  },
  {
    lines: [
      { prefix: "function", text: " whoAmI() {" },
      { indent: true, text: "return " },
      { indent: true, val: "a developer who never stops" },
      { indent: true, val: "learning." },
      { text: "}" },
    ],
  },
];

const LINE_INTERVAL = 420;
const HOLD = 2400;

function TerminalCard() {
  const [stateIdx, setStateIdx] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    const state = TERMINAL_STATES[stateIdx];
    const total = state.lines.length;

    setLineCount(0);
    setClearing(false);

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Reveal each line one by one
    for (let i = 0; i < total; i++) {
      timers.push(
        setTimeout(() => {
          setLineCount(i + 1);
        }, i * LINE_INTERVAL)
      );
    }

    // Hold completed state, then fade and switch
    const doneAt = (total - 1) * LINE_INTERVAL + HOLD;

    timers.push(
      setTimeout(() => {
        setClearing(true);

        timers.push(
          setTimeout(() => {
            setStateIdx((current) => {
              return (current + 1) % TERMINAL_STATES.length;
            });
          }, 500)
        );
      }, doneAt)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [stateIdx]);

  const state = TERMINAL_STATES[stateIdx];

  return (
    <div className="overflow-hidden rounded-lg border border-line-dark bg-charcoal-dim/80 font-mono text-[13px] leading-relaxed shadow-2xl shadow-black/40 backdrop-blur-sm">
      {/* macOS-style title bar */}
      <div className="flex items-center gap-2 border-b border-line-dark bg-black/20 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
        <span className="h-3 w-3 rounded-full bg-green-500/80" />

        <span className="ml-3 text-xs tracking-wide text-mist-soft/60">
          whoami.js
        </span>
      </div>

      {/* Code body */}
      <div
        className="min-h-[160px] px-5 py-5 transition-opacity duration-500"
        style={{
          opacity: clearing ? 0 : 1,
        }}
      >
        {state.lines.slice(0, lineCount).map((line, i) => (
          <p
            key={`${stateIdx}-${i}`}
            className={`${line.indent ? "pl-6" : ""
              } transition-all duration-300`}
            style={{
              opacity: lineCount > i ? 1 : 0,
              transform:
                lineCount > i ? "translateY(0)" : "translateY(6px)",
              transitionDelay: `${i * 30}ms`,
            }}
          >
            {/* keyword */}
            {line.prefix && (
              <span className="text-pink-400">{line.prefix}</span>
            )}

            {/* plain text */}
            {line.text && (
              <span className="text-mist-soft">{line.text}</span>
            )}

            {/* label key */}
            {"label" in line && line.label && (
              <span className="text-mist-soft/70">{line.label} </span>
            )}

            {/* value */}
            {line.val && !line.bare && (
              <span className="text-accent-soft">
                &quot;{line.val}&quot;
                {"label" in line && line.label && (
                  <span className="text-mist-soft/40">,</span>
                )}
              </span>
            )}

            {/* bare value */}
            {line.val && line.bare && (
              <span className="text-cyan-400">
                {line.val}
                <span className="text-mist-soft/40">,</span>
              </span>
            )}
          </p>
        ))}

        {/* Blinking cursor */}
        {!clearing && lineCount < state.lines.length && (
          <span className="ml-0.5 inline-block h-4 w-[7px] rounded-sm bg-mist-soft/50 animate-blink" />
        )}
      </div>
    </div>
  );
}

// ─── Rotating headline phrase ────────────────────────────────────────────────

const PHRASES = [
  "shipping real things.",
  "chasing mastery.",
  "learning every day.",
  "building what matters.",
  "figuring it all out.",
];

const PHRASE_HOLD = 2800;
const PHRASE_FADE = 350;

function RotatingPhrase() {
  const [idx, setIdx] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const cycle = () => {
      // Fade out
      setOpacity(0);
      setTranslateY(-10);

      setTimeout(() => {
        setIdx((current) => (current + 1) % PHRASES.length);
        setTranslateY(10);

        // Allow DOM to update before fading in
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setOpacity(1);
            setTranslateY(0);
          });
        });
      }, PHRASE_FADE);
    };

    const id = setInterval(cycle, PHRASE_HOLD);

    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="inline-block text-accent-soft"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        transition: `opacity ${PHRASE_FADE}ms cubic-bezier(0.4,0,0.2,1), transform ${PHRASE_FADE}ms cubic-bezier(0.4,0,0.2,1)`,
      }}
    >
      {PHRASES[idx]}
    </span>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section
      id="top"
      className="section-pad mx-auto max-w-content pb-24 pt-16 md:pb-32 md:pt-24"
    >
      <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-12">
        {/* Left */}
        <div className="md:col-span-7">
          <p className="mb-5 font-mono text-sm text-mist-soft">
            <span className="text-accent-soft">~/</span> Hi, I&apos;m{" "}
            {profile.fullName}.
          </p>

          <h1 className="font-display text-4xl font-medium leading-[1.12] tracking-tightest text-mist sm:text-5xl md:text-6xl">
            Not waiting
            <br />
            for permission.
            <br />
            Just{" "}
            <RotatingPhrase />
          </h1>

          <p className="mt-7 max-w-prose text-base leading-relaxed text-mist-soft">
            I&apos;m a self-taught developer who builds because I can&apos;t
            not. Full-stack, data, cloud — whatever it takes to make something
            real. I don&apos;t have years of experience yet, but I have the
            drive, the curiosity, and real projects to show for it. This site
            is proof.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-6">
            <a
              href="#projects"
              className="border border-mist px-5 py-2.5 text-sm font-medium text-mist transition-colors hover:bg-mist hover:text-charcoal"
            >
              View my work →
            </a>

            <a
              href={profile.resumeUrl}
              className="link-underline text-sm font-medium text-mist-soft"
            >
              Download resume ↗
            </a>
          </div>
        </div>

        {/* Right — terminal */}
        <div className="md:col-span-5">
          <TerminalCard />
        </div>
      </div>
    </section>
  );
}