import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="section-pad mx-auto max-w-content border-t border-line py-24 dark:border-line-dark">
      <div className="mb-14 grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2 className="font-display text-2xl font-medium tracking-tight">Projects</h2>
          <p className="mt-3 max-w-xs text-sm text-ink-soft dark:text-mist-soft">
            A few things I&apos;ve built, end to end.
          </p>
        </div>
      </div>

      <div className="divide-y divide-line dark:divide-line-dark">
        {projects.map((project, i) => (
          <article
            key={project.name}
            className="group grid grid-cols-1 gap-6 py-10 first:pt-0 md:grid-cols-12 md:gap-12"
          >
            <div className="md:col-span-4">
              <span className="text-xs text-ink-soft dark:text-mist-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-xl font-medium tracking-tight transition-colors group-hover:text-accent dark:group-hover:text-accent-soft">
                {project.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-mist-soft">
                {project.description}
              </p>
            </div>

            <div className="md:col-span-5">
              <p className="text-sm leading-relaxed text-ink-soft dark:text-mist-soft">
                <span className="text-ink dark:text-mist">Problem: </span>
                {project.problem}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft dark:text-mist-soft">
                <span className="text-ink dark:text-mist">My part: </span>
                {project.contribution}
              </p>
            </div>

            <div className="flex flex-col justify-between md:col-span-3">
              <p className="text-sm text-ink-soft dark:text-mist-soft">
                <span className="text-ink dark:text-mist">Built with: </span>
                {project.stack.join(" · ")}
              </p>
              <div className="mt-4 flex gap-5">
                {project.liveUrl && (
                  <a href={project.liveUrl} className="link-underline text-sm text-ink dark:text-mist">
                    View project
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} className="link-underline text-sm text-ink dark:text-mist">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
