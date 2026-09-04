import { journey } from "@/lib/data";

export default function Journey() {
  return (
    <section id="journey" className="section-pad mx-auto max-w-content border-t border-line py-24 dark:border-line-dark">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2 className="font-display text-2xl font-medium tracking-tight">My journey so far</h2>
        </div>

        <div className="md:col-span-8">
          <ol className="relative border-l border-line pl-8 dark:border-line-dark">
            {journey.map((step) => (
              <li key={step.period} className="mb-12 last:mb-0">
                <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-accent dark:bg-accent-soft" />
                <p className="text-sm text-accent dark:text-accent-soft">{step.period}</p>
                <h3 className="mt-1 font-display text-lg font-medium text-ink dark:text-mist">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink-soft dark:text-mist-soft">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
