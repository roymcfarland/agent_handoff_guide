/*
 * AGENT HANDOFF FRAMEWORK — CONTENT
 * Source of truth for all copy on the page. Keeping it here so the visual
 * components stay focused on layout and the prose stays editable in one place.
 * Design philosophy is "The Engineer's Notebook" — every string should sound like
 * a working spec, not marketing copy.
 */

export const SECTIONS = [
  { id: "overview", label: "Overview", number: "01" },
  { id: "diagnosis", label: "Diagnosis", number: "02" },
  { id: "schema", label: "Document Schema", number: "03" },
  { id: "install", label: "Install on Repo", number: "04" },
  { id: "prompts", label: "Core Prompts", number: "05" },
  { id: "build-verify", label: "Build & Verify", number: "06" },
  { id: "practices", label: "Best Practices", number: "07" },
  { id: "moonshots", label: "Moonshots", number: "08" },
] as const;

export const FAILURE_MODES = [
  {
    title: "Committing directly to main",
    body:
      "Every handoff lands unreviewed code on main. No diff surface, no CI gate, no easy revert. The agent is incentivized to make it pass locally rather than make it correct, because there is no PR conversation.",
  },
  {
    title: "One document doing five jobs",
    body:
      "When the handoff doc is roadmap, task list, status log, architectural notes, and next-builder briefing all at once, every new agent re-reads the entire history and wastes context relitigating decisions that are already settled.",
  },
  {
    title: "Weak persona priming",
    body:
      "Telling an agent it is a 'professional software engineer' does not constrain behavior. A useful prompt tells the agent what NOT to do — do not refactor outside scope, do not add dependencies, do not expand the plan.",
  },
  {
    title: "No definition of done",
    body:
      "Without an explicit acceptance contract, the agent decides when it is done. That is where scope creep and 'I also went ahead and...' come from.",
  },
  {
    title: "Self-graded handoffs",
    body:
      "Agents are biased to claim success on their own work. Without a forced honesty step, the next agent inherits silent debt — stubs, hacks, and skipped criteria that were never declared.",
  },
  {
    title: "Planning vs. building drift",
    body:
      "Agents drift into planning mode when the task is ambiguous, the doc reads like a brainstorm, or there is no explicit BUILD-ONLY framing with a stop condition.",
  },
] as const;

export const SCHEMA_FILES = [
  {
    file: "PROJECT.md",
    role: "The immutable core",
    cadence: "Rarely changes",
    description:
      "The why, the architecture, and the non-negotiables. Agents read this for context but do not edit it unless explicitly instructed.",
    contains: [
      "Goal — the ultimate purpose of this software",
      "Architecture — tech stack, key patterns, hard constraints",
      "Directory structure — where things live",
    ],
  },
  {
    file: "CHANGELOG.md",
    role: "The long memory",
    cadence: "Append-only",
    description:
      "A history of completed slices. One paragraph per slice summarizing what was built and any technical debt incurred. Agents only read this when historical context is required.",
    contains: [
      "One entry per completed slice",
      "Technical debt explicitly noted",
      "Never rewritten — only appended",
    ],
  },
  {
    file: "HANDOFF.md",
    role: "The current slice",
    cadence: "Overwritten each handoff",
    description:
      "The only document the active agent works against. Strict, scoped, and disposable. Contains an explicit definition of done that the agent must satisfy literally before committing.",
    contains: [
      "Context — one or two sentences on the slice",
      "Acceptance Criteria — the definition of done",
      "Constraints & anti-goals — what NOT to touch",
      "Starting point — files and known issues",
    ],
  },
] as const;

export const HANDOFF_TEMPLATE = `# Current Slice: [Name of the feature or fix]

## Context
[1-2 sentences explaining what this slice achieves in the broader project.]

## Acceptance Criteria (Definition of Done)
The agent MUST complete ALL of the following before committing:
- [ ] Criterion 1 (e.g., "The API endpoint returns a 200 OK with the correct JSON schema.")
- [ ] Criterion 2 (e.g., "Unit tests for the new endpoint pass.")
- [ ] Criterion 3

## Constraints & Anti-Goals
- DO NOT refactor code outside of \`src/api/\`.
- DO NOT add new npm packages.
- DO NOT attempt to build the frontend UI for this endpoint.

## Starting Point
- Relevant files: \`src/api/routes.ts\`, \`src/api/controllers.ts\`
- Known issues from previous slice: [Any bugs or stubs left behind]
`;

export const BUILDER_PROMPT = `You are an execution-focused software engineer. Your sole objective is to complete the specific slice of work defined in HANDOFF.md.

CRITICAL RULES:
1. No Planning. The planning phase is over. Do not suggest architectural changes, do not expand the scope, and do not write roadmaps. Your job is to write code that satisfies the Acceptance Criteria.
2. Strict Boundaries. Adhere strictly to the "Constraints & Anti-Goals" in HANDOFF.md. Do not touch files outside the scope of your current task.
3. Definition of Done. You are not finished until every item in the Acceptance Criteria is met. If you are blocked and cannot meet a criterion, you must stop and report the blockage; do not silently skip it or fake it.
4. Context Budget. Read only the files you need. If you find yourself reading more than five files to complete this task, stop and justify why before continuing.

Instructions:
1. Read PROJECT.md for high-level context.
2. Read HANDOFF.md to understand your specific task.
3. Execute the work.
4. When you believe you are done, verify your work against the Acceptance Criteria item by item.`;

export const CLOSEOUT_PROMPT = `You have just completed a slice of work. Your task now is to cleanly close out this slice, commit the code, and prepare the environment for the next engineer.

Instructions:
1. Audit. Review the Acceptance Criteria in HANDOFF.md. Did you complete all of them? Identify any stubs, hacks, or technical debt you introduced. Be honest — silent debt is the most expensive kind.
2. Commit. Commit your changes on a feature branch named feature/<slice-name>. The commit message must be concise and reference the completed slice. Push the branch to the remote and open a Pull Request to main with a body generated from this audit.
3. Update Changelog. Append a single, concise paragraph to CHANGELOG.md summarizing what was built in this slice and noting any unresolved issues or stubs you left behind.
4. Draft Next Handoff. Overwrite HANDOFF.md for the next engineer. You must include:
   - The goal for the next logical slice of work.
   - Clear Acceptance Criteria for that next slice.
   - Any context or warnings the next engineer needs based on the work you just completed (for example, "I left a stub in auth.ts that you will need to implement").

Do not write feature code during this phase. Your only outputs are git commands, the PR body, and the updated markdown files.`;

export const VERIFIER_PROMPT = `You are a Verifier. You did not write this code. Your job is to check whether the diff in this Pull Request actually satisfies the Acceptance Criteria in HANDOFF.md — nothing more, nothing less.

Instructions:
1. Read ONLY the PR diff and HANDOFF.md. Do not read the rest of the codebase unless absolutely necessary to evaluate a criterion.
2. For each item in the Acceptance Criteria, return PASS or FAIL with one sentence of evidence pointing to a file and line number.
3. Flag any change in the diff that is OUT OF SCOPE relative to the slice (refactors, new dependencies, unrelated edits).
4. Return a final verdict: PASS (all criteria met, no out-of-scope changes), CONDITIONAL PASS (criteria met but minor out-of-scope changes), or FAIL (one or more criteria unmet).

Do not suggest fixes. Do not write code. Your output is a verdict report.`;

export const PRACTICES = [
  {
    title: "Branch-per-slice with auto-PR",
    body:
      "Have the agent commit to a feature branch and open a PR to main, even if you are the only reviewer. The PR body is generated from the closeout audit. Adds 30 seconds, buys auditability and a one-click revert if the slice is hallucinated.",
  },
  {
    title: "Context budgets",
    body:
      "Cap the number of files an agent may read to complete a slice (start at five). Forces the agent to stay in its lane and surfaces scope creep early — if it needs to read more, it has to declare why.",
  },
  {
    title: "Architecture Decision Records",
    body:
      "If agents keep relitigating the same technical choice, freeze the decision in a tiny docs/adr/ file. Agents cite ADRs; they do not change them without explicit permission.",
  },
  {
    title: "Forced honesty in closeout",
    body:
      "The closeout prompt must require the agent to declare stubs, skipped criteria, and uncertainty. Without this, silent debt compounds and the next agent inherits broken assumptions.",
  },
] as const;

/* ─────────────────────────────────────────────────────────────────────────── */
/* BUILD & VERIFY — TWO-LLM WORKFLOW                                          */
/* The Builder ships code; a different LLM, in a clean context, reads only    */
/* the diff and HANDOFF.md and returns a verdict before the next slice runs.  */
/* ─────────────────────────────────────────────────────────────────────────── */

export const BUILD_VERIFY_STAGES = [
  {
    tag: "A",
    actor: "Builder LLM",
    role: "Executes the slice",
    body:
      "Reads PROJECT.md and HANDOFF.md. Writes code that satisfies the Acceptance Criteria. Runs the Closeout prompt: commits to a feature branch, opens a PR, appends to CHANGELOG.md, and drafts the next HANDOFF.md.",
  },
  {
    tag: "B",
    actor: "Verifier LLM",
    role: "Independent check",
    body:
      "A different model in a fresh context window. Reads ONLY the PR diff and HANDOFF.md. Returns PASS, CONDITIONAL PASS, or FAIL with one line of evidence per Acceptance Criterion. Does not write code.",
  },
  {
    tag: "C",
    actor: "Roy (gatekeeper)",
    role: "Merges or returns",
    body:
      "Reviews the Verifier's verdict. PASS → merge to main and run the next Builder. FAIL → reopen the slice and send the verdict back to the Builder. CONDITIONAL PASS → decide whether to merge with a follow-up ticket or revise.",
  },
] as const;

export const BUILD_VERIFY_PRINCIPLES = [
  {
    title: "Different model, not just different context",
    body:
      "Use a different LLM family for the Verifier than the Builder (e.g., Builder = Claude, Verifier = GPT, or vice versa). Different training distributions catch different failure modes. Same-model verification mostly rubber-stamps the Builder's mistakes.",
  },
  {
    title: "Clean context window — always",
    body:
      "The Verifier must boot with no prior conversation, no prior slice memory, no scratchpad. It reads only the diff and HANDOFF.md. This is the single most important rule; without it, the Verifier inherits the Builder's biases.",
  },
  {
    title: "Diff-only reading",
    body:
      "The Verifier is forbidden from reading the rest of the codebase unless evaluating a specific Acceptance Criterion requires it. This caps cost and forces the verdict to be grounded in what the slice actually changed.",
  },
  {
    title: "Verdict, not advice",
    body:
      "The Verifier returns PASS / CONDITIONAL PASS / FAIL with evidence. It does NOT propose fixes, does NOT suggest refactors, and does NOT write code. Mixing roles destroys the independence that makes the check valuable.",
  },
] as const;

/**
 * BUILD_VERIFY_MARKDOWN
 * The drop-in markdown spec your team can paste into a repo as
 * `docs/build-and-verify.md`. Self-contained — explains the loop and includes
 * the Builder, Closeout, and Verifier prompts inline so a reader does not
 * need to bounce between files.
 */
export const BUILD_VERIFY_MARKDOWN = `# Build & Verify — Two-LLM Workflow

A disciplined loop for shipping with AI agents: one LLM writes the code,
a *different* LLM verifies it in a clean context window before the next
slice runs.

---

## Why two LLMs?

A Builder LLM is biased to claim success on its own work. A Verifier LLM in
a fresh context, reading only the diff, catches stubs, hallucinated calls,
out-of-scope changes, and silently skipped Acceptance Criteria that the
Builder will never report on itself.

The marginal cost is small. The marginal signal is high.

---

## The loop

\`\`\`
                  HANDOFF.md
                      │
                      ▼
   ┌───────────────────────────────────┐
   │  1. BUILDER LLM                   │
   │  Reads PROJECT.md + HANDOFF.md    │
   │  Writes code, runs tests          │
   │  Opens PR on feature/<slice>      │
   │  Updates CHANGELOG.md             │
   │  Drafts next HANDOFF.md           │
   └───────────────────────────────────┘
                      │
                      ▼  (PR opened)
   ┌───────────────────────────────────┐
   │  2. VERIFIER LLM   (different     │
   │     model, clean context)         │
   │  Reads ONLY the diff + HANDOFF.md │
   │  Returns PASS / COND. PASS / FAIL │
   │  with one line of evidence per    │
   │  Acceptance Criterion.            │
   └───────────────────────────────────┘
                      │
        ┌─────────────┼──────────────┐
        ▼             ▼              ▼
      PASS    CONDITIONAL PASS     FAIL
        │             │              │
   merge to main   decide:       reopen slice;
   run next       merge w/       send verdict
   Builder        follow-up      back to Builder
                  or revise
\`\`\`

---

## Roles

| Role          | Model                  | Reads                         | Writes                          |
|---------------|------------------------|-------------------------------|----------------------------------|
| Builder       | LLM A (e.g., Claude)   | PROJECT.md, HANDOFF.md, code  | Code, CHANGELOG.md, HANDOFF.md  |
| Verifier      | LLM B (e.g., GPT)      | PR diff, HANDOFF.md           | Verdict report only              |
| Gatekeeper    | Human (you)            | Verdict + diff                | Merge / reject / revise decision |

---

## Non-negotiable rules

1. **Different model families.** Builder and Verifier must come from different
   training distributions. Same-model verification mostly rubber-stamps the
   Builder's mistakes.
2. **Clean context window for the Verifier.** No prior conversation, no
   memory of past slices, no scratchpad. Boot fresh every time.
3. **Diff-only reading.** The Verifier may not browse the rest of the
   codebase unless evaluating a specific Acceptance Criterion requires it.
4. **Verdict, not advice.** The Verifier returns a verdict with evidence. It
   does not propose fixes, refactors, or new code. Mixing roles destroys the
   independence that makes this check valuable.
5. **One slice in flight at a time.** Do not run a new Builder until the
   previous slice has been merged or rejected. Parallel slices defeat the
   point of a serialized handoff.

---

## Builder prompt

\`\`\`
You are an execution-focused software engineer. Your sole objective is to
complete the specific slice of work defined in HANDOFF.md.

CRITICAL RULES:
1. No Planning. The planning phase is over. Do not suggest architectural
   changes, do not expand the scope, and do not write roadmaps. Your job is
   to write code that satisfies the Acceptance Criteria.
2. Strict Boundaries. Adhere strictly to the "Constraints & Anti-Goals" in
   HANDOFF.md. Do not touch files outside the scope of your current task.
3. Definition of Done. You are not finished until every item in the
   Acceptance Criteria is met. If you are blocked and cannot meet a
   criterion, you must stop and report the blockage; do not silently skip
   it or fake it.
4. Context Budget. Read only the files you need. If you find yourself
   reading more than five files to complete this task, stop and justify why
   before continuing.

Instructions:
1. Read PROJECT.md for high-level context.
2. Read HANDOFF.md to understand your specific task.
3. Execute the work.
4. When you believe you are done, verify your work against the Acceptance
   Criteria item by item.
\`\`\`

## Closeout prompt (run by the Builder when the slice is done)

\`\`\`
You have just completed a slice of work. Your task now is to cleanly close
out this slice, commit the code, and prepare the environment for the next
engineer.

Instructions:
1. Audit. Review the Acceptance Criteria in HANDOFF.md. Did you complete
   all of them? Identify any stubs, hacks, or technical debt you
   introduced. Be honest — silent debt is the most expensive kind.
2. Commit. Commit your changes on a feature branch named
   feature/<slice-name>. The commit message must be concise and reference
   the completed slice. Push the branch to the remote and open a Pull
   Request to main with a body generated from this audit.
3. Update Changelog. Append a single, concise paragraph to CHANGELOG.md
   summarizing what was built in this slice and noting any unresolved
   issues or stubs you left behind.
4. Draft Next Handoff. Overwrite HANDOFF.md for the next engineer. You
   must include:
   - The goal for the next logical slice of work.
   - Clear Acceptance Criteria for that next slice.
   - Any context or warnings the next engineer needs based on the work
     you just completed (for example, "I left a stub in auth.ts that you
     will need to implement").

Do not write feature code during this phase. Your only outputs are git
commands, the PR body, and the updated markdown files.
\`\`\`

## Verifier prompt (run by a DIFFERENT LLM in a CLEAN context)

\`\`\`
You are a Verifier. You did not write this code. Your job is to check
whether the diff in this Pull Request actually satisfies the Acceptance
Criteria in HANDOFF.md — nothing more, nothing less.

Inputs you will receive:
- The full PR diff.
- The current HANDOFF.md.

Instructions:
1. Read ONLY the PR diff and HANDOFF.md. Do not read the rest of the
   codebase unless absolutely necessary to evaluate a specific criterion.
2. For EACH item in the Acceptance Criteria, return PASS or FAIL with one
   sentence of evidence pointing to a file and line number from the diff.
3. Flag any change in the diff that is OUT OF SCOPE relative to the slice
   (refactors, new dependencies, unrelated edits, hidden TODOs, stubs that
   were not declared in the closeout audit).
4. Return a final verdict using exactly one of:
   - PASS              — all criteria met, no out-of-scope changes
   - CONDITIONAL PASS  — all criteria met, minor out-of-scope changes
   - FAIL              — one or more criteria unmet, OR significant
                         out-of-scope changes

Output format (markdown):

### Verdict
<PASS | CONDITIONAL PASS | FAIL>

### Acceptance Criteria
- [PASS|FAIL] Criterion 1 — evidence: <file:line>
- [PASS|FAIL] Criterion 2 — evidence: <file:line>
...

### Out-of-scope changes
- <file:line> — <one-line description>  (or "None observed")

### Notes for the gatekeeper
<2-4 sentences max. No fixes, no refactor suggestions, no new code.>

DO NOT propose code changes. DO NOT refactor. DO NOT write code.
\`\`\`

---

## Verifier verdict — PR comment template

Drop this into the PR as the Verifier's first comment:

\`\`\`markdown
## Verifier Report

**Model:** <name + version>
**Context:** clean (no prior slices loaded)
**Verdict:** <PASS | CONDITIONAL PASS | FAIL>

### Acceptance Criteria
- [PASS] <criterion> — evidence: \`src/api/routes.ts:42\`
- [FAIL] <criterion> — evidence: \`src/api/routes.ts:88\` (returns 500, not 200)

### Out-of-scope changes
- \`src/utils/logger.ts\` — refactored unrelated logging helper

### Notes for the gatekeeper
The endpoint is wired up but the error path is unhandled. Recommend FAIL
and return to Builder. Out-of-scope logger refactor should be split into
its own slice.
\`\`\`

---

## Operating cadence

1. **Open a slice.** Roy writes (or the previous Builder drafts) HANDOFF.md.
2. **Run the Builder.** Use Builder prompt + Closeout prompt.
3. **Run the Verifier.** Different model, clean context, Verifier prompt.
4. **Gatekeeper decides.** Merge, reject, or merge with follow-up.
5. **Move to next slice.** Only after the current PR is closed.

If the Verifier returns FAIL twice in a row on the same slice, escalate to
the gatekeeper for re-scoping. The slice itself may be wrong, not the
Builder's execution.
`;

/**
 * VERIFIER_PR_COMMENT
 * The literal markdown the Verifier agent should post as the first comment on
 * the Builder's PR. Designed to be copied as-is and filled in. Keep the
 * structure aggressive and the verdict line at the top so a human reviewer can
 * triage in two seconds.
 */
export const VERIFIER_PR_COMMENT = `## Verifier Report

**Model:** <name + version, e.g. gpt-5-thinking-2026-04>
**Context:** clean — no prior slices loaded
**Builder model:** <name + version, e.g. claude-sonnet-4.5-2026-03>
**Slice:** <slice name from HANDOFF.md>
**Verdict:** <PASS | CONDITIONAL PASS | FAIL>

---

### Acceptance Criteria

- [PASS] <criterion 1> — evidence: \`src/api/routes.ts:42\`
- [PASS] <criterion 2> — evidence: \`src/api/routes.ts:67\`
- [FAIL] <criterion 3> — evidence: \`src/api/routes.ts:88\` (returns 500 on empty body, criterion required 400)

### Out-of-scope changes

- \`src/utils/logger.ts\` — refactored unrelated logging helper (not in HANDOFF.md scope)
- \`package.json\` — added \`lodash\` dependency (not declared in slice)

_(or write "None observed" if the diff stays inside scope.)_

### Stubs / TODOs introduced

- \`src/api/controllers.ts:104\` — \`// TODO: handle pagination\` left undeclared in closeout audit

_(or "None observed".)_

### Notes for the gatekeeper

<2–4 sentences max. Describe WHAT is broken or out of scope, not HOW to fix it.
Example: "Endpoint is wired up but the empty-body error path is unhandled.
Recommend FAIL and return to Builder. The logger refactor and the new lodash
dependency should be split into their own slices.">

---

_Verifier rules: read only the diff and HANDOFF.md, return a verdict with
evidence, do not propose code changes, do not refactor, do not write code._
`;

/**
 * BUILDER_PR_DESCRIPTION
 * The literal markdown the Builder agent should put in the PR body when it
 * opens the PR for a completed slice. Mirrors the Verifier comment in shape so
 * the two sit next to each other and force a clean audit trail. The "Self-
 * audit" section is the most important part — it is what the Verifier and the
 * gatekeeper will compare the diff against.
 */
export const BUILDER_PR_DESCRIPTION = `## Builder PR — <slice name from HANDOFF.md>

**Builder model:** <name + version, e.g. claude-sonnet-4.5-2026-03>
**Branch:** \`feature/<slice-name>\`
**HANDOFF.md ref:** <commit SHA of HANDOFF.md the Builder worked against>

> One-paragraph summary of what this PR does, in plain language.
> Match the wording used in HANDOFF.md "Context" so the Verifier can map it
> directly to the slice that was assigned.

---

### Self-audit (against Acceptance Criteria)

- [x] <criterion 1> — implemented in \`src/api/routes.ts:42\`
- [x] <criterion 2> — implemented in \`src/api/routes.ts:67\`; covered by test \`tests/routes.test.ts:18\`
- [ ] <criterion 3> — NOT MET. Blocked by: <one sentence>. See "Declared stubs" below.

_(Mark every criterion. Do not silently skip. If blocked, say so here — do
not move on without flagging it.)_

### Scope of change

| File | Change | Why |
|---|---|---|
| \`src/api/routes.ts\` | Added POST /items endpoint | Required by criteria 1–2 |
| \`src/api/controllers.ts\` | Added \`createItem\` controller | Required by criterion 1 |
| \`tests/routes.test.ts\` | Added 3 unit tests | Required by criterion 2 |

_(One row per touched file. If a row is not directly justified by a
criterion or a constraint in HANDOFF.md, it is out of scope and should be
removed from this PR.)_

### Declared stubs / TODOs

- \`src/api/controllers.ts:104\` — \`// TODO: pagination\` — out of scope for
  this slice; should be picked up in next slice's HANDOFF.md.
- \`src/api/routes.ts:88\` — empty-body error path returns 500 instead of 400;
  blocked criterion 3, needs follow-up slice.

_(Every stub, hack, or piece of debt introduced by this slice MUST be
declared here. Silent debt is the most expensive kind. Write "None" only if
you genuinely introduced none.)_

### Out-of-scope changes

- None.

_(If you touched anything outside the slice — refactors, new dependencies,
unrelated edits — list them here and justify. The Verifier will flag them
either way; declaring them here is faster than getting a FAIL.)_

### Tests run

\`\`\`
$ pnpm test
... 14 passed, 0 failed
$ pnpm typecheck
... 0 errors
\`\`\`

### What the next Builder needs to know

- HANDOFF.md has been updated for the next slice (see commit \`<sha>\`).
- Watch for the stub at \`src/api/controllers.ts:104\` — pagination is
  expected as the next slice.

---

_Builder rules: scope is HANDOFF.md only, no planning, no out-of-scope
refactors, no silent debt. Every Acceptance Criterion is either checked off
or explicitly declared blocked above._
`;

/**
 * MODEL_PAIRINGS
 * A starter matrix of Builder ↔ Verifier combinations.
 *
 * IMPORTANT: This is a *living* recommendation, not gospel. Model quality
 * and behavior shift on a quarterly cadence. The point is the *principle* —
 * pair across training distributions and across reasoning styles — not the
 * specific brand names. Re-evaluate the table every ~3 months.
 *
 * The "tier" column is what your team should optimize for, not the brand.
 */
export const MODEL_PAIRINGS_FRESHNESS = "April 2026";

export const MODEL_PAIRINGS = [
  {
    tier: "Default",
    builder: "Claude (Sonnet/Opus class)",
    verifier: "GPT (frontier reasoning class)",
    rationale:
      "Strong code-writing model paired with a strong reasoning model from a different lab. Different training data and different RLHF priors mean the Verifier is unlikely to hallucinate the same way the Builder did. Best general-purpose pairing for production code.",
    cost: "Medium",
  },
  {
    tier: "Inverted default",
    builder: "GPT (frontier reasoning class)",
    verifier: "Claude (Sonnet/Opus class)",
    rationale:
      "Useful when the slice is reasoning-heavy (algorithms, edge-case logic). The Builder gets the reasoning model and the Verifier brings code-grounded scrutiny. Swap with the Default pairing depending on slice type.",
    cost: "Medium",
  },
  {
    tier: "Three-lab triangle",
    builder: "Claude or GPT",
    verifier: "Gemini (frontier class)",
    rationale:
      "Use Gemini as the Verifier when you want a third training distribution in the loop. Particularly valuable when both your team's preferred labs have shipped from similar data cuts. Reduces correlated failure modes.",
    cost: "Medium",
  },
  {
    tier: "Cost-controlled",
    builder: "Claude/GPT (frontier)",
    verifier: "Smaller frontier model from a different lab",
    rationale:
      "Verification is mostly a structured comparison task — it does not need the largest model. Pairing a frontier Builder with a smaller-but-different-lab Verifier captures most of the independence benefit at a fraction of the token cost.",
    cost: "Low",
  },
  {
    tier: "Local / privacy",
    builder: "Hosted frontier model",
    verifier: "Local model from a different family (e.g., Llama, Qwen)",
    rationale:
      "When the diff cannot leave your environment, run the Verifier locally on a different-family model. Quality drops vs. a frontier Verifier, but you preserve the cross-distribution check, which is the structural goal.",
    cost: "Variable",
  },
  {
    tier: "Anti-pattern",
    builder: "Model X",
    verifier: "Same model X (different prompt)",
    rationale:
      "DO NOT pair a model with itself. Same-distribution verification rubber-stamps the Builder's mistakes — the failure modes are correlated. Different prompts on the same model is not a substitute for a different model.",
    cost: "—",
    isAntiPattern: true,
  },
] as const;

/**
 * ESCALATION_RULE
 * What to do when a slice gets two consecutive Verifier FAILs.
 *
 * The framing is deliberate: a second FAIL is almost never a Builder problem —
 * it is a slice-definition problem. The default response is to STOP, freeze
 * the Builder, and re-scope the slice in HANDOFF.md. Swapping models or
 * scolding the Builder is what teams reach for first; it is also what burns
 * the most tokens for the least signal.
 */
export const ESCALATION_RULE = {
  rule: "Two consecutive FAILs on the same slice = freeze the slice, not the Builder.",
  premise:
    "A single FAIL is a Builder mistake. A second FAIL on the same slice is a slice-definition mistake. The Verifier is telling you the HANDOFF.md is ambiguous, the Acceptance Criteria are untestable, or the slice is too big — not that the Builder is bad. Treat the second FAIL as a hard stop, not a third attempt.",
  steps: [
    {
      n: "01",
      title: "Stop the Builder. Do not retry the slice.",
      body: "A third Builder attempt on the same HANDOFF.md will produce a third correlated failure. Close the second PR without merging. Tag it `escalated/<slice-name>` so you can find it later.",
    },
    {
      n: "02",
      title: "Read both Verifier reports side-by-side.",
      body: "Look for the same criterion failing twice, or two different criteria failing because of one underlying ambiguity. The pattern is the diagnosis. If the two reports disagree about what failed, the slice itself is under-specified.",
    },
    {
      n: "03",
      title: "Re-scope the slice in HANDOFF.md, do not re-prompt the Builder.",
      body: "Three honest options: (a) split the slice into two smaller slices, (b) tighten the Acceptance Criteria so they are individually testable, or (c) add a missing constraint the Builder kept inventing wrong. Commit the new HANDOFF.md as its own commit so the audit trail shows the re-scope.",
    },
    {
      n: "04",
      title: "Only after re-scoping, restart with a fresh Builder context.",
      body: "Use the same Builder model on the new HANDOFF.md — do not switch models to mask a slice-definition problem. If the same Builder still fails the re-scoped slice, then escalate to a human and treat it as a real engineering problem, not an agent problem.",
    },
  ],
  antiPatterns: [
    "Swapping the Builder model on the third attempt — masks the real defect.",
    "Letting the Verifier propose the fix — violates the independence rule and creates a feedback loop where the Verifier grades its own suggestions.",
    "Merging a CONDITIONAL PASS as if it were a PASS to avoid the escalation — the silent debt this creates is exactly the failure mode this whole framework was built to prevent.",
    "Treating the second FAIL as a Builder performance issue — it is almost always an upstream HANDOFF.md issue.",
  ],
} as const;

/**
 * INSTALL_STEPS — The five-step bootstrap for adopting the framework on a
 * repo that already has a codebase. Most teams fail at install, not workflow.
 * The honest order is: reverse-engineer PROJECT.md from the code, edit it
 * with the human-only context, sanity-check it with the Verifier, write a
 * tiny first slice, run a calibration cycle and update PROJECT.md based on
 * what surfaced.
 */
export const INSTALL_STEPS = [
  {
    n: "01",
    duration: "~15 min",
    actor: "Builder model · read-only",
    title: "Inventory pass — reverse-engineer PROJECT.md from the code",
    body: "Drop the Inventory prompt into your Builder tool (Codex/Cursor) and let it read the repo without writing any code. It produces a draft PROJECT.md grounded in what is actually in the repo — stack, architecture, conventions it can point to with file paths, and an explicit list of open questions for you. The output is a draft, not a finished document.",
  },
  {
    n: "02",
    duration: "~30 min",
    actor: "You — the highest-leverage step",
    title: "Edit PROJECT.md — fix Conventions, fill in Non-goals and Human-only context",
    body: "The draft will be ~70% right. You fix the Conventions section (the Builder spots patterns; only you know which ones are intentional vs. tech debt), fill in Non-goals (what the project deliberately does NOT do — the most important section and the one the Builder cannot infer), answer the Open Questions, and add a Human-only context section for business or regulatory constraints the code does not encode. Commit as `docs: bootstrap PROJECT.md`.",
  },
  {
    n: "03",
    duration: "~5 min",
    actor: "Verifier model · clean context",
    title: "Sanity-check PROJECT.md against the actual repo",
    body: "Open the Verifier in a fresh chat. Give it your edited PROJECT.md and a directory listing. Ask it to flag anything in PROJECT.md that contradicts the repo or appears unsupported by the code. This catches the case where you wrote down what you wished were true rather than what is true. Do not let the Verifier propose changes — only diagnoses.",
  },
  {
    n: "04",
    duration: "~15 min",
    actor: "You",
    title: "Write the first HANDOFF.md — pick a small, low-stakes slice",
    body: "Do not try to spec the backlog. Pick one slice that is small, well-defined, and low-stakes — a bug fix, a small endpoint, a test you have been meaning to write. The point of slice #1 is not to ship value, it is to prove the loop runs end-to-end on this repo. If you cannot write three crisp Acceptance Criteria, the slice is too big — pick a smaller one.",
  },
  {
    n: "05",
    duration: "~25 min",
    actor: "Full loop · calibration",
    title: "Run the first cycle — and treat it as a calibration run",
    body: "The first cycle will reveal everything you got wrong in PROJECT.md. The Builder will hit a convention you forgot to document; the Verifier will FAIL because Acceptance Criteria were ambiguous; the Closeout will admit it stubbed something because a constraint was not declared. That is the install completing, not failure. Update PROJECT.md based on what surfaced. Now you have a real PROJECT.md, written by reality rather than imagination.",
  },
] as const;

/**
 * INVENTORY_PROMPT — The one-off prompt that bootstraps PROJECT.md from an
 * existing codebase. It is a strict read-only Builder run; the agent must
 * not modify or "improve" any code. The point is documentation grounded in
 * evidence, with explicit "INSUFFICIENT EVIDENCE" markers anywhere the
 * agent had to guess.
 */
export const INVENTORY_PROMPT = `You are a senior engineer onboarding to an existing repository. Your only
job in this session is to produce a draft PROJECT.md by reading the
codebase. You will NOT write, modify, refactor, or "improve" any code.

Inputs you will read (in this order):
1. README.md (if present) and any docs/ folder
2. package.json / pyproject.toml / go.mod / Cargo.toml — whatever
   declares the stack and dependencies
3. The directory structure of src/ (or equivalent) — top two levels only
4. Up to 10 representative source files you select. Pick them to cover:
   - The entry point
   - One route/controller (if web)
   - One model/schema (if data)
   - One test file
   - The build/CI config

Produce a single PROJECT.md with these sections, and ONLY these sections:

  ## Purpose
  One paragraph. What does this project do, in plain language?

  ## Stack
  Languages, frameworks, package manager, runtime versions. Bullet list.

  ## Architecture
  3–5 sentences. How is the code organized? What are the main layers?

  ## Conventions
  What patterns appear repeatedly? (e.g., "controllers return Result<T,E>",
  "tests live next to source as *.test.ts", "no default exports").
  List only conventions you can point to with evidence in the code.

  ## Non-goals
  What this project deliberately does NOT do. Leave as a placeholder
  ("TBD — human to fill in") if not obvious from the code.

  ## Open questions for the human
  Anything you could not infer from the code. Be specific — "is X
  intentional or legacy?" not "tell me more about the project."

Rules:
- Cite a file path for every claim in Conventions and Architecture.
- If you cannot find evidence for a section, write "INSUFFICIENT EVIDENCE
  — human to fill in." Do not guess.
- Do not invent features, roadmaps, or future plans.
- Do not modify any file other than creating PROJECT.md.

Stop when PROJECT.md is written. Do not start any other work.
`;

/**
 * INSTALL_ANTI_PATTERNS — Two specific failure modes during install. Both
 * are tempting because they look productive; both poison the loop before it
 * starts.
 */
export const INSTALL_ANTI_PATTERNS = [
  {
    title: "Generate PROJECT.md, then immediately start shipping features",
    why: "Looks productive. Skips the boring step.",
    cost: "The undocumented conventions silently leak into Builder hallucinations from cycle 2 onward. Compounds badly across slices.",
  },
  {
    title: "Have the Builder fix code while it is writing PROJECT.md",
    why: "Why do two passes when you could do one?",
    cost: "The Builder will start refactoring opportunistically and you lose the ability to review the doc separately from the code changes. Two commits, two PRs, always.",
  },
] as const;
