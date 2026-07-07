# Current Slice: Drop the vestigial wouter patch + dependency refresh

## Context

`patches/wouter@3.7.1.patch` only injects route-collection into `window.__WOUTER_ROUTES__` — leftover instrumentation from the original site-builder tooling, same family as the `@builder.io/vite-plugin-jsx-loc` plugin removed in PR #26. Nothing in the app reads it. Dropping the patch removes the `patches/` directory, resolves the confusing `"wouter": "^3.3.5"` declared vs `3.7.1` patched mismatch, and unblocks upgrading wouter. While the lockfile is open, take the outstanding minor/patch dependency updates.

## Acceptance Criteria (Definition of Done)

The agent MUST complete ALL of the following before committing:

- [ ] `pnpm.patchedDependencies` removed from `package.json`; `patches/` directory deleted.
- [ ] `git grep -n "__WOUTER_ROUTES__"` returns zero matches (confirming nothing consumed it).
- [ ] wouter upgraded to the current 3.x line; client-side routing still works (all three routes: `/`, `/404`, wildcard → NotFound).
- [ ] Minor/patch updates taken for: react + react-dom (19.2.x latest), the two surviving @radix-ui packages, tailwindcss + @tailwindcss/vite (4.x latest), tailwind-merge, prettier, tsx, postcss, autoprefixer, @types/*. Do NOT take @types/express 5.x (express is 4); do NOT change express, esbuild, vite, or typescript majors.
- [ ] `pnpm audit --prod` reports no known vulnerabilities after the refresh.
- [ ] `pnpm check` passes, `pnpm build` succeeds, CI green on the PR.
- Expected test delta: none (repo has no test suite).

## Constraints & Anti-Goals

- DO NOT upgrade any major versions (vite 7 stays, express 4 stays, typescript 5.6 stays).
- DO NOT remove the `qs` / `express>path-to-regexp` security overrides (they guard the express 4 tree; removing them is the future express-5 slice's job).
- DO NOT touch application source except where a dependency update forces a type-level fix.

## Pre-confirmed facts

- The patch content is ONLY the `__WOUTER_ROUTES__` collection block in `Switch` (verified by reading the patch); no app code references `__WOUTER_ROUTES__`.
- Routes live in `client/src/App.tsx` (`/`, `/404`, fallback). Wouter usage is minimal: `Route`, `Switch` imports.
- Outdated list as of 2026-07-07 included: react 19.2.7, radix minors, tailwindcss 4.3.2, prettier 3.9.4, tailwind-merge 3.6.0, wouter 3.10.0.

## Files explicitly forbidden

- `client/src/lib/content.ts`, `server/**`, `vercel.json`, `.github/**`.

## Starting Point

- Relevant files: `package.json`, `pnpm-lock.yaml`, `patches/` (deleted)
- Known issues: none. Queued after: theme toggle (delight), Field Notes (WAITING ON HUMAN — lesson curation), worked example, express 5 migration (drops the security overrides).
