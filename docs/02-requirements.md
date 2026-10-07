# 02 — Requirements

## Functional requirements

The library must provide eight components: **Button**, **Input**, **Select**,
**Modal**, **Table**, **Toast**, **Card**, and **Badge**.

Each component must:

- Be fully typed with TypeScript and JSDoc on every prop.
- Spread and forward native HTML attributes.
- Use `forwardRef` where a DOM ref is useful (Button, Input, Select).
- Support keyboard navigation and visible `:focus-visible` states.
- Use semantic HTML and correct ARIA.
- Contain no sample-app-specific or business logic.

## Non-functional requirements

- **Design tokens** must be CSS variables and the single source of truth, wired into
  Tailwind so both `var(--token)` and Tailwind utilities work.
- **Accessibility**: the library is checked with `@storybook/addon-a11y`.
- **Testing**: Vitest + React Testing Library + jsdom; `npm test` must pass.
- **Storybook**: every component documented with stories covering each variant, size,
  and state, with interactive controls.
- **Build**: `npm run build` emits ESM + `.d.ts` type declarations.
- **Sample app**: a separate Vite app consuming the library via imports.

See `docs/06-component-contract.md` for the exact component APIs.
