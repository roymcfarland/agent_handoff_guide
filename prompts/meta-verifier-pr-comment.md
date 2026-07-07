<!--
  GENERATED FILE — do not edit by hand.
  Source of truth: client/src/lib/content.ts (META_VERIFIER_PR_COMMENT)
  Regenerate: pnpm generate:prompts
  License: MIT (same as the repository) — vendor freely.
  Guide: https://www.worksmithlabs.com/
-->
## META-PR Verifier Report

**Verifier model:** <provider/model id + date run>
**Builder model:** <whatever drafted the spec edit>
**PR:** #<N> — <title>
**Spec doc affected:** <HANDOFF.md | PROJECT.md>
**Scope used for verification:** <Builder Brief from PR description | Spec Update Proposal from PR description> — NOT the changed file in the diff
**Verdict:** <APPROVE | REJECT>  (Phase 1)
            <APPROVE | REJECT>  (Phase 2 — on REJECT name the route: `REJECT (fix the edits)` or `REJECT (proposal-insufficient)`)

---

### Per-criterion / per-edit findings

For each numbered criterion in the Builder Brief (Phase 1) or each "before / after" edit in the Spec Update Proposal (Phase 2):

**<Criterion N or Edit N — short label>**
- **Verdict:** PASS | FAIL
- **Evidence:** `<file>:<line range>` — <one sentence describing what the diff actually does and whether it matches the Builder Brief / Proposal>

---

### Out-of-scope changes

<List any edits in the diff that the Builder Brief / Proposal did NOT authorize. For META-PRs this most commonly takes the form of silent edits to spec doc sections the Proposal did not name. Each item:>

- `<file>:<line range>` — <what changed> — <why it is out of scope>

If none, write: "None observed."

---

### Spec doc sections changed but not in the Proposal

<Phase 2 specific. List any section of PROJECT.md that the diff edits but the Spec Update Proposal did not mention. Even small edits — a renamed heading, a reformatted bullet — count here.>

If none, write: "None observed."

---

### Notes for the Gatekeeper

<2–4 sentences. What is wrong, NOT how to fix it. Examples:
- "Edit 3 in the Proposal removes a non-goal but the diff retains it; this is a FAIL on Edit 3."
- "The Proposal is internally consistent but Edit 2's 'after' text contradicts Edit 5's 'after' text. REJECT (proposal-insufficient)."
- "All proposed edits implemented faithfully; one MINOR formatting drift in section heading capitalization (line 47).">

---

### Footer rules

The Verifier read ONLY the PR diff and the Builder Brief / Spec Update Proposal pasted in the PR description.
The Verifier did NOT propose alternative edits. The Verifier did NOT modify the spec doc. The Verifier did NOT write code.
If the Proposal itself appears under-specified, the verdict is REJECT (proposal-insufficient) (Phase 2) and the PR should NOT be merged until the human revises the Proposal.
