# Current Slice: Theme toggle — day/night switch in the header

## Context

Dark mode ("blueprint") already exists and works via `prefers-color-scheme`, and the head boot script + ThemeContext were explicitly built anticipating a toggle ("the override key is intentionally readable so a future toggle UI can write to it") — but no UI writes to it, so users cannot reach the other palette deliberately. This is the last hygiene-track slice and the most visible user-facing improvement queued.

## Acceptance Criteria (Definition of Done)

The agent MUST complete ALL of the following before committing:

- [ ] A toggle control in `client/src/components/SiteHeader.tsx` (desktop header AND visible in/near the mobile sheet) cycles theme via the existing `ThemeContext` (`useTheme`), persisting to the existing `localStorage.theme` key with values `light` | `dark` | `system` — exactly the contract the boot script in `client/index.html` reads. Cycle order: system → light → dark → system (or a two-state toggle with long-press/context for system — keep it simple; three-state cycle preferred).
- [ ] The control shows the CURRENT state distinctly (e.g., sun / moon / monitor glyphs from `lucide-react` — already a dependency) with an `aria-label` naming the current theme and next action.
- [ ] No flash-of-wrong-theme: the boot script contract is untouched; toggling applies the `.dark` class immediately via the context (verify by toggling and checking `document.documentElement.classList`).
- [ ] Styling matches the notebook idiom: bordered mono button, no glow, tokens only; renders correctly in BOTH palettes.
- [ ] `pnpm check` passes, `pnpm build` succeeds, CI green on the PR.
- Expected test delta: none (repo has no test suite).

## Constraints & Anti-Goals

- DO NOT modify the boot script in `client/index.html` or the localStorage contract.
- DO NOT add dependencies (lucide-react icons only).
- DO NOT restyle the header beyond adding the control.
- DO NOT touch `client/src/lib/content.ts`.

## Pre-confirmed facts

- `client/src/contexts/ThemeContext.tsx` exports `ThemeProvider` and `useTheme`; localStorage key is `theme`, values `light` | `dark` | `system` (absent = system). The boot script and context already agree on this contract (documented in index.html comment and README "Theme persistence").
- `client/src/components/ui/sonner.tsx` already consumes `useTheme` — working import example.
- The mobile nav sheet lives in `client/src/components/SiteHeader.tsx`.

## Files explicitly forbidden

- `client/index.html`, `client/src/lib/content.ts`, `server/**`, `.github/**`.

## Starting Point

- Relevant files: `client/src/components/SiteHeader.tsx`, `client/src/contexts/ThemeContext.tsx` (read; extend only if the cycle helper is missing)
- Known issues: none. Queued after: Field Notes (WAITING ON HUMAN — lesson curation), worked example, express 5 migration.
