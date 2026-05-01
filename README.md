# Agent Handoff Framework

Source for the [Worksmith Labs](https://worksmithlabs.com) Agent Handoff Framework reference site: document schema, builder / closeout / verifier prompts, and failure-mode guardrails for shipping software with AI coding agents. Built as a static React app with an optional Express shell for self-hosting.

Live site: **[worksmithlabs.com](https://worksmithlabs.com)** — built and maintained by [Brightline Labs](https://brightline.io).

Project scope, non-goals, and Verifier rules live in [`PROJECT.md`](./PROJECT.md). Read that file before opening a PR.

## Prerequisites

- [Node.js](https://nodejs.org/) 20+ (recommended)
- [pnpm](https://pnpm.io/) 9+

## Quick start

```bash
pnpm install
pnpm dev
```

Vite serves the app from `client/` (see `vite.config.ts` for port; default is 3000 unless busy).

## Scripts

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Local development (Vite, HMR) |
| `pnpm build` | Production client build to `dist/public` + bundle `server/index.ts` to `dist/index.js` |
| `pnpm start` | Run the production server (`NODE_ENV=production node dist/index.js`) |
| `pnpm preview` | Preview the built client with Vite |
| `pnpm check` | TypeScript check (`tsc --noEmit`) |
| `pnpm format` | Prettier |

## Environment variables

Copy `.env.example` to `.env` in the **repository root** (Vite reads from the root via `envDir`).

| Variable | Used by | Description |
| --- | --- | --- |
| `VITE_SITE_URL` | `index.html` (build) | Public origin **without** trailing slash (e.g. `https://example.com`). Drives `rel="canonical"`, Open Graph / Twitter image URLs, and JSON-LD. If unset, relative paths like `/og.jpg` are emitted so crawlers still resolve images against the shared link; set this in production for the strongest previews. |
| `VITE_ANALYTICS_ENDPOINT` | Client | Base URL of an [Umami](https://umami.is/) (or compatible) instance, without trailing slash. |
| `VITE_ANALYTICS_WEBSITE_ID` | Client | Umami website ID. Both analytics vars must be set for the script to load. |
| `PORT` | `server/index.ts` | HTTP port (default `3000`). |
| `VITE_DEV_ALLOWED_HOSTS` | Vite dev only | Optional comma-separated list of additional hosts allowed by the Vite dev server. |
| `BUILT_IN_FORGE_API_URL` | Vite dev only | Optional; enables the `/dev-storage` dev proxy in `vite.config.ts`. |
| `BUILT_IN_FORGE_API_KEY` | Vite dev only | Bearer token paired with the forge URL above. |

`NODE_ENV=production` is set by `pnpm start`; the Express app serves files from `dist/public` next to `dist/index.js`.

## Deploying (Vercel)

`vercel.json` sets `buildCommand`, `installCommand`, `outputDirectory` to `dist/public`, and SPA rewrites to `index.html`. Run `pnpm run build` so the client output exists at that path. Set **`VITE_SITE_URL`** to your production origin (no trailing slash) so Open Graph, Twitter Cards, and the canonical URL use absolute links in previews and search. Production analytics, if used, must be configured as Vercel project environment variables with the `VITE_` prefix.

## Project layout

| Path | Role |
| --- | --- |
| `client/src/` | React app, routes, UI |
| `client/src/lib/content.ts` | Long-form guide copy and structured sections |
| `client/src/components/diagrams/` | SVG figures and shared diagram shell |
| `client/public/og.jpg` | Social preview image (Open Graph / Twitter, 1200×630) |
| `server/index.ts` | Static file + SPA fallback server |
| `shared/` | Shared types or modules (if present) |
| `dist/public/` | Vite build output (gitignored) |

## Theme

The inline script in `client/index.html` and `client/src/contexts/ThemeContext.tsx` both use the `localStorage` key `theme` (`light` \| `dark` \| `system` / absent for system). Keep them in sync when changing persistence behavior.

## License

MIT — see [`LICENSE`](./LICENSE). Copyright (c) 2026 Roy McFarland.
