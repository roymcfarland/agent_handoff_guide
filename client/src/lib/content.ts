/*
 * AGENT HANDOFF FRAMEWORK — CONTENT
 * Source of truth for all copy on the page. Keeping it here so the visual
 * components stay focused on layout and the prose stays editable in one place.
 * Design philosophy is "The Engineer's Notebook" — every string should sound like
 * a working spec, not marketing copy.
 */

/* ─────────────────────────────────────────────────────────────────────────── */
/* SITE STRUCTURE — 6 sections                                                 */
/* Best Practices and Moonshots have been cut as standalone sections.          */
/* Prompts are consolidated into a single library organized by scenario.       */
/* ─────────────────────────────────────────────────────────────────────────── */

export const SECTIONS = [
  { id: "overview", label: "Overview", number: "01" },
  { id: "diagnosis", label: "Diagnosis", number: "02" },
  { id: "schema", label: "Document Schema", number: "03" },
  { id: "install", label: "Install on Repo", number: "04" },
  { id: "prompts", label: "Prompt Library", number: "05" },
  { id: "build-verify", label: "Build & Verify", number: "06" },
  { id: "phase-2", label: "Operate the framework", number: "07" },
  { id: "meta-prs", label: "META-PRs", number: "08" },
] as const;

export const FAILURE_MODES = [
  {
    title: "Committing directly to main",
    body: "Every handoff lands unreviewed code on main. No diff surface, no CI gate, no easy revert. The agent is incentivized to make it pass locally rather than make it correct, because there is no PR conversation.",
  },
  {
    title: "One document doing five jobs",
    body: "When the handoff doc is roadmap, task list, status log, architectural notes, and next-builder briefing all at once, every new agent re-reads the entire history and wastes context relitigating decisions that are already settled.",
  },
  {
    title: "Weak persona priming",
    body: "Telling an agent it is a 'professional software engineer' does not constrain behavior. A useful prompt tells the agent what NOT to do — do not refactor outside scope, do not add dependencies, do not expand the plan.",
  },
  {
    title: "No definition of done",
    body: "Without an explicit acceptance contract, the agent decides when it is done. That is where scope creep and 'I also went ahead and...' come from.",
  },
  {
    title: "Self-graded handoffs",
    body: "Agents are biased to claim success on their own work. Without a forced honesty step, the next agent inherits silent debt — stubs, hacks, and skipped criteria that were never declared.",
  },
  {
    title: "Planning vs. building drift",
    body: "Agents drift into planning mode when the task is ambiguous, the doc reads like a brainstorm, or there is no explicit BUILD-ONLY framing with a stop condition.",
  },
] as const;

/* ─────────────────────────────────────────────────────────────────────────── */
/* DOCUMENT SCHEMA                                                             */
/* ─────────────────────────────────────────────────────────────────────────── */

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

/* ─────────────────────────────────────────────────────────────────────────── */
/* INSTALL FLOW                                                                */
/* ─────────────────────────────────────────────────────────────────────────── */

export const INSTALL_STEPS = [
  {
    n: "01",
    duration: "~15 min",
    actor: "Builder model · read-only",
    title: "Inventory pass — reverse-engineer PROJECT.md from the code",
    body: "Drop the Inventory prompt into your Builder tool (Codex/Cursor) and let it read the repo without writing any code. It produces a draft PROJECT.md grounded in what is actually in the repo — stack, architecture, conventions it can point to with file paths, and an explicit list of open questions for you. The output is a draft, not a finished document.",
    promptRef: "inventory",
  },
  {
    n: "02",
    duration: "~30 min",
    actor: "You — the highest-leverage step",
    title:
      "Edit PROJECT.md — fix Conventions, fill in Non-goals and Human-only context",
    body: "The draft will be ~70% right. You fix the Conventions section (the Builder spots patterns; only you know which ones are intentional vs. tech debt), fill in Non-goals (what the project deliberately does NOT do — the most important section and the one the Builder cannot infer), answer the Open Questions, and add a Human-only context section for business or regulatory constraints the code does not encode. Commit as `docs: bootstrap PROJECT.md`.",
    promptRef: "edit-pass",
  },
  {
    n: "03",
    duration: "~5 min",
    actor: "Verifier model · clean context",
    title: "Sanity-check PROJECT.md against the actual repo",
    body: "Open the Verifier in a fresh chat. Give it your edited PROJECT.md and a directory listing. Ask it to flag anything in PROJECT.md that contradicts the repo or appears unsupported by the code. This catches the case where you wrote down what you wished were true rather than what is true. Do not let the Verifier propose changes — only diagnoses.",
    promptRef: "sanity",
  },
  {
    n: "04",
    duration: "~15 min",
    actor: "You (optionally with scoping prompt)",
    title: "Write the first HANDOFF.md — pick a small, low-stakes slice",
    body: "Do not try to spec the backlog. Pick one slice that is small, well-defined, and low-stakes — a bug fix, a small endpoint, a test you have been meaning to write. The point of slice #1 is not to ship value, it is to prove the loop runs end-to-end on this repo. If you cannot write three crisp Acceptance Criteria, the slice is too big — pick a smaller one.",
    promptRef: "first-handoff",
  },
  {
    n: "05",
    duration: "~25 min",
    actor: "Full loop · calibration",
    title: "Run the first cycle — and treat it as a calibration run",
    body: "The first cycle will reveal everything you got wrong in PROJECT.md. The Builder will hit a convention you forgot to document; the Verifier will FAIL because of an Acceptance Criterion you wrote too loosely. That is the install working. Run the Calibration Debrief prompt at the end to capture the doc deltas cleanly.",
    promptRef: "calibration",
  },
] as const;

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

/* ─────────────────────────────────────────────────────────────────────────── */
/* PROMPT LIBRARY — consolidated, grouped by execution scenario                */
/* Every prompt or PR template on the site is defined as a LibraryPrompt so    */
/* the page can render them as one coherent, copy-pasteable inventory.         */
/* ─────────────────────────────────────────────────────────────────────────── */

export type LibraryPromptKind = "prompt" | "template" | "checklist";
export type LibraryPromptActor = "builder" | "verifier" | "human";

export interface LibraryPrompt {
  id: string;
  order: string;
  kind: LibraryPromptKind;
  actor: LibraryPromptActor;
  filename: string;
  title: string;
  whenToUse: string;
  context: string;
  body: string;
  toastLabel: string;
}

/* --- PROMPT BODIES ------------------------------------------------------- */

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

export const EDIT_PASS_CHECKLIST = `# PROJECT.md · Human Edit Pass Checklist

You are the only person who can turn the Inventory draft into a real
PROJECT.md. This is not an LLM prompt — it is the checklist you run
against the draft before you commit it. Budget ~30 minutes.

The draft will be roughly 70% right. The remaining 30% is the content
only a human can supply or validate.

---

## 1. Evidence audit — spot-check 5 claims

Open the draft and pick five random claims in the Architecture or
Conventions sections. For each one:

  [ ] Open the cited file.
  [ ] Confirm the pattern or claim is actually present.
  [ ] If it is NOT present, delete the claim or rewrite with real evidence.

If more than one of the five claims fails this check, re-run the
Inventory prompt with a stricter "quote the relevant code, not just the
file path" constraint.

---

## 2. Stack versions — spot-check 3 dependencies

Open \`package.json\` (or equivalent) and confirm that three randomly-
picked dependencies in the draft's Stack section match the versions the
repo actually pins. Version hallucination is the single most common
Inventory failure mode.

  [ ] Dependency 1 matches.
  [ ] Dependency 2 matches.
  [ ] Dependency 3 matches.

---

## 3. Non-goals — fill in at least three

Non-goals are what the project deliberately does NOT do. The Inventory
agent almost never writes these — it cannot infer them from code.

Fill in at least three real non-goals, even as one-liners. Candidates:

  [ ] Tenancy — single-tenant only, or multi-tenant?
  [ ] i18n — English-only, or localized?
  [ ] Mobile — web-only, or a mobile client in scope?
  [ ] ORM stance — intentionally raw SQL? Banned libraries?
  [ ] Dependency philosophy — liberal, conservative, or any banned packages?

Write what is true today. If you change your mind in six months, you can
edit. What you cannot do is leave "TBD" and expect a future Builder to
not assume a default.

---

## 4. Human-only context — add one paragraph

Add a new section that the Inventory pass could never have written.
3–5 sentences covering any of:

  [ ] Business or regulatory constraints (FDA, HIPAA, SOC 2, compliance)
  [ ] Who the users are and their technical sophistication
  [ ] Commercial model (SaaS, internal tool, white-label, client work)
  [ ] Known upcoming changes that should influence architecture decisions
  [ ] People context — who reviews PRs, who owns auth, who owns infra

A useful test: "If a new engineer asked me to explain this project in 30
seconds at dinner, what would I say?" That is this paragraph.

---

## 5. Open questions — resolve or archive them

The Inventory pass surfaced open questions. Do ONE of the following to
every one of them before committing:

  [ ] Answer it inline in the relevant section (e.g., Non-goals, Auth,
      Deployment) and DELETE the question from the Open Questions list.
  [ ] Convert it to a tracked action item (e.g., "planned HANDOFF slice").
  [ ] Move it to a "Resolved open questions" footer with the answer.

Answered questions MUST NOT remain in the "Open questions" list. Leaving
them there makes the next Builder uncertain about which are current.

---

## 6. Commit discipline

  [ ] The diff contains ONLY PROJECT.md. No stray IDE files, no
      formatter reflows on unrelated files.
  [ ] Branch is named \`docs/bootstrap-project-md\` (or similar \`docs/\`
      prefix).
  [ ] Commit title starts with \`docs: \`.
  [ ] Commit body summarizes what you added in the edit pass —
      specifically Non-goals, Human-only context, and any resolved
      open questions.
  [ ] Open a PR to \`main\`, merge yourself. No Verifier needed — this
      is a human-authored doc.
  [ ] Tag the merge commit \`install-v1\`.

---

Only after all six sections are checked: proceed to Step 03 (Verifier
sanity check) of the install.
`;

export const VERIFIER_SANITY_PROMPT = `You are a Verifier. You did not write this document. Your only job in
this session is to audit the attached PROJECT.md against the actual
repository and flag anything in it that is wrong, unsupported, or
contradicted by the code.

You are NOT here to propose edits, rewrite sections, or "improve" the
document. You diagnose; you do not fix.

---

Inputs you will read:
1. The full current contents of PROJECT.md (attached or pasted below).
2. The repository directory listing (top 2 levels of src/ plus the root).
3. Up to 5 source files you may request by name if a specific claim
   needs to be checked against code.

---

Produce a single audit report with these sections, and ONLY these
sections:

### Summary
One line. One of:
- CLEAN                — no issues found.
- MINOR ISSUES         — factual drift, typos, small contradictions.
- MAJOR ISSUES         — unsupported claims, structural problems,
                         or PROJECT.md describes code that does not exist.

### Issues — grouped by severity

For each issue, use this exact format:

- [MAJOR|MINOR] <one-line description>
  - Claim in PROJECT.md: "<direct quote>"
  - Evidence: <file:line> OR "no evidence found in repo"
  - Why this matters: <one sentence>

### Sections that are under-specified
List PROJECT.md sections that are present but too thin to be useful to
a future Builder (e.g., empty "Non-goals", vague "Architecture",
placeholder "TBD"s). One bullet per section.

### Sections that look good
Short list of sections where the claims were well-grounded. This is
signal, not flattery — the human needs to know what to keep stable.

---

Rules:
- Do NOT propose rewrites. If a claim is wrong, say so and stop.
- Do NOT suggest new sections, new conventions, or new non-goals.
- Do NOT write code, do NOT touch any file other than producing this
  report.
- If you cannot find evidence for a PROJECT.md claim, say
  "no evidence found in repo" — do not speculate.
- You have a clean context window. If you do not know something, say
  so; do not guess from training data.

Stop when the audit is written. Do not start any other work.
`;

export const FIRST_HANDOFF_PROMPT = `You are a scoping assistant. Your job is to help the human write the
first HANDOFF.md for this repository — a small, low-stakes calibration
slice whose purpose is to prove the loop runs end-to-end, NOT to ship
major feature value.

You will NOT write code. You will NOT pick the slice for the human.
You will ask structured scoping questions, then produce a HANDOFF.md
draft from the human's answers.

---

Step 1 — Ask the human these questions, ONE AT A TIME, in order.
Wait for an answer before asking the next:

  1. What is the smallest real piece of work you would be comfortable
     merging to main this week? One sentence.
  2. Which files would need to change? List them. If more than 5, the
     slice is too big — ask the human to shrink it.
  3. What does "done" look like for this slice, observable from outside
     the code? (e.g., "endpoint returns 200 with correct JSON",
     "test tests/foo.test.ts passes", "banner appears in app shell").
  4. What must NOT be touched during this slice? (Anti-goals.)
  5. Is there a known blocker, stub, or piece of tech debt the Builder
     should be warned about?

Step 2 — Validate the scope. If ANY of these is true, stop and ask the
human to re-scope the slice before proceeding:

  - More than 5 Acceptance Criteria emerged from question 3.
  - More than 5 files are touched.
  - The slice mentions "while I'm at it, also..." — that is a second
    slice, not part of this one.
  - "Done" cannot be observed without reading the agent's code (e.g.,
    "the code should feel cleaner" is not a valid criterion).

Step 3 — ONLY after the human approves the scope, produce a HANDOFF.md
draft that follows this exact shape:

\`\`\`
# Current Slice: <slice name>

## Context
<1–2 sentences tying the slice to PROJECT.md. What is it, why now?>

## Acceptance Criteria (Definition of Done)
The agent MUST complete ALL of the following before committing:
- [ ] <observable, testable criterion 1>
- [ ] <observable, testable criterion 2>
- [ ] <observable, testable criterion 3>
  (Max 5 criteria. Each must be checkable from the diff + repo.)

## Constraints & Anti-Goals
- DO NOT touch <explicit paths or systems>
- DO NOT add new npm/pypi/go dependencies
- DO NOT refactor unrelated code
- DO NOT expand the slice

## Starting Point
- Relevant files: <paths>
- Known issues: <stubs, known bugs, warnings for the Builder>
\`\`\`

---

Rules:
- You may ask follow-up questions ONLY to tighten the scope, never to
  expand it.
- If the human describes a slice larger than 5 Acceptance Criteria or
  5 files, REJECT it and ask them to split it.
- Do NOT suggest additional features, refactors, or "nice-to-haves."
- Do NOT produce the HANDOFF.md until the human has answered all 5
  scoping questions and you have validated the scope is small enough.

The first slice exists to prove the loop runs. Tiny is correct.
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
META-PR EXCEPTION: If HANDOFF.md itself is one of the files being changed by this PR, do NOT use the changed HANDOFF.md as the scope document. Instead, treat the Builder Brief / Acceptance Criteria pasted into the PR description as the authoritative scope. If the PR description does not contain a Builder Brief, switch to the dedicated META-PR Verifier prompt and stop here.
Instructions:
1. Read ONLY the PR diff and HANDOFF.md. Do not read the rest of the codebase unless absolutely necessary to evaluate a criterion.
2. For each item in the Acceptance Criteria, return PASS or FAIL with one sentence of evidence pointing to a file and line number.
3. Flag any change in the diff that is OUT OF SCOPE relative to the slice (refactors, new dependencies, unrelated edits).
4. Return a final verdict: PASS (all criteria met, no out-of-scope changes), CONDITIONAL PASS (criteria met but minor out-of-scope changes), or FAIL (one or more criteria unmet).
Do not suggest fixes. Do not write code. Your output is a verdict report.`;

export const CALIBRATION_DEBRIEF_PROMPT = `You just completed the first slice of work on this repository using the
Agent Handoff Framework. This was a calibration run — the point was not
to ship value, it was to reveal everything that was wrong or under-
specified in PROJECT.md.

Your job in this session is to produce a list of PROPOSED edits to
PROJECT.md based on what surfaced during the slice. You will NOT edit
PROJECT.md directly. You will NOT write code. You will produce a diff-
style proposal the human can review, approve, and apply.

---

Inputs you will read:
1. The current PROJECT.md (before any edits).
2. HANDOFF.md for the slice that was just completed.
3. The git diff of the slice that was merged (or the PR body).
4. The Verifier report for that slice (PASS / CONDITIONAL PASS / FAIL).

---

For every one of the following questions, produce a finding in the
format shown. If the answer is "nothing to change", say so explicitly —
do not invent findings.

### 1. Conventions that were hit but not documented
Did you (the Builder) rely on a convention while writing the slice that
was NOT in PROJECT.md's Conventions section? Examples: naming patterns,
error-handling patterns, test colocation rules, import ordering.

FINDING FORMAT:
  - [ADD to Conventions] "<one-line convention statement>"
    - Evidence from this slice: <file:line>
    - Why it matters: <one sentence>

### 2. Non-goals that were almost violated
Did you nearly do something that PROJECT.md should have forbidden but
didn't? (A refactor you almost started, a dependency you almost added,
a pattern you almost introduced.)

FINDING FORMAT:
  - [ADD to Non-goals] "<one-line non-goal statement>"
    - Near-miss from this slice: <describe what you almost did>

### 3. Acceptance Criteria that turned out to be unobservable
Did the Verifier FAIL a criterion because it was written in a way that
could not be checked from the diff? The criterion is not the problem —
the Acceptance Criteria template in PROJECT.md (or the first-handoff
guidance) is the problem.

FINDING FORMAT:
  - [UPDATE HANDOFF guidance] "<one-line rule about writing criteria>"
    - Criterion that failed observability: "<direct quote>"

### 4. Stack or architecture claims that were wrong
Did anything in PROJECT.md's Stack or Architecture section turn out to
be inaccurate once you actually touched the code?

FINDING FORMAT:
  - [CORRECT in Stack/Architecture] "<what was wrong>" → "<what is true>"
    - Evidence: <file:line>

### 5. Human-only context that was missing
Was there a business, regulatory, or people-level fact that would have
helped you avoid a wrong turn during the slice, which PROJECT.md does
not capture?

FINDING FORMAT:
  - [ADD to Human-only context] "<one-sentence fact>"
    - Why it would have helped: <one sentence>

---

Output shape:

### Summary
<One line: number of proposed edits, severity distribution.>

### Proposed edits (in order)
<Use the FINDING FORMAT above, grouped by section.>

### No-change zones
<PROJECT.md sections that came through the slice cleanly and do not
need edits.>

---

Rules:
- You are a PROPOSER, not an editor. Do not produce the edited
  PROJECT.md yourself.
- Do not propose edits that are not grounded in something that happened
  during this slice.
- If a section does not need changes, say so explicitly.
- Be specific: cite file:line from the diff, or quote the criterion
  text, or name the convention.
- Do not recommend running the next slice, requesting more context, or
  writing code. Produce the diff proposal and stop.
`;

/* --- PR TEMPLATES -------------------------------------------------------- */

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

/* --- LIBRARY INDEX — grouped by execution scenario ------------------------ */

export const PROMPT_LIBRARY: ReadonlyArray<{
  scenario: string;
  scenarioTag: string;
  cadence: string;
  intro: string;
  items: LibraryPrompt[];
}> = [
  {
    scenario: "Fresh install — one time, per repo",
    scenarioTag: "INSTALL",
    cadence: "Run once, in order, when bringing a repo into the framework.",
    intro:
      "These four prompts walk you through the 90-minute install of the framework onto a codebase that already exists. Execute them top-to-bottom; do not skip the human Edit Pass — it is the highest-leverage step in the whole install.",
    items: [
      {
        id: "inventory",
        order: "00",
        kind: "prompt",
        actor: "builder",
        filename: "prompt-00-inventory.md",
        title: "Inventory — reverse-engineer PROJECT.md",
        whenToUse:
          "Run first. Read-only pass over the repo to produce a draft PROJECT.md.",
        context:
          "Drop into Codex or Cursor at the start of install. Agent is forbidden from writing code.",
        body: INVENTORY_PROMPT,
        toastLabel: "Inventory prompt copied",
      },
      {
        id: "edit-pass",
        order: "01",
        kind: "checklist",
        actor: "human",
        filename: "edit-pass-checklist.md",
        title: "Edit Pass Checklist — you, not the LLM",
        whenToUse:
          "Run immediately after Inventory. The draft is ~70% right; this checklist finishes the other 30%.",
        context:
          "This is a human checklist, not an LLM prompt. Keep it open alongside the draft PROJECT.md and check boxes as you go.",
        body: EDIT_PASS_CHECKLIST,
        toastLabel: "Edit Pass checklist copied",
      },
      {
        id: "sanity",
        order: "02",
        kind: "prompt",
        actor: "verifier",
        filename: "prompt-02-project-md-sanity.md",
        title: "PROJECT.md Sanity Check — Verifier, clean context",
        whenToUse:
          "After your Edit Pass. Ask a different LLM, in a clean chat, to audit the doc against the repo.",
        context:
          "Paste the edited PROJECT.md and a directory listing into a fresh Verifier session. Allow it to diagnose, never to rewrite.",
        body: VERIFIER_SANITY_PROMPT,
        toastLabel: "PROJECT.md sanity prompt copied",
      },
      {
        id: "first-handoff",
        order: "03",
        kind: "prompt",
        actor: "human",
        filename: "prompt-03-first-handoff-scoping.md",
        title: "First HANDOFF.md — scoping assistant",
        whenToUse:
          "Optional scoping aid when you write the first HANDOFF.md. Forces a small, observable slice.",
        context:
          "The assistant asks you five scoping questions, validates scope, and only then drafts the HANDOFF.md. It will refuse a slice with more than 5 criteria or 5 files.",
        body: FIRST_HANDOFF_PROMPT,
        toastLabel: "First HANDOFF prompt copied",
      },
    ],
  },
  {
    scenario: "Recurring loop — every slice",
    scenarioTag: "LOOP",
    cadence:
      "Run in order for each slice. Same Builder session for 04 and 05; different LLM, fresh context, for 06.",
    intro:
      "These are the three prompts your team uses on every slice once the install is complete. The Builder and Closeout are the same session. The Verifier is a separate model in a clean context window.",
    items: [
      {
        id: "builder",
        order: "04",
        kind: "prompt",
        actor: "builder",
        filename: "prompt-04-builder.md",
        title: "Builder — executes the slice",
        whenToUse:
          "Open each slice with this. Agent reads PROJECT.md and HANDOFF.md, writes code, runs tests.",
        context:
          "Builder session. Do not allow the agent to replan or expand scope. The Acceptance Criteria in HANDOFF.md are the contract.",
        body: BUILDER_PROMPT,
        toastLabel: "Builder prompt copied",
      },
      {
        id: "closeout",
        order: "05",
        kind: "prompt",
        actor: "builder",
        filename: "prompt-05-closeout.md",
        title: "Closeout — honest self-audit, next HANDOFF.md",
        whenToUse:
          "Run immediately after the Builder finishes. Same session, same context.",
        context:
          "Forces declaration of stubs, skipped criteria, and debt. Also drafts the next slice's HANDOFF.md. No feature code during this phase.",
        body: CLOSEOUT_PROMPT,
        toastLabel: "Closeout prompt copied",
      },
      {
        id: "verifier",
        order: "06",
        kind: "prompt",
        actor: "verifier",
        filename: "prompt-06-verifier.md",
        title: "Verifier — independent check on the PR",
        whenToUse:
          "After the Builder opens the PR. A DIFFERENT LLM, in a CLEAN context window.",
        context:
          "Reads only the diff and HANDOFF.md. Returns PASS / CONDITIONAL PASS / FAIL with evidence. Does not propose fixes.",
        body: VERIFIER_PROMPT,
        toastLabel: "Verifier prompt copied",
      },
      {
        id: "builder-pr",
        order: "PR-A",
        kind: "template",
        actor: "builder",
        filename: "builder-pr-description.md",
        title: "Builder PR description — fill-in template",
        whenToUse:
          "Paste into the PR body when the Builder opens the PR. Fill in the self-audit, scope-of-change, and declared stubs.",
        context:
          "This is what the Verifier and gatekeeper will compare the diff against. Silent debt left out of this template is the most expensive kind.",
        body: BUILDER_PR_DESCRIPTION,
        toastLabel: "Builder PR description copied",
      },
      {
        id: "verifier-pr",
        order: "PR-B",
        kind: "template",
        actor: "verifier",
        filename: "verifier-report.md",
        title: "Verifier PR comment — fill-in template",
        whenToUse:
          "The Verifier posts this as the first comment on the PR, with the verdict line at the top.",
        context:
          "Mirrors the Builder PR description so a human can compare claim against verdict in one scan. No fixes, no refactors.",
        body: VERIFIER_PR_COMMENT,
        toastLabel: "Verifier PR-comment template copied",
      },
    ],
  },
  {
    scenario: "Recovery — first cycle or after trouble",
    scenarioTag: "RECOVERY",
    cadence:
      "Run at the end of the first install cycle, or any time PROJECT.md has drifted from reality.",
    intro:
      "These prompts close the loop back to PROJECT.md. The Calibration Debrief runs at the end of the first full cycle — its output is the second, smaller PROJECT.md commit that reflects what you learned in cycle #1.",
    items: [
      {
        id: "calibration",
        order: "07",
        kind: "prompt",
        actor: "builder",
        filename: "prompt-07-calibration-debrief.md",
        title: "Calibration Debrief — propose PROJECT.md edits",
        whenToUse:
          "Run at the end of the first slice's cycle. Produces a structured proposal, not a rewrite.",
        context:
          "The Builder is a PROPOSER here, not an editor. It reads PROJECT.md, HANDOFF.md, the merged diff, and the Verifier report — and returns a diff-style list of proposed doc edits.",
        body: CALIBRATION_DEBRIEF_PROMPT,
        toastLabel: "Calibration Debrief prompt copied",
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────── */
/* BUILD & VERIFY — TWO-LLM WORKFLOW (concept section only; prompts live in    */
/* the Prompt Library above)                                                   */
/* ─────────────────────────────────────────────────────────────────────────── */

export const BUILD_VERIFY_STAGES = [
  {
    tag: "A",
    actor: "Builder LLM",
    role: "Executes the slice",
    body: "Reads PROJECT.md and HANDOFF.md. Writes code that satisfies the Acceptance Criteria. Runs the Closeout prompt: commits to a feature branch, opens a PR, appends to CHANGELOG.md, and drafts the next HANDOFF.md.",
  },
  {
    tag: "B",
    actor: "Verifier LLM",
    role: "Independent check",
    body: "A different model in a fresh context window. Reads ONLY the PR diff and HANDOFF.md. Returns PASS, CONDITIONAL PASS, or FAIL with one line of evidence per Acceptance Criterion. Does not write code.",
  },
  {
    tag: "C",
    actor: "You (gatekeeper)",
    role: "Merges or returns",
    body: "Reviews the Verifier's verdict. PASS → merge to main and run the next Builder. FAIL → reopen the slice and send the verdict back to the Builder. CONDITIONAL PASS → decide whether to merge with a follow-up ticket or revise.",
  },
] as const;

export const BUILD_VERIFY_PRINCIPLES = [
  {
    title: "Different model, not just different context",
    body: "Use a different LLM family for the Verifier than the Builder (e.g., Builder = Claude, Verifier = GPT, or vice versa). Different training distributions catch different failure modes. Same-model verification mostly rubber-stamps the Builder's mistakes.",
  },
  {
    title: "Clean context window — always",
    body: "The Verifier must boot with no prior conversation, no prior slice memory, no scratchpad. It reads only the diff and HANDOFF.md. This is the single most important rule; without it, the Verifier inherits the Builder's biases.",
  },
  {
    title: "Diff-only reading",
    body: "The Verifier is forbidden from reading the rest of the codebase unless evaluating a specific Acceptance Criterion requires it. This caps cost and forces the verdict to be grounded in what the slice actually changed.",
  },
  {
    title: "Verdict, not advice",
    body: "The Verifier returns PASS / CONDITIONAL PASS / FAIL with evidence. It does NOT propose fixes, does NOT suggest refactors, and does NOT write code. Mixing roles destroys the independence that makes the check valuable.",
  },
] as const;

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

/* ─────────────────────────────────────────────────────────────────────────── */
/* BUILD & VERIFY — DROP-IN MARKDOWN SPEC                                      */
/* Self-contained doc teams can paste into a repo as docs/build-and-verify.md. */
/* ─────────────────────────────────────────────────────────────────────────── */

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

## Operating cadence

1. **Open a slice.** You write (or the previous Builder drafts) HANDOFF.md.
2. **Run the Builder.** Use Builder prompt + Closeout prompt.
3. **Run the Verifier.** Different model, clean context, Verifier prompt.
4. **Gatekeeper decides.** Merge, reject, or merge with follow-up.
5. **Move to next slice.** Only after the current PR is closed.

If the Verifier returns FAIL twice in a row on the same slice, escalate to
the gatekeeper for re-scoping. The slice itself may be wrong, not the
Builder's execution.
`;

/* ─────────────────────────────────────────────────────────────────────────── */
/* SECTION 07 — AFTER THE INSTALL (PHASE 2 OPERATION)                          */
/* ─────────────────────────────────────────────────────────────────────────── */

export const PHASE_TWO_INTRO = {
  pull: "Closing the install does not end the Verifier. It graduates the Verifier into its real job.",
  body: "When the Verifier returns its first VERDICT: CLOSE on PROJECT.md, the natural assumption is that the framework is done. It is not. The install is Phase 1 of a two-phase operating model. Stopping here is the most common failure mode of dual-agent systems and the single biggest waste of the work you just put in.",
} as const;

export const PHASE_TWO_PHASES = [
  {
    tag: "Phase 1",
    name: "Spec Authoring",
    trigger:
      "Repo has no PROJECT.md, contradictions exist between files, non-goals undefined.",
    builderJob:
      "Answer open questions, draft PROJECT.md, ship spec corrections.",
    verifierJob:
      "Audit PROJECT.md against the codebase and against itself for internal coherence.",
    exit: "VERDICT: CLOSE. Spec is in steady-state.",
    duration: "Finite. Typically 3–8 audit cycles.",
  },
  {
    tag: "Phase 2",
    name: "Feature Review",
    trigger:
      "A stable PROJECT.md exists; an active feature roadmap is being shipped.",
    builderJob:
      "Ship features as ordinary code PRs (new routes, components, schemas, integrations).",
    verifierJob: "Audit every code PR against PROJECT.md before it merges.",
    exit: "None. Phase 2 is the steady-state operating mode.",
    duration: "Indefinite. Runs for the life of the project.",
  },
] as const;

export const PHASE_TWO_LEVERAGE = {
  headline: "The leverage math",
  body: "Phase 1 has a fixed, bounded cost. Eight audit cycles spread across a few weeks, producing one durable specification file. Phase 2 has a small marginal cost per PR and runs continuously. Fifty PRs over a project's first year — modest for a real product — means the Verifier reviews fifty PRs, each one informed by the spec you spent eight cycles getting right. Roughly fifty times the leverage of the install effort, paid out over time on a one-time fixed cost.",
  callout:
    "If you stop running the Verifier after install, you have built a constitution and then dissolved the supreme court. The document still exists. It enforces nothing.",
} as const;

export const PHASE_TWO_FINDINGS = [
  {
    type: "Non-goal violation",
    example:
      "A PR adds a recruiter-facing endpoint when PROJECT.md non-goals declare 'Not a recruiter-side tool.'",
    miss: "Linters and tests have no concept of product scope.",
  },
  {
    type: "Convention violation",
    example:
      "A PR adds a 200-line router file when the convention is 'thin per-domain routers, ≤150 lines.'",
    miss: "The Verifier knows the cap because it read PROJECT.md; ESLint does not unless explicitly configured.",
  },
  {
    type: "Stack drift",
    example:
      "A PR adds aws-sdk for object storage when PROJECT.md specifies 'Supabase Storage is the only object store.'",
    miss: "Dependency scanners see the new package; only the Verifier sees that it contradicts the declared stack.",
  },
  {
    type: "Architecture drift",
    example:
      "A PR puts business logic in a route handler when PROJECT.md requires 'thin handlers, logic in service modules.'",
    miss: "A code-review judgment call that no automated test catches. Surfaces only if the reviewer remembers the rule — or if PROJECT.md enforces it.",
  },
  {
    type: "Spec staleness",
    example:
      "A PR ships a feature that contradicts a non-goal — e.g., adds React Native scaffolding when 'no native mobile' is a non-goal.",
    miss: "The Verifier flags both the violation and prompts a PROJECT.md update if the non-goal is genuinely obsolete.",
  },
] as const;

export const PHASE_TWO_BUILDER_PROMPT = `PHASE 2 BUILD — <repo name>
Context:
PROJECT.md (attached / at repo root) is the authoritative spec for
this project. It declares the stack, architecture, conventions,
non-goals, and resolved open questions. Every PR you ship in this
phase will be audited against PROJECT.md by an independent Verifier
before merge. Your job is to produce a PR that the Verifier returns
VERDICT: APPROVE on, on the first pass.
Task:
<one-line description of the feature, fix, or refactor>
What I want from you:
1. Read PROJECT.md before you write any code. If the task appears
   to violate a non-goal or a hard convention, STOP and respond with
   a SPEC-CONFLICT note instead of code. Do not silently work around
   the spec.
2. Implement the task using only the stack, conventions, and
   architecture declared in PROJECT.md. New dependencies, new
   patterns, or new architectural seams require explicit
   justification in the PR description.
3. Stay inside the bounds of the requested task. Do not refactor
   adjacent code, rename files, reformat unrelated modules, or
   upgrade dependencies as a side effect. Out-of-scope changes are
   the most common MAJOR finding in Phase 2.
4. If during implementation you discover that PROJECT.md is wrong
   or has been obsoleted by the product's evolution, STOP. Do not
   amend PROJECT.md inside this PR unless explicitly instructed.
   Surface the conflict in the PR description and let the
   Gatekeeper decide whether to open a separate spec-amendment PR
   first.
5. Write the PR description to make the Verifier's job easy:
   - One-line summary of what changed.
   - Bullet list of files touched and why.
   - Explicit "Non-goals respected" line confirming you reviewed
     PROJECT.md's non-goals and none were crossed.
   - Explicit "Out-of-scope changes" line — should be "none" in
     well-scoped PRs.
   - Self-classification of any judgment calls as MINOR or INFO,
     with reasoning. If you self-flag a MAJOR finding, the PR is
     not ready.
6. Run the project's test suite, linter, and typechecker locally
   before pushing. A red CI is a wasted Verifier cycle.
Scope: this task only. Do not modify PROJECT.md. Do not introduce
features, files, or dependencies that were not requested.
`;
export const PHASE_TWO_BUILDER_PR_DESCRIPTION = `## Phase 2 Builder PR — <feature or fix name>
**Builder model:** <name + version, e.g. claude-sonnet-4.5-2026-03 — or "human">
**Branch:** \`feature/<short-name>\` or \`fix/<short-name>\`
**PROJECT.md ref:** <commit SHA of PROJECT.md the Builder worked against>
> One-paragraph summary of what this PR does, in plain language. Match the
> wording used in the task description so the Verifier can map it directly
> to the requested change.
---
### What changed
| File | Change | Why |
|---|---|---|
| \`src/...\` | <one-line description> | <link to task or PROJECT.md section> |
| \`src/...\` | <one-line description> | <link to task or PROJECT.md section> |
_(One row per touched file. If a row is not directly justified by the
requested task, it is out of scope and should be removed from this PR.)_
### Non-goals respected
- I read PROJECT.md § Non-goals before opening this PR.
- This PR does not cross any of the following non-goals: <list the ones
  that were even adjacent to this PR's surface area>.
- If a non-goal felt like it was being approached, I stopped and surfaced
  it in the next section instead.
### SPEC-CONFLICT notes
- None.
_(If during implementation you discovered that PROJECT.md is wrong or
has been obsoleted by the product's evolution, write it here. Do NOT
amend PROJECT.md inside this PR. The Gatekeeper will decide whether to
open a separate spec-amendment PR first.)_
### Out-of-scope changes
- None.
_(If you touched anything outside the requested task — refactors, new
dependencies, unrelated edits — list them here and justify. The Verifier
will flag them either way; declaring them here is faster than getting a
REQUEST-CHANGES verdict.)_
### Self-classification of judgment calls
- INFO: <stylistic choice, naming decision, or other non-blocking call>.
- MINOR: <choice that the Verifier may push back on; reasoning here>.
_(If you self-flag a MAJOR finding, the PR is not ready. Fix it before
opening the PR or attach a SPEC-CONFLICT note above.)_
### Tests run
\`\`\`
$ <test command> — <result>
$ <typecheck command> — <result>
$ <lint command> — <result>
\`\`\`
_(A red CI is a wasted Verifier cycle. All three should be green before
you open the PR.)_
### Verifier expectation
- Expected verdict: \`APPROVE\` (no MAJOR findings expected).
- If \`SPEC-UPDATE-REQUIRED\` is returned, the Builder will open a separate
  spec-amendment PR before this one merges.
---
_Phase 2 Builder rules: scope is the requested task only, no
out-of-scope refactors, no silent debt, no quiet PROJECT.md amendments.
All non-goals are respected unless explicitly amended in a separate PR
first._
`;
export const PHASE_TWO_VERIFIER_PR_COMMENT = `## Phase 2 Verifier Report
**Model:** <name + version, e.g. gpt-5-thinking-2026-04>
**Context:** clean — no prior PRs loaded
**Builder model:** <name + version, e.g. claude-sonnet-4.5-2026-03 — or "human">
**PR:** #<N> — <title>
**PROJECT.md ref:** <commit SHA the audit was run against>
**Verdict:** <APPROVE | REQUEST-CHANGES | SPEC-UPDATE-REQUIRED>
---
### Findings
- [MAJOR] <finding> — evidence: \`src/...:line\`. Violates PROJECT.md
  § <section, e.g. "Non-goals — not multi-tenant above the org level">.
- [MINOR] <finding> — evidence: \`src/...:line\`. Inconsistent with the
  declared convention <name>; document the exception or fix.
- [INFO] <finding> — evidence: \`src/...:line\`. Stylistic; not blocking.
_(Order by severity: MAJOR → MINOR → INFO. Write "None observed" only if
you genuinely found none. A clean PR with no findings is rare and worth
flagging back to the Gatekeeper as evidence the spec is mature.)_
### Non-goal violations
- <Non-goal name from PROJECT.md> — violated by \`src/...:line\`.
_(or "None observed". Non-goals are the bright lines the project owner
explicitly drew. Treat them as non-negotiable unless the PR description
argues for moving the line and amending PROJECT.md in the same PR.)_
### Out-of-scope changes
- \`src/utils/logger.ts\` — refactored unrelated helper, not justified by
  the requested task.
- \`package.json\` — added a new dependency not declared in the PR
  description.
_(or "None observed". Out-of-scope changes are the most common MAJOR
finding in Phase 2. Flag them even if they look harmless.)_
### Spec-update signal
- <If the PR appears to obsolete part of PROJECT.md, describe which
  section and why. The Builder should open a separate spec-amendment PR
  before this one merges.>
_(or "None — PR is consistent with PROJECT.md as written.". Use this
section only when the verdict is SPEC-UPDATE-REQUIRED, or when you want
to preemptively flag drift the Gatekeeper should track.)_
### Notes for the Gatekeeper
<2–4 sentences max. Describe WHAT is wrong or out of scope, not HOW to
fix it. Example: "PR adds a second-organization concept in line 88, which
violates the explicit non-goal in PROJECT.md § Non-goals #1. Recommend
REQUEST-CHANGES and surface to the Gatekeeper to decide whether the
non-goal should be amended in a separate PR.">
---
_Phase 2 Verifier rules: read only the diff and PROJECT.md, return a
verdict with evidence, do not propose code changes, do not refactor, do
not write code. The Verifier reports drift; the Gatekeeper decides what
to do about it._
`;
export const PHASE_TWO_PROMPT = `PHASE 2 AUDIT — <repo name>

Context:
PROJECT.md (attached / at repo root) is the authoritative spec for
this project. It declares the stack, architecture, conventions,
non-goals, and resolved open questions. The Verifier's job in this
phase is to audit incoming code PRs against PROJECT.md.

Target of this audit:
PR #<N> — <title>
Branch: <branch-name>
Diff: <attach \`gh pr diff <N>\` output, or paste the diff>

What I want from you:

1. Audit the PR diff against PROJECT.md.

2. Classify every finding as one of:
   - MAJOR: must be fixed before merge. Violates a non-goal, a hard
     convention, the declared stack, or the architecture rules.
   - MINOR: should be fixed before merge or documented as an
     intentional exception in the PR description.
   - INFO: style, preference, or observation. Not blocking.

3. Be especially strict on non-goal violations. Non-goals are the
   bright lines the project owner explicitly drew. Treat them as
   non-negotiable unless the PR description argues for moving the
   line and updating PROJECT.md.

4. If the PR appears to obsolete part of PROJECT.md (e.g., the
   feature being added contradicts a stated non-goal but is clearly
   intentional), flag this as a SPEC-UPDATE finding: the PR should
   include a PROJECT.md amendment, not just code.

5. End with an explicit verdict line in this format:

   VERDICT: APPROVE              — no MAJOR findings; merge as-is or with MINOR fixes.
   VERDICT: REQUEST-CHANGES      — one or more MAJOR findings; do not merge.
   VERDICT: SPEC-UPDATE-REQUIRED — PR is intentional but PROJECT.md must be amended in the same PR.

Scope: this PR only. Do not re-audit PROJECT.md itself unless the
PR modifies it.
META-PR EXCEPTION: If PROJECT.md itself is one of the files being
changed by this PR, do NOT use the changed PROJECT.md as the
authoritative spec. Instead, treat the Spec Update Proposal pasted
into the PR description as the authoritative scope. If the PR
description does not contain a Spec Update Proposal, switch to the
dedicated META-PR Verifier prompt and stop here.
`;

export const PHASE_TWO_WIRING = [
  {
    n: "01",
    title: "Builder opens a PR",
    body: "Cursor, Codex, or a human authors a feature PR through your normal workflow. No change here.",
  },
  {
    n: "02",
    title: "Run the Phase 2 prompt against the PR diff",
    body: "Paste the diff (or attach gh pr diff <N>) and PROJECT.md into a fresh Verifier context. Use the prompt template above.",
  },
  {
    n: "03",
    title: "Branch on the verdict",
    body: "APPROVE: merge per your normal process. REQUEST-CHANGES: post findings as a PR comment, have Builder address them, re-run the Verifier on the updated diff. SPEC-UPDATE-REQUIRED: the Builder amends PROJECT.md in the same PR before merge.",
  },
  {
    n: "04",
    title: "Merge with confidence",
    body: "The Verifier's verdict is your second pair of eyes. The discipline is one Verifier run per PR, before merge. Skipping the Verifier on 'small' PRs is how the spec drifts back into irrelevance over time.",
  },
] as const;

export const PHASE_TWO_TRIAGE = {
  headline: "Amend PROJECT.md vs. reject the PR",
  intro:
    "The most common Phase 2 judgment call: a PR violates the spec, but the spec is what's wrong, not the PR. Use this triage.",
  rows: [
    {
      condition: "PR violates an in-effect rule that still serves the project.",
      action: "Reject the PR. Fix the code.",
    },
    {
      condition:
        "PR violates a rule that has been obsoleted by the product's evolution.",
      action: "Amend PROJECT.md in the same PR; then accept the code change.",
    },
    {
      condition:
        "PR violates a non-goal you have quietly changed your mind about.",
      action:
        "STOP. Do not amend PROJECT.md inside a feature PR. Open a separate spec-amendment PR first, run the Phase 1 audit on it, merge it, then return to the feature PR.",
    },
  ],
  warning:
    "The third case is the trap. Non-goals are slow-moving by design; amending one inside a feature PR is how the constitution gets quietly rewritten without judicial review.",
} as const;

export const PHASE_TWO_CALIBRATION = {
  headline: "Calibration: the first 5–10 PRs are noisy",
  body: "Phase 2 does not run cleanly out of the gate. The first 5–10 code PRs you run through the Verifier are themselves a calibration period: the prompt may need tightening (too many INFO findings) or loosening (Verifier flagging stylistic preferences as MAJOR); PROJECT.md itself may have implicit rules that need to be made explicit before the Verifier can enforce them consistently; the MAJOR/MINOR boundary is project-specific.",
  conclusion:
    "Set this expectation up front: Phase 2's first weeks feel like Phase 1 cycles all over again. After calibration, Phase 2 becomes quiet background hygiene — exactly what you want it to be.",
} as const;

export const PHASE_TWO_INSTALL_COMPLETE = [
  "PROJECT.md exists, is internally coherent, and has received a VERDICT: CLOSE from the Verifier.",
  "The standard PR workflow has been updated to include a Phase 2 audit before every merge.",
  "At least one feature PR has been successfully run through the Phase 2 audit, demonstrating the loop is wired correctly.",
] as const;

export const PHASE_TWO_DORMANT = {
  headline: "Counter-pattern — the dormant Verifier",
  intro:
    "The most common way Phase 2 fails: it never starts. If you recognize these symptoms, the framework has effectively been uninstalled. The fix is operational, not technical: re-introduce the Phase 2 audit into the next PR you ship, and the loop restarts. The spec is still there; only the discipline lapsed.",
  symptoms: [
    "PROJECT.md exists but has not been touched since the install.",
    "New PRs are merging without any Verifier output in their comments or descriptions.",
    "The team or solo operator describes the framework as 'we did that earlier this year' rather than 'we run that on every PR.'",
  ],
} as const;


// =============================================================================
// SECTION 08 — META-PRs
// PRs that change the spec itself (HANDOFF.md or PROJECT.md). Need their own
// verifier loop because the normal Verifier reads the spec as ground truth,
// and in a META-PR the spec is the thing being changed.
// =============================================================================

export const META_INTRO = {
  eyebrow: "FILE 08 / META",
  headline: "When the PR changes the spec itself.",
  body: `Most PRs add features. Some PRs change the document the framework runs against — HANDOFF.md mid-slice, or PROJECT.md after a Calibration Debrief. These need their own verifier loop because the normal Verifier reads the spec as ground truth, and in a META-PR the spec is the thing being changed. The prompts below close that loop.`,
};

export const META_WHEN_TO_USE = [
  {
    n: "01",
    label: "Mid-slice HANDOFF.md edit (Phase 1)",
    body: "You started a slice, ran the Builder, and discovered the Acceptance Criteria in HANDOFF.md were wrong or under-specified. The PR amends HANDOFF.md as part of the slice. Use the Phase 1 META-PR Verifier prompt with the Builder Brief in the PR description as the scope.",
  },
  {
    n: "02",
    label: "Calibration Debrief output (Phase 2)",
    body: "The first full slice surfaced gaps in PROJECT.md. The Calibration Debrief Builder produces a diff-style proposal that becomes a META-PR. Use the Phase 2 META-PR Builder prompt to write the proposal, and the Phase 2 META-PR Verifier prompt to grade it.",
  },
  {
    n: "03",
    label: "Spec evolution (Phase 2)",
    body: "Six months in, your team's conventions or non-goals have drifted. A PR amends PROJECT.md to reflect the new reality. Use the Phase 2 META-PR Verifier prompt with the Spec Update Proposal in the PR description as the scope.",
  },
];

// -----------------------------------------------------------------------------
// PROMPTS (3)
// -----------------------------------------------------------------------------

export const META_VERIFIER_PROMPT_PHASE_1 = `You are a Verifier. You did not write this code. This is a META-PR — it modifies HANDOFF.md itself. You will NOT use HANDOFF.md (the file in the diff) as the scope document, because the file is the thing being changed.
The authoritative scope for this verification is the Builder Brief pasted below, which the Builder worked against when producing the diff. The Builder Brief is the spec; the diff (including changes to HANDOFF.md) is what you grade.

Builder Brief acceptance criteria for THIS PR:
[paste numbered criteria from the Builder Brief, or paste the full Builder Brief inline]

Files expected to change (from the Builder Brief):
[list expected files — typically HANDOFF.md plus any code files the slice required]

Files explicitly OUT of scope:
[list forbidden files, or "none specified"]

Instructions:
1. Read the PR diff and the Builder Brief criteria above. Do NOT treat any file in the diff (including HANDOFF.md) as the scope document; the Builder Brief above is the scope document.
2. For each Builder Brief criterion, return PASS or FAIL with one sentence of evidence pointing to a file and line number in the PR diff.
3. Flag any change in the diff that is OUT OF SCOPE relative to the Builder Brief (refactors, new dependencies, unrelated edits, files not in the expected-files list).
4. Specifically check whether the new HANDOFF.md (in the diff) actually matches the Builder Brief — if the Builder Brief says "Acceptance Criteria 3 should require X" and the new HANDOFF.md doesn't contain that, that is a FAIL.
5. Return a final verdict: PASS (all criteria met, no out-of-scope changes), CONDITIONAL PASS (criteria met but minor out-of-scope changes), or FAIL (one or more criteria unmet).

Do not suggest fixes. Do not write code. Your output is a verdict report.`;

export const META_VERIFIER_PROMPT_PHASE_2 = `You are a Verifier. You did not write this code. This is a META-PR — it modifies PROJECT.md itself. You will NOT use PROJECT.md (the file in the diff) as the authoritative spec, because the file is the thing being changed.
The authoritative scope for this verification is the Spec Update Proposal pasted below, which the human or the Calibration Debrief Builder produced before this PR. The Spec Update Proposal is the spec; the diff (including changes to PROJECT.md) is what you grade.

Spec Update Proposal for THIS PR:
[paste the full Spec Update Proposal inline — typically a list of "before / after" PROJECT.md edits with rationale for each]

Trigger for the spec update (from the Proposal):
[one or two sentences: which slice or finding revealed that PROJECT.md needed to change]

Files expected to change:
[typically PROJECT.md only; list any other files if the spec change requires code follow-up]

Instructions:
1. Read the PR diff and the Spec Update Proposal above. Do NOT treat the new PROJECT.md (in the diff) as the spec; the Spec Update Proposal is the spec.
2. For each "before / after" edit in the Proposal, return PASS or FAIL with one sentence of evidence pointing to the new PROJECT.md content in the diff. PASS means the diff implements the proposed edit faithfully; FAIL means the diff goes further, falls short, or changes something the Proposal did not authorize.
3. Flag any change in the diff that is OUT OF SCOPE relative to the Proposal — particularly silent edits to PROJECT.md sections that the Proposal did not name.
4. Specifically check that non-goals removed by the Proposal really were promoted into goals (or deleted) intentionally, not by accident. Removing a non-goal silently is a MAJOR finding.
5. Return a final verdict: APPROVE (all proposed edits implemented, no out-of-scope changes), REQUEST-CHANGES (one or more proposed edits not implemented faithfully or unauthorized edits present), or PROPOSAL-INSUFFICIENT (the diff implements the Proposal correctly but the Proposal itself is internally inconsistent or under-specified — kick back to the human, do not merge).

Do not suggest fixes. Do not write code. Your output is a verdict report.`;

export const META_BUILDER_PROMPT_PHASE_2 = `You are a Spec-Editor Builder. You are NOT writing code in this session — you are writing a Spec Update Proposal that will become a META-PR against PROJECT.md. The output of this session is a structured markdown document, not a code diff.

You have access to:
1. The current PROJECT.md (attached / at repo root).
2. The HANDOFF.md, PR diff, and Verifier report from the slice that just shipped (the trigger for this Spec Update Proposal).
3. Any other context the human pastes below.

What you produce:
A Spec Update Proposal in this exact shape:

---

# Spec Update Proposal — <one-line summary>

## Trigger
<2–3 sentences: which slice or finding revealed that PROJECT.md needed to change. Cite the PR number and the specific Verifier finding or unwritten convention.>

## Proposed edits

For each edit, produce a block in this format:

### Edit <N> — <short label>

**Section of PROJECT.md affected:** <e.g., "Conventions / Naming", "Non-goals">

**Before:**
\`\`\`
<copy the exact current text from PROJECT.md, including surrounding context if needed for disambiguation>
\`\`\`

**After:**
\`\`\`
<the proposed replacement text>
\`\`\`

**Rationale:** <1–3 sentences explaining what surfaced this need. Cite the PR or finding.>

**Risk if not adopted:** <one sentence — what failure mode recurs if PROJECT.md stays as-is>

---

## What this Proposal does NOT touch

<List PROJECT.md sections you considered changing but deliberately left alone, and a one-sentence reason for each. This is how you prevent silent scope creep.>

## Open questions for the human

<If the slice surfaced ambiguity that you cannot resolve, list 1–4 numbered open questions here. Do NOT guess. Open questions block the Proposal from becoming a META-PR until the human answers them.>

---

Rules:
1. Match PROJECT.md's existing voice and section structure. Do not introduce new top-level section types unless absolutely necessary.
2. Every "before / after" pair must be a real, copy-pasteable replacement. Do not paraphrase the current text. Do not omit surrounding lines that are needed to disambiguate which paragraph you mean.
3. If you find yourself wanting to add a new convention to PROJECT.md, ask: did the slice that just shipped actually surface this need, or am I inventing it? If the latter, drop it.
4. The Verifier (using the Phase 2 META-PR Verifier prompt) will grade the eventual META-PR diff against this Proposal. Write the Proposal precisely enough that a faithful diff is unambiguous.
5. Do not write code. Do not modify PROJECT.md directly. Your output is the Proposal markdown only.`;

// -----------------------------------------------------------------------------
// PR TEMPLATES (2)
// -----------------------------------------------------------------------------

export const META_BUILDER_PR_DESCRIPTION = `## META-PR — <what spec doc is changing and why>

**Type:** META-PR (modifies <HANDOFF.md | PROJECT.md>)
**Phase:** <Phase 1 mid-slice spec correction | Phase 2 spec evolution | Phase 2 Calibration Debrief output>
**Builder model:** <e.g., Claude Sonnet 4.5>
**Triggering slice / PR:** <PR # or slice name that surfaced this need>

## Why this META-PR exists

<2–4 sentences. What did the recent slice surface that the existing spec doc did not anticipate? Cite specific evidence: a Verifier finding, a convention nobody had written down, a non-goal that turned out to be a goal.>

## Scope document for the Verifier

<Paste the Builder Brief (Phase 1) or the Spec Update Proposal (Phase 2) inline below. The Verifier will grade the diff against this, NOT against the changed file in the diff.>

\`\`\`
[Builder Brief or Spec Update Proposal goes here, in full]
\`\`\`

## What changed

| File | Change |
|---|---|
| <HANDOFF.md or PROJECT.md> | <one-line summary of edit; reference the section> |
| <other file if applicable> | <reason it had to change too> |

## Sections of the spec doc deliberately NOT changed

<List sections you considered changing but left alone, with a one-sentence reason each. This is how you prevent silent scope creep on the spec itself.>

## Out-of-scope changes

<None expected. If anything else changed, flag it here with rationale.>

## Self-classification

\`docs:\` (spec doc edit, no behavior change) — most common
\`feat:\` only if the spec change unlocks a new behavior committed in the same PR

## Tests run

- N/A for spec-only changes
- For Phase 1 mid-slice META-PRs that include code: list code tests as you would for a normal Builder PR

## Verifier expectation

\`PASS\` (Phase 1) / \`APPROVE\` (Phase 2) — if the diff faithfully implements the Builder Brief / Spec Update Proposal pasted above.

\`FAIL\` / \`REQUEST-CHANGES\` — if the diff goes further, falls short, or silently edits sections the Proposal did not name.

\`PROPOSAL-INSUFFICIENT\` (Phase 2 only) — if the diff is correct but the Proposal itself was under-specified. The Verifier kicks this back to the human.
`;

export const META_VERIFIER_PR_COMMENT = `## META-PR Verifier Report

**Verifier model:** <e.g., GPT-5>
**Builder model:** <whatever drafted the spec edit>
**PR:** #<N> — <title>
**Spec doc affected:** <HANDOFF.md | PROJECT.md>
**Scope used for verification:** <Builder Brief from PR description | Spec Update Proposal from PR description> — NOT the changed file in the diff
**Verdict:** <PASS | CONDITIONAL PASS | FAIL>  (Phase 1)
            <APPROVE | REQUEST-CHANGES | PROPOSAL-INSUFFICIENT>  (Phase 2)

---

### Per-criterion / per-edit findings

For each numbered criterion in the Builder Brief (Phase 1) or each "before / after" edit in the Spec Update Proposal (Phase 2):

**<Criterion N or Edit N — short label>**
- **Verdict:** PASS | FAIL
- **Evidence:** \`<file>:<line range>\` — <one sentence describing what the diff actually does and whether it matches the Builder Brief / Proposal>

---

### Out-of-scope changes

<List any edits in the diff that the Builder Brief / Proposal did NOT authorize. For META-PRs this most commonly takes the form of silent edits to spec doc sections the Proposal did not name. Each item:>

- \`<file>:<line range>\` — <what changed> — <why it is out of scope>

If none, write: "None observed."

---

### Spec doc sections changed but not in the Proposal

<Phase 2 specific. List any section of PROJECT.md that the diff edits but the Spec Update Proposal did not mention. Even small edits — a renamed heading, a reformatted bullet — count here.>

If none, write: "None observed."

---

### Notes for the Gatekeeper

<2–4 sentences. What is wrong, NOT how to fix it. Examples:
- "Edit 3 in the Proposal removes a non-goal but the diff retains it; this is a FAIL on Edit 3."
- "The Proposal is internally consistent but Edit 2's 'after' text contradicts Edit 5's 'after' text. PROPOSAL-INSUFFICIENT."
- "All proposed edits implemented faithfully; one MINOR formatting drift in section heading capitalization (line 47).">

---

### Footer rules

The Verifier read ONLY the PR diff and the Builder Brief / Spec Update Proposal pasted in the PR description.
The Verifier did NOT propose alternative edits. The Verifier did NOT modify the spec doc. The Verifier did NOT write code.
If the Proposal itself appears under-specified, the verdict is PROPOSAL-INSUFFICIENT (Phase 2) and the PR should NOT be merged until the human revises the Proposal.
`;
