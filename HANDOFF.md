# Current Slice: Robot-head brand mark — replace the "AHF" header box

## Context

Owner request from the favicon review: substitute the "AHF" text in the header's brand box (top-left, and its twin in the mobile sheet header) with a lego-like robot head. This is a VISUAL slice: the mark is a taste call, so the build produces a proof sheet (like the favicon slice) and the human's eyeball on the preview is the load-bearing gate.

## Acceptance Criteria (Definition of Done)

The agent MUST complete ALL of the following before committing:

- [ ] A small inline SVG robot head (lego-minifig-like: rounded-square head, two square/round eyes, simple mouth or grille — friendly, not menacing) replaces the "AHF" text inside the existing bordered brand box in `client/src/components/SiteHeader.tsx` — BOTH instances (header brand box, mobile sheet header box). The box border/hover behavior stays.
- [ ] The mark uses currentColor / theme tokens only, so the existing hover inversion (bg-primary + primary-foreground text) keeps working and both palettes render correctly.
- [ ] Proof-sheet render at 36px (the box size), 72px, and 180px before committing; the mark must read as a robot head at 36px.
- [ ] Accessible name preserved: the box is aria-hidden (as now) with the wordmark carrying the brand text — confirm screen-reader output is unchanged.
- [ ] Prerender passes with zero hydration warnings (static SVG — no state).
- [ ] `pnpm check`/`build`, prompts zero-diff, 800-line cap; CI green.
- [ ] PR body flags: "Visual slice — human eyeballs the mark on the preview before merge."
- Expected test delta: none (repo has no test suite).

## Constraints & Anti-Goals

- DO NOT change the favicon or og.jpg in this slice (the memo book stays; the robot is the header mark only — if the owner later wants them unified, that is its own slice).
- DO NOT add dependencies or image assets — inline SVG only.
- DO NOT restyle the header beyond the box contents.

## Pre-confirmed facts

- Brand boxes: `client/src/components/SiteHeader.tsx` — header box (h-9 w-9, mono "AHF", hover inverts via group-hover) and sheet box (h-8 w-8). Both aria-hidden with adjacent text carrying the name.
- Theme tokens available as CSS vars; the box already flips colors on hover via Tailwind group classes — an SVG using currentColor inherits correctly.
- Proof-sheet pattern: render an HTML page with the SVG at multiple sizes, screenshot via headless Chrome (see the favicon slice in PR #44's history).

## Files explicitly forbidden

- `client/public/**` (favicon/og untouched), `prompts/**`, `.github/**`, `server/**`.

## Starting Point

- Relevant files: `client/src/components/SiteHeader.tsx`
- Known issues: none. Queued after: delight batch (Edit Pass checklist persistence, per-card download-as-.md, print stylesheet, reading-progress line) — the final waypoint.
