# Arnav Singh — Founder Portfolio

A startup-friendly founder page. Problem-first narrative, current venture front and center, proof of shipping — not a traditional developer resume.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Customize

Edit content in **`src/data/profile.ts`** and toggles in **`src/resources/config.ts`**:

- `routes` — enable/disable About, Work, Contact
- `display` — time, location, theme switcher
- `person`, `home`, `home.featured` — headline, subline, "Let's connect!" CTA
- `otherProjects[]` — project copy, `publishedAt`, links

- `profile.email`, `profile.links`, `profile.calLink` — contact & scheduling
- `profile.resumeUrl` — resume PDF in `public/`
- `now` — the "Now" strip below the hero
- `currentVenture.screenshots` — PNGs in `public/stayid/`
- `currentVenture.links` / `otherProjects[].links` — GitHub, demo, video per project

After deploy, update **`index.html`** OG tags (`og:url`, `og:image`) to your real domain so LinkedIn previews work.

## Deploy

```bash
npm run build
```

Deploy the `dist/` folder to [Vercel](https://vercel.com), [Netlify](https://netlify.com), or GitHub Pages.

### Vercel (recommended)

```bash
npx vercel
```

## Structure

| Section | Purpose |
| --- | --- |
| **Hero** | Who you are + what you're building now |
| **Venture** | StayID problem/solution + gallery |
| **Projects** | Other shipped products (MedScan, etc.) |
| **About** | Founder story |
| **Contact** | Email, GitHub, LinkedIn, Twitter |

## Tech

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Zero runtime dependencies — fast, static, deploy anywhere
