"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/lib/data";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur dark:border-line-dark dark:bg-charcoal/90">
      <nav className="section-pad mx-auto flex max-w-content items-center justify-between py-4">
        <a href="#top" className="font-display text-lg font-medium tracking-tight">
          {profile.name}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="link-underline text-sm text-ink-soft dark:text-mist-soft"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={profile.resumeUrl}
            className="link-underline text-sm text-ink-soft dark:text-mist-soft"
          >
            Resume
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line px-6 py-4 md:hidden dark:border-line-dark">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-base text-ink-soft dark:text-mist-soft"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href={profile.resumeUrl} className="block text-base text-ink-soft dark:text-mist-soft">
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
