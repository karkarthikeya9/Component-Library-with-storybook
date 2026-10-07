# react-assignment-ui

A production-quality **React 19** UI component library built with **TypeScript**,
**Vite**, **Tailwind CSS v4**, and **Storybook 10**. Design tokens live as CSS
variables (the single source of truth) and are wired into Tailwind so both
`var(--token)` and utilities (`bg-primary`, `text-muted`, …) work.

## Components

`Button` · `Input` · `Select` · `Modal` · `Table` · `Toast` · `Card` · `Badge`

All components are typed, documented with JSDoc, forward native attributes, and ship
with accessible defaults (focus rings, ARIA, keyboard support).

## Requirements

- Node 20.19+ (tested on Node 24)
- npm 11+

## Install

```bash
npm install
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run storybook` | Start Storybook dev server (http://localhost:6006) |
| `npm run build-storybook` | Build the static Storybook site → `storybook-static/` |
| `npm test` | Run the test suite once (`vitest run`) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run build` | Build the library (ESM + `.d.ts` + CSS) → `dist/` |
| `npm run dev:app` | Run the sample application (Vite dev server) |
| `npm run typecheck` | Type-check the whole project (`tsc --noEmit`) |

## Using the library

```ts
import 'react-assignment-ui/styles.css';
import { Button, Card, Badge } from 'react-assignment-ui';
```

The published artifact is:

- `dist/index.js` — ESM component bundle (React externalized)
- `dist/styles.css` — compiled design tokens + utilities
- `dist/index.d.ts` — TypeScript declarations

## Sample application

A separate Vite app lives in `sample-app/` and imports the library from `../src`
(via the `@lib` alias) — no library build step required. It demonstrates a small
dashboard using every component together.

```bash
npm run dev:app
```

## Design tokens

Tokens are defined in `src/styles/globals.css` (`@theme static`) and mirrored as a
typed object in `src/tokens/index.ts`. Categories: colors, spacing, radius, font
sizes, shadows, and transition durations. Browse them in the **Design Tokens**
section of Storybook.

## Project structure

```
src/
  components/         # one folder per component
  tokens/             # typed token export
  styles/             # globals.css (token definitions)
  stories/            # Storybook stories + MDX + tokens docs
  index.ts            # barrel export
  styles.ts           # CSS entry for the library build
tests/                # Vitest + RTL component tests
.storybook/           # main.ts + preview.ts
sample-app/           # separate Vite app consuming the library
docs/                 # product/architecture/contract docs
```

## Deployment & CI

Storybook is published to **GitHub Pages** automatically by GitHub Actions.

- `.github/workflows/ci.yml` — runs typecheck, tests, library build, and
  Storybook build on every push/PR.
- `.github/workflows/deploy-storybook.yml` — builds Storybook and deploys it to
  GitHub Pages on every push to `main`.

**First-time setup:**

```bash
git init && git add -A && git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<USERNAME>/<REPO>.git
git push -u origin main
```

Then enable Pages at **Settings → Pages → Source → GitHub Actions**. Your
Storybook will be live at `https://<USERNAME>.github.io/<REPO>/`.

## Documentation

See `docs/` for the full set: product, requirements, domain model, architecture,
tech stack, component contracts, UI/UX, security, testing, deployment, and agent
contracts. `AGENTS.md` describes agent collaboration conventions.
