# Agent Handoff Framework

**A three-role playbook (Advisor / Builder / Verifier) for shipping real software with AI coding agents** — not another “prompt tips” page, but a single reference you can install on a repo: **document schema**, **copy-paste prompts** (builder, closeout, verifier), and **failure-mode guardrails** so merges stay human-gated and evidence-backed.

This repository is the **open-source** source for the **[Worksmith Labs](https://worksmithlabs.com)** reference site. The _methodology_ is the product story; the _code_ is MIT-licensed and yours to fork. The live experience is built and maintained by **[Brightline Labs](https://brightline.io)**.

|                                       |                                                             |
| ------------------------------------- | ----------------------------------------------------------- |
| **Live site**                         | **[worksmithlabs.com](https://worksmithlabs.com)**          |
| **Authoritative scope & agent rules** | **[`PROJECT.md`](./PROJECT.md)** — read before opening a PR |

**Repository** — [github.com/roymcfarland/agent_handoff_guide](https://github.com/roymcfarland/agent_handoff_guide): `git clone https://github.com/roymcfarland/agent_handoff_guide.git` · [Issues](https://github.com/roymcfarland/agent_handoff_guide/issues)

---

## Why this exists

Most teams don’t lack _access_ to an AI that can write code — they lack a **repeatable handoff**: clear scope documents, a builder that stays in lane, and a verifier that checks against **diffs and criteria** instead of vibes. This site collects that workflow in one scrollable, tool-agnostic reference (no ranked “best model” drama, no SaaS signup wall).

Under the hood it’s a **static React app** with an optional **Express** shell if you want to self-host the built assets beside a tiny Node server.

---

## What you’ll find on the site

The page is organized as nine sections — navigation mirrors this order:

1. **Overview** — Framing and how the framework fits day-to-day engineering.
2. **Diagnosis** — When ad-hoc agent use drifts and what to formalize first.
3. **Document schema** — The handoff artifact structure agents and humans share.
4. **Install on repo** — Dropping the framework into your tree and conventions.
5. **Prompt library** — Scenario-oriented prompts (builder / closeout / verifier).
6. **Build & verify** — Making “green CI” part of the contract, not an afterthought.
7. **Operate the framework** — Cadence after the first install.
8. **META-PRs** — Meta changes to the process itself (documented, reviewable).
9. **References** — Curated links and papers behind verifier design, long context, and merge hygiene.

Long-form copy and prompt bodies live in **`client/src/lib/content.ts`** so UI code stays layout-focused; sections render via **`client/src/pages/Home.tsx`** and **`client/src/pages/sections/`**.

---

## Use the prompts in your repo

Every prompt, template, and drop-in doc is emitted as plain markdown in [**`prompts/`**](./prompts/) — MIT-licensed, generated from `content.ts` (CI fails on drift, so the files always match the site).

```bash
# vendor the whole set, no git history
npx degit roymcfarland/agent_handoff_guide/prompts prompts/ahf

# or grab one file
curl -O https://raw.githubusercontent.com/roymcfarland/agent_handoff_guide/main/prompts/prompt-04-builder.md
```

AI assistants can read the methodology canonically via [`/llms.txt`](https://www.worksmithlabs.com/llms.txt).

---

## Tech stack (at a glance)

- **React 19** + **Vite 7** (SPA)
- **wouter** for routing, **Tailwind CSS 4** + Radix/shadcn-style primitives for UI
- **Express** only as a static-file + SPA fallback for production self-host
- **Vercel** for the public deployment (`vercel.json` + SPA rewrites)

Full architecture, design language (“Engineer’s Notebook”), **non-goals**, and **verifier rules** for agents are in **[`PROJECT.md`](./PROJECT.md)**.

---

## Prerequisites

- [Node.js](https://nodejs.org/) **22+** (pinned via `engines` and `.nvmrc`)
- [pnpm](https://pnpm.io/) **10+** (repo pins via `packageManager`; Corepack-friendly)

---

## Quick start

```bash
pnpm install
pnpm dev
```

Vite serves the app from `client/` (see `vite.config.ts` for the port; default is **3000** unless something else is listening).

---

## Scripts

| Command        | Purpose                                                                        |
| -------------- | ------------------------------------------------------------------------------ |
| `pnpm dev`     | Local development (Vite, HMR)                                                  |
| `pnpm build`   | Production client → `dist/public` + bundle `server/index.ts` → `dist/index.js` |
| `pnpm start`   | Production server: `NODE_ENV=production node dist/index.js`                    |
| `pnpm preview` | Preview the built client with Vite                                             |
| `pnpm check`   | TypeScript (`tsc --noEmit`)                                                    |
| `pnpm format`  | Prettier                                                                       |

---

## Environment variables

Copy **`.env.example`** to **`.env`** at the **repository root** (Vite reads from the root via `envDir`).

| Variable                    | Used by              | Description                                                                                                                                                                                                                                       |
| --------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_SITE_URL`             | `index.html` (build) | Public origin **without** trailing slash (e.g. `https://example.com`). Drives `rel="canonical"`, Open Graph / Twitter image URLs, and JSON-LD. If unset, relative paths like `/og.jpg` still work; set in production for strongest link previews. |
| `VITE_ANALYTICS_ENDPOINT`   | Client               | Base URL of an [Umami](https://umami.is/)-compatible instance, no trailing slash.                                                                                                                                                                 |
| `VITE_ANALYTICS_WEBSITE_ID` | Client               | Umami website ID. Both analytics vars must be set for the script to load.                                                                                                                                                                         |
| `PORT`                      | `server/index.ts`    | HTTP port (default `3000`).                                                                                                                                                                                                                       |
| `VITE_DEV_ALLOWED_HOSTS`    | Vite dev only        | Optional comma-separated extra hosts for the dev server.                                                                                                                                                                                          |

For `pnpm start`, `NODE_ENV=production` applies and Express serves **`dist/public`** next to **`dist/index.js`**.

---

## Deploying (Vercel)

`vercel.json` sets install/build commands, **`outputDirectory`** to **`dist/public`**, and SPA rewrites to **`index.html`**. Run `pnpm run build` so client output lands there. Set **`VITE_SITE_URL`** on the project so Open Graph, Twitter Cards, and the canonical URL use absolute links. Analytics env vars, if used, need the `VITE_` prefix in Vercel.

---

## Project layout

| Path                              | Role                                                  |
| --------------------------------- | ----------------------------------------------------- |
| `client/src/`                     | React app, routes, UI                                 |
| `client/src/lib/content.ts`       | Guide copy, prompts, structured section data          |
| `client/src/components/diagrams/` | SVG figures and shared diagram shell                  |
| `client/public/og.jpg`            | Social preview image (Open Graph / Twitter, 1200×630) |
| `server/index.ts`                 | Static files + SPA fallback                           |
| `dist/public/`                    | Vite build output (gitignored)                        |

---

## Theme persistence

The inline boot script in `client/index.html` and **`client/src/contexts/ThemeContext.tsx`** both use the `localStorage` key **`theme`** (`light` | `dark` | `system` / absent for system). Keep them aligned if you change how themes stick.

---

## Contributing

Intent, **out-of-scope** work, and agent precedence live in **[`PROJECT.md`](./PROJECT.md)**. If something in this README disagrees with `PROJECT.md`, **trust `PROJECT.md`** and fix the drift in the same PR.

---

## License

MIT — see [`LICENSE`](./LICENSE). Copyright (c) 2026 Roy McFarland.
