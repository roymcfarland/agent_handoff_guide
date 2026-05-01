# PROJECT.md

> This document is the authoritative source of truth for the Builder, Closeout, and Verifier agents operating on this repository. When this document conflicts with other files (README.md, package.json, inline comments, etc.), this document wins and the conflicting file should be corrected in the same PR that surfaces the conflict.

---

## Purpose

`agent_handoff_guide` is the source repository for the Agent Handoff Framework reference site, published by **Worksmith Labs** at [worksmithlabs.com](https://worksmithlabs.com). The site documents a dual-agent (Builder / Verifier) workflow for shipping software with AI coding agents — the document schema, the prompt library, and the failure-mode guardrails — as a single-page, copy-paste-friendly reference. The codebase is open-source under MIT (© 2026 Roy McFarland) and is intended as an open thought-leadership artifact: the *methodology* is the brand asset, the *implementation* is freely forkable. The site is built and maintained by [Brightline Labs](https://brightline.io), Roy's dev agency. This is not a SaaS product, a hosted service, or a multi-user application; it has no backend, no accounts, and no paid tiers.

The site may, in the future, include opt-in signup forms for adjacent Worksmith Labs offerings (newsletter, courses); these are explicitly out-of-scope today and will be added via deliberate, scoped PRs. Separately, the methodology may eventually be distributed as an `npx create-agent-handoff` CLI in a *separate* repository — not as part of this site repo.

---

## Stack

- **Framework:** React 19 + Vite 7 (Single Page Application)
- **Routing:** `wouter`
- **Styling:** Tailwind CSS 4 + `clsx` / `tailwind-merge`
- **UI Components:** Radix UI primitives + minimal shadcn/ui baseline (aggressively pruned to active imports only)
- **Icons:** `lucide-react`
- **Production Server:** Express (static file fallback for self-hosting; Vercel serves SPA directly)
- **Deployment:** Vercel (`vercel.json` configured for SPA rewrites)
- **Package Manager:** `pnpm` (pinned via `packageManager` field; Corepack enabled)

---

## Architecture

The repository is structured as a single-page React application with an optional Express shell for production self-hosting.

The **browser/React** entry point is `client/src/main.tsx`, which bootstraps the React DOM, the ThemeProvider, and the Wouter routing context. The entire site renders through `client/src/pages/Home.tsx`, which composes nine distinct sections (Overview, Diagnosis, Schema, Install, Prompt Library, Build & Verify, After Install, META-PRs, References).

The **content layer** is separated from the presentation layer. All long-form prose, prompt bodies, and structured section data live in `client/src/lib/content.ts`. The UI components map over this data to render the page.

The **local server** entry point is `server/index.ts`. It initializes a minimal Express server that serves the Vite build output (`dist/public`) and provides a wildcard fallback to `index.html` for client-side routing. It contains no business logic or API endpoints.

---

## Conventions

- **Design Language ("The Engineer's Notebook"):** The site uses a strict graph-paper aesthetic. Warm paper background (`#F4EFE6`), deep ink navy text (`#0E2A47`), and drafting red (`#C8362D`) as the sole accent color. The grid is literal (24px cells). No gradients, no glassmorphism, no glow effects.
- **Typography Hierarchy:** Section labels use monospace caps (stamped effect); titles use Fraunces (variable serif); body copy uses Inter; prompts and code blocks use JetBrains Mono.
- **Component Pruning:** The shadcn/ui installation is strictly pruned. Components are only added to `client/src/components/ui/` if they have an active call site in the application. Speculative "for completeness" components are rejected.
- **File Size Cap:** Files in `client/src/pages/`, `client/src/lib/`, and `client/src/components/` should aim for **under 800 lines**. Two files currently exceed this and are known violations: `client/src/pages/Home.tsx` and `client/src/lib/content.ts`. A planned refactor will split each into per-section modules in a follow-up PR.

---

## Non-goals

The following are explicitly **out of scope** for this product. Agents should reject or flag work that moves the codebase in any of these directions unless this document is updated first.

- **Not a backend application or API.** The Express shell in `server/index.ts` is a static-file fallback for self-hosting only; no routing, no business logic, no database. PRs that add server-side endpoints, ORMs, or persistence layers are out of scope.
- **Not a multi-user application.** No accounts, no authentication, no authorization, no user state. PRs that add login forms, OAuth, sessions, or per-user persistence are out of scope.
- **Not a SaaS or hosted commercial service.** No billing, no subscription tiers, no feature gates, no usage metering. The methodology may be commercialized in adjacent ways, but never via paid features inside this codebase.
- **Not a native mobile app.** Surface is responsive web only. PRs that introduce React Native, Capacitor, Expo, or installable-PWA flows are out of scope.
- **Not a realtime or collaborative tool.** No websockets, no presence, no shared editing, no multi-user state sync.
- **Not a high-friction lead-generation funnel.** Sales chat widgets, exit-intent popups, gated content, multi-step lead-capture forms, and demo-booking flows are explicitly out of scope. A single passive opt-in CTA (e.g., a Worksmith Labs course waitlist) is permitted; further expansion of marketing surface area requires a deliberate scoped PR that updates this non-goal.
- **Not the home of the future `create-agent-handoff` CLI.** When that CLI is built, it lives in a separate repository. PRs that add `bin/`, `src/scaffold.ts`, `commander`, `enquirer`, or other CLI-distribution scaffolding to *this* repo are out of scope.
- **Not a generic shadcn/ui playground or component library.** Components are added only when there is a concrete call site in `Home.tsx` or a Section component. Speculative additions are out of scope.
- **Not a *generalized* AI agent framework.** The published methodology is currently focused on Builder/Verifier handoff for software engineering. Expansion into adjacent knowledge-work domains is plausible future work but is **not in scope here**; any such expansion ships as a deliberate, scoped PR or in a separate companion repository.
- **Not a ranked review or directory of AI coding tools.** Brief compatibility notes are welcome; ranked comparisons, vendor recommendations, and "which tool is best" content are out of scope. The methodology stays tool-agnostic.
- **Not a Discord, Slack, or community-platform hub.** No invite links, no community-onboarding flows, no chat-platform widgets. This repo and site stay a single-page reference document.

---

## Open questions (resolved)

The following questions were raised by static analysis of the repository and have been answered here. Agents should treat these answers as durable unless this document is updated.

### Q1. The two primary files (`Home.tsx` and `content.ts`) violate the 800-line cap. Intentional or debt?

**Answer: Legacy debt — warn, don't block.**

The files are ~1,800 lines each, which consumes excessive agent context window. However, splitting the page layer during active feature expansion is high-risk. The split is planned as a dedicated follow-up PR (likely the first Slice 01 of the next Build/Verify cycle).

**Verifier behavior:**
- Until the split PR lands: Verifier **warns** on any PR that adds to either file and recommends waiting.
- Once the split PR lands: the 800-line cap becomes a **hard failure** for all files in the listed directories.

### Q2. The repository contains unused shadcn components and vestigial dependencies. Keep for expansion or prune?

**Answer: Prune aggressively.**

The repository maintains a "lightweight, professional, public-ready" posture. Unused components and dependencies (e.g., `Map.tsx`, `axios`, `recharts`, and ~40 unused `ui/*.tsx` files) were pruned prior to public release.

**Verifier behavior:**
- **Hard-fail** any PR that adds a dependency to `package.json` without a corresponding active import in the source code.
- **Hard-fail** any PR that adds a shadcn component to `client/src/components/ui/` without adding a call site in the same PR.

### Q3. The `package.json` file contains both a `packageManager` field and a `devDependencies` entry for `pnpm`. Which is authoritative?

**Answer: `packageManager` is authoritative.**

Modern CI (including Vercel) uses Corepack, which reads the `packageManager` field. The `devDependencies` entry is dead code and was removed prior to public release.

**Verifier behavior:**
- **Hard-fail** any PR that re-introduces `pnpm` or `yarn` into `devDependencies` or `dependencies`.

---

## Authority and precedence

When agents encounter conflicts between this document and other files in the repository, the order of authority is:

1. **This PROJECT.md** (authoritative for intent, scope, non-goals, and the resolved open questions above).
2. **`README.md`** (authoritative for contributor conventions not covered here).
3. **`package.json`, schema files, CI config** (authoritative for the technical facts they encode, subject to corrections required by this document).
4. **Inline code comments** (lowest authority; must be corrected when they contradict the above).

Any PR that surfaces a conflict between these sources must resolve the conflict in the same PR, not defer it.
