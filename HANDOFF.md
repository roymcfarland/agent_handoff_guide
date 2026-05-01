# Current Slice: Split Home.tsx into per-section components

## Goal
Refactor `client/src/pages/Home.tsx` (~1,815 lines) by extracting its nine distinct content sections into separate React components under `client/src/pages/sections/`. The goal is to bring all files in `client/src/pages/` under the 800-line cap defined in `PROJECT.md`, while maintaining exactly zero visual or functional changes to the live site.

## Scope
**In scope:**
- Creating a new directory: `client/src/pages/sections/`
- Extracting the nine `<section>` blocks from `Home.tsx` into nine new `.tsx` files.
- Updating `Home.tsx` to import and render these nine components in the exact same order.
- Moving the relevant `import` statements from `content.ts` and `components/` out of `Home.tsx` and into the specific section files that actually use them.

**Out of scope:**
- Modifying `client/src/lib/content.ts` (this file is explicitly exempted from the 800-line rule per `PROJECT.md` updates pending this slice).
- Changing any CSS classes, layout structures, or text content.
- Refactoring the `<SiteHeader>` or `<SiteFooter>` components.
- Modifying any files in `client/src/components/diagrams/`.

## Acceptance Criteria
1. **File Size:** `client/src/pages/Home.tsx` must be under 200 lines. No new file in `client/src/pages/sections/` may exceed 800 lines.
2. **Zero Visual Diff:** The rendered HTML structure of the `<main id="main-content">` block must be identical to the pre-refactor state. All `id` attributes (e.g., `id="overview"`, `id="overview-heading"`) must be preserved exactly, as they are targets for the table of contents navigation.
3. **Build Success:** `pnpm check` (TypeScript) must pass with zero errors. `pnpm build` must succeed.
4. **Import Hygiene:** `Home.tsx` must no longer import the massive list of constants from `@/lib/content`. Each section component must import only the specific constants it needs.

## Files Touched
- `client/src/pages/Home.tsx` (modified heavily)
- `client/src/pages/sections/OverviewSection.tsx` (new)
- `client/src/pages/sections/DiagnosisSection.tsx` (new)
- `client/src/pages/sections/SchemaSection.tsx` (new)
- `client/src/pages/sections/InstallSection.tsx` (new)
- `client/src/pages/sections/PromptLibrarySection.tsx` (new)
- `client/src/pages/sections/BuildVerifySection.tsx` (new)
- `client/src/pages/sections/PhaseTwoSection.tsx` (new)
- `client/src/pages/sections/MetaPRsSection.tsx` (new)
- `client/src/pages/sections/ReferencesSection.tsx` (new)

## Verification Steps
1. Run `pnpm check` to verify TypeScript is happy with the new component boundaries and prop types (if any).
2. Run `pnpm build` to verify Vite can resolve all the new imports.
3. Check the line count of `Home.tsx` and the largest new file (`PhaseTwoSection.tsx`) to confirm the 800-line rule is satisfied.
4. (Manual/Visual) Start the dev server (`pnpm dev`), open the site, and verify that clicking every link in the left-hand navigation still scrolls to the correct section, proving the `id` attributes survived the extraction.
