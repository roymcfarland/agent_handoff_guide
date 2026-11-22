<!--
  GENERATED FILE — do not edit by hand.
  Source of truth: client/src/lib/content.ts (BUILD_VERIFY_MARKDOWN)
  Regenerate: pnpm generate:prompts
  Agent Handoff Framework by Roy McFarland (github.com/roymcfarland).
  License: MIT (same as the repository) — vendor freely.
  Guide: https://www.worksmithlabs.com/
-->
# Build & Verify — Two-LLM Workflow

A disciplined loop for shipping with AI agents: an Advisor scopes each
slice and drafts both prompts, one LLM writes the code, and a *different*
LLM verifies it in a clean context window before the next slice runs.

---

## Why two LLMs?

Code-capable models can produce persuasive summaries of work they authored.
Empirical LLM-as-judge work shows judges vary by prompt, model, and task (e.g.,
Zheng et al., https://arxiv.org/abs/2306.05685). A Verifier LLM in a fresh context,
reading only the PR description,
diff, and scope document, is a structured second reader that can surface stubs,
speculative APIs, out-of-scope edits, and silently skipped Acceptance Criteria
that the Builder may under-report — especially when verdicts must cite evidence.

Two-model separation does **not** guarantee independence; it raises the odds
that blind spots differ from the Builder's. Narrow inputs and explicit verdict
formats keep that signal usable.

---

## The loop

```
   ┌───────────────────────────────────┐
   │  1. ADVISOR                       │
   │  Recon on the real repo           │
   │  Scopes HANDOFF.md                │
   │  Drafts both prompts from the     │
   │  same Acceptance Criteria         │
   └───────────────────────────────────┘
                      │
                      ▼  (HANDOFF.md)
   ┌───────────────────────────────────┐
   │  2. BUILDER LLM                   │
   │  Reads PROJECT.md + HANDOFF.md    │
   │  Writes code, runs tests          │
   │  Updates CHANGELOG.md             │
   │  Drafts next HANDOFF.md           │
   │  Opens PR on <type>/<slice>       │
   └───────────────────────────────────┘
                      │
                      ▼  (PR opened)
   ┌───────────────────────────────────┐
   │  3. VERIFIER LLM   (different     │
   │     model, clean context)         │
   │  Reads PR body + diff + HANDOFF.md│
   │  Runs the gates, diffs against    │
   │  the merge base                   │
   │  Returns APPROVE / REJECT for one │
   │  head commit, with evidence per   │
   │  Acceptance Criterion.            │
   └───────────────────────────────────┘
                      │
                      ▼  (verdict)
   ┌───────────────────────────────────┐
   │  4. ADVISOR TRIAGE                │
   │  Real defect, or defective check? │
   └───────────────────────────────────┘
                      │
              ┌───────┴────────┐
              ▼                ▼
           APPROVE        REJECT (real defect)
              │                │
       gatekeeper merges  amendment on the
       → next slice       same PR; re-verify
                          the new head commit
```

---

## Roles

| Role          | Model                  | Reads                             | Writes                               |
|---------------|------------------------|-----------------------------------|--------------------------------------|
| Advisor       | LLM C — or you         | Repo (recon), PROJECT.md, verdicts | HANDOFF.md, Builder/Verifier prompts |
| Builder       | LLM A (e.g., Claude)   | PROJECT.md, HANDOFF.md, code      | Code, CHANGELOG.md, HANDOFF.md       |
| Verifier      | LLM B (e.g., GPT)      | PR body, diff, HANDOFF.md         | Verdict report only                  |
| Gatekeeper    | Human (you)            | Verdict + diff                    | Merge / reject / revise decision     |

The Advisor can be a third model, a separate session, or the human wearing
a different hat. The "two-LLM" separation refers to Builder and Verifier —
those two must never share a context. The Advisor drafts the prompts both
of them run, and interprets the verdict that comes back.

---

## Non-negotiable rules

1. **Different model families.** Builder and Verifier should come from
   different model families or providers when possible. This reduces
   correlated mistakes; it does not eliminate them.
2. **Clean context window for the Verifier.** No prior conversation, no
   memory of past slices, no scratchpad. Boot fresh every time.
3. **Review-input-first reading.** The Verifier starts with the PR body,
   diff, and scope document. It may browse additional files only when
   evaluating a specific Acceptance Criterion requires it.
4. **Verdict, not advice.** The Verifier returns a verdict with evidence. It
   does not propose fixes, refactors, or new code. Mixing roles weakens the
   independence that makes this check valuable.
5. **One slice in flight at a time.** Do not run a new Builder until the
   previous slice has been merged or rejected. Parallel slices defeat the
   point of a serialized handoff.
6. **Role purity for the Advisor.** The Advisor drafts prompts, interprets
   verdicts, and runs post-merge housekeeping — it does not build, does not
   verify, and does not merge on its own judgment. The moment the Advisor
   starts grading diffs or pushing commits, the independence of the other
   two lanes is gone.
7. **A verdict covers one commit.** The Verifier diffs against the merge
   base (`origin/<base>...HEAD`, three dots) and records the head SHA it
   graded. Any commit pushed after the verdict — an amendment included —
   means the Verifier runs again before merge.

---

## Operating cadence

1. **Open a slice.** The Advisor scopes HANDOFF.md — grounded in repo recon
   — or you write it; the previous Builder may have drafted a starting point.
2. **Run the Builder.** Use Builder prompt + Closeout prompt.
3. **Run the Verifier.** Different model, clean context, Verifier prompt.
4. **Triage the verdict.** The Advisor opens every cited file:line in the
   diff. Real defect: a small amendment on the same PR, then re-verify the
   new head. Defective check: recommend merge and fix the prompt. Unclear:
   get the evidence that settles it.
5. **Gatekeeper decides.** Confirm the approved commit is still the PR head
   and CI is green; then merge, reject, or merge with follow-up.
6. **Move to next slice.** Only after the current PR is closed.

If the Verifier returns a genuine REJECT twice in a row on the same slice —
both surviving triage — escalate to the gatekeeper for re-scoping. The slice
itself may be wrong, not the Builder's execution.

---

## Further reading (external)

- Prompt engineering — OpenAI Developer Docs:
  https://developers.openai.com/api/docs/guides/prompt-engineering
- Evaluation workflow — OpenAI Developer Docs:
  https://developers.openai.com/api/docs/guides/evals
- Pull requests & GitHub Flow — GitHub Docs:
  https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests
  · https://docs.github.com/en/get-started/using-github/github-flow
- LLM-as-judge caveats — Zheng et al. (2023): https://arxiv.org/abs/2306.05685
- Long-context / input ordering effects — Liu et al. (2023):
  https://arxiv.org/abs/2307.03172
