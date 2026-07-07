/*
 * ReferencesSection — extracted from Home.tsx in Slice 01.
 * Original lines: L1704-L1815.
 * No JSX or copy changes; this is a pure file-move + import-trim.
 */
import { ChevronRight, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import {
  REFERENCES,
  REFERENCE_NOTE,
  REFERENCE_READING_ORDER,
  REFERENCE_READING_ORDER_INTRO,
} from "@/lib/content";
export default function ReferencesSection() {
  return (
    <section
      id="references"
      aria-labelledby="references-heading"
      className="border-t border-border bg-background/60"
    >
      <div className="container py-20 lg:py-24">
        <SectionHeader
          id="references-heading"
          anchor="references"
          number="10"
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
