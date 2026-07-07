# Current Slice: "Sizing the ceremony" doctrine block

## Context

The site currently presents the full loop as universal — every change through Builder, Verifier, and gatekeeper. The operating doctrine has evolved: the loop is a tool, not a tax. For a small, well-understood, content-only slice, the Advisor may build directly and self-verify — while holding every gate a verifier would (PR, never main; ledger in the same diff; the project's real checks; live-surface verification). This slice adds that doctrine so the framework stops over-prescribing.

## Acceptance Criteria (Definition of Done)

The agent MUST complete ALL of the following before committing:

- [ ] A new exported content block in `client/src/lib/content.ts` (e.g., `CEREMONY_SIZING`) covering: (1) when the full loop earns its overhead — large, logic-heavy, multi-file, or destructive changes, where a fresh-context builder or adversarial reviewer genuinely de-risks the work; (2) when direct execution is appropriate — a few-line config fix, a copy/content edit, a one-line policy tweak, a file rename; (3) the invariant — "drop the round-trip, never the gates": direct-mode still opens a PR (never pushes to main), updates the ledger in the same diff, runs the project's real build/typecheck/test gates, and verifies on the live surface before recommending merge; (4) the trap — green local plus green preview is not green production when the change keys on an environment-specific value.
- [ ] The block renders in the Build & Verify section (`client/src/pages/sections/BuildVerifySection.tsx`), positioned after the escalation rule and before the drop-in markdown spec.
- [ ] The "One slice in flight at a time" rule and the Verifier-discipline copy elsewhere on the page are untouched — this block scopes WHICH changes enter the loop, not how the loop runs.
- [ ] `pnpm check` passes with zero errors and `pnpm build` succeeds.

## Constraints & Anti-Goals

- DO NOT add new entries to `SECTIONS`.
- DO NOT weaken the non-negotiables: the block must read as "the gates are constant, the round-trip is variable," never as "small changes skip review."
- DO NOT modify the operative bodies of the library prompts.
- DO NOT add dependencies; reuse existing card/list patterns.

## Starting Point

- Relevant files: `client/src/lib/content.ts`, `client/src/pages/sections/BuildVerifySection.tsx`
- Known issues: `content.ts` is exempt from the 800-line cap (PROJECT.md Q1). Queued after this slice: HANDOFF template upgrade + amendment prompt, BuildVerifyDiagram redraw (visual), credibility track (Field Notes, worked example, title-block footer).
