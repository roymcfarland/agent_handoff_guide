/*
 * BuildVerifySection — extracted from Home.tsx in Slice 01.
 * Original lines: L745-L955.
 * No JSX or copy changes; this is a pure file-move + import-trim.
 */
import { BuildVerifyDiagram } from "@/components/BuildVerifyDiagram";
import { MarkdownBlock } from "@/components/MarkdownBlock";
import { SectionHeader } from "@/components/SectionHeader";
import {
  BUILD_VERIFY_MARKDOWN,
  BUILD_VERIFY_PRINCIPLES,
  BUILD_VERIFY_STAGES,
  CEREMONY_SIZING,
  ESCALATION_RULE,
  VERDICT_TRIAGE,
} from "@/lib/content";
export default function BuildVerifySection() {
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
          title="An Advisor scopes. A Builder ships. A Verifier grades. You merge."
          kicker={
            <>
              The Builder can overstate completion on its own work. A second LLM
              in a clean context, reading the PR description, diff, and{" "}
              <code className="font-mono text-foreground">HANDOFF.md</code>,
              catches what the Builder may miss or under-report. Upstream of
              both, an Advisor greps the repo, scopes the slice, and drafts the
              prompts the other two run — so neither ever works from guesswork.
              The prompts and
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

        {/* Stages A → D */}
        <div className="mt-14 grid gap-px bg-border md:grid-cols-2 xl:grid-cols-4">
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
              Seven rules that make the loop actually work.
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

        {/* Verdict triage — runs before the escalation rule applies */}
        <div className="mt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="stamp">VERDICT TRIAGE · BEFORE ESCALATION</div>
              <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
                {VERDICT_TRIAGE.headline}
              </h3>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
              {VERDICT_TRIAGE.intro}
            </p>
          </div>

          <div className="mt-8 paper-card overflow-hidden">
            <div className="border-b border-border bg-primary/5 px-6 py-5">
              <div className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-primary">
                The question the Advisor answers for every FAIL
              </div>
              <p className="mt-2 font-display text-2xl font-bold leading-snug text-foreground">
                {VERDICT_TRIAGE.question}
              </p>
            </div>

            <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              {VERDICT_TRIAGE.routes.map(route => (
                <div key={route.label} className="px-6 py-6">
                  <div className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                    → {route.label}
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed text-foreground/85">
                    {route.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-border bg-secondary/40 px-6 py-5">
              <div className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-primary">
                {VERDICT_TRIAGE.spuriousShapes.title}
              </div>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {VERDICT_TRIAGE.spuriousShapes.items.map((shape, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-[14px] leading-relaxed text-foreground/85"
                  >
                    <span
                      aria-hidden
                      className="mt-1 font-mono text-[11px] font-bold text-primary"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{shape}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid divide-y divide-border border-t border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              {VERDICT_TRIAGE.disciplines.map(d => (
                <div key={d.title} className="px-6 py-6">
                  <h4 className="font-display text-lg font-bold leading-snug text-foreground">
                    {d.title}
                  </h4>
                  <p className="mt-2 text-[14px] leading-relaxed text-foreground/85">
                    {d.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-border bg-primary/5 px-6 py-5">
              <p className="text-[14px] leading-relaxed text-foreground/85">
                {VERDICT_TRIAGE.escalationLink}
              </p>
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

        {/* Ceremony sizing — which changes enter the loop */}
        <div className="mt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="stamp">CEREMONY SIZING · MATCH RIGOR TO RISK</div>
              <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
                {CEREMONY_SIZING.headline}
              </h3>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
              {CEREMONY_SIZING.intro}
            </p>
          </div>

          <div className="mt-8 paper-card overflow-hidden">
            <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              <div className="px-6 py-6">
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                  {CEREMONY_SIZING.fullLoop.label}
                </div>
                <ul className="mt-3 space-y-2.5">
                  {CEREMONY_SIZING.fullLoop.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-[14px] leading-relaxed text-foreground/85"
                    >
                      <span
                        aria-hidden
                        className="mt-1 font-mono text-[11px] font-bold text-primary"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 py-6">
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                  {CEREMONY_SIZING.direct.label}
                </div>
                <ul className="mt-3 space-y-2.5">
                  {CEREMONY_SIZING.direct.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-[14px] leading-relaxed text-foreground/85"
                    >
                      <span
                        aria-hidden
                        className="mt-1 font-mono text-[11px] font-bold text-primary"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
                  {CEREMONY_SIZING.direct.caveat}
                </p>
              </div>
            </div>

            <div className="border-t border-border bg-primary/5 px-6 py-5">
              <div className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-primary">
                The invariant
              </div>
              <p className="mt-2 font-display text-2xl font-bold leading-snug text-foreground">
                {CEREMONY_SIZING.invariant.title}
              </p>
              <p className="mt-3 max-w-prose text-[14px] leading-relaxed text-foreground/85">
                {CEREMONY_SIZING.invariant.body}
              </p>
            </div>

            <div className="border-t border-border bg-secondary/40 px-6 py-5">
              <div className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-primary">
                {CEREMONY_SIZING.trap.title}
              </div>
              <p className="mt-2 max-w-prose text-[14px] leading-relaxed text-foreground/85">
                {CEREMONY_SIZING.trap.body}
              </p>
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
