/*
 * InstallSection — extracted from Home.tsx in Slice 01.
 * Original lines: L404-L542.
 * No JSX or copy changes; this is a pure file-move + import-trim.
 */
import { FileText } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import {
  InstallPipelineDiagram,
} from "@/components/diagrams";
import {
  INSTALL_ANTI_PATTERNS,
  INSTALL_STEPS,
} from "@/lib/content";
export default function InstallSection() {
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
