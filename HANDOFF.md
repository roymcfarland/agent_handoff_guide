# Current Slice: CI workflow — make the repo's own gates real

## Context

The repo publishing a methodology built on "green checks" has no CI at all — no `.github/` directory. The Verifier's evidence and the after-merge protocol both assume checks exist on the PR's own commit. This slice adds a minimal, honest gate: typecheck, build, and the repo's own 800-line-cap rule from PROJECT.md Q1, enforced automatically.

## Acceptance Criteria (Definition of Done)

The agent MUST complete ALL of the following before committing:

- [ ] `.github/workflows/ci.yml` runs on `pull_request` and on `push` to `main`: checkout → pnpm via Corepack (respecting the `packageManager` pin) → Node from `.nvmrc` → `pnpm install --frozen-lockfile` → `pnpm check` → `pnpm build`.
- [ ] A line-cap job (or step) enforces PROJECT.md Q1: fail if any file in `client/src/pages/`, `client/src/lib/`, or `client/src/components/` (top level) exceeds 800 lines — with the two documented exemptions (`client/src/lib/content.ts`, `client/src/components/diagrams/**`). A small shell script inline in the workflow is fine; no new dependencies.
- [ ] The workflow has no secrets, no deploy steps, and does not run the Vercel build — Vercel deploys are separate and stay that way.
- [ ] The decisive check for this PR is the new workflow running green on the PR's own CI (`gh pr checks`), not a static YAML read.

## Constraints & Anti-Goals

- DO NOT add lint/test jobs for tools the repo does not have configured (there is no test suite and no eslint config — do not invent them).
- DO NOT add dependencies or new package.json scripts unless the cap check genuinely needs one (prefer inline shell).
- DO NOT touch application source in this slice.

## Pre-confirmed facts

- Exact script names from package.json: `check` (tsc --noEmit), `build` (vite build + esbuild server). There is NO `test` or `lint` script.
- `packageManager: pnpm@10.4.1` (Corepack); `.nvmrc` exists (Node 22); `engines.node >= 22`.
- The 800-line rule and its two exemptions are PROJECT.md Q1, verbatim.
- Expected test delta: no test changes (repo has no test suite).

## Files explicitly forbidden

- `client/**`, `server/**`, `vercel.json` — no app or deploy changes in this slice.

## Starting Point

- Relevant files: `.github/workflows/ci.yml` (NEW)
- Known issues: none. Queued after this slice: Field Notes section (WAITING ON HUMAN — pick which lessons from the operating ledger go public), worked example, hygiene track (dead-component prune, wouter patch removal, theme toggle).
