# 03 — Domain Model

A component library's "domain" is its vocabulary of UI concepts. The model is small
and stable.

## Core concepts

| Concept | Description |
| --- | --- |
| **Token** | A named design decision (color, spacing, radius, font size, shadow, transition). The single source of truth, stored as CSS variables. |
| **Component** | A reusable, typed React element with a defined API and visual/behavioral contract. |
| **Variant** | A named visual style within a component (e.g. `ButtonVariant`). |
| **Size** | A named dimension step within a component (e.g. `ButtonSize`). |
| **State** | A runtime condition of a component (default, hover, focus, active, disabled, loading, error, empty). |

## Component relationships

- `Card` is **composed** of subcomponents (`Card.Header`, `Card.Content`,
  `Card.Footer`), attached as static properties.
- `Toast` is **stateful/contextual**: `ToastProvider` owns state, `useToast()`
  exposes actions, and `ToastViewport` renders the queue.
- `Table<T>` is **generic** over its row type; columns declare how to render cells.

## Tokens (summary)

Full values live in `src/tokens/index.ts` and `src/styles/globals.css`:

- **colors**: primary (+hover/active), secondary, destructive, success, warning,
  info, background, surface, foreground (text), muted (text), border, focus-ring.
- **spacing**: xs, sm, md, lg, xl.
- **radius**: sm, md, lg, full.
- **font sizes**: sm, md, lg, xl.
- **shadows**: sm, md, lg.
- **transitions**: fast, base, slow.
