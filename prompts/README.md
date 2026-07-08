<!--
  GENERATED FILE — do not edit by hand.
  Source of truth: client/src/lib/content.ts (scripts/generate-prompts.ts)
  Regenerate: pnpm generate:prompts
  Agent Handoff Framework by Roy McFarland (github.com/roymcfarland).
  License: MIT (same as the repository) — vendor freely.
  Guide: https://www.worksmithlabs.com/
-->

# Agent Handoff Framework — prompt library

The copy-paste prompts, templates, and drop-in docs from [www.worksmithlabs.com](https://www.worksmithlabs.com/) — the Agent Handoff Framework by [Roy McFarland](https://github.com/roymcfarland) ([npm](https://www.npmjs.com/~roymcfarland)) — emitted as plain markdown so you can vendor, diff, and fetch them directly.

**License:** MIT, same as the repository — use them in private repos, client work, and commercial projects. Attribution appreciated, not required.

## Vendor the set

```bash
# whole directory, no git history
npx degit roymcfarland/agent_handoff_guide/prompts prompts/ahf

# or a single file
curl -O https://raw.githubusercontent.com/roymcfarland/agent_handoff_guide/main/prompts/prompt-04-builder.md
```

## Contents

- [`prompt-00-inventory.md`](./prompt-00-inventory.md) — **Inventory — reverse-engineer PROJECT.md.** Run first. Read-only pass over the repo to produce a draft PROJECT.md.
- [`edit-pass-checklist.md`](./edit-pass-checklist.md) — **Edit Pass Checklist — you, not the LLM.** Run immediately after Inventory. Treat the draft as evidence to validate, not a source of truth.
- [`prompt-02-project-md-sanity.md`](./prompt-02-project-md-sanity.md) — **PROJECT.md Sanity Check — Verifier, clean context.** After your Edit Pass. Ask a different LLM, in a clean chat, to audit the doc against the repo.
- [`prompt-03-first-handoff-scoping.md`](./prompt-03-first-handoff-scoping.md) — **First HANDOFF.md — scoping assistant.** Optional scoping aid when you write the first HANDOFF.md. Forces a small, observable slice.
- [`prompt-04-builder.md`](./prompt-04-builder.md) — **Builder — executes the slice.** Open each slice with this. Agent reads PROJECT.md and HANDOFF.md, writes code, runs tests.
- [`prompt-05-closeout.md`](./prompt-05-closeout.md) — **Closeout — honest self-audit, next HANDOFF.md.** Run immediately after the Builder finishes. Same session, same context.
- [`prompt-06-verifier.md`](./prompt-06-verifier.md) — **Verifier — independent check on the PR.** After the Builder opens the PR. A DIFFERENT LLM, in a CLEAN context window.
- [`prompt-06a-amendment.md`](./prompt-06a-amendment.md) — **Amendment — minimal scope extension, same slice.** Only when needed: the Builder STOPs on a non-allowlisted file, or a Verifier FAIL is a real but small defect. Never for expanding the slice.
- [`builder-pr-description.md`](./builder-pr-description.md) — **Builder PR description — fill-in template.** Paste into the PR body when the Builder opens the PR. Fill in the self-audit, scope-of-change, and declared stubs.
- [`verifier-report.md`](./verifier-report.md) — **Verifier PR comment — fill-in template.** The Verifier posts this as the first comment on the PR, with the verdict line at the top.
- [`prompt-07-calibration-debrief.md`](./prompt-07-calibration-debrief.md) — **Calibration Debrief — propose PROJECT.md edits.** Run at the end of the first slice's cycle. Produces a structured proposal, not a rewrite.
- [`handoff-template.md`](./handoff-template.md) — **HANDOFF.md — slice template.** Copy into your repo as HANDOFF.md and fill per slice.
- [`build-and-verify.md`](./build-and-verify.md) — **Build & Verify — drop-in workflow spec.** Save as docs/build-and-verify.md in your repo.
- [`meta-verifier-phase-1.md`](./meta-verifier-phase-1.md) — **META-PR Verifier — HANDOFF.md changes (Phase 1).** When the PR modifies HANDOFF.md itself; the Builder Brief in the PR body is the scope.
- [`meta-verifier-phase-2.md`](./meta-verifier-phase-2.md) — **META-PR Verifier — PROJECT.md changes (Phase 2).** When the PR modifies PROJECT.md itself; the Spec Update Proposal is the scope.
- [`meta-spec-editor-builder.md`](./meta-spec-editor-builder.md) — **Spec-Editor Builder — drafts a Spec Update Proposal.** Turns a calibration or drift finding into a structured PROJECT.md change proposal.
- [`meta-builder-pr-description.md`](./meta-builder-pr-description.md) — **META-PR description — fill-in template.** PR body template for spec-doc changes.
- [`meta-verifier-pr-comment.md`](./meta-verifier-pr-comment.md) — **META-PR Verifier report — fill-in template.** Verdict comment template for spec-doc changes.

These files are generated from [`client/src/lib/content.ts`](../client/src/lib/content.ts) by `pnpm generate:prompts`; CI fails on any drift. Do not edit them here — change the source and regenerate.
