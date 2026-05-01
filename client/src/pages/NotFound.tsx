/*
 * NotFound — 404 page in the project's notebook design language.
 *
 * Previous version used hard-coded slate/blue Tailwind colors that did not
 * respect the cream/blueprint dark-mode token system. This rewrite uses only
 * semantic tokens (bg-background, text-foreground, border-border, etc.) and
 * the established `paper-card` / `stamp` / `pen-circle` utilities, so the
 * page reads as part of the same document in both light and dark modes.
 */

import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="graph-paper relative flex min-h-screen items-center justify-center px-4 py-16">
      <main className="paper-card relative w-full max-w-lg p-10 sm:p-12">
        <div className="stamp">FILE NOT FOUND / 404</div>

        <h1 className="mt-4 text-balance font-display text-6xl font-bold leading-none tracking-tight text-foreground sm:text-7xl">
          <span className="pen-circle">404</span>
        </h1>

        <p className="mt-6 text-balance font-display text-2xl leading-snug text-foreground">
          Off the page.
        </p>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          The address you followed isn&apos;t in this notebook. It may have
          been moved, the section may have been renumbered, or the link may
          simply be a typo.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setLocation("/")}
            className="inline-flex items-center justify-center gap-2 border border-foreground bg-foreground px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-background transition-colors duration-150 ease-out hover:bg-primary hover:border-primary hover:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.5} />
            Return to overview
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 border border-border bg-background px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-foreground transition-colors duration-150 ease-out hover:border-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Go back one page
          </button>
        </div>
      </main>
    </div>
  );
}
