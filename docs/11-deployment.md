# 11 — Deployment

## Publishing the library

```bash
npm run build     # vite build (ESM bundle + CSS) + tsc (.d.ts declarations)
```

Outputs:

- `dist/index.js` — component bundle (ESM, React externalized)
- `dist/styles.css` — compiled tokens + utilities
- `dist/index.d.ts` + per-component `.d.ts` files

`package.json` exposes:

```json
{
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" },
    "./styles.css": "./dist/styles.css"
  }
}
```

Consumers:

```ts
import 'react-assignment-ui/styles.css';
import { Button } from 'react-assignment-ui';
```

Publish with `npm publish` after bumping the version.

## Storybook

```bash
npm run build-storybook   # static site -> storybook-static/
```

**Decision — host Storybook on GitHub Pages, published automatically by GitHub
Actions.** Rationale: free, standard, reproducible in-repo (the workflow is
committed), and it matches the blueprint §11 `git push → build → deploy`
pipeline. No third-party SaaS account is required beyond GitHub.

Storybook 10's Vite builder emits `base: './'`, so the static site works when
served under the `https://<user>.github.io/<repo>/` subpath with no extra
configuration.

## CI/CD

Two workflows are committed under `.github/workflows/`:

| Workflow | Trigger | What it does |
| --- | --- | --- |
| `ci.yml` | every push + PR | `npm ci` → typecheck → test → build → build-storybook |
| `deploy-storybook.yml` | push to `main` (or manual) | build Storybook → deploy to GitHub Pages |

### One-time setup (manual, ~5 min)

The repo is not yet a git repo, so the first publish needs these steps once:

1. Initialize and push to GitHub:

   ```bash
   git init
   git add -A
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<USERNAME>/<REPO>.git
   git push -u origin main
   ```

2. Enable GitHub Pages for the repo:
   **Settings → Pages → Source → "GitHub Actions"** (not the branch option).

3. That's it. The first push to `main` runs `deploy-storybook.yml` and publishes
   to `https://<USERNAME>.github.io/<REPO>/`. Subsequent pushes redeploy
   automatically.

> Tip: run `npm ci` (not `npm install`) in CI for deterministic installs against
> the committed `package-lock.json`. Node 22 is pinned in both workflows.

## Sample app

```bash
npm run dev:app           # local dev server (Vite)
npx vite build --config sample-app/vite.config.ts   # production build -> sample-app/dist/
```
