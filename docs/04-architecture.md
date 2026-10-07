# 04 — Architecture

## Package layout

```
src/
  components/        # one folder per component (self-contained)
    Button/
    Input/
    Select/
    Modal/
    Table/
    Toast/
    Card/
    Badge/
  tokens/index.ts    # typed mirror of the design tokens
  styles/globals.css # token definitions (@theme) + global base styles
  utils/cn.ts        # tiny className combiner
  index.ts           # barrel export (components + types + tokens)
  styles.ts          # CSS entry so `vite build` emits dist/styles.css
```

## Layering

1. **Tokens** — CSS variables in `styles/globals.css` (`@theme static`) are the single
   source of truth. `tokens/index.ts` mirrors them in typed form for programmatic use.
2. **Primitives** — each component is a self-contained folder with no cross-component
   coupling (the only shared helper is `cn`).
3. **Public API** — `src/index.ts` re-exports everything; `styles.ts` emits CSS.

## Build strategy

- **Vite (library mode)** bundles two entries:
  - `index` → `dist/index.js` (component bundle, React externalized).
  - `styles` → `dist/styles.css` (compiled Tailwind tokens + utilities).
- **TypeScript** emits `.d.ts` declarations into `dist/` via `tsc -p tsconfig.build.json`.
- Keeping styles as a separate entry keeps the JS bundle and `.d.ts` output free of
  CSS imports.

## Styling approach

Tailwind CSS v4 `@theme` maps tokens to both:

- native CSS custom properties (`var(--color-primary)`), and
- utility classes (`bg-primary`, `text-muted`, `p-md`, `rounded-md`, `shadow-sm`).

`@theme static` guarantees every token is always emitted as a CSS variable, even when
no utility references it.

## Consumers

The **sample-app/** directory is a separate Vite app that imports the library from
`../src` via the `@lib` alias, demonstrating the components working together.
