# Current Slice: none — roadmap complete

## Status

No slice is in flight. The Advisor-era overhaul and follow-up work (PRs #29–#63) shipped: three-role model, verdict triage, after-merge protocol, ceremony sizing, template upgrade, diagram redraw, title-block footer, CI, hygiene prune, theme toggle, Field Notes + worked example, SEO/share hygiene, prompts-as-files + llms.txt, prerender, sheet index + anchors, byline + FAQ, robot brand mark, and the delight batch.

- **#53–#55** — Roy McFarland author attribution, OSS citation and contribution files, field-note submission flow, and a footer author card.
- **#56–#58** — Target highlighting, selection styling and robot animation, plus author profiles, status, and CTA in the overview drawing block and the owner’s revised status wording.
- **#59–#60** — Command palette, checklist completion stamp, robot easter egg, and a header overflow fix at phone widths.
- **#61** — Dependency audit fixes via Vite and PostCSS patch updates and transitive overrides.
- **#63** — CI gates high and critical vulnerabilities in production dependencies.
- **#88** — Loop prompts, report templates, verdict triage, and Fig. 6 aligned with the revised builder-verifier skill: merge-base diffs, verdicts tied to a head commit, field notes 11–13, and revision 2.1 in the title block.
- **#89** — Design polish pass: figure text wrapping fixed, the Advisor drawn into Fig. 1, figures readable on phones, a new robot mark and share card, and the overview title block reworked.
- **#90** — Vercel Web Analytics via `@vercel/analytics` `inject()` replaces the dormant analytics loader; CSP unchanged (same-origin `/_vercel/insights`).

## Historical backlog (reference only)

As of 2026-11-16, the items below are historical ideas kept for reference. Scope an item into this file or a new roadmap only if the owner decides to pursue it.

- **Express 5 migration** — PR #61 kept Express 4 and retained the `qs` and Express `path-to-regexp` security overrides. Reassess those overrides during the migration and update the `app.get("*")` wildcard syntax for Express 5.
- **Per-section URLs** — the SEO paging decision; crosses PROJECT.md's "single-page reference" identity, so the spec amendment comes first.
- **Community items** — Field-note issue templates, `CONTRIBUTING.md`, and `CITATION.cff` shipped in PR #54. The [v2.0 GitHub release](https://github.com/roymcfarland/agent_handoff_guide/releases/tag/v2.0.0) matches revision 2.0 and its tag points to the merge of PR #58. Release coverage for the other revision-table entries and the adopter badge remain open.
- **Viewport maximum-scale removal + a11y audit pass** — PR #54 removed `maximum-scale` and restored pinch zoom. Fold the remaining accessibility audit pass into the next convenient slice.
- **Unify Phase 2 prompts into prompts/** — they were deliberately left out of the generated set (AC scope); emit them if demand appears.

## Convention reminder

Whoever opens the next slice: overwrite this file with the slice scope per the template (Context, Acceptance Criteria with expected test delta, Constraints, Pre-confirmed facts, Files explicitly forbidden, Starting Point), and reset it again at closeout. A stale HANDOFF is an unfinished loop.
