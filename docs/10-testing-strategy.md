# 10 — Testing Strategy

## Stack

Vitest + React Testing Library + jest-dom + user-event, running in jsdom.

## Coverage

Each component has a dedicated test file under `tests/`:

| Component | Key behaviors tested |
| --- | --- |
| Button | renders children; fires `onClick`; `disabled` blocks click; `loading` shows spinner + `aria-busy` and blocks interaction |
| Input | label association; error + `aria-invalid` + `aria-describedby`; `onChange`; helper text |
| Select | renders options; `onChange`; placeholder; error state |
| Modal | not rendered when closed; rendered when open; `onClose` on Escape; `onClose` on overlay click; focus trapped and moved inside |
| Table | renders headers + rows; empty message; custom empty message; custom cell render |
| Card | renders header/content/footer subcomponents; direct children |
| Badge | renders children; dot variant with accessible status text |
| Toast | renders via `useToast`; auto-dismiss (fake timers); manual dismiss |

## Running

```bash
npm test          # single run (vitest run)
npm run test:watch
```

## Notes

- `tests/setup.ts` registers jest-dom matchers and an explicit `afterEach(cleanup)`
  (required because Vitest globals are disabled).
- Toast auto-dismiss is tested with Vitest fake timers via synchronous `fireEvent` to
  avoid `user-event`/fake-timer deadlocks.
- Type safety is verified separately with `npm run typecheck` (`tsc --noEmit`).
