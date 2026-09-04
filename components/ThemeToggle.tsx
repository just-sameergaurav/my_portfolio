"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      className="flex h-9 w-9 items-center justify-center border border-line text-ink-soft transition-colors hover:border-accent hover:text-accent dark:border-line-dark dark:text-mist-soft dark:hover:border-accent-soft dark:hover:text-accent-soft"
    >
      {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
    </button>
  );
}
