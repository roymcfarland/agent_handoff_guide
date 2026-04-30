# Missing install prompts — Todo

- Draft HUMAN_EDIT_CHECKLIST (Step 02) — a human-facing checklist, not an LLM prompt
- Draft VERIFIER_SANITY_PROMPT (Step 03) — LLM Verifier prompt for PROJECT.md audit
- Draft FIRST_HANDOFF_PROMPT (Step 04) — LLM prompt to help you write the first HANDOFF.md
- Draft CALIBRATION_DEBRIEF_PROMPT (Step 05) — prompt the Builder runs at end of first cycle to update PROJECT.md
- Append all four to `client/src/lib/content.ts`
- Render the four new cards in the Install section of `Home.tsx`
- Verify build, save checkpoint, deliver
