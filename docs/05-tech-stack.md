# 05 — Tech Stack

| Layer | Choice | Version |
| --- | --- | --- |
| Runtime | React | 19.x |
| Language | TypeScript | 5.9.x |
| Bundler (library + app) | Vite | 6.x |
| Styling | Tailwind CSS | 4.x |
| Component docs | Storybook | 10.x (react-vite) |
| A11y checking | @storybook/addon-a11y | 10.x |
| Unit tests | Vitest | 3.x |
| DOM tests | @testing-library/react + jest-dom + user-event | 16 / 7 / 14 |
| Test environment | jsdom | 30.x |
| Package manager | npm | 11.x |

## Version decisions

- **Storybook 10** (latest stable, satisfies "v8+") was required for a clean install
  with stable React 19: Storybook 8/9 declare `react@^19.0.0-beta` as a peer, which
  npm rejects for `react@19.x` stable. Storybook 10 declares `^19.0.0`.
- **`@storybook/addon-essentials` was removed in Storybook 9+** (its contents —
  controls, actions, viewport, backgrounds, toolbars, measure, outline — moved into
  Storybook core). The equivalent addons used here are `@storybook/addon-docs` and
  `@storybook/addon-a11y`.
- **Vite 6 + @vitejs/plugin-react 5** were chosen over the newer Vite 8 line (which
  moves to the Rolldown/Oxc pipeline) for stability and broad Storybook compatibility.
- **TypeScript 5.9** was chosen over the TypeScript 7 native-compiler line for
  stability of the `tsc` declaration build.

## No runtime dependencies

The library has no runtime dependencies other than React/ReactDOM (declared as peer
dependencies). Everything else is a dev dependency.
