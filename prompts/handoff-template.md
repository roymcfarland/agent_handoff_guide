<!--
  GENERATED FILE — do not edit by hand.
  Source of truth: client/src/lib/content.ts (HANDOFF_TEMPLATE)
  Regenerate: pnpm generate:prompts
  License: MIT (same as the repository) — vendor freely.
  Guide: https://www.worksmithlabs.com/
-->
# Current Slice: [Name of the feature or fix]

## Context
[1-2 sentences explaining what this slice achieves in the broader project.]

## Acceptance Criteria (Definition of Done)
The agent MUST complete ALL of the following before committing:
- [ ] Criterion 1 (e.g., "The API endpoint returns a 200 OK with the correct JSON schema.")
- [ ] Criterion 2 (e.g., "Unit tests for the new endpoint pass.")
- [ ] Criterion 3
- Expected test delta: [baseline count] → [expected count] (or "no test changes expected")

## Constraints & Anti-Goals
- DO NOT refactor code outside of `src/api/`.
- DO NOT add new npm packages.
- DO NOT attempt to build the frontend UI for this endpoint.

## Pre-confirmed facts
Filled by the Advisor from repo recon. The Builder works from these — it does not re-derive them.
- `src/api/routes.ts:42` — `registerRoutes(app)` is the only route entry point.
- `git grep -n oldHelperName` → 3 references: `routes.ts:88`, `controllers.ts:14`, `tests/routes.test.ts:31` — all on the allowlist. [Grep every symbol being deleted or renamed; list every file that references it.]

## Files explicitly forbidden
Only list files with ZERO overlap with the allowlist — a file that is both forbidden and plausibly needed creates a contradiction the Builder cannot resolve.
- `src/billing/**` — adjacent but out of scope for this slice.

## Starting Point
- Relevant files: `src/api/routes.ts`, `src/api/controllers.ts`
- Known issues from previous slice: [Any bugs or stubs left behind]
