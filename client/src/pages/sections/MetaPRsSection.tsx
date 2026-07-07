/*
 * MetaPRsSection — extracted from Home.tsx in Slice 01.
 * Original lines: L1491-L1700.
 * No JSX or copy changes; this is a pure file-move + import-trim.
 */
import { PromptCard } from "@/components/PromptCard";
import { SectionHeader } from "@/components/SectionHeader";
import { MetaPRScopeDiagram } from "@/components/diagrams";
import {
  META_BUILDER_PROMPT_PHASE_2,
  META_BUILDER_PR_DESCRIPTION,
  META_INTRO,
  META_VERIFIER_PROMPT_PHASE_1,
  META_VERIFIER_PROMPT_PHASE_2,
  META_VERIFIER_PR_COMMENT,
  META_WHEN_TO_USE,
} from "@/lib/content";
export default function MetaPRsSection() {
  return (
    <section
      id="meta-prs"
      aria-labelledby="meta-prs-heading"
      className="border-t border-border"
    >
      <div className="container py-20 lg:py-24">
        <SectionHeader
          id="meta-prs-heading"
          number="09"
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
              Two verdicts —{" "}
              <code className="font-mono text-foreground">APPROVE</code> or{" "}
              <code className="font-mono text-foreground">REJECT</code> — and a
              REJECT names its route:{" "}
              <code className="font-mono text-foreground">
                REJECT (fix the edits)
              </code>{" "}
              when the diff doesn't match the Proposal, or{" "}
              <code className="font-mono text-foreground">
                REJECT (proposal-insufficient)
              </code>
              , unique to META-PRs — the diff implements the Proposal correctly
              but the Proposal itself was under-specified. That kicks back to
              the human.
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
                REJECT (proposal-insufficient)
              </code>{" "}
              route is the explicit "throw it back to the human" path — never to
              the Builder. The human owns the Proposal; the Builder implements
              it.
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
