# Contributing

Thanks for the interest — contributions are welcome, and this repo practices what it publishes: **changes ship through the Agent Handoff Framework itself.**

## Before anything else

Read [`PROJECT.md`](./PROJECT.md). It is the authoritative rules document: purpose, architecture, conventions, **non-goals**, and the Verifier hard-fail rules every PR is held to. A PR that crosses a documented non-goal will be closed no matter how good the code is — if you think a non-goal is obsolete, open an issue proposing the spec amendment first (that's a META-PR in the framework's own terms).

## What's welcome

- **Field notes** — real, costly lessons from operating agent workflows. Use the [field-note issue template](https://github.com/roymcfarland/agent_handoff_guide/issues/new?template=field-note.yml); keep them tool-agnostic and receipt-backed where possible. Curated submissions get added to the site's Field Notes section with credit.
- **Prompt improvements** — with rationale grounded in a real failure or rescue, not taste. Prompts live in [`client/src/lib/content.ts`](./client/src/lib/content.ts); the files in [`prompts/`](./prompts/) are **generated** (`pnpm generate:prompts`, CI enforces zero drift) — never edit them directly.
- **Corrections** — factual drift, broken links, rendering defects. Small fixes are the easiest PRs to merge.

## How a change ships here

1. Scope the change the way the site teaches: a small slice with observable acceptance criteria.
2. Branch, build, and keep `pnpm check` and `pnpm build` green (CI runs both, plus the 800-line cap and the prompts zero-drift gate).
3. Open a PR — never push to `main`. A human gatekeeper reviews every merge.
4. Visual changes get an eyeball on the Vercel preview; code-correct is not render-correct.

## Dev setup

```bash
pnpm install
pnpm dev        # Vite dev server on :3000
pnpm check      # typecheck
pnpm build      # production build (includes the prerender)
```

## License

MIT — by contributing you agree your contributions are licensed the same. The Agent Handoff Framework is created and maintained by [Roy McFarland](https://www.linkedin.com/in/roymcfarland/) ([GitHub](https://github.com/roymcfarland) · [npm](https://www.npmjs.com/~roymcfarland)).
