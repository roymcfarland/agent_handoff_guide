# Current Slice: Introduce the Advisor as a named third role across site content

## Context

The methodology this site documents has evolved from a dual-agent (Builder / Verifier) framing into a three-role model: an **Advisor** who scopes slices, does the recon, drafts grounded prompts, interprets verdicts, and runs post-merge housekeeping. PROJECT.md's Purpose section has been amended to authorize this (spec-amendment PR merged first, per the framework's own rule that a feature crossing the documented scope needs its docs-amendment PR before the feature PR). This slice updates every site surface that encodes the role model.

## Acceptance Criteria (Definition of Done)

The agent MUST complete ALL of the following before committing:

- [ ] `BUILD_VERIFY_STAGES` in `client/src/lib/content.ts` presents four roles — Advisor, Builder, Verifier, Gatekeeper — with the Advisor described as: scopes the slice, greps the repo to pre-confirm facts (file paths, line numbers, symbols), drafts the builder and verifier prompts, interprets the verdict, and runs post-merge housekeeping. The Advisor does not write the code and does not grade the PR.
- [ ] The roles table inside `BUILD_VERIFY_MARKDOWN` (the drop-in `docs/build-and-verify.md` spec) has four rows: Advisor / Builder / Verifier / Gatekeeper, each with accurate Reads and Writes columns.
- [ ] The "Non-negotiable rules" list in `BUILD_VERIFY_MARKDOWN` gains a role-purity rule: the Advisor drafts prompts and interprets verdicts only — it does not build, does not verify, and does not merge on its own judgment.
- [ ] The Overview stat card "2 — Models per slice" in `client/src/pages/sections/OverviewSection.tsx` is updated to reflect the three-role model (e.g., "3 — Roles per slice — Advisor drafts, Builder executes, Verifier grades").
- [ ] The `BuildVerifyDiagram` legend text and `aria-label` in `client/src/components/BuildVerifyDiagram.tsx` acknowledge the Advisor's position (drafts the handoff upstream of the Builder; interprets the verdict for the gatekeeper downstream) WITHOUT changing SVG geometry. A full diagram redraw is a separate, later visual slice.
- [ ] `pnpm check` passes with zero errors and `pnpm build` succeeds.

## Constraints & Anti-Goals

- DO NOT redraw or restructure the `BuildVerifyDiagram` SVG (geometry, boxes, arrows). Text-level legend/aria updates only.
- DO NOT add new entries to `SECTIONS` (no new nav sections in this slice).
- DO NOT rewrite the operative bodies of the library prompts (Builder, Closeout, Verifier, etc.); role-attribution copy in section intros and stage descriptions only.
- DO NOT add dependencies or touch files outside the three listed below plus this HANDOFF.md.

## Starting Point

- Relevant files: `client/src/lib/content.ts`, `client/src/pages/sections/OverviewSection.tsx`, `client/src/components/BuildVerifyDiagram.tsx`
- Known issues: `content.ts` is exempt from the 800-line cap (PROJECT.md Q1). The diagram redraw, the "Interpreting verdicts" content block, the "After the merge" block, and the ceremony-sizing doctrine are separate queued slices — do not fold them in here.
