# Portfolio Site

A minimal, editorial personal portfolio built with Next.js, TypeScript, and
Tailwind CSS. Light/dark mode included.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new) — zero
config needed. Or run `npm run build && npm start` anywhere that supports
Node.

## Customize your content

Everything you'll want to change lives in one place:

**`lib/data.ts`** — your name, email, resume link, socials, skills, projects,
and the "journey" timeline. Nothing else in the codebase needs to change when
you edit this file.

A few things to do before it's ready to ship:

- [ ] Replace `profile.email` and `profile.resumeUrl` in `lib/data.ts`
- [ ] Drop your actual resume PDF into `/public/resume.pdf`
- [ ] Drop a candid photo into `/public/photo.jpg` (until you do, the About
      section shows a placeholder frame instead of a broken image)
- [ ] Fill in real GitHub/live links on each project in `lib/data.ts`
- [ ] Swap the social links for your real profiles
- [ ] Update the About section copy in `components/About.tsx` — it's
      currently written in first person as placeholder narrative

## Design notes

- **Colors:** warm ivory / charcoal in light mode, deep charcoal-violet in
  dark mode, with a single muted-violet accent (`#6B5B95`). Defined as
  Tailwind tokens in `tailwind.config.ts` if you want to change the palette.
- **Type:** Manrope for headings, Inter for body, JetBrains Mono for the
  terminal snippet in the hero.
- **No component library** — everything is hand-built with Tailwind
  utilities, so there's nothing extra to strip out.
