# Current Slice: Prompts as files — generated prompts/ directory, llms.txt, content license

## Context

The product is copy-paste prompts, but the prompts exist only as strings inside content.ts — contributors cannot diff them, agents cannot fetch them raw, teams cannot vendor them. This slice makes the library consumable as artifacts: a `prompts/` directory generated FROM content.ts (single source of truth stays in the app), an `llms.txt` so AI assistants can read the methodology canonically, and an explicit license note for the content so companies know they can vendor it.

## Acceptance Criteria (Definition of Done)

The agent MUST complete ALL of the following before committing:

- [ ] A generator script (`scripts/generate-prompts.ts`, run via `tsx`) reads `PROMPT_LIBRARY`, `HANDOFF_TEMPLATE`, `BUILD_VERIFY_MARKDOWN`, and the META prompts from `client/src/lib/content.ts` and writes each to `prompts/<filename>` using the `filename` fields already defined in the library (plus sensible names for the non-library docs). Each file gets a small generated-file header comment (source + regeneration command).
- [ ] A `pnpm generate:prompts` script is added to package.json; the generated files are committed.
- [ ] CI gains a zero-diff step: regenerate and `git diff --exit-code prompts/` — the committed files can never drift from content.ts (the framework's own generated-artifact rule).
- [ ] `client/public/llms.txt` follows the llms.txt convention: site name, one-paragraph summary, then a linked list of the raw prompt files on GitHub and the key sections; served at `https://www.worksmithlabs.com/llms.txt`.
- [ ] A `prompts/README.md` (also generated or hand-written, but then excluded from the zero-diff glob) states the license for prompt/doc content explicitly (MIT, same as the repo) and shows the one-liner to vendor the set (`curl`/degit example).
- [ ] README.md gains a short "Use the prompts in your repo" section pointing at `prompts/` and llms.txt.
- [ ] `pnpm check`, `pnpm build`, and the new zero-diff step pass; CI green on the PR.
- Expected test delta: none (repo has no test suite).

## Constraints & Anti-Goals

- DO NOT hand-write prompt content into `prompts/` — content.ts remains the single source of truth; files are generated.
- DO NOT add runtime dependencies (tsx is already a devDependency; use node:fs in the script).
- DO NOT build CLI scaffolding (`bin/`, commander, etc.) — the future CLI lives in a separate repo per PROJECT.md non-goal; a generated docs directory is not a CLI.
- DO NOT change any prompt text in this slice.

## Pre-confirmed facts

- Every `PROMPT_LIBRARY` item has a `filename` field (e.g., `prompt-04-builder.md`); there are 11 items across 3 scenarios.
- `tsx` 4.x is a devDependency; `pnpm dlx` is not needed. TypeScript path alias `@/` is Vite-only — the script should import content.ts by relative path.
- content.ts is pure data (no browser APIs at module scope) — safe to import from a Node script. Verify this claim before relying on it (the file is ~2,400 lines; grep for `window.` / `document.` at module scope).
- CI workflow is `.github/workflows/ci.yml`; add the zero-diff step after the build step.

## Files explicitly forbidden

- `client/src/**` other than reading `content.ts` — no app-code changes in this slice.
- `server/**`, `vercel.json`.

## Starting Point

- Relevant files: `scripts/generate-prompts.ts` (NEW), `prompts/**` (NEW, generated), `client/public/llms.txt` (NEW), `package.json`, `.github/workflows/ci.yml`, `README.md`
- Known issues: none. Queued after: prerender (SEO structural), sheet index + anchor links, byline + FAQ, delight batch.
