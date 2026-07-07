<!--
  GENERATED FILE — do not edit by hand.
  Source of truth: client/src/lib/content.ts (PROMPT_LIBRARY:calibration)
  Regenerate: pnpm generate:prompts
  License: MIT (same as the repository) — vendor freely.
  Guide: https://www.worksmithlabs.com/
-->
You just completed the first slice of work on this repository using the
Agent Handoff Framework. This was a calibration run — the point was not
to ship value, it was to reveal what was wrong, missing, or under-
specified in PROJECT.md.

Your job in this session is to produce a list of PROPOSED edits to
PROJECT.md based on what surfaced during the slice. You will NOT edit
PROJECT.md directly. You will NOT write code. You will produce a diff-
style proposal the human can review, approve, and apply.

---

Inputs you will read:
1. The current PROJECT.md (before any edits).
2. HANDOFF.md for the slice that was just completed.
3. The git diff of the slice that was merged (or the PR body).
4. The Verifier report for that slice (APPROVE / REJECT).

---

For every one of the following questions, produce a finding in the
format shown. If the answer is "nothing to change", say so explicitly —
do not invent findings.

### 1. Conventions that were hit but not documented
Did you (the Builder) rely on a convention while writing the slice that
was NOT in PROJECT.md's Conventions section? Examples: naming patterns,
error-handling patterns, test colocation rules, import ordering.

FINDING FORMAT:
  - [ADD to Conventions] "<one-line convention statement>"
    - Evidence from this slice: <file:line>
    - Why it matters: <one sentence>

### 2. Non-goals that were almost violated
Did you nearly do something that PROJECT.md should have forbidden but
didn't? (A refactor you almost started, a dependency you almost added,
a pattern you almost introduced.)

FINDING FORMAT:
  - [ADD to Non-goals] "<one-line non-goal statement>"
    - Near-miss from this slice: <describe what you almost did>

### 3. Acceptance Criteria that turned out to be unobservable
Did the Verifier FAIL a criterion because it was written in a way that
could not be checked from the diff? The criterion is not the problem —
the Acceptance Criteria template in PROJECT.md (or the first-handoff
guidance) is the problem.

FINDING FORMAT:
  - [UPDATE HANDOFF guidance] "<one-line rule about writing criteria>"
    - Criterion that failed observability: "<direct quote>"

### 4. Stack or architecture claims that were wrong
Did anything in PROJECT.md's Stack or Architecture section turn out to
be inaccurate once you actually touched the code?

FINDING FORMAT:
  - [CORRECT in Stack/Architecture] "<what was wrong>" → "<what is true>"
    - Evidence: <file:line>

### 5. Human-only context that was missing
Was there a business, regulatory, or people-level fact that would have
helped you avoid a wrong turn during the slice, which PROJECT.md does
not capture?

FINDING FORMAT:
  - [ADD to Human-only context] "<one-sentence fact>"
    - Why it would have helped: <one sentence>

---

Output shape:

### Summary
<One line: number of proposed edits, severity distribution.>

### Proposed edits (in order)
<Use the FINDING FORMAT above, grouped by section.>

### No-change zones
<PROJECT.md sections that came through the slice cleanly and do not
need edits.>

---

Rules:
- You are a PROPOSER, not an editor. Do not produce the edited
  PROJECT.md yourself.
- Do not propose edits that are not grounded in something that happened
  during this slice.
- If a section does not need changes, say so explicitly.
- Be specific: cite file:line from the diff, or quote the criterion
  text, or name the convention.
- Do not recommend running the next slice, requesting more context, or
  writing code. Produce the diff proposal and stop.
