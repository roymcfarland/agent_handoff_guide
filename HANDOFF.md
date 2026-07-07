# Current Slice: HANDOFF template upgrade + amendment prompt

## Context

The site's HANDOFF.md template has four sections (Context, Acceptance Criteria, Constraints, Starting Point). The operating practice adds three elements that prevent the most common mid-build failures: pre-confirmed facts (the Advisor's recon, so the Builder never guesses at file paths or symbols), an explicit forbidden-files list, and an expected test-count delta. Separately, the site never says what to do when a Builder STOPs on a non-allowlisted file — the answer is a minimal amendment, not a re-issued prompt. This slice adds both.

## Acceptance Criteria (Definition of Done)

The agent MUST complete ALL of the following before committing:

- [ ] `HANDOFF_TEMPLATE` in `client/src/lib/content.ts` gains three sections after "Constraints & Anti-Goals": **Pre-confirmed facts** (file paths with line numbers, function signatures, the grep results for every symbol being deleted or renamed — with a comment that the Advisor fills this from recon, the Builder never re-derives it), **Files explicitly forbidden** (only files with zero overlap with the allowlist), and an **Expected test delta** line in the Acceptance Criteria area (baseline count ± expected change).
- [ ] `SCHEMA_FILES`' HANDOFF.md entry's `contains` list is updated to reflect the new sections.
- [ ] A new **Amendment prompt** is added to the `PROMPT_LIBRARY` under the "Recurring loop" scenario (after the Verifier entry): a short prompt the Advisor sends when the Builder STOPs on a non-allowlisted file or a Verifier FAIL is a real-but-small defect. It authorizes the minimal extension (named file(s), named reason), re-states that the rest of the original scope is unchanged, and forbids using the amendment to expand the slice. Include `whenToUse`/`context` copy consistent with neighboring entries.
- [ ] The Prompt Library count stat in `client/src/pages/sections/OverviewSection.tsx` ("11 — Library prompts & templates") is updated to 12 — or better, derived from `PROMPT_LIBRARY` so it cannot drift again.
- [ ] `FIRST_HANDOFF_PROMPT`'s embedded HANDOFF shape stays consistent with the upgraded template (add the new sections to its skeleton).
- [ ] `pnpm check` passes with zero errors and `pnpm build` succeeds.

## Constraints & Anti-Goals

- DO NOT change the Builder/Closeout/Verifier prompt bodies except where the HANDOFF shape is quoted inside them.
- DO NOT add new entries to `SECTIONS`.
- DO NOT add dependencies.

## Starting Point

- Relevant files: `client/src/lib/content.ts`, `client/src/pages/sections/OverviewSection.tsx`
- Known issues: `content.ts` is exempt from the 800-line cap (PROJECT.md Q1). Queued after this slice: BuildVerifyDiagram redraw (visual), credibility track (Field Notes, worked example, title-block footer), hygiene track (CI workflow, dead-component prune, wouter patch removal, theme toggle).
