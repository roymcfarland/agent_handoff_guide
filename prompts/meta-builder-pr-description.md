<!--
  GENERATED FILE — do not edit by hand.
  Source of truth: client/src/lib/content.ts (META_BUILDER_PR_DESCRIPTION)
  Regenerate: pnpm generate:prompts
  Agent Handoff Framework by Roy McFarland (github.com/roymcfarland).
  License: MIT (same as the repository) — vendor freely.
  Guide: https://www.worksmithlabs.com/
-->
## META-PR — <what spec doc is changing and why>

**Type:** META-PR (modifies <HANDOFF.md | PROJECT.md>)
**Phase:** <Phase 1 mid-slice spec correction | Phase 2 spec evolution | Phase 2 Calibration Debrief output>
**Builder model:** <provider/model id + date run>
**Triggering slice / PR:** <PR # or slice name that surfaced this need>

## Why this META-PR exists

<2–4 sentences. What did the recent slice surface that the existing spec doc did not anticipate? Cite specific evidence: a Verifier finding, a convention nobody had written down, a non-goal that turned out to be a goal.>

## Scope document for the Verifier

<Paste the Builder Brief (Phase 1) or the Spec Update Proposal (Phase 2) inline below. The Verifier will grade the diff against this, NOT against the changed file in the diff.>

```
[Builder Brief or Spec Update Proposal goes here, in full]
```

## What changed

| File | Change |
|---|---|
| <HANDOFF.md or PROJECT.md> | <one-line summary of edit; reference the section> |
| <other file if applicable> | <reason it had to change too> |

## Sections of the spec doc deliberately NOT changed

<List sections you considered changing but left alone, with a one-sentence reason each. This is how you prevent silent scope creep on the spec itself.>

## Out-of-scope changes

<None expected. If anything else changed, flag it here with rationale.>

## Self-classification

`docs:` (spec doc edit, no behavior change) — most common
`feat:` only if the spec change unlocks a new behavior committed in the same PR

## Tests run

- N/A for spec-only changes
- For Phase 1 mid-slice META-PRs that include code: list code tests as you would for a normal Builder PR

## Verifier expectation

`APPROVE` — if the diff faithfully implements the Builder Brief (Phase 1) or Spec Update Proposal (Phase 2) pasted above.

`REJECT` — if the diff goes further, falls short, or silently edits sections the Proposal did not name. On a Phase 2 META-PR, name the route: `REJECT (fix the edits)`.

`REJECT (proposal-insufficient)` (Phase 2 only) — if the diff is correct but the Proposal itself was under-specified. The Verifier kicks this back to the human.
