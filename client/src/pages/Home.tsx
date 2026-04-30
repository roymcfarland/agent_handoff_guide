/*
 * Home.tsx — Single-page Agent Handoff Framework guide.
 * Design philosophy: "The Engineer's Notebook" — graph-paper background, paper cards,
 * mono stamps, serif display titles, drafting-red accent.
 * Layout principle: asymmetric, NOT centered. Most content sits in a left-anchored
 * column with stamp labels in the right margin (above mobile breakpoint).
 */

import { useState } from "react";
import { ArrowDown, Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { BuildVerifyDiagram } from "@/components/BuildVerifyDiagram";
import { MarkdownBlock } from "@/components/MarkdownBlock";
import { PromptCard } from "@/components/PromptCard";
import { SectionHeader } from "@/components/SectionHeader";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  BUILDER_PROMPT,
  BUILDER_PR_DESCRIPTION,
  BUILD_VERIFY_MARKDOWN,
  BUILD_VERIFY_PRINCIPLES,
  BUILD_VERIFY_STAGES,
  CLOSEOUT_PROMPT,
  ESCALATION_RULE,
  FAILURE_MODES,
  HANDOFF_TEMPLATE,
  MODEL_PAIRINGS,
  MODEL_PAIRINGS_FRESHNESS,
  PRACTICES,
  SCHEMA_FILES,
  VERIFIER_PR_COMMENT,
  VERIFIER_PROMPT,
} from "@/lib/content";

export default function Home() {
  return (
    <div className="graph-paper min-h-screen text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <Diagnosis />
        <Schema />
        <Prompts />
        <BuildAndVerify />
        <Practices />
        <Moonshots />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section id="overview" className="relative">
      <div className="container grid gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:gap-12 lg:py-28">
        {/* Left rail — stamp + meta */}
        <aside className="lg:col-span-3">
          <div className="stamp">FILE 00 / OVERVIEW</div>
          <dl className="mt-6 space-y-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <div>
              <dt className="text-foreground/60">Subject</dt>
              <dd className="mt-1 text-foreground">Agent handoff loop</dd>
            </div>
            <div>
              <dt className="text-foreground/60">Audience</dt>
              <dd className="mt-1 text-foreground">Engineering teams shipping with AI agents</dd>
            </div>
            <div>
              <dt className="text-foreground/60">Goal</dt>
              <dd className="mt-1 text-foreground">Execution over drift</dd>
            </div>
          </dl>
        </aside>

        {/* Main hero column */}
        <div className="lg:col-span-9">
          <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            A working guide for{" "}
            <span className="pen-circle">handing off</span> work between AI agents.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/80 sm:text-xl">
            Most agent workflows fail not because the model is weak, but because the{" "}
            <em>document the agent works against</em> is doing too many jobs at once.
            This guide replaces the single bloated handoff file with three disciplined
            artifacts and three constrained prompts — designed to keep agents{" "}
            <span className="font-semibold">building</span>, not planning.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#prompts"
              className="inline-flex items-center gap-2 border border-foreground bg-foreground px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-background transition-colors duration-150 hover:bg-primary hover:border-primary hover:text-primary-foreground"
            >
              Jump to the prompts
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
              { k: "3", v: "Document files instead of one bloated doc" },
              { k: "3", v: "Constrained prompts for each stage of the loop" },
              { k: "0", v: "Direct commits to main without a PR review surface" },
            ].map((item) => (
              <div
                key={item.v}
                className="border-b border-border px-5 py-6 sm:border-b-0 sm:border-r last:sm:border-r-0"
              >
                <div className="font-display text-5xl font-black text-primary">
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
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function Diagnosis() {
  return (
    <section id="diagnosis" className="border-t border-border bg-background/60">
      <div className="container grid gap-12 py-20 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-4">
          <SectionHeader
            number="02"
            label="DIAGNOSIS"
            title="Where agent handoffs actually break down."
            kicker={
              <>
                These are the failure modes that show up over and over when teams try to
                chain agents together. Most are <em>not</em> a model problem — they are
                a <span className="pen-circle">workflow</span> problem.
              </>
            }
          />
        </div>

        <div className="lg:col-span-8">
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
    <section id="schema" className="border-t border-border">
      <div className="container py-20 lg:py-24">
        <SectionHeader
          number="03"
          label="DOCUMENT SCHEMA"
          title="Stop using one handoff document. Use three."
          kicker={
            <>
              The single highest-leverage change you can make. Splitting the doc into
              three artifacts — each with a strict role — directly attacks context rot
              and stops agents from re-reading settled history every time they boot.
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
                {f.contains.map((line) => (
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
          Drop this into the root of your repo. Overwrite it at every handoff. Keep
          the Acceptance Criteria literal and the Constraints aggressive — they are
          the only things stopping the agent from drifting.
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

/* ─────────────────────────────────────────────────────────────────────────── */

function Prompts() {
  return (
    <section id="prompts" className="border-t border-border bg-background/60">
      <div className="container py-20 lg:py-24">
        <SectionHeader
          number="04"
          label="CORE PROMPTS"
          title="Three prompts. Three roles. Each one constrains the next."
          kicker={
            <>
              Persona priming alone does nothing. These prompts work because they tell
              the agent <em>what not to do</em>: do not plan, do not expand scope, do
              not silently skip a criterion, do not write code during closeout.
            </>
          }
        />

        <div className="mt-14 space-y-8">
          <PromptCard
            label="PROMPT 01 / BUILDER"
            title="Boots the agent that does the work."
            subtitle="Forces execution-only behavior against HANDOFF.md."
            body={BUILDER_PROMPT}
          />
          <PromptCard
            label="PROMPT 02 / CLOSEOUT"
            title="Closes out the slice and writes the next handoff."
            subtitle="Forces honesty about stubs, debt, and skipped criteria."
            body={CLOSEOUT_PROMPT}
          />
          <PromptCard
            label="PROMPT 03 / VERIFIER · OPTIONAL"
            title="Independent check before the next builder starts."
            subtitle="Reads only the diff. Returns PASS / CONDITIONAL PASS / FAIL with evidence."
            body={VERIFIER_PROMPT}
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function Practices() {
  return (
    <section id="practices" className="border-t border-border">
      <div className="container grid gap-12 py-20 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-4">
          <SectionHeader
            number="05"
            label="BEST PRACTICES"
            title="Habits that keep the loop honest."
            kicker={
              <>
                None of these are exotic. They are small disciplines that compound —
                and that most teams skip because they feel like overhead until the
                first time an agent silently breaks main.
              </>
            }
          />
        </div>
        <div className="lg:col-span-8">
          <ul className="divide-y divide-border border-y border-border">
            {PRACTICES.map((p, i) => (
              <li key={p.title} className="grid grid-cols-12 gap-6 py-6">
                <div className="col-span-12 sm:col-span-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="col-span-12 sm:col-span-10">
                  <h3 className="font-display text-2xl font-bold leading-tight text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-foreground/80">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function Moonshots() {
  return (
    <section id="moonshots" className="border-t border-border bg-background/60">
      <div className="container py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              number="06"
              label="MOONSHOTS"
              title="If you want to go further."
              kicker={
                <>
                  Lower-probability ideas that meaningfully change the ceiling on what
                  this loop can do. Try one at a time and measure whether your slice
                  failure rate actually drops.
                </>
              }
            />
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-6">
              <MoonshotCard
                tag="A"
                title="A dedicated Verifier agent in a clean context."
                body="The Builder is biased to claim success. A Verifier in a fresh window, reading only the diff and the Acceptance Criteria, catches stubs and out-of-scope changes that the Builder will never report on itself. Add it as a required PR check."
              />
              <MoonshotCard
                tag="B"
                title="Slice budgets, not just context budgets."
                body="Cap the number of files an agent may modify per slice (start at three). When the cap is hit, the agent must stop and request that the slice be re-scoped. This converts scope creep into a visible, blockable event instead of a silent one."
              />
              <MoonshotCard
                tag="C"
                title="Architecture Decision Records as immutable citations."
                body="Tiny docs/adr/0001-*.md files for every frozen technical choice. The Builder prompt is amended to: 'You may cite ADRs but you may not propose changes to them.' This stops the agent from relitigating settled questions every time it boots."
              />
              <MoonshotCard
                tag="D"
                title="Two agents, two models, one slice."
                body="Use a different model for the Verifier than for the Builder. Different training distributions catch different failure modes. The marginal cost is small; the marginal signal is high."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* BUILD & VERIFY                                                              */
/* Two-LLM workflow: Builder ships the slice; a different LLM (clean context)  */
/* verifies the diff against HANDOFF.md before the gatekeeper merges.          */
/* ─────────────────────────────────────────────────────────────────────────── */

function BuildAndVerify() {
  return (
    <section id="build-verify" className="border-t border-border bg-background/60">
      <div className="container py-20 lg:py-24">
        <SectionHeader
          number="05"
          label="BUILD & VERIFY"
          title="One LLM builds. A different LLM verifies. You merge."
          kicker={
            <>
              The Builder is biased to claim success on its own work. A second LLM in
              a clean context, reading only the diff and{" "}
              <code className="font-mono text-foreground">HANDOFF.md</code>, catches
              what the Builder will never report on itself. Drop the markdown spec
              below into your repo as a single source of truth.
            </>
          }
        />

        {/* Stages: A → B → C */}
        <div className="mt-14 grid gap-px bg-border md:grid-cols-3">
          {BUILD_VERIFY_STAGES.map((stage) => (
            <article
              key={stage.tag}
              className="paper-card flex flex-col gap-4 p-6"
              style={{ boxShadow: "none" }}
            >
              <div className="flex items-center gap-4">
                <div
                  aria-hidden
                  className="flex h-12 w-12 shrink-0 items-center justify-center border border-foreground bg-background font-display text-2xl font-black text-primary"
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

        {/* The visual loop */}
        <div className="mt-12">
          <BuildVerifyDiagram />
        </div>

        {/* PR templates — Builder PR body and Verifier PR comment, paired side-by-side */}
        <div className="mt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="stamp">PR TEMPLATES · BOTH SIDES</div>
              <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
                Two templates. One PR. A clean audit trail.
              </h3>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
              The Builder posts the left-hand body when it opens the PR. The
              Verifier posts the right-hand comment as the first review. The two
              are mirrors so a human can compare claim against verdict in one
              scan.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {/* Builder PR description */}
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between gap-3">
                <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
                  Stage A · Builder posts this as the PR body
                </div>
                <code className="font-mono text-[11px] text-muted-foreground">
                  feature/&lt;slice&gt;
                </code>
              </div>
              <MarkdownBlock
                filename="builder-pr-description.md"
                description="Builder PR body"
                body={BUILDER_PR_DESCRIPTION}
                toastLabel="Builder PR description copied"
              />
              <ul className="mt-1 space-y-1.5 font-mono text-[10.5px] uppercase tracking-widest text-muted-foreground">
                <li>· Self-audit against every Acceptance Criterion</li>
                <li>· Scope-of-change table tied to criteria</li>
                <li>· Declared stubs — silent debt is forbidden</li>
              </ul>
            </div>

            {/* Verifier PR comment */}
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between gap-3">
                <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
                  Stage B · Verifier posts this as the first comment
                </div>
                <code className="font-mono text-[11px] text-muted-foreground">
                  clean context
                </code>
              </div>
              <MarkdownBlock
                filename="verifier-report.md"
                description="Verifier PR comment"
                body={VERIFIER_PR_COMMENT}
                toastLabel="Verifier PR-comment template copied"
              />
              <ul className="mt-1 space-y-1.5 font-mono text-[10.5px] uppercase tracking-widest text-muted-foreground">
                <li>· Verdict line first — PASS / COND. PASS / FAIL</li>
                <li>· One evidence pointer per criterion</li>
                <li>· No fixes, no refactors, no new code</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Non-negotiable principles */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="stamp">NON-NEGOTIABLES</div>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
              Four rules that make the loop actually work.
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Skip any of these and you will get a Verifier that rubber-stamps the
              Builder. The independence between the two LLMs is the entire point.
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

        {/* Model pairings — starter matrix of Builder ↔ Verifier combinations */}
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
              different lab and a different reasoning style so their failure
              modes are uncorrelated. Re-evaluate every quarter.
            </p>
          </div>

          {/* Notebook-style table. Horizontal scroll on small screens. */}
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
                  {MODEL_PAIRINGS.map((row) => {
                    const isAnti = "isAntiPattern" in row && row.isAntiPattern;
                    return (
                      <tr
                        key={row.tier}
                        className={`border-b border-border last:border-b-0 align-top ${
                          isAnti ? "bg-primary/5" : ""
                        }`}
                      >
                        <td className="px-5 py-5 align-top">
                          <div
                            className={`font-mono text-[11px] font-bold uppercase tracking-widest ${
                              isAnti ? "text-primary" : "text-foreground"
                            }`}
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
                            className={`inline-block border px-2 py-0.5 font-mono text-[10.5px] font-bold uppercase tracking-widest ${
                              isAnti
                                ? "border-primary text-primary"
                                : "border-border text-muted-foreground"
                            }`}
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

          <p className="mt-6 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">
            <span className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-primary">
              Note —
            </span>{" "}
            Brand names will date this table. The principle that won't date is
            the bottom row: never pair a model with itself. If you can only
            afford one frontier seat, run the Verifier on a smaller model from a
            different lab — that captures most of the independence benefit at
            a fraction of the cost.
          </p>
        </div>

        {/* Escalation rule — what to do when a slice gets two consecutive Verifier FAILs */}
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
              <code className="mx-1 font-mono text-foreground">HANDOFF.md</code>.
              Two FAILs is a slice problem, not a Builder problem.
            </p>
          </div>

          <div className="mt-8 paper-card overflow-hidden">
            {/* The rule, stamped at the top */}
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

            {/* The four steps */}
            <ol className="divide-y divide-border">
              {ESCALATION_RULE.steps.map((step) => (
                <li
                  key={step.n}
                  className="grid grid-cols-12 gap-6 px-6 py-6"
                >
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

            {/* Anti-patterns footer */}
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

        {/* The drop-in markdown spec */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="stamp">SPEC · DROP-IN</div>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
              The markdown your team can paste into a repo.
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Self-contained: explains the loop, lists the non-negotiables, and
              embeds the Builder, Closeout, and Verifier prompts inline so a reader
              never has to bounce between files. Save it as{" "}
              <code className="font-mono text-foreground">docs/build-and-verify.md</code>.
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

function MoonshotCard({
  tag,
  title,
  body,
}: {
  tag: string;
  title: string;
  body: string;
}) {
  return (
    <article className="paper-card flex gap-5 p-6">
      <div
        aria-hidden
        className="flex h-12 w-12 shrink-0 items-center justify-center border border-foreground bg-background font-display text-2xl font-black text-primary"
      >
        {tag}
      </div>
      <div className="min-w-0">
        <h3 className="font-display text-xl font-bold leading-snug text-foreground">
          {title}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-foreground/80">
          {body}
        </p>
      </div>
    </article>
  );
}
