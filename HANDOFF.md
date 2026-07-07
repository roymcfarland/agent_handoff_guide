# Current Slice: "Interpreting verdicts" content block + two new failure modes

## Context

The Advisor role is now named across the site (previous slice). This slice adds the Advisor's signature skill — reading verdicts critically — which the site currently lacks entirely: the only REJECT guidance today is the two-REJECTs escalation rule. Verifiers can FAIL on spurious grounds, and the framework needs to say so out loud.

## Acceptance Criteria (Definition of Done)

The agent MUST complete ALL of the following before committing:

- [ ] A new exported content block in `client/src/lib/content.ts` (e.g., `VERDICT_TRIAGE`) covering: (1) the triage question — is the cited file:line a real defect, or is the check itself defective?; (2) common spurious-FAIL shapes — a criterion the Builder was never given, an occurrence-count the recon undercounted, a shape check on behavior-correct code, a grep that cannot match across line wraps; (3) the honest path when the FAIL is a prompt bug — merge anyway with a brief note, and fix the prompt template, not the code; (4) red-CI triage — reproduce locally on the exact commit and force a no-cache rebuild before blaming the diff; (5) "PR is up" / "merged" are claims to verify against the artifact, not facts.
- [ ] The block renders in the Build & Verify section (`client/src/pages/sections/BuildVerifySection.tsx`), positioned between the loop diagram/principles and the escalation rule — verdict triage happens BEFORE the two-REJECT escalation applies.
- [ ] `FAILURE_MODES` gains two cards in the existing voice: "The check was wrong, not the code" (a REJECT can be a defect in the verifier prompt; triage before re-running the Builder) and "A criterion the Builder never saw" (any verifier PASS criterion absent from the builder's instructions is a guaranteed spurious REJECT; mirror every check back into the builder prompt).
- [ ] The escalation-rule copy is untouched except, if needed, one linking sentence acknowledging triage comes first.
- [ ] `pnpm check` passes with zero errors and `pnpm build` succeeds.

## Constraints & Anti-Goals

- DO NOT add new entries to `SECTIONS` (no new nav section — this lives inside Build & Verify).
- DO NOT modify the operative bodies of the library prompts in this slice.
- DO NOT add dependencies.
- DO NOT restyle existing components; reuse the section's existing card/list patterns.

## Starting Point

- Relevant files: `client/src/lib/content.ts`, `client/src/pages/sections/BuildVerifySection.tsx`
- Known issues: `content.ts` is exempt from the 800-line cap (PROJECT.md Q1). Queued after this slice: "After the merge" block (Operate section), ceremony-sizing doctrine, HANDOFF template upgrade, BuildVerifyDiagram redraw (visual).
