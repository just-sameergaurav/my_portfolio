// ─────────────────────────────────────────────────────────────
// Edit this file to update your content. Nothing else in the
// codebase needs to change when you update your info.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "SAMEER GAURAV",
  fullName: "Sameer Gaurav",
  role: "Developer in the making",
  location: "Vadodara, India",
  email: "sameergaurav2006@gmail.com",
  resumeUrl: "/resume.pdf", // TODO: drop your resume PDF into /public
};

export const socials = [
  { label: "GitHub", href: "https://github.com/just-sameergaurav" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sameer-gaurav-a464b43aa/" },
  { label: "Instagram", href: "https://www.instagram.com/iamyour.sammy/" },
  { label: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=sameergaurav2006@gmail.com" },
];

export const skillGroups = [
  {
    category: "Languages",
    items: [
      { name: "JavaScript", status: "comfortable" },
      { name: "Java", status: "comfortable" },
      { name: "C++", status: "comfortable" },
      { name: "R", status: "learning" },
    ],
  },
  {
    category: "Web",
    items: [
      { name: "HTML & CSS", status: "comfortable" },
      { name: "Next.js", status: "comfortable" },
      { name: "Tailwind CSS", status: "comfortable" },
      { name: "Node.js / Express", status: "comfortable" },
    ],
  },
  {
    category: "Data & Cloud",
    items: [
      { name: "SQL / SQLite", status: "comfortable" },
      { name: "BigQuery", status: "learning" },
      { name: "Cloud fundamentals", status: "learning" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git & GitHub", status: "comfortable" },
      { name: "VS Code", status: "comfortable" },
      { name: "Figma", status: "learning" },
    ],
  },
] as const;

export const projects = [
  {
    name: "Ashta — E-commerce Platform",
    description:
      "A production-grade storefront and admin system built end-to-end for a small food brand — from checkout to stock management.",
    problem:
      "The brand needed a real online store, not a template: order tracking, inventory that stays accurate, and a way to take payments reliably in India.",
    contribution:
      "Designed and built the full stack solo — schema, API, admin dashboard, and the storefront UI.",
    stack: ["Node.js", "Express", "SQLite", "JavaScript", "Razorpay", "Easebuzz"],
    githubUrl: "",
    liveUrl: "",
  },
  {
    name: "SoundWave",
    description:
      "An open-source, ad-free music streaming interface built around the YouTube IFrame API.",
    problem:
      "Wanted a clean, distraction-free way to stream music without a bloated player UI — and a reason to learn real-time audio state management.",
    contribution:
      "Built the entire client from scratch — player state, queue logic, and a grainy-gradient visual identity.",
    stack: ["JavaScript", "HTML", "CSS", "YouTube IFrame API"],
    githubUrl: "",
    liveUrl: "",
  },
  {
    name: "This Portfolio",
    description:
      "The site you're looking at right now — an editorial, no-nonsense personal site built to actually explain who I am.",
    problem:
      "Most portfolio templates say nothing specific. This one is meant to hold up under a recruiter's actual scrutiny.",
    contribution: "Designed and built with Next.js, TypeScript, and Tailwind.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "",
    liveUrl: "",
  },
] as const;

export const journey = [
  {
    period: "2025",
    title: "Getting started",
    description:
      "Started exploring programming seriously — the fundamentals, the tooling, and what it actually feels like to build something from nothing.",
  },
  {
    period: "2026",
    title: "Building for real",
    description:
      "Shipped a full-stack e-commerce platform end to end, picked up cloud and data tooling, and kept strengthening the fundamentals along the way.",
  },
  {
    period: "Present",
    title: "Still building",
    description:
      "Actively building, experimenting, and looking for the next opportunity to learn something the hard way.",
  },
] as const;

export const currentlyExploring = [
  "Building better web applications",
  "Strengthening Java & programming fundamentals",
  "Exploring cloud technologies",
  "Learning data and analytics",
  "Experimenting with AI-powered applications",
];
