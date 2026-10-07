# 08 — Security

As a presentational UI library, this project introduces minimal security surface.
The following notes apply to its use:

## XSS / injection

- Components render children and props via React, which escapes text by default.
- The library never uses `dangerouslySetInnerHTML`.
- Consumers are responsible for sanitizing any untrusted content they render as
  `ReactNode` (e.g. a `Table` column `render` that injects raw markup).

## Dependencies

- The library ships **zero runtime dependencies** beyond React/ReactDOM (peers),
  minimizing supply-chain exposure.
- All tooling dependencies are dev-only and do not ship in `dist/`.
- Keep dependencies updated; run `npm audit` in CI.

## Sample app

- The sample app is a static demo with no backend, no auth, and no secrets.
- `.env.example` documents that no environment variables are required; if consumers
  wire the app to a backend, secrets must stay out of the client bundle.

## Recommendations for consumers

- Validate and sanitize data at the boundary before passing it into components.
- Treat any `render` callback output as application code, subject to normal review.
