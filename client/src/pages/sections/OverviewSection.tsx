/*
 * OverviewSection — extracted from Home.tsx in Slice 01.
 * Original lines: L103-L209.
 * No JSX or copy changes; this is a pure file-move + import-trim.
 */
import { ArrowDown } from "lucide-react";
import {
  DiagramFigureLegend,
  ReferenceArchitectureDiagram,
} from "@/components/diagrams";
import { PROMPT_LIBRARY, SHEET_INDEX } from "@/lib/content";

const PROMPT_COUNT = PROMPT_LIBRARY.reduce(
  (total, scenario) => total + scenario.items.length,
  0,
);

export default function OverviewSection() {
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
              <dt className="text-foreground/60">Author</dt>
              <dd className="mt-1 text-foreground">
                <a
                  href="https://github.com/roymcfarland"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="underline decoration-primary underline-offset-4 hover:text-primary"
                >
                  Roy McFarland
                </a>{" "}
                · Worksmith Labs
              </dd>
            </div>
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

          {/* Author byline — above the fold, where a hiring manager reads */}
          <p className="mt-6 font-mono text-[11.5px] font-bold uppercase tracking-widest text-muted-foreground">
            <span className="text-primary">Created by</span>{" "}
            <a
              href="https://github.com/roymcfarland"
              rel="noopener noreferrer"
              target="_blank"
              className="text-foreground underline decoration-primary underline-offset-4 hover:text-primary"
            >
              Roy McFarland
            </a>{" "}
            <span className="normal-case tracking-normal font-normal">
              — designed, operated, and maintained with the framework itself;{" "}
              <a
                href="https://github.com/roymcfarland/agent_handoff_guide/pulls?q=is%3Apr+is%3Amerged"
                rel="noopener noreferrer"
                target="_blank"
                className="underline decoration-muted-foreground/60 underline-offset-4 hover:text-foreground"
              >
                every merged PR is the audit trail
              </a>
              .
            </span>
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
                k: String(PROMPT_COUNT),
                v: "Library prompts & templates — install, recurring loop, recovery",
              },
              {
                k: "3",
                v: "Roles per slice — Advisor drafts, Builder executes, Verifier grades",
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
          {/* Sheet index — the drawing set's table of contents */}
          <div className="mt-16">
            <div className="stamp">SHEET INDEX · 10 FILES</div>
            <nav
              aria-label="Sheet index"
              className="mt-4 divide-y divide-border border border-border"
            >
              {SHEET_INDEX.map(sheet => (
                <a
                  key={sheet.id}
                  href={`#${sheet.id}`}
                  className="group grid grid-cols-12 items-baseline gap-x-3 px-4 py-3 transition-colors hover:bg-primary/5"
                >
                  <span className="col-span-2 font-mono text-xs font-bold tracking-widest text-primary sm:col-span-1">
                    {sheet.number}
                  </span>
                  <span className="col-span-10 font-display text-base font-bold leading-snug group-hover:text-primary sm:col-span-4">
                    {sheet.label}
                  </span>
                  <span className="col-span-10 col-start-3 text-sm leading-relaxed text-muted-foreground sm:col-span-7 sm:col-start-6">
                    {sheet.contents}
                  </span>
                </a>
              ))}
            </nav>
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
