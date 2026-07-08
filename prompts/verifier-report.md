<!--
  GENERATED FILE — do not edit by hand.
  Source of truth: client/src/lib/content.ts (PROMPT_LIBRARY:verifier-pr)
  Regenerate: pnpm generate:prompts
  Agent Handoff Framework by Roy McFarland (github.com/roymcfarland).
  License: MIT (same as the repository) — vendor freely.
  Guide: https://www.worksmithlabs.com/
-->
## Verifier Report

**Model:** <provider/model id + date run>
**Context:** clean — no prior slices loaded
**Builder model:** <provider/model id from PR>
**Slice:** <slice name from HANDOFF.md>
**Verdict:** <APPROVE | REJECT>

---

### Acceptance Criteria

- [PASS] <criterion 1> — evidence: `src/api/routes.ts:42`
- [PASS] <criterion 2> — evidence: `src/api/routes.ts:67`
- [FAIL] <criterion 3> — evidence: `src/api/routes.ts:88` (returns 500 on empty body, criterion required 400)

### Out-of-scope changes

- `src/utils/logger.ts` — refactored unrelated logging helper (not in HANDOFF.md scope)
- `package.json` — added `lodash` dependency (not declared in slice)

_(or write "None observed" if the diff stays inside scope.)_

### Stubs / TODOs introduced

- `src/api/controllers.ts:104` — `// TODO: handle pagination` left undeclared in closeout audit

_(or "None observed".)_

### Notes for the gatekeeper

<2–4 sentences max. Describe WHAT is broken or out of scope, not HOW to fix it.
Example: "Endpoint is wired up but the empty-body error path is unhandled.
Recommend REJECT and return to Builder. The logger refactor and the new lodash
dependency should be split into their own slices.">

---

_Verifier rules: read only the diff and HANDOFF.md, return a verdict with
evidence, do not propose code changes, do not refactor, do not write code._
