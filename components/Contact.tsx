import { profile, socials } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="section-pad mx-auto max-w-content border-t border-line py-28 dark:border-line-dark">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
          Let&apos;s build something.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink-soft dark:text-mist-soft">
          I&apos;m always open to interesting projects, learning opportunities,
          collaborations, and conversations about technology.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-6">
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}
            className="border border-ink px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper dark:border-mist dark:text-mist dark:hover:bg-mist dark:hover:text-charcoal"
          >
            Email me →
          </a>
          <a
            href={socials.find((s) => s.label === "LinkedIn")?.href}
            className="link-underline text-sm font-medium text-ink-soft dark:text-mist-soft"
          >
            View LinkedIn →
          </a>
        </div>
      </div>
    </section>
  );
}
