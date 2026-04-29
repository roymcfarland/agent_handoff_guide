/*
 * SiteFooter — minimal footer in keeping with the notebook aesthetic.
 * No social-link spam, no gradient. Mono attribution + a final ruled line.
 */

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-12">
        <div className="ruled mb-8" />
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="stamp">END OF DOCUMENT</div>
            <p className="mt-3 max-w-md font-display text-2xl leading-tight text-foreground">
              A working guide for shipping with agents — not a manifesto.
            </p>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <p>v1.0 · drafted 2026</p>
            <p className="mt-1">Print, paste, and improve as you learn.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
