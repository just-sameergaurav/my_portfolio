import PhotoFrame from "./PhotoFrame";

const exploring = [
  "Web Development",
  "Java & systems fundamentals",
  "Data / Analytics",
  "Cloud Technologies",
  "AI / Emerging Technologies",
];

export default function About() {
  return (
    <section id="about" className="section-pad mx-auto max-w-content border-t border-line py-24 dark:border-line-dark">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2 className="font-display text-2xl font-medium tracking-tight">About</h2>
          <div className="mt-8">
            <PhotoFrame />
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="max-w-prose space-y-5 text-base leading-relaxed text-ink-soft dark:text-mist-soft">
            <p>
              I started out needing a website — my family runs a small food
              brand and I ended up building its store, its backend, and its
              admin dashboard myself. Somewhere in that process, the tool
              became the interest. Now I build because I want to, not because
              I have to.
            </p>
            <p>
              I care about understanding how things actually work underneath —
              not just gluing libraries together. That means spending real
              time on fundamentals alongside the projects, even when it&apos;s
              slower going. I&apos;d rather be honest about what I know than
              perform expertise I don&apos;t have yet.
            </p>
            <p>
              What I want to become: a developer who can take a real problem,
              own it end to end, and ship something people actually use.
            </p>
          </div>

          <div className="mt-10">
            <h3 className="mb-4 text-sm text-ink-soft dark:text-mist-soft">Currently exploring</h3>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
              {exploring.map((item) => (
                <li
                  key={item}
                  className="border-b border-line py-2 text-sm text-ink dark:border-line-dark dark:text-mist"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
