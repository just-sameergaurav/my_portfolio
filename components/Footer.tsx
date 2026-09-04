import { profile, socials } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="section-pad mx-auto max-w-content border-t border-line py-10 dark:border-line-dark">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="text-sm font-medium text-ink dark:text-mist">{profile.name}</p>
          <p className="text-xs text-ink-soft dark:text-mist-soft">
            Designed &amp; built with curiosity.
          </p>
        </div>

        <div className="flex gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="link-underline text-xs text-ink-soft dark:text-mist-soft"
            >
              {s.label}
            </a>
          ))}
        </div>

        <p className="text-xs text-ink-soft dark:text-mist-soft">
          © 2026 {profile.name}
        </p>
      </div>
    </footer>
  );
}
