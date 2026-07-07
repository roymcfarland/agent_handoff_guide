# Current Slice: Worked example — one slice end-to-end, receipts included

## Context

The site now has doctrine (verdict triage, after-merge protocol, ceremony sizing) and evidence (Field Notes) — but a reader still never sees what a good run *looks like*. This slice adds one complete, verifiable worked example: this repo's own PR #36 (the loop-figure redraw), which conveniently exercised the whole system — a HANDOFF with pre-confirmed facts, a build, a pixel check that caught a pre-existing render bug, a human review catch ("the label is not centered"), an Advisor recon that found the real cause (the gap, not the label), and a same-branch amendment. Every artifact is public.

## Acceptance Criteria (Definition of Done)

The agent MUST complete ALL of the following before committing:

- [ ] A new `WORKED_EXAMPLE` export in `client/src/lib/content.ts`: a stepwise narrative (6–8 steps) of PR #36 — (1) the HANDOFF scope with pre-confirmed geometry; (2) the build; (3) verification beyond green checks (text-fit measured, full-figure screenshot) catching the hidden "PR opened" label; (4) the human review catch on the preview; (5) the triage — first fix treated the symptom (nudge), reviewer pushed back, recon found the cause (a 40px gap holding a 36px label); (6) the amendment on the same branch, no re-issued slice; (7) merge + live verification. Each step names which doctrine block it exercised (pre-confirmed facts, green-is-not-shipped, verdict triage, amendment prompt, after-merge protocol).
- [ ] Each step links its receipt: the PR, the specific commits, or the review comments (all public on github.com/roymcfarland/agent_handoff_guide/pull/36).
- [ ] Renders as a subsection of Field Notes (no new nav section — it is the notes' capstone), in the notebook idiom, after the ten note cards.
- [ ] The framing is honest about imperfection: the example's value is that the first fix was wrong and the loop caught it — do not sand that off.
- [ ] `pnpm check` passes, `pnpm build` succeeds, CI green on the PR.
- Expected test delta: none (repo has no test suite).

## Constraints & Anti-Goals

- DO NOT add a new `SECTIONS` entry (the header is at capacity below 2xl; this lives inside Field Notes).
- DO NOT dramatize — spec voice, verifiable claims only.
- DO NOT add dependencies.

## Pre-confirmed facts

- The full artifact trail is public: PR #36 (branch `feat/diagram-advisor`), its three commits (redraw; draw-order fix + first centering attempt; gap-widening fix), and two Advisor comments documenting the triage.
- The Field Notes section component is `client/src/pages/sections/FieldNotesSection.tsx`; the section id is `field-notes`.
- Note 02 in `FIELD_NOTES` already references the hidden-label bug — the worked example should link to it as "note 02, in full" rather than repeating it.

## Files explicitly forbidden

- `client/src/components/SiteHeader.tsx`, `client/index.html`, `server/**`, `.github/**`.

## Starting Point

- Relevant files: `client/src/lib/content.ts`, `client/src/pages/sections/FieldNotesSection.tsx`
- Known issues: none. Queued after: express 5 migration (drops the qs/path-to-regexp security overrides), small SEO/a11y batch (sitemap + robots line, viewport maximum-scale removal, VITE_SITE_URL build guard), delight batch (Edit Pass checklist persistence, per-card download-as-.md, print stylesheet).
