/*
 * PromptCard — a "torn from the notebook" block that displays a prompt and lets
 * the user copy it. Design: paper card on the grid, drafting-red copy button,
 * mechanical 200ms feedback. NO bouncy springs.
 */

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

type PromptCardProps = {
  label: string;        // e.g. "PROMPT 01 / BUILDER"
  title: string;        // serif display title
  subtitle: string;     // one-line description
  body: string;         // the prompt text itself
};

export function PromptCard({ label, title, subtitle, body }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      toast.success("Prompt copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Copy failed — select the text manually");
    }
  };

  return (
    <article
      className="paper-card relative ink-in"
      aria-label={`${label} — ${title}`}
    >
      {/* Header strip with stamp label and copy button */}
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-6 py-5">
        <div className="min-w-0">
          <div className="stamp">{label}</div>
          <h3 className="mt-2 font-display text-2xl leading-tight text-foreground sm:text-3xl">
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy ${title} to clipboard`}
          className="group inline-flex shrink-0 items-center gap-2 border border-border bg-background px-3 py-2 font-mono text-xs uppercase tracking-widest text-foreground transition-colors duration-150 ease-out hover:border-primary hover:bg-primary hover:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" strokeWidth={2} />
              Copy
            </>
          )}
        </button>
      </header>

      {/* Body — monospaced, on a denser grid to feel like dot-matrix paper */}
      <div className="graph-paper-dense">
        <pre className="overflow-x-auto px-6 py-6 font-mono text-[13px] leading-relaxed text-foreground sm:text-sm">
{body}
        </pre>
      </div>
    </article>
  );
}
