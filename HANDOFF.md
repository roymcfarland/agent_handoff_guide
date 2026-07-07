# Current Slice: Dead-code prune — unused ui components, hooks, dependencies

## Context

PROJECT.md Q2 mandates aggressive pruning and hard-fails PRs that add components without call sites — but the tree currently violates its own rule: eight of eleven `client/src/components/ui/` files have zero call sites, all three hooks are dead (two only serve the dead components, one is used nowhere), and several dependencies exist only to serve that dead code. This slice brings the tree back into compliance.

## Acceptance Criteria (Definition of Done)

The agent MUST complete ALL of the following before committing:

- [ ] Delete `client/src/components/ui/`: `button.tsx`, `input.tsx`, `label.tsx`, `textarea.tsx`, `skeleton.tsx`, `toggle.tsx`, `dialog.tsx`, `separator.tsx`. Keep `sheet.tsx`, `tooltip.tsx`, `sonner.tsx` (live call sites: SiteHeader, App).
- [ ] Delete `client/src/hooks/`: `useComposition.ts` (only consumers are the deleted input/textarea), `usePersistFn.ts` (only consumer is useComposition), `useMobile.tsx` (no consumers).
- [ ] Remove from `package.json` dependencies: `@radix-ui/react-label`, `@radix-ui/react-separator`, `@radix-ui/react-toggle`, `@radix-ui/react-slot`, `class-variance-authority` — then `pnpm install` to update the lockfile. KEEP `@radix-ui/react-dialog` (sheet.tsx is built on it) and `@radix-ui/react-tooltip` (tooltip.tsx).
- [ ] Final grep gate: `git grep -nE 'ui/button|ui/input|ui/label|ui/textarea|ui/skeleton|ui/toggle|ui/dialog|ui/separator|useComposition|usePersistFn|useMobile|react-slot|class-variance-authority|react-label|react-separator|react-toggle' -- ':!HANDOFF.md' ':!pnpm-lock.yaml'` returns zero matches.
- [ ] `pnpm check` passes with zero errors, `pnpm build` succeeds, and the site renders (header sheet, tooltips, toasts still work).
- Expected test delta: none (repo has no test suite).

## Constraints & Anti-Goals

- DO NOT remove `sonner`, `@radix-ui/react-dialog`, or `@radix-ui/react-tooltip`.
- DO NOT touch `client/src/lib/content.ts` or any section component.
- DO NOT "improve" the surviving components while deleting the dead ones.

## Pre-confirmed facts

- Call-site grep (verified): `sheet` ← SiteHeader.tsx; `tooltip`, `sonner` ← App.tsx; the eight deleted components have zero importers outside `components/ui/` (dialog is imported only by the dead input.tsx/textarea.tsx).
- `class-variance-authority` importers: button.tsx, toggle.tsx (both deleted). `@radix-ui/react-slot` importer: button.tsx only.
- CI (previous slice) will enforce typecheck + build on the PR.

## Files explicitly forbidden

- `client/src/lib/content.ts`, `client/src/pages/**`, `server/**`, `vercel.json`.

## Starting Point

- Relevant files: the deletions above, `package.json`, `pnpm-lock.yaml`
- Known issues: none. Queued after: wouter patch removal + dep refresh, theme toggle, Field Notes (WAITING ON HUMAN — lesson curation), worked example.
