/**
 * Inline legend for figure arrows — placed once under Fig. 1 so later diagrams inherit the vocabulary.
 */
export function DiagramFigureLegend() {
  return (
    <div
      className="mt-8 flex flex-wrap items-start gap-x-10 gap-y-4 border-t border-border pt-8 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
      aria-label="Diagram conventions"
    >
      <span className="flex max-w-[240px] items-center gap-3">
        <span
          className="h-2 w-8 shrink-0 rounded-sm bg-primary"
          aria-hidden
        />
        <span>Red — handoff / urgency (what moves next)</span>
      </span>
      <span className="flex max-w-[240px] items-center gap-3">
        <span
          className="h-0.5 w-8 shrink-0 border-t-2 border-foreground/45"
          aria-hidden
        />
        <span>Ink — audit, verdict, or return paths</span>
      </span>
      <span className="flex max-w-[240px] items-center gap-3">
        <span
          className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border border-dashed border-foreground/50 text-[9px] text-foreground/60"
          aria-hidden
        >
          H
        </span>
        <span>Dashed box — human gatekeeper</span>
      </span>
    </div>
  );
}
