# Current Slice: BuildVerifyDiagram redraw — add the Advisor to the loop figure

## Context

The Advisor is now a named role everywhere on the site except the loop diagram itself: Fig. 6 still draws HANDOFF.md → Builder → Verifier → Gatekeeper, with the Advisor acknowledged only in the legend, footer, and aria-label (deferred from the role-introduction slice). This is a VISUAL slice: SVG geometry changes, so a human must eyeball the rendered result on the PR preview before merge — code-correct is not render-correct.

## Acceptance Criteria (Definition of Done)

The agent MUST complete ALL of the following before committing:

- [ ] `client/src/components/BuildVerifyDiagram.tsx` (Fig. 6) shows the Advisor in the flow: upstream, the Advisor scopes/writes HANDOFF.md and drafts both prompts (e.g., an Advisor box or annotated bracket feeding the HANDOFF.md node); downstream, the verdict routes through the Advisor's triage before the gatekeeper's merge call (e.g., a labeled edge or node between the Verifier's verdict and the gatekeeper).
- [ ] The diagram keeps the notebook style: paper background, grid pattern, ink/red palette from CSS variables, JetBrains Mono / IBM Plex Serif font stacks — consistent with the other figures in `client/src/components/diagrams/`.
- [ ] Stage tags inside the SVG are updated to match the four-stage model (Advisor is Stage A per `BUILD_VERIFY_STAGES`; the SVG's current "STAGE A/B" labels for Builder/Verifier must not contradict the cards above the figure).
- [ ] The `aria-label`, legend, and footer remain accurate after the redraw (they already name the Advisor — verify they still match what is drawn).
- [ ] The viewBox scales to fit the added content; `min-w-[680px]` horizontal-scroll behavior on small screens is preserved.
- [ ] `pnpm check` passes with zero errors and `pnpm build` succeeds.
- [ ] The PR body flags explicitly: "Visual slice — human must eyeball the rendered figure on the preview before merge."

## Constraints & Anti-Goals

- DO NOT change any other diagram in `client/src/components/diagrams/`.
- DO NOT change `BUILD_VERIFY_STAGES` or any content.ts export in this slice.
- DO NOT introduce new colors, gradients, or effects outside the existing token set.
- DO NOT add dependencies.

## Pre-confirmed facts

- The diagram is `client/src/components/BuildVerifyDiagram.tsx` (~440 lines); it sits at `components/` top level, well under the 800-line cap.
- Current viewBox: `0 0 920 556`. Builder box at x=100, Verifier box at x=480, both y=118, 340×158. HANDOFF.md node at x=380, y=28, 160×60. Gatekeeper/verdict flow occupies y≈300–556.
- Colors come from CSS vars: `--ink`, `--ink-soft`, `--red`, `--paper`, `--grid-strong` (already read into consts at the top of the component).
- `BUILD_VERIFY_STAGES` tags: A=Advisor, B=Builder, C=Verifier, D=You (gatekeeper).

## Files explicitly forbidden

- `client/src/components/diagrams/**` — other figures stay untouched.
- `client/src/lib/content.ts` — no content changes in this slice.

## Starting Point

- Relevant files: `client/src/components/BuildVerifyDiagram.tsx`
- Known issues: none. Queued after this slice: credibility track (Field Notes, worked example, title-block footer), hygiene track (CI workflow, dead-component prune, wouter patch removal, theme toggle).
