# Current Slice: Prerender — ship the content in the HTML

## Context

All ten sections' prose currently lives in the JS bundle behind one URL; view-source shows an empty root div. Google renders JS, but non-Google scrapers and LLM crawlers never see the content, and the empty source undercuts credibility with exactly this site's audience. This slice prerenders the single page at build time so the full content ships in the HTML — the minimum structural SEO fix, deliberately NOT the per-section-URL split (that would cross PROJECT.md's "single-page reference document" identity and needs its own spec conversation first).

## Acceptance Criteria (Definition of Done)

The agent MUST complete ALL of the following before committing:

- [ ] The production build emits `dist/public/index.html` containing the rendered page markup (all ten section ids present in the static HTML), while hydration keeps the page fully interactive (nav observer, theme toggle, copy buttons, sheet).
- [ ] Implementation preference, in order: (a) a small build-time prerender script using `react-dom/server` `renderToString` into the built index.html + `hydrateRoot` in main.tsx; (b) an established Vite prerender/SSG plugin IF it requires no framework migration. No Next.js/Remix migration — that is out of scope.
- [ ] The theme boot script still runs before first paint (no flash); the prerendered markup must not hard-code a theme class.
- [ ] The NotFound noindex behavior is preserved; `/` serves prerendered content, unknown paths still render the client-side 404.
- [ ] `curl` of the local preview/build output shows real content (grep for "Field Notes" and "Advisor triage" in the HTML, not just the bundle).
- [ ] Hydration produces zero console errors/warnings about mismatches in the dev-tools console on load.
- [ ] `pnpm check`, `pnpm build`, prompts zero-diff, and the 800-line cap pass; CI green on the PR.
- Expected test delta: none (repo has no test suite).

## Constraints & Anti-Goals

- DO NOT split into per-section routes/URLs — single page stays single page (PROJECT.md identity; changing it is a spec amendment, not an SEO reflex).
- DO NOT migrate frameworks or add heavyweight SSG machinery; prefer a ~50-line script over a plugin with config sprawl.
- DO NOT break the Express self-host fallback (`pnpm start` must still serve the prerendered output correctly).
- DO NOT regress interactivity (hydration, not a static replacement).

## Pre-confirmed facts

- Entry: `client/src/main.tsx` uses `createRoot(...).render(...)`; switch to `hydrateRoot` only when the root has prerendered children (feature-detect `root.hasChildNodes()`), so dev mode keeps working unhydrated.
- Theme contract: the head boot script applies `.dark` pre-paint; ThemeProvider re-derives on mount — prerendered HTML must stay theme-neutral. `readSystemPref` guards `typeof window === "undefined"`; `readStoredTheme` runs in a useState initializer (WILL run during renderToString) but is try/catch-wrapped and falls back to "system" — confirm during build.
- Browser APIs at render time: IntersectionObserver (SiteHeader) and matchMedia listeners (ThemeContext) live inside useEffect — SSR-safe. The analytics injection in `main.tsx` is module-scope DOM manipulation — the prerender script must import App only, never main.tsx.
- Vite 7 SSR: either `vite build --ssr` or a post-build node script importing the app works; the script approach matches `scripts/` conventions (tsx already a devDependency).

## Files explicitly forbidden

- `client/src/lib/content.ts` — no content changes.
- `prompts/**`, `client/public/llms.txt` — generated; untouched by this slice.

## Starting Point

- Relevant files: `vite.config.ts`, `client/src/main.tsx`, `scripts/prerender.ts` (NEW, likely), `package.json` (build script)
- Known issues: none. Queued after: sheet index + anchor links, byline + FAQ, robot-head brand mark in the header (replace the "AHF" box with a lego-like robot head — proof-sheet approach like the favicon), delight batch (checklist persistence, download-as-.md, print stylesheet, reading-progress line).
