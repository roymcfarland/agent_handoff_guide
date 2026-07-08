/*
 * generate-prompts — emits the prompt library as real markdown files.
 *
 * Source of truth is client/src/lib/content.ts; this script is the only
 * writer of prompts/ and client/public/llms.txt. CI regenerates and fails
 * on any diff, so the files can never drift from the app (the repo's own
 * generated-artifact rule: the load-bearing check is re-running the
 * generator and asserting zero diff).
 *
 * Run: pnpm generate:prompts
 */
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  BUILD_VERIFY_MARKDOWN,
  HANDOFF_TEMPLATE,
  META_BUILDER_PR_DESCRIPTION,
  META_BUILDER_PROMPT_PHASE_2,
  META_VERIFIER_PR_COMMENT,
  META_VERIFIER_PROMPT_PHASE_1,
  META_VERIFIER_PROMPT_PHASE_2,
  PROMPT_LIBRARY,
} from "../client/src/lib/content";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "prompts");
const SITE = "https://www.worksmithlabs.com";
const REPO = "https://github.com/roymcfarland/agent_handoff_guide";
const RAW = "https://raw.githubusercontent.com/roymcfarland/agent_handoff_guide/main/prompts";

function header(exportName: string): string {
  return [
    "<!--",
    "  GENERATED FILE — do not edit by hand.",
    `  Source of truth: client/src/lib/content.ts (${exportName})`,
    "  Regenerate: pnpm generate:prompts",
    "  Agent Handoff Framework by Roy McFarland (github.com/roymcfarland).",
    "  License: MIT (same as the repository) — vendor freely.",
    `  Guide: ${SITE}/`,
    "-->",
    "",
  ].join("\n");
}

interface Emitted {
  filename: string;
  title: string;
  whenToUse: string;
}

const emitted: Emitted[] = [];

function emit(
  filename: string,
  exportName: string,
  title: string,
  whenToUse: string,
  body: string
): void {
  writeFileSync(join(OUT_DIR, filename), header(exportName) + body.trimEnd() + "\n");
  emitted.push({ filename, title, whenToUse });
}

rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });

/* Library prompts — filenames come from the library itself. */
for (const scenario of PROMPT_LIBRARY) {
  for (const item of scenario.items) {
    emit(item.filename, `PROMPT_LIBRARY:${item.id}`, item.title, item.whenToUse, item.body);
  }
}

/* Standalone documents. */
emit(
  "handoff-template.md",
  "HANDOFF_TEMPLATE",
  "HANDOFF.md — slice template",
  "Copy into your repo as HANDOFF.md and fill per slice.",
  HANDOFF_TEMPLATE
);
emit(
  "build-and-verify.md",
  "BUILD_VERIFY_MARKDOWN",
  "Build & Verify — drop-in workflow spec",
  "Save as docs/build-and-verify.md in your repo.",
  BUILD_VERIFY_MARKDOWN
);

/* META-PR prompts. */
emit(
  "meta-verifier-phase-1.md",
  "META_VERIFIER_PROMPT_PHASE_1",
  "META-PR Verifier — HANDOFF.md changes (Phase 1)",
  "When the PR modifies HANDOFF.md itself; the Builder Brief in the PR body is the scope.",
  META_VERIFIER_PROMPT_PHASE_1
);
emit(
  "meta-verifier-phase-2.md",
  "META_VERIFIER_PROMPT_PHASE_2",
  "META-PR Verifier — PROJECT.md changes (Phase 2)",
  "When the PR modifies PROJECT.md itself; the Spec Update Proposal is the scope.",
  META_VERIFIER_PROMPT_PHASE_2
);
emit(
  "meta-spec-editor-builder.md",
  "META_BUILDER_PROMPT_PHASE_2",
  "Spec-Editor Builder — drafts a Spec Update Proposal",
  "Turns a calibration or drift finding into a structured PROJECT.md change proposal.",
  META_BUILDER_PROMPT_PHASE_2
);
emit(
  "meta-builder-pr-description.md",
  "META_BUILDER_PR_DESCRIPTION",
  "META-PR description — fill-in template",
  "PR body template for spec-doc changes.",
  META_BUILDER_PR_DESCRIPTION
);
emit(
  "meta-verifier-pr-comment.md",
  "META_VERIFIER_PR_COMMENT",
  "META-PR Verifier report — fill-in template",
  "Verdict comment template for spec-doc changes.",
  META_VERIFIER_PR_COMMENT
);

/* prompts/README.md — license + vendoring instructions (also generated). */
const readme = [
  header("scripts/generate-prompts.ts"),
  "# Agent Handoff Framework — prompt library",
  "",
  `The copy-paste prompts, templates, and drop-in docs from [${SITE.replace("https://", "")}](${SITE}/) — the Agent Handoff Framework by [Roy McFarland](https://github.com/roymcfarland) ([npm](https://www.npmjs.com/~roymcfarland)) — emitted as plain markdown so you can vendor, diff, and fetch them directly.`,
  "",
  "**License:** MIT, same as the repository — use them in private repos, client work, and commercial projects. Attribution appreciated, not required.",
  "",
  "## Vendor the set",
  "",
  "```bash",
  "# whole directory, no git history",
  "npx degit roymcfarland/agent_handoff_guide/prompts prompts/ahf",
  "",
  "# or a single file",
  `curl -O ${RAW}/prompt-04-builder.md`,
  "```",
  "",
  "## Contents",
  "",
  ...emitted.map(e => `- [\`${e.filename}\`](./${e.filename}) — **${e.title}.** ${e.whenToUse}`),
  "",
  `These files are generated from [\`client/src/lib/content.ts\`](../client/src/lib/content.ts) by \`pnpm generate:prompts\`; CI fails on any drift. Do not edit them here — change the source and regenerate.`,
  "",
].join("\n");
writeFileSync(join(OUT_DIR, "README.md"), readme);

/* client/public/llms.txt — the machine-readable front door. */
const llms = [
  "# Agent Handoff Framework",
  "",
  "> A working guide for shipping real software with AI coding agents: three roles (an Advisor scopes slices and drafts prompts, a Builder executes, a Verifier returns evidence-backed verdicts — a human merges), a three-file document schema (PROJECT.md / CHANGELOG.md / HANDOFF.md), a copy-paste prompt library, and failure-mode guardrails. Created by Roy McFarland (Worksmith Labs); the site is maintained with the framework it documents, and its merged-PR history is the public audit trail.",
  "",
  "Author: Roy McFarland (https://github.com/roymcfarland · https://www.npmjs.com/~roymcfarland)",
  `Site: ${SITE}/`,
  `Repository: ${REPO}`,
  `Merged-PR audit trail: ${REPO}/pulls?q=is%3Apr+is%3Amerged`,
  "",
  "## Prompts (raw markdown, MIT-licensed)",
  "",
  ...emitted.map(e => `- [${e.title}](${RAW}/${e.filename}): ${e.whenToUse}`),
  "",
  "## Key concepts",
  "",
  "- Verdict triage: a Verifier REJECT is evidence, not a command — first ask whether the cited defect is real or the check itself is defective.",
  "- Ceremony sizing: the loop is a tool, not a tax — small content-only changes may be built directly, but every gate (PR, ledger, real checks, live verification) holds.",
  "- After the merge: verify the merge landed, confirm the ledger recorded itself, sweep branches and preview deployments, verify production — the loop closes at the live site, not the merge button.",
  "- Green is not shipped: code-correct is not behavior-correct; visual changes get a human eyeball on the rendered preview, and anything environment-dependent gets verified in production.",
  "",
].join("\n");
writeFileSync(join(ROOT, "client/public/llms.txt"), llms);

console.log(`Wrote ${emitted.length + 1} files to prompts/ and client/public/llms.txt`);
