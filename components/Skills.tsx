import { skillGroups } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="section-pad mx-auto max-w-content border-t border-line py-24 dark:border-line-dark">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2 className="font-display text-2xl font-medium tracking-tight">Skills</h2>
          <p className="mt-3 max-w-xs text-sm text-ink-soft dark:text-mist-soft">
            What I&apos;m comfortable with, and what I&apos;m actively working on.
          </p>
          <div className="mt-6 flex gap-5 text-xs text-ink-soft dark:text-mist-soft">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-ink dark:bg-mist" /> Comfortable
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full border border-ink-soft dark:border-mist-soft" /> Learning
            </span>
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.category}>
                <h3 className="mb-3 text-sm font-medium text-ink dark:text-mist">
                  {group.category}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center gap-2.5 text-sm text-ink-soft dark:text-mist-soft"
                    >
                      {item.status === "comfortable" ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-ink dark:bg-mist" />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full border border-ink-soft dark:border-mist-soft" />
                      )}
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
