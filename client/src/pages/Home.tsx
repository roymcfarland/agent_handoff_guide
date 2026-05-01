/*
 * Home.tsx — Single-page Agent Handoff Framework guide.
 * Design philosophy: "The Engineer's Notebook" — graph-paper background, paper cards,
 * mono stamps, IBM Plex Serif display titles, drafting-red accent.
 *
 * IA (9 sections):
 *   01 Overview
 *   02 Diagnosis
 *   03 Document Schema
 *   04 Install on Existing Repo
 *   05 Prompt Library  (consolidated; scenario-ordered)
 *   06 Build & Verify
 *   07 After the Install (Phase 2 operation)
 *   08 META-PRs (PRs that change the spec itself)
 *   09 References
 *
 * Prompts are all rendered from PROMPT_LIBRARY inside the Prompt Library section,
 * grouped by scenario (Fresh Install / Recurring Loop / Recovery) in execution order.
 */

import { useState } from "react";
import { ArrowDown, Check, ChevronRight, Copy, ExternalLink, FileText } from "lucide-react";
import { toast } from "sonner";
import { BuildVerifyDiagram } from "@/components/BuildVerifyDiagram";
import {
  DiagramFigureLegend,
  DocumentCadenceDiagram,
  FailureModesMatrixDiagram,
  InstallPipelineDiagram,
  MetaPRScopeDiagram,
  PhaseModelDiagram,
  PromptScenariosDiagram,
  ReferenceArchitectureDiagram,
} from "@/components/diagrams";
import { MarkdownBlock } from "@/components/MarkdownBlock";
import { PromptCard } from "@/components/PromptCard";
import { SectionHeader } from "@/components/SectionHeader";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  BUILD_VERIFY_MARKDOWN,
  BUILD_VERIFY_PRINCIPLES,
  BUILD_VERIFY_STAGES,
  ESCALATION_RULE,
  FAILURE_MODES,
  HANDOFF_TEMPLATE,
  INSTALL_ANTI_PATTERNS,
  INSTALL_STEPS,
  MODEL_PAIRINGS,
  MODEL_PAIRINGS_FRESHNESS,
  PHASE_TWO_CALIBRATION,
  PHASE_TWO_DORMANT,
  PHASE_TWO_FINDINGS,
  PHASE_TWO_BUILDER_PR_DESCRIPTION,
  PHASE_TWO_BUILDER_PROMPT,
  PHASE_TWO_VERIFIER_PR_COMMENT,
  PHASE_TWO_INSTALL_COMPLETE,
  PHASE_TWO_INTRO,
  PHASE_TWO_LEVERAGE,
  PHASE_TWO_PHASES,
  PHASE_TWO_PROMPT,
  PHASE_TWO_TRIAGE,
  PHASE_TWO_WIRING,
  META_INTRO,
  META_WHEN_TO_USE,
  META_VERIFIER_PROMPT_PHASE_1,
  META_VERIFIER_PROMPT_PHASE_2,
  META_BUILDER_PROMPT_PHASE_2,
  META_BUILDER_PR_DESCRIPTION,
  META_VERIFIER_PR_COMMENT,
  PROMPT_LIBRARY,
  REFERENCES,
  REFERENCE_READING_ORDER,
  REFERENCE_READING_ORDER_INTRO,
  REFERENCE_NOTE,
  SCHEMA_FILES,
  type LibraryPrompt,
} from "@/lib/content";

export default function Home() {
  return (
    <div className="graph-paper min-h-screen text-foreground">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Diagnosis />
        <Schema />
        <Install />
        <Prompts />
        <BuildAndVerify />
        <PhaseTwo />
        <MetaPRs />
        <References />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section
      id="overview"
      aria-labelledby="overview-heading"
      className="relative"
    >
      <div className="container grid gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:gap-12 lg:py-28">
        <aside className="lg:col-span-3 lg:border lg:border-border lg:bg-background/80 lg:p-5 lg:shadow-[var(--card-shadow)]">
          <div className="stamp">FILE 00 / OVERVIEW</div>
          <dl className="mt-6 space-y-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <div>
              <dt className="text-foreground/60">Subject</dt>
              <dd className="mt-1 text-foreground">Agent handoff loop</dd>
            </div>
            <div>
              <dt className="text-foreground/60">Audience</dt>
              <dd className="mt-1 text-foreground">
                Engineering teams shipping with AI agents
              </dd>
            </div>
            <div>
              <dt className="text-foreground/60">Goal</dt>
              <dd className="mt-1 text-foreground">Execution over drift</dd>
            </div>
          </dl>
        </aside>

        <div className="lg:col-span-9 lg:border lg:border-border lg:bg-card/35 lg:p-8 lg:shadow-[var(--card-shadow)] xl:p-10">
          <h1
            id="overview-heading"
            className="text-balance font-display text-5xl font-bold leading-[0.98] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            A working guide for <span className="pen-circle">handing off</span>{" "}
            work between AI agents.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/80 sm:text-xl">
            The recurring failure pattern is not just model weakness; it is that
            the <em>document the agent works against</em> is doing too many jobs
            at once. This guide replaces the single bloated handoff file with
            three disciplined artifacts and a copy-paste prompt library —
            organized in the order your team actually runs them. Citations for
            the workflow&apos;s empirical hooks live in{" "}
            <a
              href="#references"
              className="ink-link font-medium text-foreground"
            >
              References
            </a>
            .
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#prompts"
              className="inline-flex items-center gap-2 border border-foreground bg-foreground px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-background transition-colors duration-150 hover:bg-primary hover:border-primary hover:text-primary-foreground"
            >
              Jump to the Prompt Library
              <ArrowDown className="h-4 w-4" strokeWidth={2.5} />
            </a>
            <a
              href="#schema"
              className="inline-flex items-center gap-2 border border-border bg-background px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-foreground transition-colors duration-150 hover:border-foreground"
            >
              Read the schema first
            </a>
          </div>

          {/* Quick stats / principles strip */}
          <div className="mt-16 grid grid-cols-1 border-t border-border sm:grid-cols-3">
            {[
              {
                k: "3",
                v: "Artifacts — PROJECT.md, CHANGELOG.md, HANDOFF.md (each with one job)",
              },
              {
                k: "11",
                v: "Library prompts & templates — install, recurring loop, recovery",
              },
              {
                k: "2",
                v: "Models per slice — Builder session, then independent Verifier",
              },
            ].map(item => (
              <div
                key={item.v}
                className="border-b border-border px-5 py-6 sm:border-b-0 sm:border-r last:sm:border-r-0"
              >
                <div className="font-display text-5xl font-bold text-primary">
                  {item.k}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container mt-14 lg:mt-20">
        <ReferenceArchitectureDiagram />
        <DiagramFigureLegend />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function Diagnosis() {
  return (
    <section
      id="diagnosis"
      aria-labelledby="diagnosis-heading"
      className="border-t border-border bg-background/60"
    >
      <div className="container grid gap-12 py-20 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-4">
          <SectionHeader
            id="diagnosis-heading"
            number="02"
            label="DIAGNOSIS"
            title="Where agent handoffs actually break down."
            kicker={
              <>
                These are the failure modes that show up over and over when
                teams try to chain agents together. They are usually{" "}
                <em>not</em> a model problem — they are a{" "}
                <span className="pen-circle">workflow</span> problem.
              </>
            }
          />
        </div>

        <div className="lg:col-span-8 lg:mt-2">
          <FailureModesMatrixDiagram />
        </div>

        <div className="lg:col-span-12">
          <ol className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2">
            {FAILURE_MODES.map((mode, i) => (
              <li
                key={mode.title}
                className="paper-card flex flex-col gap-3 p-6"
                style={{ boxShadow: "none" }}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs font-bold tracking-widest text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl font-bold leading-snug">
                    {mode.title}
                  </h3>
                </div>
                <p className="text-[15px] leading-relaxed text-foreground/80">
                  {mode.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function Schema() {
  return (
    <section
      id="schema"
      aria-labelledby="schema-heading"
      className="border-t border-border"
    >
      <div className="container py-20 lg:py-24">
        <SectionHeader
          id="schema-heading"
          number="03"
          label="DOCUMENT SCHEMA"
          title="Stop using one handoff document. Use three."
          kicker={
            <>
              The single highest-leverage change you can make. Splitting the doc
              into three artifacts — each with a strict role — directly attacks
              context rot and reduces the chance that agents re-read settled
              history every time they boot.
            </>
          }
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {SCHEMA_FILES.map((f, idx) => (
            <article
              key={f.file}
              className="paper-card relative flex flex-col p-6"
            >
              <div className="absolute -top-3 left-6 bg-background px-2 font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
                FILE 0{idx + 1}
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <code className="font-mono text-lg font-bold text-foreground">
                  {f.file}
                </code>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {f.cadence}
                </span>
              </div>
              <p className="mt-1 font-display text-base font-semibold text-primary">
                {f.role}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-foreground/80">
                {f.description}
              </p>
              <ul className="mt-5 space-y-2 border-t border-border pt-4">
                {f.contains.map(line => (
                  <li
                    key={line}
                    className="flex gap-3 text-sm leading-relaxed text-foreground/85"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-px w-3 shrink-0 bg-primary"
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16 lg:mt-20">
          <DocumentCadenceDiagram />
        </div>

        <TemplateBlock />
      </div>
    </section>
  );
}

function TemplateBlock() {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(HANDOFF_TEMPLATE);
      setCopied(true);
      toast.success("HANDOFF.md template copied");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Copy failed — select the text manually");
    }
  };

  return (
    <div className="mt-16 grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <div className="stamp">TEMPLATE</div>
        <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
          The HANDOFF.md the agent works against.
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          This is the template the Closeout agent fills in for the next Builder.
          Keep the Acceptance Criteria literal and the Constraints aggressive —
          they are the guardrails that keep the agent from drifting.
        </p>
      </div>
      <div className="paper-card overflow-hidden lg:col-span-8">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            HANDOFF.md
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 border border-border bg-background px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" strokeWidth={2} />
                Copy
              </>
            )}
          </button>
        </div>
        <pre className="graph-paper-dense overflow-x-auto px-5 py-5 font-mono text-[13px] leading-relaxed">
          {HANDOFF_TEMPLATE}
        </pre>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────────── */

function Install() {
  return (
    <section
      id="install"
      aria-labelledby="install-heading"
      className="border-t border-border"
    >
      <div className="container py-20 lg:py-24">
        <SectionHeader
          id="install-heading"
          number="04"
          label="INSTALL ON EXISTING REPO"
          title="How to bootstrap the loop on a codebase that already exists."
          kicker={
            <>
              The brittle part is the install, not the diagram. The honest
              order: reverse-engineer{" "}
              <code className="font-mono text-foreground">PROJECT.md</code> from
              the code, edit it with the human-only context, sanity-check it
              with the Verifier, write a tiny first slice, then run a
              calibration cycle and update the doc based on what surfaced.
            </>
          }
        />

        <div className="mt-16 lg:mt-20">
          <InstallPipelineDiagram />
        </div>

        {/* The five steps */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="stamp">FIVE STEPS · ~90 MIN</div>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
              The ~90-minute install.
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Each step has a single owner, a single output, and a corresponding
              prompt or checklist in the{" "}
              <a
                href="#prompts"
                className="underline decoration-primary underline-offset-4 hover:text-foreground"
              >
                Prompt Library below
              </a>
              . Step 02 — your edit pass on{" "}
              <code className="font-mono text-foreground">PROJECT.md</code> — is
              the highest-leverage 30 minutes you will spend on this project.
              Don&apos;t skip it.
            </p>
          </div>
          <div className="lg:col-span-8">
            <ol className="divide-y divide-border border-y border-border">
              {INSTALL_STEPS.map(step => (
                <li key={step.n} className="grid grid-cols-12 gap-6 py-6">
                  <div className="col-span-12 sm:col-span-2">
                    <div className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                      Step {step.n}
                    </div>
                    <div className="mt-1 font-mono text-[10.5px] uppercase tracking-widest text-muted-foreground">
                      {step.duration}
                    </div>
                  </div>
                  <div className="col-span-12 sm:col-span-10">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-[10.5px] uppercase tracking-widest text-muted-foreground">
                        {step.actor}
                      </span>
                      {step.promptRef && (
                        <a
                          href={`#prompt-${step.promptRef}`}
                          className="inline-flex items-center gap-1 border border-border bg-background px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          <FileText className="h-3 w-3" strokeWidth={2.5} />
                          See prompt
                        </a>
                      )}
                    </div>
                    <h4 className="mt-1 font-display text-xl font-bold leading-snug text-foreground">
                      {step.title}
                    </h4>
                    <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-foreground/85">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Anti-patterns block */}
        <div className="mt-16">
          <div className="stamp">ANTI-PATTERNS · DO NOT DO THESE</div>
          <h3 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight">
            Two install mistakes that look productive and weaken the loop.
          </h3>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {INSTALL_ANTI_PATTERNS.map(p => (
              <article
                key={p.title}
                className="paper-card flex flex-col gap-4 border-l-4 border-l-primary p-6"
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 font-mono text-base font-bold text-primary"
                  >
                    ✕
                  </span>
                  <h4 className="font-display text-xl font-bold leading-snug text-foreground">
                    {p.title}
                  </h4>
                </div>
                <div>
                  <div className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground">
                    Why it&apos;s tempting
                  </div>
                  <p className="mt-1 text-[14px] leading-relaxed text-foreground/85">
                    {p.why}
                  </p>
                </div>
                <div>
                  <div className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-primary">
                    What it costs you
                  </div>
                  <p className="mt-1 text-[14px] leading-relaxed text-foreground/85">
                    {p.cost}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────────── */
/* PROMPT LIBRARY — consolidated, grouped by execution scenario.             */
/* ───────────────────────────────────────────────────────────────────────── */

function Prompts() {
  return (
    <section
      id="prompts"
      aria-labelledby="prompts-heading"
      className="border-t border-border bg-background/60"
    >
      <div className="container py-20 lg:py-24">
        <SectionHeader
          id="prompts-heading"
          number="05"
          label="PROMPT LIBRARY"
          title="Every prompt in one place — organized in the order you run them."
          kicker={
            <>
              Three scenarios, execution-ordered. Click a card to copy the
              prompt or template to your clipboard. Every item is named after
              the file your team would save it as in{" "}
              <code className="font-mono text-foreground">docs/prompts/</code>.
            </>
          }
        />

        {/* Scenario index — small horizontal navigator */}
        <nav
          aria-label="Prompt scenarios"
          className="mt-10 grid gap-3 border-y border-border py-4 sm:grid-cols-3"
        >
          {PROMPT_LIBRARY.map(group => (
            <a
              key={group.scenarioTag}
              href={`#scenario-${group.scenarioTag.toLowerCase()}`}
              className="flex items-baseline gap-3 px-2 py-1 transition-colors hover:text-foreground"
            >
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
                {group.scenarioTag}
              </span>
              <span className="font-display text-[15px] font-semibold text-foreground/90">
                {group.scenario}
              </span>
              <span className="ml-auto font-mono text-[10.5px] uppercase tracking-widest text-muted-foreground">
                {group.items.length}
              </span>
            </a>
          ))}
        </nav>

        <div className="mt-16 lg:mt-20">
          <PromptScenariosDiagram />
        </div>

        {/* The groups */}
        <div className="mt-16 space-y-20">
          {PROMPT_LIBRARY.map(group => (
            <PromptGroup key={group.scenarioTag} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PromptGroup({
  group,
}: {
  group: {
    scenario: string;
    scenarioTag: string;
    cadence: string;
    intro: string;
    items: LibraryPrompt[];
  };
}) {
  return (
    <div id={`scenario-${group.scenarioTag.toLowerCase()}`}>
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="stamp">SCENARIO · {group.scenarioTag}</div>
          <h3 className="mt-3 font-display text-3xl font-bold leading-tight text-foreground">
            {group.scenario}
          </h3>
          <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
            <span className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-primary">
              Cadence —
            </span>{" "}
            {group.cadence}
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">
            {group.intro}
          </p>
        </div>

        <div className="lg:col-span-8">
          <ol className="space-y-6">
            {group.items.map(item => (
              <li
                key={item.id}
                id={`prompt-${item.id}`}
                className="scroll-mt-28"
              >
                <PromptLibraryItem item={item} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function PromptLibraryItem({ item }: { item: LibraryPrompt }) {
  const label = `${item.kind === "template" ? "TEMPLATE" : item.kind === "checklist" ? "CHECKLIST" : "PROMPT"} ${item.order}`;
  const actorLabel =
    item.actor === "builder"
      ? "Builder LLM"
      : item.actor === "verifier"
        ? "Verifier LLM · clean context"
        : "Human";

  if (item.kind === "template" || item.body.length > 1800) {
    // Long content → MarkdownBlock for a scrollable viewer
    return (
      <article className="paper-card p-6">
        <header className="mb-5 flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-4">
          <div>
            <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
              {label}
            </div>
            <h4 className="mt-1 font-display text-xl font-bold leading-tight text-foreground">
              {item.title}
            </h4>
            <p className="mt-1 font-mono text-[10.5px] uppercase tracking-widest text-muted-foreground">
              Actor — {actorLabel}
            </p>
          </div>
        </header>
        <p className="mb-3 text-[14px] leading-relaxed text-foreground/85">
          <span className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-primary">
            When —
          </span>{" "}
          {item.whenToUse}
        </p>
        <p className="mb-5 text-[14px] leading-relaxed text-muted-foreground">
          <span className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-foreground/70">
            Context —
          </span>{" "}
          {item.context}
        </p>
        <MarkdownBlock
          filename={item.filename}
          description={label}
          body={item.body}
          toastLabel={item.toastLabel}
        />
      </article>
    );
  }

  return (
    <article className="paper-card p-6">
      <header className="mb-5 border-b border-border pb-4">
        <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
          {label}
        </div>
        <h4 className="mt-1 font-display text-xl font-bold leading-tight text-foreground">
          {item.title}
        </h4>
        <p className="mt-1 font-mono text-[10.5px] uppercase tracking-widest text-muted-foreground">
          Actor — {actorLabel} · File —{" "}
          <code className="font-mono">{item.filename}</code>
        </p>
      </header>
      <p className="mb-3 text-[14px] leading-relaxed text-foreground/85">
        <span className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-primary">
          When —
        </span>{" "}
        {item.whenToUse}
      </p>
      <p className="mb-5 text-[14px] leading-relaxed text-muted-foreground">
        <span className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-foreground/70">
          Context —
        </span>{" "}
        {item.context}
      </p>
      <PromptCard
        label={label}
        title={item.title}
        subtitle={item.whenToUse}
        body={item.body}
      />
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* BUILD & VERIFY — two-LLM concept section (prompts live in the Library).    */
/* ─────────────────────────────────────────────────────────────────────────── */

function BuildAndVerify() {
  return (
    <section
      id="build-verify"
      aria-labelledby="build-verify-heading"
      className="border-t border-border"
    >
      <div className="container py-20 lg:py-24">
        <SectionHeader
          id="build-verify-heading"
          number="06"
          label="BUILD & VERIFY"
          title="One LLM builds. A different LLM verifies. You merge."
          kicker={
            <>
              The Builder can overstate completion on its own work. A second LLM
              in a clean context, reading the PR description, diff, and{" "}
              <code className="font-mono text-foreground">HANDOFF.md</code>,
              catches what the Builder may miss or under-report. The prompts and
              PR templates for this loop live in the{" "}
              <a
                href="#scenario-loop"
                className="underline decoration-primary underline-offset-4 hover:text-foreground"
              >
                Recurring Loop
              </a>{" "}
              scenario of the Prompt Library.
            </>
          }
        />

        {/* Stages A → B → C */}
        <div className="mt-14 grid gap-px bg-border md:grid-cols-3">
          {BUILD_VERIFY_STAGES.map(stage => (
            <article
              key={stage.tag}
              className="paper-card flex flex-col gap-4 p-6"
              style={{ boxShadow: "none" }}
            >
              <div className="flex items-center gap-4">
                <div
                  aria-hidden
                  className="flex h-12 w-12 shrink-0 items-center justify-center border border-foreground bg-background font-display text-2xl font-bold text-primary"
                >
                  {stage.tag}
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
                    Stage {stage.tag}
                  </div>
                  <h3 className="font-display text-xl font-bold leading-tight">
                    {stage.actor}
                  </h3>
                </div>
              </div>
              <p className="font-display text-sm font-semibold text-foreground/70">
                {stage.role}
              </p>
              <p className="text-[15px] leading-relaxed text-foreground/85">
                {stage.body}
              </p>
            </article>
          ))}
        </div>

        {/* Loop diagram */}
        <div className="mt-16 lg:mt-20">
          <BuildVerifyDiagram />
        </div>

        {/* Non-negotiable principles */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="stamp">NON-NEGOTIABLES</div>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
              Four rules that make the loop actually work.
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Skip these and the Verifier stops being independent. The
              separation between Builder, review inputs, and human merge
              decision is the entire point.
            </p>
          </div>
          <div className="lg:col-span-8">
            <ul className="divide-y divide-border border-y border-border">
              {BUILD_VERIFY_PRINCIPLES.map((p, i) => (
                <li key={p.title} className="grid grid-cols-12 gap-6 py-6">
                  <div className="col-span-12 sm:col-span-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="col-span-12 sm:col-span-10">
                    <h4 className="font-display text-xl font-bold leading-snug text-foreground">
                      {p.title}
                    </h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-foreground/80">
                      {p.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Model pairings */}
        <div className="mt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="stamp">MODEL PAIRINGS · STARTER MATRIX</div>
              <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
                Which LLMs to pair, and why.
              </h3>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
              The principle is{" "}
              <span className="font-semibold text-foreground">
                cross-distribution
              </span>
              , not specific brands. Pair a Builder with a Verifier from a
              different provider or model family so their failure modes are less
              correlated. Re-evaluate every quarter.
            </p>
          </div>

          <div className="mt-8 paper-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-border bg-secondary/40">
                    <th
                      scope="col"
                      className="px-5 py-3 font-mono text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground"
                    >
                      Tier
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-mono text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground"
                    >
                      Builder (writes code)
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-mono text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground"
                    >
                      Verifier (clean context)
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-mono text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground"
                    >
                      Why this pairing
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-right font-mono text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground"
                    >
                      Cost
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {MODEL_PAIRINGS.map(row => {
                    const isAnti = "isAntiPattern" in row && row.isAntiPattern;
                    return (
                      <tr
                        key={row.tier}
                        className={`border-b border-border last:border-b-0 align-top ${isAnti ? "bg-primary/5" : ""}`}
                      >
                        <td className="px-5 py-5 align-top">
                          <div
                            className={`font-mono text-[11px] font-bold uppercase tracking-widest ${isAnti ? "text-primary" : "text-foreground"}`}
                          >
                            {row.tier}
                          </div>
                        </td>
                        <td className="px-5 py-5 align-top">
                          <div className="font-display text-[15px] font-bold leading-snug text-foreground">
                            {row.builder}
                          </div>
                        </td>
                        <td className="px-5 py-5 align-top">
                          <div className="font-display text-[15px] font-bold leading-snug text-foreground">
                            {row.verifier}
                          </div>
                        </td>
                        <td className="px-5 py-5 align-top">
                          <p className="max-w-prose text-[14px] leading-relaxed text-foreground/85">
                            {row.rationale}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-right align-top">
                          <span
                            className={`inline-block border px-2 py-0.5 font-mono text-[10.5px] font-bold uppercase tracking-widest ${isAnti ? "border-primary text-primary" : "border-border text-muted-foreground"}`}
                          >
                            {row.cost}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-secondary/40 px-5 py-3">
              <span className="font-mono text-[10.5px] uppercase tracking-widest text-muted-foreground">
                Living document · Re-evaluate quarterly
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-widest text-muted-foreground">
                Last reviewed: {MODEL_PAIRINGS_FRESHNESS}
              </span>
            </div>
          </div>
        </div>

        {/* Escalation rule */}
        <div className="mt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="stamp">ESCALATION RULE · TWO FAILS = STOP</div>
              <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
                When a slice fails verification twice in a row.
              </h3>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
              The reflex is to swap the Builder model. The right move is to
              freeze the slice, read both Verifier reports, and re-scope the
              <code className="mx-1 font-mono text-foreground">HANDOFF.md</code>
              . Treat two FAILs as a slice-definition problem until proven
              otherwise.
            </p>
          </div>

          <div className="mt-8 paper-card overflow-hidden">
            <div className="border-b border-border bg-primary/5 px-6 py-5">
              <div className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-primary">
                The Rule
              </div>
              <p className="mt-2 font-display text-2xl font-bold leading-snug text-foreground">
                {ESCALATION_RULE.rule}
              </p>
              <p className="mt-3 max-w-prose text-[14px] leading-relaxed text-foreground/85">
                {ESCALATION_RULE.premise}
              </p>
            </div>

            <ol className="divide-y divide-border">
              {ESCALATION_RULE.steps.map(step => (
                <li key={step.n} className="grid grid-cols-12 gap-6 px-6 py-6">
                  <div className="col-span-12 sm:col-span-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                      Step {step.n}
                    </span>
                  </div>
                  <div className="col-span-12 sm:col-span-10">
                    <h4 className="font-display text-xl font-bold leading-snug text-foreground">
                      {step.title}
                    </h4>
                    <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-foreground/85">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="border-t border-border bg-secondary/40 px-6 py-5">
              <div className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-primary">
                Anti-patterns · Do not do these
              </div>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {ESCALATION_RULE.antiPatterns.map((p, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-[14px] leading-relaxed text-foreground/85"
                  >
                    <span
                      aria-hidden
                      className="mt-1 font-mono text-[11px] font-bold text-primary"
                    >
                      ✕
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Drop-in markdown spec */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="stamp">SPEC · DROP-IN</div>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
              The markdown your team can paste into a repo.
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Self-contained: explains the loop, lists the non-negotiables, and
              documents the operating cadence. Save it as{" "}
              <code className="font-mono text-foreground">
                docs/build-and-verify.md
              </code>
              .
            </p>
          </div>
          <div className="lg:col-span-8">
            <MarkdownBlock
              filename="docs/build-and-verify.md"
              description="Two-LLM workflow spec"
              body={BUILD_VERIFY_MARKDOWN}
              toastLabel="Build & Verify spec copied"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────────── */
/* SECTION 07 — AFTER THE INSTALL (PHASE 2 OPERATION)                        */
/* ───────────────────────────────────────────────────────────────────────── */

function PhaseTwo() {
  return (
    <section
      id="phase-2"
      aria-labelledby="phase-2-heading"
      className="border-t border-border bg-background/60"
    >
      <div className="container py-20 lg:py-24">
        <SectionHeader
          id="phase-2-heading"
          number="07"
          label="AFTER THE INSTALL"
          title="Closing the install does not end the Verifier. It graduates it into its real job."
          kicker={
            <>
              {PHASE_TWO_INTRO.body} The most common failure mode of dual-agent
              systems is treating{" "}
              <code className="font-mono text-foreground">VERDICT: CLOSE</code>{" "}
              as the finish line. It is the{" "}
              <span className="pen-circle">starting line</span> of Phase 2 —
              where the framework's leverage actually compounds.
            </>
          }
        />

        {/* Two-phase comparison */}
        <div className="mt-14 grid gap-px bg-border md:grid-cols-2">
          {PHASE_TWO_PHASES.map(phase => (
            <article
              key={phase.tag}
              className="paper-card flex flex-col gap-4 p-6"
              style={{ boxShadow: "none" }}
            >
              <div className="flex items-center gap-4">
                <div
                  aria-hidden
                  className="flex h-12 w-12 shrink-0 items-center justify-center border border-foreground bg-background font-display text-base font-bold text-primary"
                >
                  {phase.tag.replace("Phase ", "P")}
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
                    {phase.tag}
                  </div>
                  <h3 className="font-display text-xl font-bold leading-tight">
                    {phase.name}
                  </h3>
                </div>
              </div>
              <dl className="mt-2 grid gap-3 text-[14px] leading-relaxed text-foreground/85">
                <div>
                  <dt className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground">
                    Trigger
                  </dt>
                  <dd className="mt-1">{phase.trigger}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground">
                    Builder's job
                  </dt>
                  <dd className="mt-1">{phase.builderJob}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground">
                    Verifier's job
                  </dt>
                  <dd className="mt-1">{phase.verifierJob}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground">
                    Exit condition
                  </dt>
                  <dd className="mt-1">{phase.exit}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground">
                    Duration
                  </dt>
                  <dd className="mt-1">{phase.duration}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        <div className="mt-16 lg:mt-20">
          <PhaseModelDiagram />
        </div>

        {/* Leverage math callout */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="stamp">
              {PHASE_TWO_LEVERAGE.headline.toUpperCase()}
            </div>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
              Front-loaded effort, back-loaded payoff.
            </h3>
          </div>
          <div className="lg:col-span-8">
            <p className="text-[15px] leading-relaxed text-foreground/85">
              {PHASE_TWO_LEVERAGE.body}
            </p>
            <blockquote className="mt-6 border-l-4 border-l-primary bg-background px-6 py-5">
              <p className="text-balance font-display text-xl font-semibold leading-snug text-foreground">
                {PHASE_TWO_LEVERAGE.callout}
              </p>
            </blockquote>
          </div>
        </div>

        {/* What Phase 2 catches — table */}
        <div className="mt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="stamp">
                FIVE FINDING TYPES · INTENT-AWARE REVIEW
              </div>
              <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
                What other checks miss.
              </h3>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Linters, type-checkers, dependency scanners, and ordinary code
              review can miss these because they rarely carry an explicit model
              of the project&apos;s intent.{" "}
              <code className="font-mono text-foreground">PROJECT.md</code>{" "}
              gives the Verifier that model in reviewable form.
            </p>
          </div>

          <div className="mt-8 paper-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-border bg-secondary/40">
                    <th
                      scope="col"
                      className="px-5 py-3 font-mono text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground"
                    >
                      Finding type
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-mono text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground"
                    >
                      Example
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-mono text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground"
                    >
                      Why other checks miss it
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PHASE_TWO_FINDINGS.map(row => (
                    <tr
                      key={row.type}
                      className="border-b border-border last:border-b-0 align-top"
                    >
                      <td className="px-5 py-5 align-top">
                        <div className="font-display text-[15px] font-bold leading-snug text-foreground">
                          {row.type}
                        </div>
                      </td>
                      <td className="px-5 py-5 align-top">
                        <p className="max-w-prose text-[14px] leading-relaxed text-foreground/85">
                          {row.example}
                        </p>
                      </td>
                      <td className="px-5 py-5 align-top">
                        <p className="max-w-prose text-[14px] leading-relaxed text-foreground/85">
                          {row.miss}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Phase 2 Builder prompt — copyable */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="stamp">PROMPT · PHASE 2 BUILD</div>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
              The Builder prompt for code-PR authoring.
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Phase 2 has two prompts, not one. The Builder ships features
              against the spec; the Verifier audits them. Pair them every PR.
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-foreground/80">
              Six rules, but the spine is two:{" "}
              <em>read PROJECT.md before writing code</em>, and{" "}
              <em>write the PR description so the Verifier's job is easy</em>.
              Both rules trade a few seconds of Builder discipline for a
              Verifier pass on the first try.
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-foreground/80">
              Self-flagged{" "}
              <code className="font-mono text-foreground">SPEC-CONFLICT</code>{" "}
              notes are a feature, not a failure. They surface drift before code
              is written instead of after the Verifier rejects the PR.
            </p>
          </div>
          <div className="lg:col-span-8">
            <PromptCard
              label="PROMPT · PHASE 2 BUILD"
              title="Builder ships a PR against PROJECT.md"
              subtitle="Actor — Builder LLM (or human) · per task"
              body={PHASE_TWO_BUILDER_PROMPT}
            />
          </div>
        </div>
        {/* Phase 2 Verifier prompt — copyable */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="stamp">PROMPT · PHASE 2 AUDIT</div>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
              The Verifier prompt for code-PR review.
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Phase 1 audited the spec. Phase 2 audits each PR <em>against</em>{" "}
              the spec. Use this as your starting template and tune the
              strictness over the first few PRs.
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-foreground/80">
              Three verdicts:{" "}
              <code className="font-mono text-foreground">APPROVE</code>,{" "}
              <code className="font-mono text-foreground">REQUEST-CHANGES</code>
              , and{" "}
              <code className="font-mono text-foreground">
                SPEC-UPDATE-REQUIRED
              </code>
              . The third covers PRs that may obsolete part of{" "}
              <code className="font-mono text-foreground">PROJECT.md</code> and
              must pause until a META-PR or explicitly scoped combined spec
              update resolves the mismatch.
            </p>
          </div>
          <div className="lg:col-span-8">
            <PromptCard
              label="PROMPT · PHASE 2 AUDIT"
              title="Verifier audits a code PR against PROJECT.md"
              subtitle="Actor — Verifier LLM · clean context · per PR"
              body={PHASE_TWO_PROMPT}
            />
          </div>
        </div>
        {/* Phase 2 Builder PR description template — copyable */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="stamp">TEMPLATE · PHASE 2 PR BODY</div>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
              The Builder PR description — fill-in template.
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              The PR body the Builder writes gives the Verifier a declared
              scope, self-audit, and debt ledger to compare against the diff.
              Silent debt left out of this template is the expensive kind.
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-foreground/80">
              Three fields do most of the work: <em>Non-goals respected</em>{" "}
              (forces a re-read of PROJECT.md before the PR ships),{" "}
              <em>SPEC-CONFLICT notes</em> (surface drift before merge instead
              of after), and <em>Out-of-scope changes</em> (the most common
              MAJOR finding).
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-foreground/80">
              Mirrors the Phase 1{" "}
              <code className="font-mono text-foreground">
                builder-pr-description.md
              </code>{" "}
              template in section 06, with the{" "}
              <em>Acceptance Criteria self-audit</em> swapped for{" "}
              <em>Non-goals respected</em> — because Phase 2 reviews a code PR
              against PROJECT.md and the requested task, not a disposable
              HANDOFF.md.
            </p>
          </div>
          <div className="lg:col-span-8">
            <PromptCard
              label="TEMPLATE · PHASE 2 PR BODY"
              title="Builder fills in this template before opening the PR"
              subtitle="Actor — Builder LLM (or human) · per PR"
              body={PHASE_TWO_BUILDER_PR_DESCRIPTION}
            />
          </div>
        </div>
        {/* Phase 2 Verifier PR comment template — copyable */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="stamp">TEMPLATE · PHASE 2 VERDICT</div>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
              The Verifier PR comment — fill-in template.
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              The Verifier posts this as the first comment on the PR, with the
              verdict line at the top. Mirrors the Builder PR description above
              so a human can compare claim against verdict in one scan.
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-foreground/80">
              Three verdicts:{" "}
              <code className="font-mono text-foreground">APPROVE</code>,{" "}
              <code className="font-mono text-foreground">REQUEST-CHANGES</code>
              , and{" "}
              <code className="font-mono text-foreground">
                SPEC-UPDATE-REQUIRED
              </code>
              . Always evidence-backed (file:line). The Verifier reports drift;
              it does not propose fixes.
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-foreground/80">
              Mirrors the Phase 1{" "}
              <code className="font-mono text-foreground">
                verifier-report.md
              </code>{" "}
              template in section 06, with <em>Acceptance Criteria</em> swapped
              for <em>Non-goal violations</em> and a new{" "}
              <em>Spec-update signal</em> field for the third verdict.
            </p>
          </div>
          <div className="lg:col-span-8">
            <PromptCard
              label="TEMPLATE · PHASE 2 VERDICT"
              title="Verifier posts this as the first comment on the PR"
              subtitle="Actor — Verifier LLM · clean context · per PR"
              body={PHASE_TWO_VERIFIER_PR_COMMENT}
            />
          </div>
        </div>
        {/* How to wire Phase 2 into PR flow */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="stamp">FOUR STEPS · PER PR</div>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
              Wiring Phase 2 into normal PR flow.
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              The discipline is one Verifier run per PR, before merge. Skipping
              the Verifier on "small" PRs is one way the spec drifts back into
              irrelevance over time.
            </p>
          </div>
          <div className="lg:col-span-8">
            <ol className="divide-y divide-border border-y border-border">
              {PHASE_TWO_WIRING.map(step => (
                <li key={step.n} className="grid grid-cols-12 gap-6 py-6">
                  <div className="col-span-12 sm:col-span-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                      Step {step.n}
                    </span>
                  </div>
                  <div className="col-span-12 sm:col-span-10">
                    <h4 className="font-display text-xl font-bold leading-snug text-foreground">
                      {step.title}
                    </h4>
                    <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-foreground/85">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Triage: amend vs reject */}
        <div className="mt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="stamp">TRIAGE · AMEND VS REJECT</div>
              <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
                {PHASE_TWO_TRIAGE.headline}
              </h3>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
              {PHASE_TWO_TRIAGE.intro}
            </p>
          </div>

          <div className="mt-8 paper-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-border bg-secondary/40">
                    <th
                      scope="col"
                      className="px-5 py-3 font-mono text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground"
                    >
                      If…
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-mono text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground"
                    >
                      Then…
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PHASE_TWO_TRIAGE.rows.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-border last:border-b-0 align-top"
                    >
                      <td className="px-5 py-5 align-top">
                        <p className="max-w-prose text-[14px] leading-relaxed text-foreground/85">
                          {row.condition}
                        </p>
                      </td>
                      <td className="px-5 py-5 align-top">
                        <p className="max-w-prose text-[14px] leading-relaxed text-foreground/85">
                          {row.action}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-border bg-primary/5 px-6 py-5">
              <div className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-primary">
                The trap
              </div>
              <p className="mt-2 text-[14px] leading-relaxed text-foreground/85">
                {PHASE_TWO_TRIAGE.warning}
              </p>
            </div>
          </div>
        </div>

        {/* Calibration warning */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="stamp">CALIBRATION · FIRST 5–10 PRS</div>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
              {PHASE_TWO_CALIBRATION.headline}
            </h3>
          </div>
          <div className="lg:col-span-8">
            <p className="text-[15px] leading-relaxed text-foreground/85">
              {PHASE_TWO_CALIBRATION.body}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">
              {PHASE_TWO_CALIBRATION.conclusion}
            </p>
          </div>
        </div>

        {/* What "install complete" actually means */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="stamp">DEFINITION · INSTALL COMPLETE</div>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
              When the install is actually done.
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Stopping at item 1 is stopping at the artifact. Items 2 and 3
              convert the artifact into a system.
            </p>
          </div>
          <div className="lg:col-span-8">
            <ol className="divide-y divide-border border-y border-border">
              {PHASE_TWO_INSTALL_COMPLETE.map((item, i) => (
                <li key={i} className="grid grid-cols-12 gap-6 py-6">
                  <div className="col-span-12 sm:col-span-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="col-span-12 sm:col-span-10">
                    <p className="text-[15px] leading-relaxed text-foreground/85">
                      {item}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Counter-pattern: dormant Verifier */}
        <div className="mt-16">
          <div className="stamp">COUNTER-PATTERN · DORMANT VERIFIER</div>
          <h3 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight">
            {PHASE_TWO_DORMANT.headline}
          </h3>
          <div className="mt-8 paper-card border-l-4 border-l-primary p-6">
            <div className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-primary">
              Symptoms
            </div>
            <ul className="mt-3 grid gap-2.5">
              {PHASE_TWO_DORMANT.symptoms.map((s, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-[14px] leading-relaxed text-foreground/85"
                >
                  <span
                    aria-hidden
                    className="mt-1 font-mono text-[11px] font-bold text-primary"
                  >
                    ✕
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-border pt-4">
              <div className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-foreground/70">
                The fix
              </div>
              <p className="mt-2 text-[14px] leading-relaxed text-foreground/85">
                {PHASE_TWO_DORMANT.intro}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────────── */
/* SECTION 08 — META-PRs                                                     */
/* ───────────────────────────────────────────────────────────────────────── */
function MetaPRs() {
  return (
    <section
      id="meta-prs"
      aria-labelledby="meta-prs-heading"
      className="border-t border-border"
    >
      <div className="container py-20 lg:py-24">
        <SectionHeader
          id="meta-prs-heading"
          number="08"
          label={META_INTRO.eyebrow}
          title={META_INTRO.headline}
          kicker={<>{META_INTRO.body}</>}
        />

        {/* When to use — three cards */}
        <div className="mt-14 grid gap-px bg-border md:grid-cols-3">
          {META_WHEN_TO_USE.map(item => (
            <article
              key={item.n}
              className="paper-card flex flex-col gap-3 p-6"
              style={{ boxShadow: "none" }}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[12px] font-bold tracking-widest text-primary">
                  {item.n}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  When to reach for a META-PR
                </span>
              </div>
              <h3 className="font-display text-[20px] font-bold leading-snug">
                {item.label}
              </h3>
              <p className="text-[14px] leading-relaxed text-foreground/85">
                {item.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 lg:mt-20">
          <MetaPRScopeDiagram />
        </div>

        {/* Phase 1 META-PR Verifier prompt */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="stamp">PROMPT · META-PR · PHASE 1</div>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
              Verifying a mid-slice HANDOFF.md change.
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              When the slice itself revealed that HANDOFF.md was wrong, the PR
              amends the spec. The Verifier cannot use the changed file as
              ground truth — that is circular. Use the Builder Brief pasted into
              the PR description as the scope.
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-foreground/80">
              The normal Phase 1 Verifier prompt now contains an inline META-PR
              safety-net clause that detects this case and switches the Verifier
              into the prompt below. You can paste this prompt directly when you
              know up front the PR is a META-PR.
            </p>
          </div>
          <div className="lg:col-span-8">
            <PromptCard
              label="PROMPT · META-PR · PHASE 1"
              title="Verifier audits a mid-slice HANDOFF.md change"
              subtitle="Actor — Verifier LLM · clean context · per META-PR"
              body={META_VERIFIER_PROMPT_PHASE_1}
            />
          </div>
        </div>

        {/* Phase 2 META-PR Builder prompt — for Calibration Debrief output */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="stamp">PROMPT · META-PR · PHASE 2 BUILD</div>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
              Drafting the Spec Update Proposal.
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              When the first slice (or any later slice) surfaces gaps in
              PROJECT.md, the Calibration Debrief Builder produces a structured
              Spec Update Proposal — before/after diffs with rationale per edit
              — that becomes a META-PR.
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-foreground/80">
              The Proposal is the contract. The eventual PR diff against
              PROJECT.md is graded against the Proposal, not against the changed
              PROJECT.md itself. This is what closes the loop.
            </p>
          </div>
          <div className="lg:col-span-8">
            <PromptCard
              label="PROMPT · META-PR · PHASE 2 BUILD"
              title="Spec-Editor Builder writes a Spec Update Proposal"
              subtitle="Actor — Builder LLM · per Calibration Debrief or spec drift"
              body={META_BUILDER_PROMPT_PHASE_2}
            />
          </div>
        </div>

        {/* Phase 2 META-PR Verifier prompt */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="stamp">PROMPT · META-PR · PHASE 2 AUDIT</div>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
              Auditing a PR that edits PROJECT.md.
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Three verdicts:{" "}
              <code className="font-mono text-foreground">APPROVE</code>,{" "}
              <code className="font-mono text-foreground">REQUEST-CHANGES</code>
              , and{" "}
              <code className="font-mono text-foreground">
                PROPOSAL-INSUFFICIENT
              </code>
              . The third is unique to META-PRs — it flags that the diff
              implements the Proposal correctly but the Proposal itself was
              under-specified. That kicks back to the human.
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-foreground/80">
              The most common failure mode this prompt catches: a META-PR that
              silently edits sections of PROJECT.md the Spec Update Proposal did
              not name. Scope creep on the spec doc itself is the most damaging
              form of scope creep in this framework.
            </p>
          </div>
          <div className="lg:col-span-8">
            <PromptCard
              label="PROMPT · META-PR · PHASE 2 AUDIT"
              title="Verifier audits a PROJECT.md META-PR against the Proposal"
              subtitle="Actor — Verifier LLM · clean context · per META-PR"
              body={META_VERIFIER_PROMPT_PHASE_2}
            />
          </div>
        </div>

        {/* META-PR Builder PR description template */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="stamp">TEMPLATE · META-PR · PR BODY</div>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
              The META-PR description — fill-in template.
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              The single most important field is the inline scope document — the
              Builder Brief (Phase 1) or the Spec Update Proposal (Phase 2).
              Without it pasted into the PR body, the Verifier has nothing to
              grade against, because the changed spec file in the diff is
              exactly what's being audited.
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-foreground/80">
              Sections deliberately NOT changed are listed explicitly. That is
              the META-PR's equivalent of declared stubs in a normal PR — it
              converts an absence into an intentional absence the Verifier can
              grade.
            </p>
          </div>
          <div className="lg:col-span-8">
            <PromptCard
              label="TEMPLATE · META-PR · PR BODY"
              title="Builder pastes this into the META-PR description"
              subtitle="Builder fills in · the Verifier reads from this · per META-PR"
              body={META_BUILDER_PR_DESCRIPTION}
            />
          </div>
        </div>

        {/* META-PR Verifier PR comment template */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="stamp">TEMPLATE · META-PR · VERIFIER COMMENT</div>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
              The META-PR Verifier report — copy-pasteable.
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Same shape as the Phase 2 Verifier comment, with two additions:
              the verdict line records which scope document was used (Builder
              Brief or Spec Update Proposal), and there's a dedicated section
              for "spec doc sections changed but not in the Proposal" — the
              silent-scope-creep catcher.
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-foreground/80">
              The Verifier still proposes no fixes. The
              <code className="ml-1 font-mono text-foreground">
                PROPOSAL-INSUFFICIENT
              </code>{" "}
              verdict is the explicit "throw it back to the human" path — never
              to the Builder. The human owns the Proposal; the Builder
              implements it.
            </p>
          </div>
          <div className="lg:col-span-8">
            <PromptCard
              label="TEMPLATE · META-PR · VERIFIER COMMENT"
              title="Verifier pastes this as the first comment on the META-PR"
              subtitle="Verifier fills in · the Gatekeeper reads this · per META-PR"
              body={META_VERIFIER_PR_COMMENT}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────────── */
/* SECTION 09 — REFERENCES                                                   */
/* ───────────────────────────────────────────────────────────────────────── */
function References() {
  return (
    <section
      id="references"
      aria-labelledby="references-heading"
      className="border-t border-border bg-background/60"
    >
      <div className="container py-20 lg:py-24">
        <SectionHeader
          id="references-heading"
          number="09"
          label="REFERENCES"
          title="References and source notes."
          kicker={
            <>
              The framework is intentionally opinionated. These references
              anchor concrete claims on this page: prompt structure, evaluation
              discipline, PR review surfaces, merge protections, long-context
              effects, LLM-as-judge caveats, and governance vocabulary — not a
              vendor roadmap.
            </>
          }
        />

        <div className="mt-14 grid gap-px bg-border md:grid-cols-2 xl:grid-cols-3">
          {REFERENCES.map(reference => (
            <article
              key={reference.href}
              className="paper-card flex min-h-[230px] flex-col p-6"
              style={{ boxShadow: "none" }}
            >
              <div className="flex items-center justify-between gap-4 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                <span>{reference.category}</span>
                <span>{reference.source}</span>
              </div>
              <a
                href={reference.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex items-start gap-2 font-display text-[22px] font-bold leading-tight text-foreground transition-colors hover:text-primary"
              >
                <span>{reference.title}</span>
                <ExternalLink
                  aria-hidden
                  className="mt-1 h-4 w-4 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2.25}
                />
              </a>
              <p className="mt-4 text-[14px] leading-relaxed text-foreground/80">
                {reference.note}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 paper-card border-l-4 border-l-primary p-6 sm:p-7">
          <div className="stamp">READING ORDER · THREE-STOP SPINE</div>
          <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
            {REFERENCE_READING_ORDER_INTRO}
          </p>
          <nav
            className="mt-6"
            aria-label="Suggested reference reading order"
          >
            <ol className="m-0 flex list-none flex-col p-0 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-2">
              {REFERENCE_READING_ORDER.flatMap((item, index) => {
                const row = (
                  <li key={item.href} className="flex min-w-0 items-center gap-2">
                    <span className="font-mono text-[11px] font-bold tabular-nums tracking-widest text-primary">
                      {item.step}
                    </span>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex min-w-0 items-center gap-1.5 font-display text-[17px] font-bold leading-snug text-foreground underline decoration-primary underline-offset-[5px] transition-colors hover:text-primary sm:text-[18px]"
                    >
                      <span className="min-w-0">{item.short}</span>
                      <ExternalLink
                        aria-hidden
                        className="h-3.5 w-3.5 shrink-0 text-primary opacity-80 transition-transform group-hover:-translate-y-px group-hover:translate-x-px sm:h-4 sm:w-4"
                        strokeWidth={2.25}
                      />
                    </a>
                  </li>
                );
                if (index === 0) return [row];
                return [
                  <li
                    key={`sep-${item.href}`}
                    aria-hidden
                    className="flex justify-center py-2 sm:flex sm:items-center sm:justify-center sm:py-0"
                  >
                    <ChevronRight
                      className="h-4 w-4 shrink-0 rotate-90 text-primary/65 sm:rotate-0 sm:text-primary/70"
                      strokeWidth={2.5}
                    />
                  </li>,
                  row,
                ];
              })}
            </ol>
          </nav>
        </div>

        <p className="mt-8 max-w-4xl border-l-4 border-l-primary pl-5 text-[14px] leading-relaxed text-muted-foreground">
          {REFERENCE_NOTE}
        </p>
      </div>
    </section>
  );
}
