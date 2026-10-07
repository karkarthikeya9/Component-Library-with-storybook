# 07 — UI / UX

## Principles

- **Consistency** — every component reads from the same token set, so spacing, color,
  and typography stay coherent.
- **Clarity of state** — disabled, loading, error, and empty states are explicit and
  never left ambiguous.
- **Accessibility by default** — focus rings, ARIA wiring, and keyboard support ship
  with the component, not as an afterthought.
- **Predictability** — components forward native attributes so developers can reach
  for standard behavior.

## Interaction patterns

- **Focus**: every interactive element shows a `:focus-visible` ring using the
  `focus-ring` token.
- **Feedback**: destructive actions are visually distinct; loading renders an
  accessible spinner (`aria-busy`) and blocks interaction.
- **Forms**: labels are programmatically associated; errors are announced
  (`role="alert"`) and linked via `aria-describedby`.
- **Modals**: focus is trapped, restored on close, and the page scroll is locked while
  open.
- **Toasts**: non-blocking, auto-dismiss by default, announced politely to screen
  readers, and manually dismissible.

## Responsiveness

- Buttons and badges adapt by size tokens; full-width variants are available for
  fluid layouts.
- Tables scroll horizontally on overflow; modals cap at 90vh and scroll internally.
- The sample app demonstrates a responsive dashboard layout.

## Empty & loading states

- **Table** shows skeleton rows while loading and a configurable empty message.
- **Toast** supports a persistent (`duration: 0`) mode for long-lived notices.
