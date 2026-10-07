# 12 — Agent Contracts

This document defines how the specialist agents in this repository collaborate.
It maps to a multi-agent engineering workflow.

## Agents

| Agent | Owns |
| --- | --- |
| **project-manager** | Requirements, scope, architecture coordination, final verification |
| **frontend** | Pages, components, layouts, state management, API integration, UX fidelity, frontend tests |
| **backend** | APIs, databases, business logic, authentication, backend integrations |
| **tester** | Independent verification; structured QA results |

## Contract: frontend ↔ backend

For this **component library** there is no backend. The frontend agent is the sole
implementer. If the library were consumed by a product, the frontend agent would:

- identify the required API contract before building UI that consumes it,
- **not** invent endpoints or response shapes; and
- escalate unclear contracts to the project-manager.

## Contract: frontend ↔ tester

- Frontend hands off a component/user flow when it is meaningfully complete.
- Tester verifies the flow and returns a structured QA result (pass/fail + evidence).
- Frontend keeps ownership of fixes; tester re-verifies.

## Contract: everyone ↔ project-manager

Escalate to project-manager when:

- requirements are ambiguous,
- scope needs to change,
- architecture must change materially, or
- agents disagree about intended behavior.

## Definition of done

- All five verification commands pass: `npm install`, `npm run build`, `npm test`,
  `npm run build-storybook`, and `tsc --noEmit`.
- Component APIs match `docs/06-component-contract.md`.
- No known unresolved requirement remains.
