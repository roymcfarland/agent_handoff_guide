# Current Slice: Byline + FAQ — who says, and the hard objections

## Context

The site still answers "who is telling me this?" with a logo, and never answers the skeptical engineering manager's first questions. This slice adds a short byline (near the title block in the footer: operating credentials, not marketing bio) and an FAQ of the hard objections, answered without hedging. The FAQ is also a `FAQPage` JSON-LD opportunity.

## Acceptance Criteria (Definition of Done)

The agent MUST complete ALL of the following before committing:

- [ ] A `BYLINE` export in `client/src/lib/content.ts`: 2–3 sentences, operating-credential voice ("maintained by the person who runs this loop weekly; the PR history is the proof"), naming Roy McFarland + Worksmith Labs, linking the merged-PR audit trail. Rendered in `SiteFooter` adjacent to the revision title block. THE HUMAN WRITES OR APPROVES THE FINAL BYLINE COPY — draft it, flag it for his edit in the PR body.
- [ ] A `FAQ` export: 5–6 hard objections with direct answers — (1) why not one model reviewing itself; (2) why not just CI + human review; (3) what a slice costs in time/tokens (honest ranges: a verifier pass on a mid-size PR runs minutes and cents-to-a-dollar; the REJECT it catches saves the afternoon); (4) doesn't the Advisor just move the trust problem (answer: the human merge gate is the trust anchor; the Advisor's outputs are all inspectable artifacts); (5) does this work solo (yes — roles are hats, not headcount); (6) which models/tools (tool-agnostic by design — non-goal).
- [ ] FAQ renders inside an existing section (References or a new block in Overview — builder's judgment; NO new nav entry) using the notebook idiom, likely details/summary or an open list.
- [ ] `FAQPage` JSON-LD: emitted into the prerendered HTML (a small script tag rendered by the FAQ component works — it will be serialized by renderToString) with the same Q/A text derived from the FAQ export.
- [ ] Prerender still passes; zero hydration warnings; `pnpm check`/`build`, prompts zero-diff, 800-line cap; CI green.
- Expected test delta: none (repo has no test suite).

## Constraints & Anti-Goals

- DO NOT invent numbers for the cost answer — use honest ranges hedged as ranges, or mark the figure for the human to confirm.
- DO NOT cross the tool-agnostic non-goal in the "which models" answer.
- DO NOT add a nav entry or dependencies.

## Pre-confirmed facts

- `SiteFooter` is `client/src/components/SiteFooter.tsx` and already renders `REVISION_TABLE`; the byline slots beside/below it.
- JSON-LD via React: `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />` renders fine under renderToString and hydrates without mismatch when the JSON is deterministic (derive from the FAQ export; no dates/randomness).
- Audit-trail link pattern already exists in `FIELD_NOTES_INTRO` (auditHref).

## Files explicitly forbidden

- `prompts/**`, `client/public/llms.txt` (generated), `.github/**`, `server/**`, `client/index.html` (the WebSite JSON-LD there stays; FAQPage comes from the component).

## Starting Point

- Relevant files: `client/src/lib/content.ts`, `client/src/components/SiteFooter.tsx`, plus the section file the FAQ lands in
- Known issues: none. Queued after: robot-head brand mark (replace the "AHF" header box with a lego-like robot head — proof-sheet approach like the favicon), delight batch (checklist persistence, download-as-.md, print stylesheet, reading-progress line).
