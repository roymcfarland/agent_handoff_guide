/*
 * PhaseTwoSection — extracted from Home.tsx in Slice 01.
 * Original lines: L960-L1487.
 * No JSX or copy changes; this is a pure file-move + import-trim.
 */
import { PromptCard } from "@/components/PromptCard";
import { SectionHeader } from "@/components/SectionHeader";
import { PhaseModelDiagram } from "@/components/diagrams";
import {
  PHASE_TWO_BUILDER_PROMPT,
  PHASE_TWO_BUILDER_PR_DESCRIPTION,
  PHASE_TWO_CALIBRATION,
  PHASE_TWO_DORMANT,
  PHASE_TWO_FINDINGS,
  PHASE_TWO_INSTALL_COMPLETE,
  PHASE_TWO_INTRO,
  PHASE_TWO_LEVERAGE,
  PHASE_TWO_PHASES,
  PHASE_TWO_PROMPT,
  PHASE_TWO_TRIAGE,
  PHASE_TWO_VERIFIER_PR_COMMENT,
  PHASE_TWO_WIRING,
} from "@/lib/content";
export default function PhaseTwoSection() {
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
              Two verdicts —{" "}
              <code className="font-mono text-foreground">APPROVE</code> or{" "}
              <code className="font-mono text-foreground">REJECT</code> — and a
              REJECT names its route:{" "}
              <code className="font-mono text-foreground">
                REJECT (fix the code)
              </code>{" "}
              for a MAJOR finding, or{" "}
              <code className="font-mono text-foreground">
                REJECT (spec-update-required)
              </code>{" "}
              for a PR that may obsolete part of{" "}
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
              Two verdicts —{" "}
              <code className="font-mono text-foreground">APPROVE</code> or{" "}
              <code className="font-mono text-foreground">REJECT</code> — with a
              REJECT naming its route (
              <code className="font-mono text-foreground">fix the code</code> or{" "}
              <code className="font-mono text-foreground">
                spec-update-required
              </code>
              ). Always evidence-backed (file:line). The Verifier reports drift;
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
