# Current Slice: Title-block footer — methodology revision table

## Context

Engineering drawings carry a title block: revision, date, description, drawn-by, checked-by. The site should carry a literal one in the footer — it is the methodology's changelog (credibility: the framework is alive and versioned) rendered in the site's own drafting idiom (delight). This is the first slice of the credibility track. NOTE: the Field Notes section (curated lessons from the operating ledger) is queued next but needs the human to pick which lessons go public — do not start it without that input.

## Acceptance Criteria (Definition of Done)

The agent MUST complete ALL of the following before committing:

- [ ] A new exported content block in `client/src/lib/content.ts` (e.g., `REVISION_TABLE`) holding an array of revisions: `{ rev, date, description }` — seeded with real history: v1.0 (initial publication: dual-agent loop, schema, prompt library), v1.x entries for the operational-rigor and failure-mode expansions (PRs #15–#22), and v2.0 (2026-07: Advisor named as third role; verdict triage; after-merge protocol; ceremony sizing; template upgrade).
- [ ] `client/src/components/SiteFooter.tsx` renders it as a drawing title block: bordered table, monospace caps headers (REV / DATE / DESCRIPTION / DRAWN / CHECKED), rows from the data, with DRAWN and CHECKED cells reading like a drawing stamp (e.g., DRAWN: RM · CHECKED: Verifier LLM). Keep it compact — the footer must not double in height on desktop.
- [ ] The table is responsive: no horizontal page scroll at 375px (wrap or hide low-priority columns via existing Tailwind patterns).
- [ ] Dark mode renders correctly (tokens only — no hardcoded colors).
- [ ] `pnpm check` passes with zero errors and `pnpm build` succeeds.

## Constraints & Anti-Goals

- DO NOT add new entries to `SECTIONS` — this is footer chrome, not a section.
- DO NOT add dependencies.
- DO NOT invent revision history — every row must correspond to real merged work (PR numbers in the description strings are welcome).
- DO NOT restyle the rest of the footer beyond integrating the block.

## Pre-confirmed facts

- The footer component is `client/src/components/SiteFooter.tsx`.
- Real revision anchors from git history: initial public release (PRs #1–#14 era), failure modes + operational rigor (PRs #15–#22), security/hygiene (PRs #23–#28), Advisor era: #30 (spec), #31 (role rollout), #32 (verdict triage), #33 (after-merge), #34 (ceremony sizing), #35 (template + amendment), #36 (diagram redraw).
- Design tokens: `--ink`, `--ink-soft`, `--red`, `--paper`, borders via `border-border`; stamps use the `.stamp` utility; mono size conventions ~10.5–11px with widest tracking.

## Files explicitly forbidden

- `client/src/components/diagrams/**` — untouched.
- `client/src/pages/sections/**` — untouched; footer only.

## Starting Point

- Relevant files: `client/src/lib/content.ts`, `client/src/components/SiteFooter.tsx`
- Known issues: none. Queued after this slice: Field Notes (needs human lesson curation), worked example, hygiene track (CI workflow, dead-component prune, wouter patch removal, theme toggle).
