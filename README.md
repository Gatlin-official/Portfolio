# Gatlin A — Portfolio (block-world edition)

A Minecraft-inspired personal portfolio built with **React + Vite**. All textures and pixel icons are
generated in code (no copied game assets).

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # outputs static site to dist/
npm run preview    # preview the production build
```

## Edit content

Everything you'd want to change lives in **`src/data.js`** — profile, skills, projects, certifications,
links, and the yellow splash texts. To link a project to its own repo, fill in that project's `repo` URL. A project with an empty `repo` links to your GitHub
profile.

Replace `public/Gatlin_A_Resume.pdf` to update the downloadable resume.

## Features

- **Live sky**: follows the visitor's local clock (dawn, day, dusk, night). The sun and moon arc across the sky and stars fade in.
  The top-right button cycles Live / Day / Night. Preview any time with `?t=19:30`.
- **Mineable ground**: hold a block in the hero to break it (grass → dirt → stone → ore → air). Click empty space to place dirt.
  With the keyboard, Tab to the ground, use the arrow keys to move, and press Enter to mine.
- **Command console**: press `/` or `T` to open it. Commands: `/help`, `/tp <section>` (or just `/projects`),
  `/time set <auto|day|night>`, `/time query`, `/sound <on|off>`, `/resume`, `/email`, `/github`, `/clear`
- **Sound effects**: synthesized with Web Audio (no audio files) and muted by default
- Title-screen hero with clickable splash text and drifting clouds
- Hotbar navigation — press **1–7** to jump between sections
- Inventory-style skills with tooltips, quest-log experience, loot-chest projects with spinning 3D blocks
- Advancement toasts for certifications, sign-board contact section
- Responsive, keyboard-accessible, respects reduced-motion

## Deploy

- **Vercel / Netlify:** import the repo — build command `npm run build`, output directory `dist`.
- **GitHub Pages:** run `npm run build` and publish the `dist/` folder (e.g. with the `gh-pages`
  package: `npx gh-pages -d dist`). `base: './'` in `vite.config.js` makes it work from any subpath.
