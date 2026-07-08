<!--
  GENERATED FILE — do not edit by hand.
  Source of truth: client/src/lib/content.ts (PROMPT_LIBRARY:builder-pr)
  Regenerate: pnpm generate:prompts
  Agent Handoff Framework by Roy McFarland (github.com/roymcfarland).
  License: MIT (same as the repository) — vendor freely.
  Guide: https://www.worksmithlabs.com/
-->
## Builder PR — <slice name from HANDOFF.md>

**Builder model:** <provider/model id + date run>
**Branch:** `feature/<slice-name>`
**HANDOFF.md ref:** <commit SHA of HANDOFF.md the Builder worked against>

> One-paragraph summary of what this PR does, in plain language.
> Match the wording used in HANDOFF.md "Context" so the Verifier can map it
> directly to the slice that was assigned.

---

### Self-audit (against Acceptance Criteria)

- [x] <criterion 1> — implemented in `src/api/routes.ts:42`
- [x] <criterion 2> — implemented in `src/api/routes.ts:67`; covered by test `tests/routes.test.ts:18`
- [ ] <criterion 3> — NOT MET. Blocked by: <one sentence>. See "Declared stubs" below.

_(Mark every criterion. Do not silently skip. If blocked, say so here — do
not move on without flagging it.)_

### Scope of change

| File | Change | Why |
|---|---|---|
| `src/api/routes.ts` | Added POST /items endpoint | Required by criteria 1–2 |
| `src/api/controllers.ts` | Added `createItem` controller | Required by criterion 1 |
| `tests/routes.test.ts` | Added 3 unit tests | Required by criterion 2 |

_(One row per touched file. If a row is not directly justified by a
criterion or a constraint in HANDOFF.md, it is out of scope and should be
removed from this PR.)_

### Declared stubs / TODOs

- `src/api/controllers.ts:104` — `// TODO: pagination` — out of scope for
  this slice; should be picked up in next slice's HANDOFF.md.
- `src/api/routes.ts:88` — empty-body error path returns 500 instead of 400;
  blocked criterion 3, needs follow-up slice.

_(Every stub, hack, or piece of debt introduced by this slice MUST be
declared here. Silent debt is the most expensive kind. Write "None" only if
you genuinely introduced none.)_

### Out-of-scope changes

- None.

_(If you touched anything outside the slice — refactors, new dependencies,
unrelated edits — list them here and justify. The Verifier will flag them
either way; declaring them here is faster than getting a REJECT.)_

### Tests run

```
$ pnpm test
... 14 passed, 0 failed
$ pnpm typecheck
... 0 errors
```

### What the next Builder needs to know

- HANDOFF.md has been updated for the next slice (see commit `<sha>`).
- Watch for the stub at `src/api/controllers.ts:104` — pagination is
  expected as the next slice.

---

_Builder rules: scope is HANDOFF.md only, no planning, no out-of-scope
refactors, no silent debt. Every Acceptance Criterion is either checked off
or explicitly declared blocked above._
