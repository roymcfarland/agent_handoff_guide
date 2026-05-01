/*
 * MarkdownBlock — large copy-paste markdown spec block.
 * Differs from PromptCard in that the body is expected to be long (hundreds of
 * lines) and is shown inside a height-capped, scrollable container so it does
 * not dominate the page. Includes copy + filename label.
 */

import { useState } from "react";
import { Check, Copy, FileText } from "lucide-react";
import { toast } from "sonner";

type MarkdownBlockProps = {
  filename: string;          // e.g. "docs/build-and-verify.md"
  description: string;       // one-line description
  body: string;              // raw markdown
  toastLabel?: string;       // optional override for toast text
};

export function MarkdownBlock({
  filename,
  description,
  body,
  toastLabel,
}: MarkdownBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      toast.success(toastLabel ?? `${filename} copied to clipboard`);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Copy failed — select the text manually");
    }
  };

  return (
    <article className="paper-card paper-card-lift overflow-hidden">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <FileText className="h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
          <code className="truncate font-mono text-sm font-bold text-foreground">
            {filename}
          </code>
          <span className="hidden font-mono text-[11px] uppercase tracking-widest text-muted-foreground sm:inline">
            · {description}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy ${filename} to clipboard`}
          className="inline-flex items-center gap-2 border border-border bg-background px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-foreground transition-colors duration-150 hover:border-primary hover:bg-primary hover:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" strokeWidth={2} />
              Copy markdown
            </>
          )}
        </button>
      </header>

      <div className="graph-paper-dense max-h-[640px] overflow-auto">
        <pre className="px-5 py-5 font-mono text-[12.5px] leading-relaxed text-foreground sm:text-[13px]">
{body}
        </pre>
      </div>

      <footer className="border-t border-border bg-secondary/40 px-5 py-2 font-mono text-[10.5px] uppercase tracking-widest text-muted-foreground">
        Scroll to read · Copy to drop into your repo
      </footer>
    </article>
  );
}
