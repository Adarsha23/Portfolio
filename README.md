# Adarsha Prasai

My personal portfolio. A single page, comic themed site that shows the two products I have shipped and the work I did at Corpsec. Built from scratch, no template.

## Highlights

- **Comic visual language.** Inked titles (Bangers), comic panels with hard shadows, a ben-day halftone texture, yellow caption boxes, speech bubbles, and a custom cursor that trails the pointer and parks itself when you hover an embed.
- **Keyboard first.** A command palette on `Cmd/Ctrl + K` that also works as the mobile navigation. Hand built on the native `dialog` element and the ARIA combobox pattern, no library.
- **Peel case study.** The real 80 second product video, the app's own screenshots, and an in page board of sticky notes you can actually drag or summon with `Cmd + Shift + Space`.
- **Relay case study.** The real deployed app embedded live in two windows, so a visitor can create an issue in one and watch it sync to the other over a websocket. A short guide tells first timers exactly what to try.
- **Experience.** A section on my full stack and technical PM work at Corpsec, with real numbers.

## Tech

- Next.js 16 (App Router) and React 19
- TypeScript
- Tailwind CSS 4
- Deployed on Vercel

No CMS, no database, no auth. Every bit of content is typed data in the repo.

## Run it

Requires Node 20 or newer and pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

```bash
pnpm build        # production build
pnpm start        # serve the production build
pnpm lint
```

## Layout

```
app/          routes, root layout, fonts, global styles, favicon, OG image
components/   every section and interactive piece
public/       product video, screenshots, the comic
```

## Notes

- Motion is CSS first and driven by scroll timelines, so it costs the first paint almost nothing, and all of it respects `prefers-reduced-motion`.
- Images go through `next/image`. The product video and the live Relay demo load only when you reach them.
- Before deploying, set `metadata.metadataBase` in `app/layout.tsx` to the real domain so Open Graph and canonical URLs resolve.

## Contact

- Email: prasaiadarsha@gmail.com
- LinkedIn: https://www.linkedin.com/in/adarsha-prasai-637b49283/
- GitHub: https://github.com/Adarsha23
