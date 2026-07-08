<!--
  GENERATED FILE — do not edit by hand.
  Source of truth: client/src/lib/content.ts (PROMPT_LIBRARY:closeout)
  Regenerate: pnpm generate:prompts
  Agent Handoff Framework by Roy McFarland (github.com/roymcfarland).
  License: MIT (same as the repository) — vendor freely.
  Guide: https://www.worksmithlabs.com/
-->
You have finished the implementation pass for the current slice. Your task now is to close it out cleanly, create the review surface, and prepare the next handoff.

Precondition:
Do not start closeout until you have verified the current diff against every Acceptance Criterion in HANDOFF.md. If any criterion is unmet, mark the work BLOCKED and do not claim the slice is complete.

Instructions:
1. Audit the slice. Re-read HANDOFF.md and compare each Acceptance Criterion against the diff. Identify stubs, hacks, skipped checks, or technical debt you introduced. Be explicit; silent debt is the expensive kind.
2. Update CHANGELOG.md. Append one concise paragraph summarizing what was built and naming any unresolved issues or stubs. If the repo keeps a roadmap or ledger, update it in THIS slice so it never drifts behind.
3. Draft the next HANDOFF.md. Overwrite HANDOFF.md with the next logical slice only if the next step is clear from the current work. Include context, Acceptance Criteria, constraints, starting files, and warnings. If the next slice is ambiguous, write a small "Needs human decision" handoff instead of inventing roadmap.
4. Re-run the project's real checks by their exact script names (typecheck, build, tests — read package.json / Makefile; never assume `npm test` exists) after the markdown updates, in case they affect generated artifacts, type imports, or docs validation.
5. Commit and push on the branch you created in pre-flight:
```bash
git add <only the allowlisted files>
git commit -m "<type>(<scope>): <concise summary referencing the slice>"
git push -u origin <branch-name>
```
Do not change git config. Do not use `--no-verify`. Match the repo's commit convention (check for a commitlint config).
6. Open the PR — your final, non-optional action:
```bash
gh pr create --title "<title>" --body "<self-audit, touched-file table, declared stubs, out-of-scope changes, checks run>"
gh pr view --json url,isDraft,state
```
A pushed branch with no PR is an incomplete task, and the PR must NOT be a draft. Confirm `isDraft:false` in the output above and report the URL.

Rules:
- Do not write new feature code during closeout except for minimal fixes required to satisfy the current Acceptance Criteria.
- Do not edit PROJECT.md in this phase unless HANDOFF.md explicitly scoped a META-PR.
- Do not hide blocked criteria in the changelog or PR body. If blocked, say blocked.
