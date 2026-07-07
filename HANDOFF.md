# Current Slice: Sheet index + anchor links

## Context

Construction drawings open with a sheet index; this site now has ten "files" and no map. This slice adds a drawing-index block right after the hero (number, title, one-line contents, click to jump) and hover anchor-copy affordances on section headings so people can share the exact section or field note — the notes are the viral units; make them addressable.

## Acceptance Criteria (Definition of Done)

The agent MUST complete ALL of the following before committing:

- [ ] A `SHEET_INDEX` export in `client/src/lib/content.ts` derives from `SECTIONS` (never a second hand-written list) plus a one-line `contents` description per section id.
- [ ] The index renders in the Overview section after the stats strip, styled as a drawing sheet index: bordered table/list, mono numbers, section title, contents line, whole row is an anchor link to `#<id>`.
- [ ] Section headings (via `SectionHeader`) gain a hover-revealed anchor-copy button: click copies `<origin>/#<id>` to the clipboard and toasts (sonner already present). Keyboard-accessible (focusable, aria-label "Copy link to section").
- [ ] Field-note cards get the same affordance per note (`#note-01` style ids on the cards; ids added to the li elements).
- [ ] Anchor ids remain stable — no renames of existing section ids.
- [ ] Prerendered HTML still passes: anchor buttons must be hydration-safe (no window access at render; clipboard on click only).
- [ ] `pnpm check`, `pnpm build` (incl. prerender), prompts zero-diff, 800-line cap pass; CI green.
- Expected test delta: none (repo has no test suite).

## Constraints & Anti-Goals

- DO NOT add a nav entry for the index (it lives in Overview).
- DO NOT introduce a router dependency for hashes — plain anchors.
- DO NOT add dependencies.

## Pre-confirmed facts

- `SECTIONS` lives in content.ts (10 entries, ids stable since #42). `SectionHeader` is `client/src/components/SectionHeader.tsx`; all ten sections use it with `id="<section>-heading"` props.
- Toasts: `toast()` from `sonner` is already used by PromptCard's copy buttons — mirror that call pattern.
- The site is prerendered as of the previous slice: any new component must render without window/document at render time.

## Files explicitly forbidden

- `prompts/**`, `client/public/llms.txt` (generated), `.github/**`, `server/**`.

## Starting Point

- Relevant files: `client/src/lib/content.ts`, `client/src/pages/sections/OverviewSection.tsx`, `client/src/components/SectionHeader.tsx`, `client/src/pages/sections/FieldNotesSection.tsx`
- Known issues: none. Queued after: byline + FAQ, robot-head brand mark (replace the "AHF" header box with a lego-like robot head — proof-sheet approach like the favicon), delight batch (checklist persistence, download-as-.md, print stylesheet, reading-progress line).
