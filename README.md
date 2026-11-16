# Agent Handoff Framework

**A three-role playbook (Advisor / Builder / Verifier) for shipping real software with AI coding agents** — not another “prompt tips” page, but a single reference you can install on a repo: **document schema**, **copy-paste prompts** (builder, closeout, verifier), and **failure-mode guardrails** so merges stay human-gated and evidence-backed.

Created by **[Roy McFarland](https://www.linkedin.com/in/roymcfarland/)** ([GitHub](https://github.com/roymcfarland) · [npm](https://www.npmjs.com/~roymcfarland) · Worksmith Labs) — and built _with_ the methodology it documents. The contributor workflow uses Advisor-scoped slices, independent verification, and a human merge. The [merged-PR history](https://github.com/roymcfarland/agent_handoff_guide/pulls?q=is%3Apr+is%3Amerged) is the working demonstration.

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

The page is organized as ten sections — navigation mirrors this order:

1. **Overview** — Framing and how the framework fits day-to-day engineering.
2. **Diagnosis** — When ad-hoc agent use drifts and what to formalize first.
3. **Document schema** — The handoff artifact structure agents and humans share.
4. **Install on repo** — Dropping the framework into your tree and conventions.
5. **Prompt library** — Scenario-oriented prompts (builder / closeout / verifier).
6. **Build & verify** — Making “green CI” part of the contract, not an afterthought.
7. **Field Notes** — Lessons from operating the framework, including a worked example.
8. **Operate the framework** — Cadence after the first install.
9. **META-PRs** — Meta changes to the process itself (documented, reviewable).
10. **References** — Curated links and papers behind verifier design, long context, and merge hygiene.

The shared long-form copy and prompt bodies live in **`client/src/lib/content.ts`**; sections render via **`client/src/pages/Home.tsx`** and **`client/src/pages/sections/`**.

---

## Use the prompts in your repo

The Prompt Library, META-PR prompts and templates, HANDOFF template, and Build & Verify drop-in doc are emitted as plain Markdown in [**`prompts/`**](./prompts/). The files are MIT-licensed and generated from `content.ts`. CI fails on drift so the generated files match the site. The Phase 2 operating prompts and templates are available to copy in [Operate the framework](https://www.worksmithlabs.com/#phase-2).

```bash
# vendor the whole set, no git history
npx degit roymcfarland/agent_handoff_guide/prompts prompts/ahf

# or grab one file
curl -O https://raw.githubusercontent.com/roymcfarland/agent_handoff_guide/main/prompts/prompt-04-builder.md
```

AI assistants can read the methodology canonically via [`/llms.txt`](https://www.worksmithlabs.com/llms.txt).

---

## Tech stack (at a glance)

- **React 19** + **Vite 8** (SPA), with **TypeScript 6**
- **wouter** for routing, **Tailwind CSS 4** + Radix/shadcn-style primitives for UI
- **Express 4** for static files and SPA fallback when self-hosting
- **Vercel** for the public deployment (`vercel.json` + SPA rewrites)

Full architecture, design language (“Engineer’s Notebook”), **non-goals**, and **verifier rules** for agents are in **[`PROJECT.md`](./PROJECT.md)**.

---

## Prerequisites

- [Node.js](https://nodejs.org/) **24**, as declared in `.nvmrc` and [`package.json`](./package.json).
- Corepack, which runs the exact **pnpm 10** release declared in `packageManager`.

Use `corepack pnpm` or enable the Corepack shims with `corepack enable`. Avoid a globally installed pnpm that differs from the pin. pnpm 11 and later read overrides from `pnpm-workspace.yaml` and ignore the `pnpm` field in `package.json`, where this repo keeps its security overrides. See the [pnpm migration guide](https://pnpm.io/migration).

---

## Quick start

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

Vite serves the app from `client/` (see `vite.config.ts` for the port; default is **3000** unless something else is listening).

---

## Scripts

Run these through Corepack, for example with `corepack pnpm check`. The TypeScript and build checks are the local verification commands. The repository has no separate test or lint script.

| Command                   | Purpose                                                                                                                                                                    |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm dev`                | Start the Vite development server with hot reload.                                                                                                                         |
| `pnpm build`              | Build the client to `dist/public` and the SSR entry to `dist/ssr`, prerender the home page into `dist/public/index.html`, and bundle `server/index.ts` to `dist/index.js`. |
| `pnpm start`              | Serve the built client from the bundled Express server.                                                                                                                    |
| `pnpm preview`            | Preview the built client with Vite.                                                                                                                                        |
| `pnpm check`              | Run TypeScript with `tsc --noEmit`.                                                                                                                                        |
| `pnpm format`             | Format repository files with `prettier --write .`, subject to `.prettierignore`.                                                                                           |
| `pnpm generate:prompts`   | Regenerate `prompts/` and `client/public/llms.txt` from `client/src/lib/content.ts`. CI regenerates both and fails on drift.                                               |
| `pnpm vercel:deploy`      | Create a Vercel preview deployment via `pnpm dlx vercel@latest deploy --yes`.                                                                                              |
| `pnpm vercel:deploy:prod` | Create a Vercel production deployment via `pnpm dlx vercel@latest deploy --prod --yes`.                                                                                    |

---

## Environment variables

The default local build needs no environment setup. For optional Vite settings, copy `.env.example` to `.env` at the repository root. Vite reads that directory via `envDir`. Set Express variables in the process environment when self-hosting.

| Variable                    | Purpose                                                                                                                                | Required?                   | Where to set it             |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | --------------------------- |
| `VITE_SITE_URL`             | Public origin for canonical, Open Graph, Twitter Card, and JSON-LD URLs. Vite strips trailing slashes and uses relative URLs if unset. | Optional                    | Local or Vercel build       |
| `VITE_ANALYTICS_ENDPOINT`   | Base URL for an Umami-compatible analytics service.                                                                                    | Only with analytics enabled | Local or Vercel build       |
| `VITE_ANALYTICS_WEBSITE_ID` | Umami website ID. The client loads the script when both analytics variables are configured.                                            | Only with analytics enabled | Local or Vercel build       |
| `VITE_DEV_ALLOWED_HOSTS`    | Comma-separated extra hosts for the Vite development server.                                                                           | Optional                    | Local Vite dev server       |
| `PORT`                      | HTTP listening port for the Express server.                                                                                            | Optional                    | Self-hosted Express process |
| `NODE_ENV`                  | Selects the Express static asset path. The start script sets it automatically.                                                         | Set by `pnpm start`         | Self-hosted Express process |

---

## Deploying (Vercel)

Vercel’s Git integration builds PR previews for review and deploys commits on `main` to production. [`vercel.json`](./vercel.json) installs with pnpm, invokes the build with `npm run build`, and serves `dist/public` with an SPA rewrite to `index.html`. Express is used for self-hosting via `pnpm start`.

Set `VITE_SITE_URL` in the Vercel production environment so metadata uses absolute URLs. For analytics, configure both `VITE_ANALYTICS_*` variables. The committed Content Security Policy permits only same-origin analytics scripts and requests on Vercel.

---

## CI and security

- [CI](./.github/workflows/ci.yml) runs on pull requests and pushes to `main`. It uses a frozen install, fails on high or critical production dependency advisories, and checks types, the build, generated prompt and `llms.txt` drift, and the [800-line cap](./PROJECT.md#q1-the-800-line-cap-and-its-exemptions). Branch protection configures the `ci` check in strict mode, which requires the PR branch to be up to date.
- [Dependabot](./.github/dependabot.yml) checks npm dependencies and GitHub Actions monthly. It groups npm minor and patch updates and groups Actions updates. It excludes major version updates for `express`, `@types/express`, `@types/node`, and `typescript`, plus major and minor updates for `lucide-react`. The pnpm overrides are declared in [`package.json`](./package.json) and recorded in [`pnpm-lock.yaml`](./pnpm-lock.yaml).
- GitHub CodeQL default setup, secret scanning, and secret scanning push protection are enabled. See [`SECURITY.md`](./SECURITY.md) for private vulnerability reporting instructions.

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

See **[`CONTRIBUTING.md`](./CONTRIBUTING.md)** — contributions ship through the framework itself. The fastest way to contribute is a **[field note](https://github.com/roymcfarland/agent_handoff_guide/issues/new?template=field-note.yml)**: a real, costly lesson from operating agent workflows; curated submissions are published on the site with credit.

Intent, **out-of-scope** work, and agent precedence live in **[`PROJECT.md`](./PROJECT.md)**. If something in this README disagrees with `PROJECT.md`, **trust `PROJECT.md`** and fix the drift in the same PR. Citing the framework in writing or research? GitHub's "Cite this repository" button reads [`CITATION.cff`](./CITATION.cff).

---

## License

MIT — see [`LICENSE`](./LICENSE). Copyright (c) 2026 Roy McFarland.
