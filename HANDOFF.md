# Current Slice: Field Notes section — lessons from operating the framework

## Context

The site prescribes but never shows receipts. The operating practice has produced a large ledger of hard-won lessons, and this repo itself is run with the framework it documents (PRs #15–#41 are a public audit trail). A curated Field Notes section converts the site from opinion to evidence — the single highest-credibility addition identified in the July 2026 review.

**STATUS: BLOCKED ON HUMAN CURATION.** A candidate list of notes has been drafted by the Advisor and is awaiting the owner's veto/selection. Do not build this slice until the owner has approved the final set. Once approved, the ACs below apply to the approved subset.

## Acceptance Criteria (Definition of Done)

The agent MUST complete ALL of the following before committing:

- [ ] A new `FIELD_NOTES` export in `client/src/lib/content.ts`: the approved notes, each `{ n, title, story, rule }` — a numbered note with a 2–4 sentence war story (tool-agnostic, no client identifiers) and a one-line operating rule it produced.
- [ ] A new section renders them (placement decision at build time: either its own nav section between Build & Verify and Operate, or a subsection of Build & Verify — owner's call when approving the notes). Cards in the notebook idiom, numbered like the failure-mode cards.
- [ ] An intro line establishes provenance without over-claiming: these are lessons from operating the framework on real repositories, including this one — with a link to the repo's merged-PR history as the live audit trail.
- [ ] At least two notes reference verifiable events in THIS repo (e.g., the "PR opened" label hidden under the Verifier box since first ship, fixed in #36; the prompt-count stat that claimed 11 with 10 items, fixed in #35) so a skeptical reader can check the receipts.
- [ ] `pnpm check` passes, `pnpm build` succeeds, CI green on the PR.
- Expected test delta: none (repo has no test suite).

## Constraints & Anti-Goals

- DO NOT publish any note the owner has not explicitly approved.
- DO NOT include client names, private repo details, or model-vendor rankings (PROJECT.md non-goal: tool-agnostic).
- DO NOT exceed ~12 notes — curation is the point; the ledger stays private.

## Starting Point

- Relevant files: `client/src/lib/content.ts`, new/edited section component, `client/src/pages/Home.tsx` + `SECTIONS` (only if a new nav section is approved)
- Known issues: candidate list delivered to the owner 2026-07-07; waiting on selection. Queued after: worked example, express 5 migration.
