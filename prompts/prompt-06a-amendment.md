<!--
  GENERATED FILE — do not edit by hand.
  Source of truth: client/src/lib/content.ts (PROMPT_LIBRARY:amendment)
  Regenerate: pnpm generate:prompts
  Agent Handoff Framework by Roy McFarland (github.com/roymcfarland).
  License: MIT (same as the repository) — vendor freely.
  Guide: https://www.worksmithlabs.com/
-->
You are continuing the CURRENT slice. This is a scope amendment — not a new task, and not a re-issued prompt. Everything in the original HANDOFF.md and your original instructions still stands, except for the single change named below.

Amendment type (one of):
- ALLOWLIST EXTENSION — you stopped on a file outside the allowlist.
- DEFECT FIX — the Verifier found a real, small defect in the PR.

Authorized change:
- File(s): <exact path(s) now added to the allowlist, or the file:line of the defect>
- Reason: <one sentence — why this file must change, or what the defect is>
- Edit: <the narrowest description of the change now authorized>

Rules:
1. This amendment authorizes ONLY the change named above. It is not an invitation to revisit, refactor, or "improve" anything else you noticed.
2. All original Acceptance Criteria, constraints, and forbidden files remain in force.
3. Apply the change on the SAME branch and push to the SAME PR. Do not open a new PR.
4. If the amendment reveals yet another file outside the allowlist, STOP and report again. Do not chain expansions on your own authority.
5. Re-run the project's real checks by their exact script names before pushing.

When done, report: the diff summary of the amendment commit, the check results, and the PR URL.
