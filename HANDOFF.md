# Current Slice: "After the merge" protocol block in Operate the framework

## Context

The site's loop currently ends at "APPROVE → merge to main and run the next Builder." The operating practice has a whole post-merge protocol the site never mentions: verifying the merge actually landed, ledger discipline, branch and preview-deployment housekeeping, and production verification. This slice adds that protocol to the Operate the framework (Phase 2) section, where cadence content lives.

## Acceptance Criteria (Definition of Done)

The agent MUST complete ALL of the following before committing:

- [ ] A new exported content block in `client/src/lib/content.ts` (e.g., `AFTER_MERGE`) covering, in order: (1) verify the merge landed — "approved and merged" is a claim; assert the commit is on main before any housekeeping, and gate destructive cleanup (branch pruning) on verified merge state; (2) ledger discipline — every PR records itself in the CHANGELOG/roadmap ledger in its own diff; a stale ledger means the loop is not finished; (3) housekeeping — prune the local branch, confirm the remote head auto-deleted, and check that per-branch preview deployments died with the branch (they silently outlive it on most platforms); (4) production is the last gate — the preview proves the code path, prod proves environment-specific behavior; a slice is not done until a live check against the real deployment passes.
- [ ] The block renders in `client/src/pages/sections/PhaseTwoSection.tsx`, after the wiring steps (`PHASE_TWO_WIRING`) — the wiring ends at "Merge with confidence," and this block is what happens next.
- [ ] The copy stays tool-agnostic (no GitHub/Vercel-specific commands in the body; platform-generic phrasing like "your host's preview deployments").
- [ ] `pnpm check` passes with zero errors and `pnpm build` succeeds.

## Constraints & Anti-Goals

- DO NOT add new entries to `SECTIONS` (this lives inside Operate the framework).
- DO NOT modify the operative bodies of the library prompts in this slice.
- DO NOT add dependencies; reuse the section's existing card/list patterns.
- DO NOT restate the "Trusting the report over the repo" failure-mode card verbatim — reference the discipline, add the operational steps.

## Starting Point

- Relevant files: `client/src/lib/content.ts`, `client/src/pages/sections/PhaseTwoSection.tsx`
- Known issues: `content.ts` is exempt from the 800-line cap (PROJECT.md Q1). Queued after this slice: ceremony-sizing doctrine, HANDOFF template upgrade + amendment prompt, BuildVerifyDiagram redraw (visual), plus the credibility track (Field Notes, worked example, title-block footer).
