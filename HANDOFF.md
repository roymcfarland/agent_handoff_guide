# Current Slice: Delight batch — the notebook remembers, prints, and shows progress

## Context

The final roadmap waypoint: four small delight features that deepen the notebook metaphor. Each is independent; if any one fights the prerender or grows past its box, drop it and note it in the PR rather than expanding the slice.

## Acceptance Criteria (Definition of Done)

The agent MUST complete ALL of the following before committing (or explicitly drop-and-declare per item):

- [ ] **Checklist persistence** — the Edit Pass checklist card (Prompt Library, `edit-pass` item) gets real checkboxes for its `[ ]` lines, persisted to localStorage (key like `ahf-editpass-v1`), restored on load. Hydration-safe: initial render unchecked (matching prerender), restore in an effect. "The notebook remembers your pencil marks."
- [ ] **Download-as-.md** — each PromptCard gets a download button beside Copy, saving the body as its `filename` (Blob + anchor-download; client-only handler). No new dependencies.
- [ ] **Print stylesheet** — `@media print` in index.css: hide header/toggle/copy buttons/toasts, black-on-white with the grid dropped, sensible page breaks between sections (`break-inside: avoid` on cards), URLs NOT expanded after links (too noisy). The PDF should read like a printed spec.
- [ ] **Reading-progress line** — a thin drafting-red progress line under the sticky header tracking scroll depth (transform scaleX from scroll ratio; rAF-throttled; hydration-safe initial 0). No layout shift.
- [ ] Prerender passes, zero hydration warnings, all existing CI gates green.
- Expected test delta: none (repo has no test suite).

## Constraints & Anti-Goals

- DO NOT add dependencies.
- DO NOT persist anything beyond the checklist key; no analytics, no fingerprinting.
- DO NOT let the progress line animate with smooth-scroll easing — it tracks scroll directly (and remember: rAF is throttled in hidden tabs; verification uses instant scroll).
- DO NOT redesign the PromptCard row — the download button matches the existing copy-button styling.

## Pre-confirmed facts

- Edit Pass checklist body lives in `EDIT_PASS_CHECKLIST` (content.ts) rendered via PromptCard/MarkdownBlock — recon the actual renderer before building; if the checklist renders as a plain `<pre>`, the checkbox layer needs its own small renderer for that one card (builder's judgment, keep it contained).
- PromptCard already has `filename` on every library item and a working clipboard+toast pattern.
- The header is sticky (`sticky top-0 z-40`) — the progress line can be its `::after` or a child div; `shadow-[inset...]` already draws a bottom accent, so place the line INSIDE the border-b.
- localStorage access must live in effects/handlers only (prerender).

## Files explicitly forbidden

- `prompts/**`, `client/public/llms.txt` (generated), `.github/**`, `server/**`.

## Starting Point

- Relevant files: `client/src/components/PromptCard.tsx`, `client/src/index.css`, `client/src/components/SiteHeader.tsx`, possibly a small new `client/src/components/` file for the checklist
- Known issues: none. After this slice the July 2026 roadmap is complete; remaining backlog lives in memory (express 5, paging decision, community items).
