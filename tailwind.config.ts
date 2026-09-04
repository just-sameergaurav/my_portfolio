import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FDFDFD",
        "paper-dim": "#F3F4F6",
        ink: "#0F172A",
        "ink-soft": "#475569",
        charcoal: "#030712",
        "charcoal-dim": "#111827",
        mist: "#F9FAFB",
        "mist-soft": "#9CA3AF",
        accent: "#8B5CF6",
        "accent-soft": "#C4B5FD",
        line: "#E5E7EB",
        "line-dark": "#1F2937",
      },
      fontFamily: {
        display: ["var(--font-manrope)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        content: "72rem",
        prose: "38rem",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
