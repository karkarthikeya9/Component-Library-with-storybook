# AGENTS.md

Guidance for AI/automated agents working in this repository.

## What this repo is

A React 19 + TypeScript + Vite component library with Tailwind CSS v4 and Storybook 10.
There is **no backend**; everything is frontend/presentational.

## Project conventions

- Components live in `src/components/<Name>/` and are self-contained.
- Design tokens are CSS variables in `src/styles/globals.css` (`@theme static`) — this
  is the **single source of truth**. `src/tokens/index.ts` mirrors them in typed form;
  keep the two in sync.
- Reuse the `cn()` helper in `src/utils/cn.ts` for className composition.
- Use `forwardRef` for components where a DOM ref is useful (Button, Input, Select).
- Keep JSDoc on every prop. Match the APIs in `docs/06-component-contract.md`.
- No component may contain sample-app-specific or business logic.
- New components need: a story (each variant/size/state) and tests in `tests/`.

## Commands

```bash
npm install                 # clean install
npm run build               # library build (ESM + .d.ts + CSS)
npm test                    # vitest run (must pass)
npm run build-storybook     # static Storybook build (must succeed)
npm run typecheck           # tsc --noEmit (must pass)
npm run dev:app             # sample app dev server
npm run storybook           # Storybook dev server
```

## Verification (definition of done)

Before reporting success, run all of these and confirm they pass:

1. `npm install` — clean
2. `npm run build` — succeeds (including type declarations)
3. `npm test` — all tests pass
4. `npm run build-storybook` — succeeds
5. `npm run typecheck` — passes

Do **not** claim a command passed unless it actually ran successfully.

## Locked stack (do not deviate)

React 19 · TypeScript · Vite · Tailwind CSS v4 (CSS-variable tokens) · Storybook (v8+,
installed: 10) · Vitest + React Testing Library + jsdom · @storybook/addon-a11y · npm.

## Version notes

- Storybook 10 is used because Storybook 8/9 declare `react@^19.0.0-beta` as a peer,
  which breaks a clean install against stable React 19.
- `@storybook/addon-essentials` was removed in Storybook 9+; its functionality moved
  into core. Only `@storybook/addon-docs` and `@storybook/addon-a11y` are registered.
- Vite 6 (Rollup-based) is pinned for stability; the Vite 8 line uses Rolldown/Oxc.
