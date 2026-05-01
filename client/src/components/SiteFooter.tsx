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
            <p className="mt-3 normal-case tracking-normal">
              <a
                className="text-foreground underline decoration-muted-foreground/60 underline-offset-4 hover:decoration-foreground"
                href="https://github.com/roymcfarland/agent_handoff_guide"
                rel="noopener noreferrer"
                target="_blank">
                Source on GitHub
              </a>
            </p>
          </div>
        </div>
        <div className="ruled mt-10" />
        <p className="mt-6 text-center font-mono text-[10px] leading-relaxed text-muted-foreground sm:text-[11px]">
          Built by{" "}
          <a
            className="font-semibold text-foreground underline decoration-muted-foreground/60 underline-offset-4 hover:decoration-foreground"
            href="https://brightline.io/"
            rel="noopener noreferrer"
            target="_blank">
            Brightline Labs
          </a>
          <span className="mx-2 text-border">·</span>
          <span className="text-foreground/90">© {new Date().getFullYear()} Roy McFarland</span>
        </p>
      </div>
    </footer>
  );
}
