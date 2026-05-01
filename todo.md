# Missing install prompts — Todo

- Draft HUMAN_EDIT_CHECKLIST (Step 02) — a human-facing checklist, not an LLM prompt
- Draft VERIFIER_SANITY_PROMPT (Step 03) — LLM Verifier prompt for PROJECT.md audit
- Draft FIRST_HANDOFF_PROMPT (Step 04) — LLM prompt to help you write the first HANDOFF.md
- Draft CALIBRATION_DEBRIEF_PROMPT (Step 05) — prompt the Builder runs at end of first cycle to update PROJECT.md
- Append all four to `client/src/lib/content.ts`
- Render the four new cards in the Install section of `Home.tsx`
- Verify build, save checkpoint, deliver

# Mobile bugfix sweep (Apr 30) — todo

## Diagnosis
- [ ] Re-screenshot at iPhone widths (390, 430) including all four section-07 prompt cards
- [ ] Inspect the section-07 card bodies (Builder prompt, Verifier prompt, Builder PR template, Verifier PR comment template) for any unbreakable token causing `<pre>` overflow
- [ ] Identify what is causing horizontal page drift on phone (Bug A)
- [ ] Confirm if `overflow-x: clip` is being defeated somewhere (sticky? transform? fixed?)

## Fix
- [ ] Make all `<pre>` blocks horizontally scrollable inside their parent (Bug B)
- [ ] Ensure parent containers of `<pre>` have `min-width: 0` so they can shrink
- [ ] Strengthen page-level overflow control (Bug A): `overflow-x: hidden` on both `html` and `body` for older Safari compatibility
- [ ] Re-verify: 6 widths × 8 anchors + extra closeups on the offending prompt card

## Ship
- [ ] Open PR #7 with before/after evidence
- [ ] Path-A or Path-B merge per Roy's call
- [ ] Sync sandbox; checkpoint; remind to publish


# Blueprint dark mode (Apr 30 — late evening)

- [ ] Audit `index.css` for current token system: list every CSS variable defined for the light theme
- [ ] Audit Home.tsx and components for hard-coded color values that need to migrate to semantic tokens
- [ ] Audit `.graph-paper-*` utilities — these likely have hard-coded grid line colors that need to flip in dark mode
- [ ] Define `.dark` token set with blueprint palette: deep navy bg, white grid lines, white/cyan text, desaturated red accent
- [ ] Wire `prefers-color-scheme: dark` to auto-apply `.dark` class on `<html>`
- [ ] Update graph-paper utilities to use semantic tokens for grid line color
- [ ] Migrate any hard-coded colors discovered in audit
- [ ] Cross-mode screenshot verification at 390px and 1280px (light + dark)
- [ ] Confirm cream paper card surfaces still read correctly in both modes
- [ ] Confirm the red circle annotation on the hero still works against dark bg
- [ ] Open PR, merge, sync sandbox
