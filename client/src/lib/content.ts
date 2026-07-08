/*
 * AGENT HANDOFF FRAMEWORK — CONTENT
 * Source of truth for all copy on the page. Keeping it here so the visual
 * components stay focused on layout and the prose stays editable in one place.
 * Design philosophy is "The Engineer's Notebook" — every string should sound like
 * a working spec, not marketing copy.
 */

/* ─────────────────────────────────────────────────────────────────────────── */
/* SITE STRUCTURE                                                              */
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
  { id: "field-notes", label: "Field Notes", number: "07" },
  { id: "phase-2", label: "Operate the framework", number: "08" },
  { id: "meta-prs", label: "META-PRs", number: "09" },
  { id: "references", label: "References", number: "10" },
] as const;

/* Sheet index — the drawing set's table of contents, rendered in Overview.
 * Derived from SECTIONS so a new section without a contents line is a type
 * error, not silent drift. */
const SHEET_CONTENTS: Record<(typeof SECTIONS)[number]["id"], string> = {
  overview: "Framing, the three artifacts, and the reference architecture.",
  diagnosis: "Ten failure modes — where agent handoffs actually break down.",
  schema:
    "PROJECT.md, CHANGELOG.md, HANDOFF.md — one job each, plus the slice template.",
  install: "Five steps onto an existing repo, and the two anti-patterns.",
  prompts:
    "The full copy-paste library: install, recurring loop, amendment, recovery.",
  "build-verify":
    "The four-role loop, verdict triage, the escalation rule, ceremony sizing.",
  "field-notes":
    "Ten costly lessons and one worked example — receipts included.",
  "phase-2":
    "Operating cadence, what the Verifier catches, and after the merge.",
  "meta-prs": "When the PR changes the spec itself — prompts and templates.",
  references:
    "The empirical anchors: LLM-as-judge, long context, merge hygiene.",
};

export const SHEET_INDEX = SECTIONS.map(section => ({
  ...section,
  contents: SHEET_CONTENTS[section.id],
}));

export const REFERENCE_NOTE =
  "These sources support specific claims on this page (prompt structure, evaluation hygiene, PR surfaces, LLM-as-judge limits, long-context behavior). They do not guarantee that any fixed prompt will work in every repository, stack, or policy environment. Treat prompt changes like code changes: run them against explicit acceptance criteria, review the diffs, measure failure modes on your repo, and tighten the workflow when real incidents surface.";

export const REFERENCES = [
  {
    category: "Prompt design",
    source: "OpenAI Developer Docs",
    title: "Prompt engineering",
    href: "https://developers.openai.com/api/docs/guides/prompt-engineering",
    note: "Official guidance on instruction structure, specificity, examples, and controlling model behavior — aligned with this site's emphasis on scoped roles and explicit contracts.",
  },
  {
    category: "Evaluation",
    source: "OpenAI Developer Docs",
    title: "Working with evals",
    href: "https://developers.openai.com/api/docs/guides/evals",
    note: "Grounds the framework's bias toward explicit criteria, repeatable checks, and iterating prompts from measured failures rather than subjective impressions.",
  },
  {
    category: "Prompt design",
    source: "Anthropic docs",
    title: "Prompt engineering overview",
    href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
    note: "Reinforces the need to define success criteria and empirical tests before tuning the prompt itself.",
  },
  {
    category: "Prompt design",
    source: "Google Cloud docs",
    title: "Introduction to prompting",
    href: "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/introduction-prompt-design",
    note: "A vendor-neutral anchor for prompt components: task, system instructions, examples, and contextual information.",
  },
  {
    category: "Review workflow",
    source: "GitHub Docs",
    title: "About pull requests",
    href: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests",
    note: "Supports the PR-as-review-surface framing: discussion, commits, checks, and file diffs before merge.",
  },
  {
    category: "Review workflow",
    source: "GitHub Docs",
    title: "GitHub flow",
    href: "https://docs.github.com/en/get-started/using-github/github-flow",
    note: "Maps directly to the framework's branch, build, PR, review, and merge cadence.",
  },
  {
    category: "Verifier design",
    source: "Zheng et al., arXiv",
    title: "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena",
    href: "https://arxiv.org/abs/2306.05685",
    note: "Empirical background on LLM-as-judge reliability and failure modes — motivation for keeping Verifier outputs evidence-grounded (diff, file:line, quoted claims) and merging only under human gatekeeping.",
  },
  {
    category: "Context windows",
    source: "Liu et al., arXiv",
    title: "Lost in the Middle: How Language Models Use Long Context",
    href: "https://arxiv.org/abs/2307.03172",
    note: "Shows retrieval and ordering effects in long contexts — supporting the site's insistence on a narrow Verifier input set (PR body, diff, scope doc) and a fresh context window rather than an endless chat transcript.",
  },
  {
    category: "Merge hygiene",
    source: "GitHub Docs",
    title: "About protected branches",
    href: "https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches",
    note: 'Platform-level counterpart to "no direct commits to main": required reviews and checks enforce the PR surface this framework assumes.',
  },
  {
    category: "Human oversight",
    source: "NIST",
    title: "Artificial Intelligence Risk Management Framework (AI RMF 1.0)",
    href: "https://www.nist.gov/itl/ai-risk-management-framework",
    note: "Non-prescriptive governance vocabulary for AI-assisted workflows — maps to human gatekeeping, documented acceptance criteria, and traceability across agent steps.",
  },
] as const;

/**
 * Short “spine” through empirical + governance anchors for the framework’s
 * Verifier design. Rendered as a single strip under the reference cards.
 */
export const REFERENCE_READING_ORDER_INTRO =
  "If you only follow three external links from this page, use this order: why second-model checks are slippery, why Verifier inputs should stay narrow and fresh, then how to talk about oversight without turning it into slogans.";

export const REFERENCE_READING_ORDER = [
  {
    step: "01",
    short: "MT-Bench / LLM-as-judge",
    href: "https://arxiv.org/abs/2306.05685",
  },
  {
    step: "02",
    short: "Lost in the Middle",
    href: "https://arxiv.org/abs/2307.03172",
  },
  {
    step: "03",
    short: "NIST AI RMF",
    href: "https://www.nist.gov/itl/ai-risk-management-framework",
  },
] as const;

export const FAILURE_MODES = [
  {
    title: "Committing directly to main",
    body: "If handoffs land directly on main, the workflow loses its review surface: no isolated diff, no CI gate, no easy revert. The agent is rewarded for making the local run look complete instead of proving the change against an explicit contract.",
  },
  {
    title: "One document doing five jobs",
    body: "When the handoff doc is roadmap, task list, status log, architectural notes, and next-builder briefing all at once, each new agent spends context sorting history from instructions and may relitigate decisions that should already be settled.",
  },
  {
    title: "Weak persona priming",
    body: "Telling an agent it is a 'professional software engineer' does not meaningfully constrain behavior. A useful prompt defines the operating envelope — no unrelated refactors, no new dependencies, no scope expansion without an explicit stop-and-report.",
  },
  {
    title: "No definition of done",
    body: "Without an explicit acceptance contract, the agent decides when it is done. That is where scope creep and 'I also went ahead and...' come from.",
  },
  {
    title: "Self-graded handoffs",
    body: "Models can produce plausible completion narratives for code they authored; LLM-as-judge setups exhibit documented biases and variance (e.g., Zheng et al., https://arxiv.org/abs/2306.05685). Without an explicit self-audit tied to Acceptance Criteria plus an independent Verifier pass, the next agent inherits silent debt — stubs, hacks, and skipped criteria that were never declared.",
  },
  {
    title: "Planning vs. building drift",
    body: "Agents drift into planning mode when the task is ambiguous, the doc reads like a brainstorm, or there is no explicit build-only framing with a stop condition.",
  },
  {
    title: "Green checks, dead feature",
    body: "A change can pass typecheck, pass build, and pass the Verifier and still do nothing once it ships: a particle layer that renders invisibly, a sitemap a validator accepts but the real crawler rejects, an integration that silently falls back to a no-op. Code-correct is not behavior-correct. Visual changes get a human eyeballing the rendered preview; anything that leans on live external data gets a real before/after on production-like inputs before the slice is called done.",
  },
  {
    title: "Trusting the report over the repo",
    body: "'Approved and merged' is a claim, not a fact, and a verdict whose details do not match the diff is worth less than the diff itself. Ground truth lives in the artifacts: the PR diff, the checks on the PR's own commit, and main after the pull. Before any housekeeping — pruning branches, updating a ledger, telling someone it shipped — confirm the change is actually present on main, not just that an agent said so.",
  },
  {
    title: "The check was wrong, not the code",
    body: "A REJECT is evidence, not a command. Verifier checks are authored artifacts, subject to the same defects as any other spec: an occurrence-count the recon under-counted, a grep that cannot match a string the formatter wrapped across lines, a rule that contradicts what the Builder was told. A defective check FAILs correct code. Triage every FAIL before re-running the Builder — if the defect is in the check, the honest move is to merge and fix the prompt template, not the code.",
  },
  {
    title: "A criterion the Builder never saw",
    body: "Any PASS criterion that lives only in the verifier prompt is a guaranteed spurious REJECT — the Builder cannot satisfy a requirement it was never given. Before finalizing a verifier prompt, diff its checklist against the builder prompt. If the check is genuinely wanted, it belongs in the builder prompt first; when one slips through and gets flagged, the fix is a small amendment, not a rejection of the Builder's work.",
  },
] as const;

/* ─────────────────────────────────────────────────────────────────────────── */
/* DOCUMENT SCHEMA                                                             */
/* ─────────────────────────────────────────────────────────────────────────── */

export const SCHEMA_FILES = [
  {
    file: "PROJECT.md",
    role: "The stable core",
    cadence: "Rarely changes",
    description:
      "The why, the architecture, and the non-negotiables. Agents read this for context but treat it as read-mostly; changes require explicit spec-edit scope.",
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
      "The slice-level scope document. Strict, scoped, and disposable. Contains an explicit definition of done that the agent must satisfy before claiming the slice is complete.",
    contains: [
      "Context — one or two sentences on the slice",
      "Acceptance Criteria — the definition of done, with the expected test delta",
      "Constraints & anti-goals — what NOT to touch",
      "Pre-confirmed facts — the Advisor's recon: paths, line numbers, symbol greps",
      "Files explicitly forbidden — zero overlap with the allowlist",
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
- Expected test delta: [baseline count] → [expected count] (or "no test changes expected")

## Constraints & Anti-Goals
- DO NOT refactor code outside of \`src/api/\`.
- DO NOT add new npm packages.
- DO NOT attempt to build the frontend UI for this endpoint.

## Pre-confirmed facts
Filled by the Advisor from repo recon. The Builder works from these — it does not re-derive them.
- \`src/api/routes.ts:42\` — \`registerRoutes(app)\` is the only route entry point.
- \`git grep -n oldHelperName\` → 3 references: \`routes.ts:88\`, \`controllers.ts:14\`, \`tests/routes.test.ts:31\` — all on the allowlist. [Grep every symbol being deleted or renamed; list every file that references it.]

## Files explicitly forbidden
Only list files with ZERO overlap with the allowlist — a file that is both forbidden and plausibly needed creates a contradiction the Builder cannot resolve.
- \`src/billing/**\` — adjacent but out of scope for this slice.

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
    body: "Drop the Inventory prompt into your builder model or coding assistant and let it read the repo without writing code. It produces a draft PROJECT.md grounded in the repository: stack, architecture, conventions with file evidence, and an explicit list of open questions for you. The output is a draft, not an authority.",
    promptRef: "inventory",
  },
  {
    n: "02",
    duration: "~30 min",
    actor: "You — the highest-leverage step",
    title:
      "Edit PROJECT.md — fix Conventions, fill in Non-goals and Human-only context",
    body: "The draft is a map, not ground truth. You fix the Conventions section (the Builder spots repeated patterns; only you know which ones are intentional vs. tech debt), fill in Non-goals (what the project deliberately does NOT do — the section the Builder is least able to infer), answer the Open Questions, and add a Human-only context section for business or regulatory constraints the code does not encode. Commit as `docs: bootstrap PROJECT.md`.",
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
    body: "The first cycle is designed to reveal what PROJECT.md still fails to say. The Builder may hit an undocumented convention; the Verifier may FAIL because an Acceptance Criterion was too loose. That is useful signal, not a broken install. Run the Calibration Debrief prompt at the end to capture the doc deltas cleanly.",
    promptRef: "calibration",
  },
] as const;

export const INSTALL_ANTI_PATTERNS = [
  {
    title: "Generate PROJECT.md, then immediately start shipping features",
    why: "Looks productive. Skips the boring step.",
    cost: "Undocumented conventions become implicit prompt defaults. That creates avoidable variance from cycle 2 onward and compounds badly across slices.",
  },
  {
    title: "Have the Builder fix code while it is writing PROJECT.md",
    why: "Why do two passes when you could do one?",
    cost: "The Builder can start refactoring opportunistically and you lose the ability to review the doc separately from the code changes. Two commits, two PRs, always.",
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
- Cite a file path, and a line number when your tooling exposes stable line
  numbers, for every claim in Conventions and Architecture. If line numbers are
  unavailable, cite a short verbatim quoted span from the file instead.
- For Stack, copy package names and versions from the repo manifest exactly.
  Do not infer versions from memory.
- Separate observed facts from inferences. If a claim is inferred, label it
  as an inference and cite the evidence that supports it.
- If you cannot find evidence for a section, write "INSUFFICIENT EVIDENCE
  — human to fill in." Do not guess.
- Do not invent features, roadmaps, or future plans.
- Do not modify source, config, test, or dependency files. The only allowed
  write is creating PROJECT.md.

Stop when PROJECT.md is written. Do not start any other work.
`;

export const EDIT_PASS_CHECKLIST = `# PROJECT.md · Human Edit Pass Checklist

You are the only person who can turn the Inventory draft into a real
PROJECT.md. This is not an LLM prompt — it is the checklist you run
against the draft before you commit it. Budget ~30 minutes.

The draft is a map, not authority. Your job is to validate the technical
claims and add the intent that code cannot reveal.

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
repo actually pins. Version hallucination is a common Inventory failure
mode.

  [ ] Dependency 1 matches.
  [ ] Dependency 2 matches.
  [ ] Dependency 3 matches.

---

## 3. Non-goals — fill in at least three

Non-goals are what the project deliberately does NOT do. The Inventory
agent usually cannot write these well because absence in code is not the
same thing as an intentional boundary.

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
  [ ] Open a PR to \`main\` and merge through your normal repository
      policy. No Builder pass needed — this is a human-authored doc.
  [ ] Optional: tag the merge commit \`install-v1\` if this repo uses
      release or audit tags.

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
3. The smallest set of source files needed to verify specific claims.
   Start with up to 5 files; request more only if a claim cannot be
   evaluated without them.

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
- If the evidence is too broad to support the exact wording of the claim,
  mark the claim unsupported or over-specified.
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
- Expected test delta: <baseline> → <expected> (or "no test changes expected")
  (Max 5 criteria. Each must be checkable from the diff, a command,
  an HTTP/UI behavior, or repo evidence.)

## Constraints & Anti-Goals
- DO NOT touch <explicit paths or systems>
- DO NOT add new npm/pypi/go dependencies
- DO NOT refactor unrelated code
- DO NOT expand the slice

## Pre-confirmed facts
<filled from repo recon — file paths with line numbers, function
signatures, grep results for any symbol being touched. For a trivial
first slice, "None — trivial slice." is a valid entry.>

## Files explicitly forbidden
<only files with ZERO overlap with the relevant-files list, or
"none specified">

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

export const BUILDER_PROMPT = `You are an execution-focused senior software engineer. Your sole objective is to complete the specific slice of work defined in HANDOFF.md.

Pre-flight — run this before writing any code:
\`\`\`bash
git checkout main
git fetch origin --prune
git merge --ff-only origin/main
git branch --merged main --format='%(refname:short)' | grep -vxF main | while read -r br; do git branch -d "$br" 2>/dev/null || true; done
git checkout -B <type>/<slice-name> origin/main
\`\`\`
If \`git merge --ff-only\` fails, main has diverged locally — STOP and report. Do not force, merge, or build on a stale main.

Operating contract:
1. Read PROJECT.md for the project-level rules, then read HANDOFF.md for the slice-level scope.
2. Treat the Acceptance Criteria in HANDOFF.md as the contract. Do not add features, broaden the task, or reinterpret the criteria.
3. Treat HANDOFF.md's listed files as a strict allowlist. If the work requires editing, creating, or deleting any file not listed, STOP and report BLOCKED — do not quietly expand scope. When you delete or rename a symbol, grep every reference first; the cascading cleanup is part of the slice, but each file it touches must already be on the allowlist.
4. A short implementation checklist is allowed. Roadmaps, architecture proposals, and "while I am here" refactors are not.
5. Use the existing stack, patterns, and helper APIs documented in PROJECT.md and visible in the relevant files. No new dependencies unless the slice is explicitly a dependency change.
6. Read only the files needed to complete and verify the slice. If you need more than five additional source files beyond the ones named in HANDOFF.md, state why before continuing.
7. Verify with the project's REAL checks, by their exact script names from package.json / Makefile / pyproject.toml — never assume a script like \`npm test\` exists. Run the narrowest relevant checks and the build before you hand off.

Output when implementation is done:
- Per-criterion status: MET / BLOCKED, with evidence (file:line).
- Files changed and why — every file must trace to an Acceptance Criterion or the allowlist.
- Checks run and their exact results.
- Any declared stubs, hacks, or debt. Write "None" only if true.`;

export const CLOSEOUT_PROMPT = `You have finished the implementation pass for the current slice. Your task now is to close it out cleanly, create the review surface, and prepare the next handoff.

Precondition:
Do not start closeout until you have verified the current diff against every Acceptance Criterion in HANDOFF.md. If any criterion is unmet, mark the work BLOCKED and do not claim the slice is complete.

Instructions:
1. Audit the slice. Re-read HANDOFF.md and compare each Acceptance Criterion against the diff. Identify stubs, hacks, skipped checks, or technical debt you introduced. Be explicit; silent debt is the expensive kind.
2. Update CHANGELOG.md. Append one concise paragraph summarizing what was built and naming any unresolved issues or stubs. If the repo keeps a roadmap or ledger, update it in THIS slice so it never drifts behind.
3. Draft the next HANDOFF.md. Overwrite HANDOFF.md with the next logical slice only if the next step is clear from the current work. Include context, Acceptance Criteria, constraints, starting files, and warnings. If the next slice is ambiguous, write a small "Needs human decision" handoff instead of inventing roadmap.
4. Re-run the project's real checks by their exact script names (typecheck, build, tests — read package.json / Makefile; never assume \`npm test\` exists) after the markdown updates, in case they affect generated artifacts, type imports, or docs validation.
5. Commit and push on the branch you created in pre-flight:
\`\`\`bash
git add <only the allowlisted files>
git commit -m "<type>(<scope>): <concise summary referencing the slice>"
git push -u origin <branch-name>
\`\`\`
Do not change git config. Do not use \`--no-verify\`. Match the repo's commit convention (check for a commitlint config).
6. Open the PR — your final, non-optional action:
\`\`\`bash
gh pr create --title "<title>" --body "<self-audit, touched-file table, declared stubs, out-of-scope changes, checks run>"
gh pr view --json url,isDraft,state
\`\`\`
A pushed branch with no PR is an incomplete task, and the PR must NOT be a draft. Confirm \`isDraft:false\` in the output above and report the URL.

Rules:
- Do not write new feature code during closeout except for minimal fixes required to satisfy the current Acceptance Criteria.
- Do not edit PROJECT.md in this phase unless HANDOFF.md explicitly scoped a META-PR.
- Do not hide blocked criteria in the changelog or PR body. If blocked, say blocked.`;

export const VERIFIER_PROMPT = `You are a Verifier. You did not write this code. Your job is to decide whether the Pull Request actually satisfies the Acceptance Criteria in HANDOFF.md — nothing more, nothing less. You APPROVE or REJECT; you do not edit code, push commits, or fix things you see.

Authoritative inputs:
1. The PR description, only for the Builder's self-audit, declared stubs, declared out-of-scope changes, and any pasted Builder Brief.
2. The base-version HANDOFF.md for the slice's Acceptance Criteria.
3. The PR diff.

META-PR EXCEPTION: If HANDOFF.md itself is changed by this PR, do NOT use the changed HANDOFF.md as the scope document. Treat the Builder Brief / Acceptance Criteria pasted into the PR description as the authoritative scope. If the PR description does not contain a Builder Brief, switch to the dedicated META-PR Verifier prompt and stop here.

Setup — check out the branch and capture the diff:
\`\`\`bash
git fetch origin --prune
git checkout <branch-name>
git log --oneline main..HEAD
git diff --stat main..HEAD
\`\`\`

Instructions:
1. Read the PR description, the base-version HANDOFF.md, and the PR diff first. Read additional files only when a specific Acceptance Criterion cannot be evaluated otherwise, and name that reason.
2. For each Acceptance Criterion, return PASS or FAIL with one sentence of evidence pointing to a file and line number. If the criterion is untestable from the diff and available evidence, mark it FAIL as "unverifiable".
3. Grade BEHAVIOR, not shape. Judge the observable invariant the criterion describes, not whether the implementation matches the one you imagined. Welcome behavior-correct deviations and richer-than-spec work; reserve FAIL for behavior that is actually wrong.
4. Run the project's REAL gates — do not approve on "looks right in the diff." Use the exact script names from package.json / Makefile (never assume \`npm test\` exists):
\`\`\`bash
<install>     # e.g. pnpm install --frozen-lockfile
<typecheck>   # e.g. pnpm check
<lint>        # if the project has one
<test>        # if the project has one
<build>       # e.g. pnpm build
\`\`\`
If the project has no CI, this local run is the only gate there is. A red gate is a REJECT.
5. Flag changes OUT OF SCOPE relative to the slice: unrelated refactors, dependency changes, formatting churn, new files, or edits outside the allowlist.
6. Compare declared stubs / TODOs in the PR description against the diff. Undeclared stubs or skipped checks are findings.
7. Green is not shipped. If the change is visual or depends on live external data, confirm the code matches spec but state that a human must eyeball the rendered preview or run a real before/after before merge — do not blind-approve appearance.
8. Return a final verdict: APPROVE (all criteria met; any minor, declared, low-risk out-of-scope changes are noted as follow-ups, not blockers) or REJECT (one or more criteria unmet, unverifiable, a red gate, or materially out of scope).

Do not suggest fixes. Do not write code. Your output is a verdict report.`;

export const AMENDMENT_PROMPT = `You are continuing the CURRENT slice. This is a scope amendment — not a new task, and not a re-issued prompt. Everything in the original HANDOFF.md and your original instructions still stands, except for the single change named below.

Amendment type (one of):
- ALLOWLIST EXTENSION — you stopped on a file outside the allowlist.
- DEFECT FIX — the Verifier found a real, small defect in the PR.

Authorized change:
- File(s): <exact path(s) now added to the allowlist, or the file:line of the defect>
- Reason: <one sentence — why this file must change, or what the defect is>
- Edit: <the narrowest description of the change now authorized>

Rules:
1. This amendment authorizes ONLY the change named above. It is not an invitation to revisit, refactor, or "improve" anything else you noticed.
2. All original Acceptance Criteria, constraints, and forbidden files remain in force.
3. Apply the change on the SAME branch and push to the SAME PR. Do not open a new PR.
4. If the amendment reveals yet another file outside the allowlist, STOP and report again. Do not chain expansions on your own authority.
5. Re-run the project's real checks by their exact script names before pushing.

When done, report: the diff summary of the amendment commit, the check results, and the PR URL.`;

export const CALIBRATION_DEBRIEF_PROMPT = `You just completed the first slice of work on this repository using the
Agent Handoff Framework. This was a calibration run — the point was not
to ship value, it was to reveal what was wrong, missing, or under-
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
4. The Verifier report for that slice (APPROVE / REJECT).

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

**Builder model:** <provider/model id + date run>
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
either way; declaring them here is faster than getting a REJECT.)_

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

**Model:** <provider/model id + date run>
**Context:** clean — no prior slices loaded
**Builder model:** <provider/model id from PR>
**Slice:** <slice name from HANDOFF.md>
**Verdict:** <APPROVE | REJECT>

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
Recommend REJECT and return to Builder. The logger refactor and the new lodash
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
      "These walk through a compact install onto a codebase that already exists: Inventory → human Edit Pass checklist → PROJECT.md sanity audit → optional first-HANDOFF scoping. Execute them top-to-bottom; do not skip the human Edit Pass — it is the step that converts inferred repo facts into declared intent (including Non-goals and human-only constraints code cannot infer).",
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
          "Drop into your builder model or coding assistant at the start of install. Agent is forbidden from writing code.",
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
          "Run immediately after Inventory. Treat the draft as evidence to validate, not a source of truth.",
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
      "Run in order for each slice. Same Builder session for 04 and 05; different LLM, fresh context, for 06. 06-A only when a STOP or a small real defect calls for it.",
    intro:
      "These are the prompts your team uses on every slice once install is complete: Builder execution → Closeout (same session) → Verifier (different model, clean context window, narrow inputs). PR-body templates mirror what the Verifier grades so claims stay comparable to the diff.",
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
          "Reads only the diff and HANDOFF.md. Returns APPROVE / REJECT with evidence. Does not propose fixes.",
        body: VERIFIER_PROMPT,
        toastLabel: "Verifier prompt copied",
      },
      {
        id: "amendment",
        order: "06-A",
        kind: "prompt",
        actor: "builder",
        filename: "prompt-06a-amendment.md",
        title: "Amendment — minimal scope extension, same slice",
        whenToUse:
          "Only when needed: the Builder STOPs on a non-allowlisted file, or a Verifier FAIL is a real but small defect. Never for expanding the slice.",
        context:
          "Send in the same Builder session (or with the PR branch checked out). Names one file set and one reason; everything else in the original scope stands. The alternative — re-issuing the full prompt — throws away work that already passed.",
        body: AMENDMENT_PROMPT,
        toastLabel: "Amendment prompt copied",
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
      "These prompts close the loop back to PROJECT.md. The Calibration Debrief runs at the end of the first full slice cycle — producing a structured proposal you review before merging doc updates (typically via a META-PR against PROJECT.md so the Verifier grades intent vs diff).",
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
    actor: "Advisor",
    role: "Scopes the slice, grounds the prompts",
    body: "Does the recon before any prompt exists: greps the repo to pre-confirm facts — file paths, line numbers, every reference to a symbol being touched — and drafts the Builder and Verifier prompts against that evidence. When the verdict returns, the Advisor interprets it (real defect, or a defect in the check itself?) and runs the post-merge housekeeping. The Advisor does not write the code and does not grade the PR.",
  },
  {
    tag: "B",
    actor: "Builder LLM",
    role: "Executes the slice",
    body: "Reads PROJECT.md and the HANDOFF.md the Advisor scoped. Writes code that satisfies the Acceptance Criteria. Runs the Closeout prompt: appends to CHANGELOG.md, drafts the next HANDOFF.md, commits to a feature branch, and opens a PR.",
  },
  {
    tag: "C",
    actor: "Verifier LLM",
    role: "Independent check",
    body: "A different model in a fresh context window. Reads the PR description, PR diff, and base-version HANDOFF.md. Returns APPROVE or REJECT with evidence per Acceptance Criterion. Does not write code.",
  },
  {
    tag: "D",
    actor: "You (gatekeeper)",
    role: "Merges or returns",
    body: "Reviews the Verifier's verdict — weighed against the Advisor's read on whether any FAIL is a real defect or a defect in the check itself. APPROVE → merge to main and run the next Builder; file a follow-up issue for any minor, out-of-scope cleanup the Verifier noted. REJECT → reopen the slice and send the verdict back to the Builder.",
  },
] as const;

export const BUILD_VERIFY_PRINCIPLES = [
  {
    title: "Different model, not just different context",
    body: "Prefer a different model family or provider for the Verifier than the Builder. Divergent training distributions and tool behaviors tend to reduce correlated errors versus same-model replay; correlation can remain (especially on systematic misunderstandings of your codebase), which is why evidence-linked verdicts and human merge gates stay mandatory.",
  },
  {
    title: "Clean context window — always",
    body: "The Verifier must boot with no prior conversation, no prior slice memory, and no Builder scratchpad. It reads only the review inputs. This is the single most important rule; without it, the Verifier inherits the Builder's framing.",
  },
  {
    title: "Review-input-first reading",
    body: "The Verifier starts from the PR description, diff, and scope document. It may inspect additional files only when a specific Acceptance Criterion cannot be evaluated otherwise, and it should name that reason in the report.",
  },
  {
    title: "Verdict, not advice",
    body: "The Verifier returns APPROVE or REJECT with evidence. It does NOT propose fixes, suggest refactors, or write code. Mixing roles weakens the independence that makes the check valuable.",
  },
  {
    title: "The Verifier runs the gates, not just reads the diff",
    body: "Reading the diff tells the Verifier what changed; it does not prove the tree still compiles. A mature Verifier checks out the branch and runs the project's real gates — typecheck, build, tests — by their exact script names (read package.json; never assume a script like 'npm test' exists), plus any forbidden-artifact greps, before forming a verdict. Review inputs are how it understands scope; running the gates is how it earns the verdict. When a repo has no CI to lean on, that local run is the only gate there is.",
  },
  {
    title: "Behavior, not shape",
    body: "Grade what the change does, not how it is written. A Verifier that rejects correct code because the implementation differs from the one it imagined wastes a cycle and trains the Builder to pattern-match instead of solve. State the observable invariant — 'the duplicate write is suppressed during hydration' — and let any implementation that satisfies it pass. Welcome behavior-correct deviations and richer-than-spec work; reserve rejection for behavior that is actually wrong.",
  },
  {
    title: "Green is not shipped",
    body: "Typecheck, build, and a passing verdict prove the code is correct in the abstract — not that the feature does anything once it ships. A visual change can pass every check and render invisibly; an integration can pass and silently fall back to a no-op. For anything visual or dependent on live external data, a human confirms the rendered result on the preview URL, or runs a real before/after with production-like inputs, before the slice is called done.",
  },
] as const;

/* ─────────────────────────────────────────────────────────────────────────── */
/* BUILD & VERIFY — VERDICT TRIAGE                                             */
/* The Advisor's read on a verdict, run BEFORE the two-REJECT escalation.      */
/* ─────────────────────────────────────────────────────────────────────────── */

export const VERDICT_TRIAGE = {
  headline: "Read the verdict before you obey it.",
  intro:
    "A Verifier can FAIL a correct PR. Its checks are authored artifacts — subject to the same defects as any other spec — so a REJECT is evidence to be read, not a command to be obeyed.",
  question:
    "Is the cited file:line a real defect — or is the check itself the bug?",
  routes: [
    {
      label: "Real defect",
      body: "Send a small, surgical amendment back to the Builder that fixes only the flagged issue. Do not re-issue the full slice prompt — the rest of the work already passed.",
    },
    {
      label: "Defective check",
      body: "Recommend merging anyway, with a one-line explanation on the PR. Then fix the defect where it lives — in the prompt template — so the same spurious FAIL never runs again.",
    },
  ],
  spuriousShapes: {
    title: "Spurious FAILs cluster in four shapes",
    items: [
      "A criterion the Builder never saw — it lives only in the verifier prompt, so no Builder could ever have satisfied it.",
      "An exact-occurrence count the recon under-counted — the Builder's replace-all was correct; the expected N was wrong.",
      "A shape check on behavior-correct code — the implementation differs from the one the prompt author imagined, and the observable behavior is right.",
      "A single-line grep that cannot match a string the formatter wrapped across source lines.",
    ],
  },
  disciplines: [
    {
      title: "A red deploy check is not always the diff",
      body: "When an approved PR fails a deploy or build check, reproduce the build locally on the exact commit and force a no-cache rebuild before blaming the code. Platform and cache failures routinely masquerade as regressions — temporal proximity to your merge is the most seductive wrong lead.",
    },
    {
      title: "“PR is up” and “merged” are claims, not facts",
      body: "Verify the artifact before acting on the report: the PR exists and is not a draft, the verdict describes this diff, the merge commit is actually on main. A verdict whose details do not match the PR is worth less than the diff itself.",
    },
  ],
  escalationLink:
    "Only after every FAIL survives this triage does the escalation clock start: two triaged, genuine REJECTs on the same slice — that is when you freeze the slice, not before.",
} as const;

export const ESCALATION_RULE = {
  rule: "Two consecutive REJECTs on the same slice = freeze the slice, not the Builder.",
  premise:
    "A single REJECT may be an execution mistake. A second REJECT on the same slice is strong evidence of a slice-definition problem: ambiguous HANDOFF.md, untestable Acceptance Criteria, missing constraints, or a slice that is too large. Treat the second REJECT as a hard stop, not a third attempt.",
  steps: [
    {
      n: "01",
      title: "Stop the Builder. Do not retry the slice.",
      body: "A third Builder attempt on the same HANDOFF.md is likely to repeat the same ambiguity. Close the second PR without merging. Tag it `escalated/<slice-name>` so you can find it later.",
    },
    {
      n: "02",
      title: "Read both Verifier reports side-by-side.",
      body: "Look for the same criterion failing twice, or two different criteria failing because of one underlying ambiguity. The pattern is the diagnosis. If the two reports disagree about what failed, the slice may be under-specified.",
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
    'Merging a REJECT-worthy PR on a promise to "fix the unmet criteria in a follow-up" — the silent debt this creates is exactly the failure mode this whole framework was built to prevent.',
    "Treating the second REJECT as only a Builder performance issue — often the upstream HANDOFF.md is the thing that needs repair.",
  ],
} as const;

/* ─────────────────────────────────────────────────────────────────────────── */
/* BUILD & VERIFY — CEREMONY SIZING                                            */
/* The loop is a tool, not a tax: which changes enter it, and which gates      */
/* never bend either way.                                                      */
/* ─────────────────────────────────────────────────────────────────────────── */

export const CEREMONY_SIZING = {
  headline: "The loop is a tool, not a tax.",
  intro:
    "Not every change earns the full round-trip. Size the ceremony to the risk — and hold the gates constant no matter which path a change takes.",
  fullLoop: {
    label: "Run the full loop when…",
    items: [
      "The change is large, multi-file, or logic-heavy — a fresh-context Builder brings none of your blind spots to it.",
      "The change is destructive or hard to reverse — migrations, deletions, auth, anything that touches data.",
      "An adversarial reviewer genuinely de-risks it — subtle invariants, security boundaries, tricky edge cases.",
      "You cannot state the acceptance criteria crisply — the round-trip forces the scoping discipline you are missing.",
    ],
  },
  direct: {
    label: "Direct execution is fine when…",
    items: [
      "A few-line config or environment fix.",
      "A markdown, copy, or content-only edit.",
      "A one-line policy tweak — a header, a redirect, a rule.",
      "A file rename or comment correction.",
    ],
    caveat:
      "Small, well-understood, and self-verifiable on the live surface — all three, not any one.",
  },
  invariant: {
    title: "Drop the round-trip, never the gates",
    body: "Direct mode changes who builds; it changes nothing about the evidence. The work still lands as a PR — never a push to main — still updates the ledger in the same diff, still runs the project's real build, typecheck, and test gates by their exact script names, and still gets verified on the live surface before anyone recommends merge.",
  },
  trap: {
    title: "The direct-mode trap",
    body: "Green local plus green preview is not green production when the change keys on an environment-specific value — a config, a credential, a domain. Verify production after the merge, and keep any fail-open fallback in place until you have.",
  },
} as const;

/* ─────────────────────────────────────────────────────────────────────────── */
/* BUILD & VERIFY — DROP-IN MARKDOWN SPEC                                      */
/* Self-contained doc teams can paste into a repo as docs/build-and-verify.md. */
/* ─────────────────────────────────────────────────────────────────────────── */

export const BUILD_VERIFY_MARKDOWN = `# Build & Verify — Two-LLM Workflow

A disciplined loop for shipping with AI agents: an Advisor scopes each
slice and drafts both prompts, one LLM writes the code, and a *different*
LLM verifies it in a clean context window before the next slice runs.

---

## Why two LLMs?

Code-capable models can produce persuasive summaries of work they authored.
Empirical LLM-as-judge work shows judges vary by prompt, model, and task (e.g.,
Zheng et al., https://arxiv.org/abs/2306.05685). A Verifier LLM in a fresh context,
reading only the PR description,
diff, and scope document, is a structured second reader that can surface stubs,
speculative APIs, out-of-scope edits, and silently skipped Acceptance Criteria
that the Builder may under-report — especially when verdicts must cite evidence.

Two-model separation does **not** guarantee independence; it raises the odds
that blind spots differ from the Builder's. Narrow inputs and explicit verdict
formats keep that signal usable.

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
   │  Updates CHANGELOG.md             │
   │  Drafts next HANDOFF.md           │
   │  Opens PR on feature/<slice>      │
   └───────────────────────────────────┘
                      │
                      ▼  (PR opened)
   ┌───────────────────────────────────┐
   │  2. VERIFIER LLM   (different     │
   │     model, clean context)         │
   │  Reads PR body + diff + HANDOFF.md│
   │  Returns APPROVE / REJECT         │
   │  with one line of evidence per    │
   │  Acceptance Criterion.            │
   └───────────────────────────────────┘
                      │
              ┌───────┴────────┐
              ▼                ▼
           APPROVE           REJECT
              │                │
       merge to main     reopen slice;
       run next Builder  send verdict
                         back to Builder
\`\`\`

---

## Roles

| Role          | Model                  | Reads                             | Writes                               |
|---------------|------------------------|-----------------------------------|--------------------------------------|
| Advisor       | LLM C — or you         | Repo (recon), PROJECT.md, verdicts | HANDOFF.md, Builder/Verifier prompts |
| Builder       | LLM A (e.g., Claude)   | PROJECT.md, HANDOFF.md, code      | Code, CHANGELOG.md, HANDOFF.md       |
| Verifier      | LLM B (e.g., GPT)      | PR body, diff, HANDOFF.md         | Verdict report only                  |
| Gatekeeper    | Human (you)            | Verdict + diff                    | Merge / reject / revise decision     |

The Advisor can be a third model, a separate session, or the human wearing
a different hat. The "two-LLM" separation refers to Builder and Verifier —
those two must never share a context. The Advisor drafts the prompts both
of them run, and interprets the verdict that comes back.

---

## Non-negotiable rules

1. **Different model families.** Builder and Verifier should come from
   different model families or providers when possible. This reduces
   correlated mistakes; it does not eliminate them.
2. **Clean context window for the Verifier.** No prior conversation, no
   memory of past slices, no scratchpad. Boot fresh every time.
3. **Review-input-first reading.** The Verifier starts with the PR body,
   diff, and scope document. It may browse additional files only when
   evaluating a specific Acceptance Criterion requires it.
4. **Verdict, not advice.** The Verifier returns a verdict with evidence. It
   does not propose fixes, refactors, or new code. Mixing roles weakens the
   independence that makes this check valuable.
5. **One slice in flight at a time.** Do not run a new Builder until the
   previous slice has been merged or rejected. Parallel slices defeat the
   point of a serialized handoff.
6. **Role purity for the Advisor.** The Advisor drafts prompts, interprets
   verdicts, and runs post-merge housekeeping — it does not build, does not
   verify, and does not merge on its own judgment. The moment the Advisor
   starts grading diffs or pushing commits, the independence of the other
   two lanes is gone.

---

## Operating cadence

1. **Open a slice.** The Advisor scopes HANDOFF.md — grounded in repo recon
   — or you write it; the previous Builder may have drafted a starting point.
2. **Run the Builder.** Use Builder prompt + Closeout prompt.
3. **Run the Verifier.** Different model, clean context, Verifier prompt.
4. **Gatekeeper decides.** Merge, reject, or merge with follow-up.
5. **Move to next slice.** Only after the current PR is closed.

If the Verifier returns REJECT twice in a row on the same slice, escalate to
the gatekeeper for re-scoping. The slice itself may be wrong, not the
Builder's execution.

---

## Further reading (external)

- Prompt engineering — OpenAI Developer Docs:
  https://developers.openai.com/api/docs/guides/prompt-engineering
- Evaluation workflow — OpenAI Developer Docs:
  https://developers.openai.com/api/docs/guides/evals
- Pull requests & GitHub Flow — GitHub Docs:
  https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests
  · https://docs.github.com/en/get-started/using-github/github-flow
- LLM-as-judge caveats — Zheng et al. (2023): https://arxiv.org/abs/2306.05685
- Long-context / input ordering effects — Liu et al. (2023):
  https://arxiv.org/abs/2307.03172
`;

/* ─────────────────────────────────────────────────────────────────────────── */
/* SECTION 07 — AFTER THE INSTALL (PHASE 2 OPERATION)                          */
/* ─────────────────────────────────────────────────────────────────────────── */

export const PHASE_TWO_INTRO = {
  pull: "Closing the install does not end the Verifier. It graduates the Verifier into its real job.",
  body: "When the Verifier returns its first VERDICT: CLOSE on PROJECT.md, the natural assumption is that the framework is done. It is not. The install is Phase 1 of a two-phase operating model. Stopping here turns PROJECT.md into passive documentation instead of an active review input.",
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
    duration: "Finite. Often 3–8 audit cycles.",
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
  body: "Phase 1 has a fixed, bounded cost: a finite number of audit cycles that produce one durable specification file. Phase 2 has a small marginal cost per PR and runs continuously. Fifty PRs over a project's first year means fifty reviews informed by the same spec, so the install effort is amortized across every later merge decision.",
  callout:
    "If you stop running the Verifier after install, PROJECT.md still exists, but it no longer participates in merge decisions.",
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
    miss: "A code-review judgment call that no automated test catches. Surfaces only if the reviewer remembers the rule — or if the Verifier checks PROJECT.md.",
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

Pre-flight — run this before writing any code:
\`\`\`bash
git checkout main
git fetch origin --prune
git merge --ff-only origin/main
git branch --merged main --format='%(refname:short)' | grep -vxF main | while read -r br; do git branch -d "$br" 2>/dev/null || true; done
git checkout -B <type>/<short-name> origin/main
\`\`\`
If \`git merge --ff-only\` fails, STOP and report — do not force or merge.

What I want from you:
1. Read PROJECT.md before you write any code. If the task appears
   to violate a non-goal or a hard convention, STOP and respond with
   a SPEC-CONFLICT note instead of code. Do not silently work around
   the spec.
2. Implement the task using only the stack, conventions, and
   architecture declared in PROJECT.md. New dependencies, new
   patterns, or new architectural interfaces require explicit
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
6. Run the project's checks locally by their exact script names from
   package.json / Makefile (typecheck, build, tests — never assume a
   script like \`npm test\` exists) before pushing. A red CI is a
   wasted Verifier cycle.
7. Open the PR as your final, non-optional action, then confirm it is
   not a draft:
\`\`\`bash
gh pr create --title "<title>" --body "<the PR description above>"
gh pr view --json url,isDraft,state
\`\`\`
   A pushed branch with no PR is an incomplete task. Confirm
   \`isDraft:false\` and report the URL.
Scope: this task only. Do not modify PROJECT.md. Do not introduce
features, files, or dependencies that were not requested.
`;
export const PHASE_TWO_BUILDER_PR_DESCRIPTION = `## Phase 2 Builder PR — <feature or fix name>
**Builder model:** <provider/model id + date run — or "human">
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
REJECT verdict.)_
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
- If the verdict is \`REJECT (spec-update-required)\` — the code may be
  intentional, but PROJECT.md must change first — this PR must not merge until
  PROJECT.md is updated through an explicit META-PR, or until this PR is
  re-scoped as a combined code + spec PR with a pasted Spec Update Proposal.
---
_Phase 2 Builder rules: scope is the requested task only, no
out-of-scope refactors, no silent debt, no quiet PROJECT.md amendments.
All non-goals are respected unless explicitly amended in a separate PR
first._
`;
export const PHASE_TWO_VERIFIER_PR_COMMENT = `## Phase 2 Verifier Report
**Model:** <provider/model id + date run>
**Context:** clean — no prior PRs loaded
**Builder model:** <provider/model id from PR — or "human">
**PR:** #<N> — <title>
**PROJECT.md ref:** <commit SHA the audit was run against>
**Verdict:** <APPROVE | REJECT>  — on REJECT name the route: \`REJECT (fix the code)\` or \`REJECT (spec-update-required)\`
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
explicitly drew. Treat them as non-negotiable unless a separate META-PR
or an explicitly scoped combined code + spec PR moves the line.)_
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
section only when the verdict is \`REJECT (spec-update-required)\`, or when you want
to preemptively flag drift the Gatekeeper should track.)_
### Notes for the Gatekeeper
<2–4 sentences max. Describe WHAT is wrong or out of scope, not HOW to
fix it. Example: "PR adds a second-organization concept in line 88, which
violates the explicit non-goal in PROJECT.md § Non-goals #1. Recommend
REJECT (spec-update-required) and surface to the Gatekeeper to decide whether the
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
PR description: <paste full PR body>
Diff: <attach \`gh pr diff <N>\` output, or paste the diff>

Setup — check out the branch and run the project's real gates yourself
(do not grade from the diff text alone):
\`\`\`bash
git fetch origin --prune
git checkout <branch-name>
git diff --stat main..HEAD
<install / typecheck / build / tests — by their exact script names from package.json; never assume \`npm test\` exists>
\`\`\`
A red gate is a REJECT no matter how clean the diff reads; if the project
has no CI, this local run is the only gate there is. Green is not shipped,
either: if the change is visual or depends on live external data, confirm
the code matches spec but flag that a human must eyeball the rendered
preview or run a real before/after before merge.

What I want from you:

1. Audit the PR description and diff against PROJECT.md. The diff is the
   evidence; the PR description is the Builder's claim about scope, stubs,
   tests, and intent. Grade BEHAVIOR, not shape — judge what the change
   does against the spec, not whether the implementation matches the one
   you imagined; welcome behavior-correct deviations.

2. Classify every finding as one of:
   - MAJOR: must be fixed before merge. Violates a non-goal, a hard
     convention, the declared stack, or the architecture rules.
   - MINOR: should be fixed before merge or documented as an
     intentional exception in the PR description.
   - INFO: style, preference, or observation. Not blocking.

3. Be especially strict on non-goal violations. Non-goals are the
   bright lines the project owner explicitly drew. Treat them as
   non-negotiable unless the PR is explicitly scoped as a META-PR or
   combined code + spec PR with a Spec Update Proposal.

4. If the PR appears to obsolete part of PROJECT.md (e.g., the
   feature being added contradicts a stated non-goal but is clearly
   intentional), flag this as a SPEC-UPDATE finding. The code PR should
   not merge until PROJECT.md is updated through a META-PR, unless this
   PR was explicitly scoped as a combined code + spec PR and includes a
   Spec Update Proposal in the PR description.

5. End with an explicit verdict line in this format:

   VERDICT: APPROVE — no MAJOR findings; merge as-is or with MINOR fixes.
   VERDICT: REJECT  — do not merge. Name the route in parentheses:
            REJECT (fix the code)         — one or more MAJOR findings the Builder must fix.
            REJECT (spec-update-required) — code may be intentional, but PROJECT.md must be updated through an explicit spec path (a META-PR) before merge.

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
    body: "A builder model, coding assistant, or human authors a feature PR through your normal workflow. No change here.",
  },
  {
    n: "02",
    title: "Run the Phase 2 prompt against the PR diff",
    body: "Paste the diff (or attach gh pr diff <N>) and PROJECT.md into a fresh Verifier context. Use the prompt template above.",
  },
  {
    n: "03",
    title: "Branch on the verdict",
    body: "APPROVE: merge per your normal process. REJECT (fix the code): post findings as a PR comment, have the Builder address them, re-run the Verifier on the updated diff. REJECT (spec-update-required): pause the code PR until a META-PR updates PROJECT.md, unless this PR already contains an explicit Spec Update Proposal and is being reviewed as a combined code + spec PR.",
  },
  {
    n: "04",
    title: "Merge with confidence",
    body: "The Verifier's verdict is your second pair of eyes. The discipline is one Verifier run per PR, before merge. Skipping the Verifier on 'small' PRs is how the spec drifts back into irrelevance over time.",
  },
] as const;

/* ─────────────────────────────────────────────────────────────────────────── */
/* PHASE 2 — AFTER THE MERGE                                                   */
/* The post-merge protocol; the loop is not closed when the button is clicked. */
/* ─────────────────────────────────────────────────────────────────────────── */

export const AFTER_MERGE = {
  headline: "The merge is not the finish line.",
  intro:
    "'Approved and merged' is a claim until the repo confirms it. The Advisor owns this protocol; run it on every merge, in order — the loop is closed at step four, not at the merge button.",
  steps: [
    {
      n: "01",
      title: "Verify the merge actually landed.",
      body: "Sync main and assert the expected commit is really there before anything else. Gate every destructive step — especially branch deletion — on that verified state, not on the report. If the repo contradicts the claim, surface the discrepancy with evidence and stop.",
    },
    {
      n: "02",
      title: "Confirm the ledger recorded itself.",
      body: "Every PR adds its own entry to CHANGELOG.md (or the roadmap ledger) in its own diff, so the ledger is never more than zero PRs behind. If the just-merged PR is missing, the loop is not finished — scope a small reconciliation slice now, before the gap compounds.",
    },
    {
      n: "03",
      title: "Sweep branches and preview deployments.",
      body: "Prune the merged local branch, confirm the remote head is gone, and check that your host's per-branch preview deployments died with the branch. On most platforms they silently outlive it — orphaned previews pile up by the hundreds before anyone notices.",
    },
    {
      n: "04",
      title: "Verify production, not just the preview.",
      body: "The preview proves the code path; production proves environment-specific behavior — config, credentials, data, runtime. Any slice that touches something the environment can change is not done until a live check against the real deployment comes back correct.",
    },
  ],
} as const;

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
      action:
        "Open a META-PR to amend PROJECT.md first, or explicitly re-scope the current PR as code + spec with a pasted Spec Update Proposal before accepting the code change.",
    },
    {
      condition:
        "PR violates a non-goal you have quietly changed your mind about.",
      action:
        "STOP. Do not amend PROJECT.md inside an ordinary feature PR. Open a separate spec-amendment META-PR first, run the Phase 2 META-PR audit on it, merge it, then return to the feature PR.",
    },
  ],
  warning:
    "The third case is the trap. Non-goals are slow-moving by design; changing one inside an ordinary feature PR lets the project boundary move without explicit review.",
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
  eyebrow: "FILE 09 / META",
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
    label: "Calibration → PROJECT.md META-PR",
    body: "After the first full slice (install / calibration cycle), gaps in PROJECT.md often surface. The Calibration Debrief produces a structured proposal; turning that into a PR that edits PROJECT.md is a META-PR. Use the Spec-Editor Builder prompt to draft the Spec Update Proposal when needed, then the PROJECT.md META-PR Verifier prompt to grade the diff against the pasted Proposal — not against the edited file alone.",
  },
  {
    n: "03",
    label: "Spec evolution (steady state)",
    body: "After the framework is wired in, conventions and non-goals still evolve. A PR amends PROJECT.md to reflect the new reality. Use the PROJECT.md META-PR Verifier prompt with the Spec Update Proposal pasted into the PR description as the authoritative scope.",
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

Setup — check out the branch and capture the diff:
\`\`\`bash
git fetch origin --prune
git checkout <branch-name>
git diff --stat main..HEAD
\`\`\`
If this META-PR includes code (a Phase 1 mid-slice META-PR often does), also run the project's real gates by their exact script names from package.json / Makefile (typecheck, build, tests — never assume \`npm test\` exists); a red gate is a REJECT. For a HANDOFF.md-only change there is nothing to build — the gate is whether the new HANDOFF.md faithfully matches the Builder Brief.

Instructions:
1. Read the PR diff and the Builder Brief criteria above. Do NOT treat any file in the diff (including HANDOFF.md) as the scope document; the Builder Brief above is the scope document.
2. For each Builder Brief criterion, return PASS or FAIL with one sentence of evidence pointing to a file and line number in the PR diff.
3. Flag any change in the diff that is OUT OF SCOPE relative to the Builder Brief (refactors, new dependencies, unrelated edits, files not in the expected-files list).
4. Specifically check whether the new HANDOFF.md (in the diff) actually matches the Builder Brief — if the Builder Brief says "Acceptance Criteria 3 should require X" and the new HANDOFF.md doesn't contain that, that is a FAIL. Judge intent, not exact wording: an edit that satisfies the Builder Brief's requirement in different words is a PASS.
5. Return a final verdict: APPROVE (all criteria met; minor out-of-scope changes noted as follow-ups, not blockers) or REJECT (one or more criteria unmet, or materially out of scope).

Do not suggest fixes. Do not write code. Your output is a verdict report.`;

export const META_VERIFIER_PROMPT_PHASE_2 = `You are a Verifier. You did not write this code. This is a META-PR — it modifies PROJECT.md itself. You will NOT use PROJECT.md (the file in the diff) as the authoritative spec, because the file is the thing being changed.
The authoritative scope for this verification is the Spec Update Proposal pasted below, which the human or the Calibration Debrief Builder produced before this PR. The Spec Update Proposal is the spec; the diff (including changes to PROJECT.md) is what you grade.

Spec Update Proposal for THIS PR:
[paste the full Spec Update Proposal inline — typically a list of "before / after" PROJECT.md edits with rationale for each]

Trigger for the spec update (from the Proposal):
[one or two sentences: which slice or finding revealed that PROJECT.md needed to change]

Files expected to change:
[typically PROJECT.md only; list any other files if the spec change requires code follow-up]

Setup — check out the branch and capture the diff:
\`\`\`bash
git fetch origin --prune
git checkout <branch-name>
git diff --stat main..HEAD
\`\`\`
A PROJECT.md-only change has nothing to build — the gate is whether the diff implements the Spec Update Proposal faithfully and edits no section the Proposal did not name. If the spec change carries code follow-up, also run the project's real gates by their exact script names (never assume \`npm test\` exists); a red gate is a REJECT.

Instructions:
1. Read the PR diff and the Spec Update Proposal above. Do NOT treat the new PROJECT.md (in the diff) as the spec; the Spec Update Proposal is the spec.
2. For each "before / after" edit in the Proposal, return PASS or FAIL with one sentence of evidence pointing to the new PROJECT.md content in the diff. PASS means the diff implements the proposed edit faithfully; FAIL means the diff goes further, falls short, or changes something the Proposal did not authorize. Judge intent, not exact wording — an edit that achieves the proposed change in different words is a PASS.
3. Flag any change in the diff that is OUT OF SCOPE relative to the Proposal — particularly silent edits to PROJECT.md sections that the Proposal did not name.
4. Specifically check that non-goals removed by the Proposal really were promoted into goals (or deleted) intentionally, not by accident. Removing a non-goal silently is a MAJOR finding.
5. Return a final verdict: APPROVE (all proposed edits implemented, no out-of-scope changes) or REJECT, naming the route — REJECT (fix the edits) when one or more proposed edits are not implemented faithfully or unauthorized edits are present, or REJECT (proposal-insufficient) when the diff implements the Proposal correctly but the Proposal itself is internally inconsistent or under-specified (kick back to the human, do not merge).

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
**Builder model:** <provider/model id + date run>
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

\`APPROVE\` — if the diff faithfully implements the Builder Brief (Phase 1) or Spec Update Proposal (Phase 2) pasted above.

\`REJECT\` — if the diff goes further, falls short, or silently edits sections the Proposal did not name. On a Phase 2 META-PR, name the route: \`REJECT (fix the edits)\`.

\`REJECT (proposal-insufficient)\` (Phase 2 only) — if the diff is correct but the Proposal itself was under-specified. The Verifier kicks this back to the human.
`;

export const META_VERIFIER_PR_COMMENT = `## META-PR Verifier Report

**Verifier model:** <provider/model id + date run>
**Builder model:** <whatever drafted the spec edit>
**PR:** #<N> — <title>
**Spec doc affected:** <HANDOFF.md | PROJECT.md>
**Scope used for verification:** <Builder Brief from PR description | Spec Update Proposal from PR description> — NOT the changed file in the diff
**Verdict:** <APPROVE | REJECT>  (Phase 1)
            <APPROVE | REJECT>  (Phase 2 — on REJECT name the route: \`REJECT (fix the edits)\` or \`REJECT (proposal-insufficient)\`)

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
- "The Proposal is internally consistent but Edit 2's 'after' text contradicts Edit 5's 'after' text. REJECT (proposal-insufficient)."
- "All proposed edits implemented faithfully; one MINOR formatting drift in section heading capitalization (line 47).">

---

### Footer rules

The Verifier read ONLY the PR diff and the Builder Brief / Spec Update Proposal pasted in the PR description.
The Verifier did NOT propose alternative edits. The Verifier did NOT modify the spec doc. The Verifier did NOT write code.
If the Proposal itself appears under-specified, the verdict is REJECT (proposal-insufficient) (Phase 2) and the PR should NOT be merged until the human revises the Proposal.
`;

/* ─────────────────────────────────────────────────────────────────────────── */
/* TITLE BLOCK — METHODOLOGY REVISION HISTORY                                  */
/* Rendered as a drawing title block in the site footer. Every row corresponds */
/* to real merged work; do not add a row without a shipped anchor.             */
/* ─────────────────────────────────────────────────────────────────────────── */

export const REVISION_TABLE = [
  {
    rev: "1.0",
    date: "2026-04",
    description:
      "Initial publication — dual-agent loop, document schema, prompt library, Engineer's Notebook design.",
    drawn: "RM",
    checked: "—",
  },
  {
    rev: "1.1",
    date: "2026-06",
    description:
      "Failure modes expanded; operational rigor embedded in the loop, Phase 2, and META prompt bodies (PRs #15–#22).",
    drawn: "Builder LLM",
    checked: "Verifier LLM",
  },
  {
    rev: "1.2",
    date: "2026-06",
    description:
      "Security and hygiene hardening — response headers, dependency overrides, dead scaffolding removed, Node pinned (PRs #23–#28).",
    drawn: "Builder LLM",
    checked: "Verifier LLM",
  },
  {
    rev: "2.0",
    date: "2026-07",
    description:
      "The Advisor named as a third role — verdict triage, after-the-merge protocol, ceremony sizing, HANDOFF template upgrade, loop figure redrawn (PRs #30–#36).",
    drawn: "Advisor",
    checked: "RM",
  },
] as const;

/* ─────────────────────────────────────────────────────────────────────────── */
/* SECTION 07 — FIELD NOTES                                                    */
/* Curated lessons from operating the framework on real repositories,         */
/* including this one. Tool-agnostic, no client identifiers. Notes carrying    */
/* a `receipt` cite verifiable events in this repo's own PR history.           */
/* ─────────────────────────────────────────────────────────────────────────── */

export const FIELD_NOTES_INTRO = {
  pull: "Prescriptions are cheap. These are the lessons that cost something.",
  body: "Every note below came out of operating this framework on real repositories — including this one. The site you are reading is built and maintained through the loop it documents, and its merged-PR history is the audit trail. Two of these notes cite defects you can go verify there.",
  auditHref:
    "https://github.com/roymcfarland/agent_handoff_guide/pulls?q=is%3Apr+is%3Amerged",
  auditLabel: "Read the merged-PR history",
} as const;

export const FIELD_NOTES = [
  {
    n: "01",
    title: "The invisible particle layer",
    story:
      "A decorative visual effect passed typecheck, build, code review, and an independent verifier — and shipped to production rendering invisibly. Every check was green; the feature did not exist on screen. Code-correct is not render-correct.",
    rule: "The Verifier checks code, not pixels. A human eyeballs every visual change on the rendered preview before merge.",
  },
  {
    n: "02",
    title: "The label under the box",
    story:
      "The loop diagram on this very page shipped with its 'PR opened' label half-hidden: an adjacent box was drawn after the text and covered it, so it rendered as just 'PR' from day one. Every review passed it — because every review read the code, where the label is plainly present.",
    rule: "DOM presence is not visible rendering. For 'is it showing?' questions, get pixel truth: screenshot the render.",
    receipt: {
      label: "Fixed in PR #36",
      href: "https://github.com/roymcfarland/agent_handoff_guide/pull/36",
    },
  },
  {
    n: "03",
    title: "The criterion the Builder never saw",
    story:
      "A verifier prompt picked up a requirement that was never in the builder prompt. The REJECT it produced was guaranteed from the moment the prompts diverged — no Builder can satisfy a rule it was never given. The work was fine; the paperwork disagreed with itself.",
    rule: "Before a verifier prompt is final, diff its checklist against the builder prompt. Every check must trace to an instruction.",
  },
  {
    n: "04",
    title: "Tests with teeth",
    story:
      "A slice shipped regression tests for a fix — and the suite stayed green when the fix was reverted. The tests could not fail, so the green proved nothing. It surfaced only because someone tried to make them fail.",
    rule: "Negative-control every new test: revert the fix, confirm red, restore. A test that cannot fail is decoration.",
  },
  {
    n: "05",
    title: "The mock that swallowed the point",
    story:
      "An acceptance test passed by mocking the very data source its invariants were about. The test verified the mock, not the behavior — vacuously green, indefinitely.",
    rule: "Pin the mock boundary in the builder prompt: mock only the environment shim that cannot load in the test runner, never the data under test.",
  },
  {
    n: "06",
    title: "'Approved and merged' was neither",
    story:
      "Post-merge housekeeping ran off a report instead of the repository, and a branch was force-deleted whose PR had never actually merged. It was recoverable — git prints the orphaned commit — but only luck made anyone look.",
    rule: "Reports are claims. Before anything destructive, sync main and assert the commit is actually there.",
  },
  {
    n: "07",
    title: "Temporal proximity, the most seductive wrong lead",
    story:
      "A deploy check went red minutes after a merge, and the diff took the blame. It was the platform's build cache. Another week it was a security advisory published that morning; another, a date-dependent test that picked its victim by the calendar. None of them were the code.",
    rule: "Reproduce the failure on the exact commit and force a clean rebuild before blaming the diff you just merged.",
  },
  {
    n: "08",
    title: "The non-goal discovered at verify time",
    story:
      "A feature crossed a boundary the project's own rules document had already drawn, and the verifier correctly rejected it. A full build cycle was spent discovering a sentence that had been sitting in the spec the whole time.",
    rule: "Grep the non-goals for the feature's keywords at scoping. If it crosses one, the docs-amendment PR merges first.",
  },
  {
    n: "09",
    title: "Three hundred eighty orphaned previews",
    story:
      "Per-branch preview deployments quietly outlive the branches that created them. On one project, roughly three hundred eighty had accumulated across two hundred seventy-five deleted branches before anyone looked.",
    rule: "After-merge housekeeping includes the hosting platform, not just git. Confirm the dead branch's previews died with it.",
  },
  {
    n: "10",
    title: "The stat that counted itself wrong",
    story:
      "The overview of this site claimed eleven prompts and templates; the library contained ten. Nobody lied — a hand-written number simply outlived the thing it counted. It now derives from the data and cannot drift.",
    rule: "Derive every public number from the codebase at build time. A hand-written count is a drift bomb with a fuse of unknown length.",
    receipt: {
      label: "Fixed in PR #35",
      href: "https://github.com/roymcfarland/agent_handoff_guide/pull/35",
    },
  },
] as const;

/* ─────────────────────────────────────────────────────────────────────────── */
/* FIELD NOTES — WORKED EXAMPLE                                                */
/* One slice of this repo told end to end, receipts included. The capstone:    */
/* the first fix was wrong and the loop caught it.                             */
/* ─────────────────────────────────────────────────────────────────────────── */

export const WORKED_EXAMPLE = {
  eyebrow: "WORKED EXAMPLE · PR #36",
  headline: "One slice, end to end — including the wrong first fix.",
  intro:
    "Note 02's bug, in full. This is a real slice from this repo's own history: the redraw of the loop figure two sections up. Every step below links the public artifact it produced and names the doctrine it exercised. Its value is not that the run was clean — it is that the first fix was wrong, and the loop caught it before production did.",
  prUrl: "https://github.com/roymcfarland/agent_handoff_guide/pull/36",
  steps: [
    {
      n: "01",
      doctrine: "Pre-confirmed facts",
      title: "The scope pinned the geometry before any build",
      body: "The HANDOFF for the slice carried the figure's exact state as pre-confirmed facts — viewBox 920×556, every box coordinate, the color-token names, the stage-tag mapping — so the Builder started grounded instead of re-deriving the file.",
      receipt: {
        label: "Slice scope, quoted in the PR body",
        href: "https://github.com/roymcfarland/agent_handoff_guide/pull/36",
      },
    },
    {
      n: "02",
      doctrine: "Ceremony sizing",
      title: "Built in direct-execution mode, gates held",
      body: "A single-file SVG edit is exactly the shape the ceremony-sizing block permits to skip the round-trip: the Advisor built it directly — on a branch, as a PR, with typecheck and build run before every push. The round-trip was dropped; no gate was.",
      receipt: {
        label: "Commit dc5c371 — the redraw",
        href: "https://github.com/roymcfarland/agent_handoff_guide/commit/dc5c371",
      },
    },
    {
      n: "03",
      doctrine: "Green is not shipped",
      title: "Verification beyond green checks caught a dormant bug",
      body: "Typecheck and build passed. Then every new string was measured against its box with getComputedTextLength, and a full-figure screenshot was taken — which exposed that the figure's 'PR opened' label had been half-hidden under an adjacent box since the day it first shipped. Code review had passed it for months, because in the code the label is plainly there.",
      receipt: {
        label: "Fix documented in the same commit",
        href: "https://github.com/roymcfarland/agent_handoff_guide/commit/dc5c371",
      },
    },
    {
      n: "04",
      doctrine: "The gatekeeper's eyeball",
      title: "The human caught what the measurements graded as fine",
      body: "On the preview, the gatekeeper flagged the repositioned label: not centered between the two boxes. The numbers said centered — the label sat at the mathematical midpoint. The render read otherwise. For visual work, the human eyeball on the rendered preview is the load-bearing gate, and it fired.",
      receipt: {
        label: "First fix, on the same branch",
        href: "https://github.com/roymcfarland/agent_handoff_guide/commit/3a9d7d4",
      },
    },
    {
      n: "05",
      doctrine: "Verdict triage",
      title: "The first fix treated the symptom — and was wrong",
      body: "The label was redrawn above the boxes and nudged left. The gatekeeper pushed back: still not centered, and likely invisible at mobile scale. The correct move at that point was not a third nudge — it was triage: is the defect in the label, or in the assumption behind every fix so far?",
      receipt: {
        label: "The Advisor's first-fix note",
        href: "https://github.com/roymcfarland/agent_handoff_guide/pull/36#issuecomment-4907067420",
      },
    },
    {
      n: "06",
      doctrine: "Recon before re-scoping",
      title: "Recon found the real cause: the gap, not the label",
      body: "Measurement, not eyeballing: the gap between the boxes was 40px and the label 36px — two pixels of air per side can never read as centered, and at the mobile render those margins vanish entirely. The fix widened the gap itself to 60px, re-measured the label to symmetric 10px margins, and proved it with a dual-scale screenshot — desktop and the 680px mobile floor side by side.",
      receipt: {
        label: "Commit 60e7a33 + the recon note",
        href: "https://github.com/roymcfarland/agent_handoff_guide/pull/36#issuecomment-4907125812",
      },
    },
    {
      n: "07",
      doctrine: "Amendment, not re-issue",
      title: "Every fix landed on the same branch, same PR",
      body: "Three commits, one review surface. No re-issued slice, no second PR, no thrown-away work — the amendments extended the original scope by exactly the named change each time.",
      receipt: {
        label: "The full three-commit history",
        href: "https://github.com/roymcfarland/agent_handoff_guide/pull/36/commits",
      },
    },
    {
      n: "08",
      doctrine: "After the merge",
      title: "Merged, verified on main, then verified in production",
      body: "After the gatekeeper merged: main synced and the merge asserted from the repo, the branch pruned only after that check, and the deployed bundle probed for the new figure. The loop closed at the live site, not at the merge button.",
      receipt: {
        label: "PR #36 — merged",
        href: "https://github.com/roymcfarland/agent_handoff_guide/pull/36",
      },
    },
  ],
} as const;

/* ─────────────────────────────────────────────────────────────────────────── */
/* BYLINE — who maintains this, in operating-credential voice                  */
/* ─────────────────────────────────────────────────────────────────────────── */

export const BYLINE = {
  text: "Written and maintained by Roy McFarland of Worksmith Labs — with the framework it documents. Every change to this site ships as an Advisor-scoped slice, an independent verification, and a human merge.",
  proofLabel: "The merged-PR history is the résumé",
  proofHref:
    "https://github.com/roymcfarland/agent_handoff_guide/pulls?q=is%3Apr+is%3Amerged",
  profiles: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/roymcfarland/" },
    { label: "GitHub", href: "https://github.com/roymcfarland" },
    { label: "npm", href: "https://www.npmjs.com/~roymcfarland" },
  ],
} as const;

/* ─────────────────────────────────────────────────────────────────────────── */
/* FAQ — the hard objections, answered without hedging                         */
/* Rendered in References; also emitted as FAQPage JSON-LD.                    */
/* ─────────────────────────────────────────────────────────────────────────── */

export const FAQ_INTRO = {
  headline: "Objections, answered plainly.",
  body: "The questions a skeptical engineering lead should ask before adopting any of this. Short answers here; the sections above carry the evidence.",
} as const;

export const FAQ = [
  {
    q: "Why two models? Can't one model review its own work?",
    a: "It can, and it will grade generously. A model reviewing its own output inherits its own framing — the blind spot that produced the bug also reviews the bug. A second model in a clean context, reading only the PR body, diff, and scope doc, breaks that correlation. Not perfectly — which is why verdicts must cite evidence and a human holds the merge button — but the documented failure modes of LLM-as-judge setups are exactly why the Verifier's inputs stay narrow and its verdicts stay evidence-bound.",
  },
  {
    q: "Why isn't CI plus human review enough?",
    a: "CI checks what you already encoded: types, tests, builds. Human review catches what a person has attention left to catch — and attention is the resource agent-speed development exhausts first. The Verifier sits between: it reads every PR against the project's declared intent (non-goals, conventions, architecture) at machine patience. It replaces neither; it turns the human's merge decision into a review of evidence instead of a re-derivation of it.",
  },
  {
    q: "What does a slice actually cost?",
    a: "Minutes and cents, mostly. A verifier pass on a mid-size PR is a few minutes of wall clock, and token spend measured in cents to a few dollars depending on the model. The comparison that matters: one caught REJECT — an unmet criterion, a scope violation, a green-but-dead feature — routinely saves the afternoon that debugging it after merge would have cost. And ceremony sizing exists precisely so small changes never pay the full round-trip.",
  },
  {
    q: "Doesn't the Advisor just move the trust problem up a level?",
    a: "The Advisor's outputs are all inspectable artifacts — a scope document, two prompts, a triage note. Nothing it produces is trusted blindly: the Builder's work is verified independently, the Verifier's verdict is itself triaged against the diff, and a human makes every merge call. The trust anchor never moves; what changes is how much evidence reaches it.",
  },
  {
    q: "Does this work for a solo developer?",
    a: "Yes — the roles are hats, not headcount. A solo operator runs the Builder in one session, the Verifier in a fresh context of a different model, and wears the Advisor and gatekeeper hats personally. The discipline that matters survives intact: fresh context for review, evidence-bound verdicts, one slice in flight, a human on the merge button.",
  },
  {
    q: "Which models and tools should I use?",
    a: "The framework is deliberately tool-agnostic — a documented non-goal, not an oversight. Any coding-capable model can build; any different model family can verify; the prompts are plain markdown. Prefer different model families for Builder and Verifier to reduce correlated blind spots, and re-evaluate your picks as models change — the loop is designed to outlive any particular model.",
  },
] as const;
