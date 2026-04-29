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
  { id: "prompts", label: "Core Prompts", number: "04" },
  { id: "practices", label: "Best Practices", number: "05" },
  { id: "moonshots", label: "Moonshots", number: "06" },
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
