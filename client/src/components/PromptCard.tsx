/*
 * PromptCard — a "torn from the notebook" block that displays a prompt and lets
 * the user copy it. Design: paper card on the grid, drafting-red copy button,
 * mechanical 200ms feedback. NO bouncy springs.
 *
 * Optional extras:
 *  - filename: adds a Download button (Blob + anchor) saving the body under
 *    the same name the generated prompts/ directory uses.
 *  - checklistKey: renders `[ ]` lines as real checkboxes persisted to
 *    localStorage — the notebook remembers your pencil marks. Initial render
 *    is always unchecked (matches the prerendered markup); the stored state
 *    is restored in an effect, so hydration stays clean.
 */

import { useEffect, useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { toast } from "sonner";

type PromptCardProps = {
  label: string; // e.g. "PROMPT 01 / BUILDER"
  title: string; // serif display title
  subtitle: string; // one-line description
  body: string; // the prompt text itself
  filename?: string; // enables the Download button
  checklistKey?: string; // enables persisted checkboxes for [ ] lines
};

const CHECKBOX_LINE = /^(\s*)\[ \] (.*)$/;

function ChecklistBody({
  body,
  storageKey,
}: {
  body: string;
  storageKey: string;
}) {
  const lines = body.split("\n");
  const total = lines.filter(line => CHECKBOX_LINE.test(line)).length;
  const [checked, setChecked] = useState<boolean[]>(() =>
    Array(total).fill(false)
  );

  // Restore pencil marks after mount only — the prerendered page is always
  // unchecked, so server and client initial renders agree.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const stored = JSON.parse(raw);
      if (Array.isArray(stored)) {
        setChecked(Array.from({ length: total }, (_, i) => !!stored[i]));
      }
    } catch {
      /* localStorage unavailable — the notebook forgets, gracefully */
    }
  }, [storageKey, total]);

  const toggle = (index: number) => {
    setChecked(prev => {
      const next = [...prev];
      next[index] = !next[index];
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const done = checked.filter(Boolean).length;
  let boxIndex = -1;

  return (
    <div className="overflow-x-auto px-6 py-6 font-mono text-[13px] leading-relaxed text-foreground sm:text-sm">
      <p className="mb-4 font-mono text-[10.5px] font-bold uppercase tracking-widest text-primary">
        {done} of {total} checked · the notebook remembers (this browser only)
      </p>
      {lines.map((line, lineIndex) => {
        const match = line.match(CHECKBOX_LINE);
        if (!match) {
          return (
            <div key={lineIndex} className="min-h-[1.5em] whitespace-pre">
              {line}
            </div>
          );
        }
        boxIndex += 1;
        const index = boxIndex;
        return (
          <label
            key={lineIndex}
            className="flex cursor-pointer items-start gap-2"
            style={{ paddingLeft: `${match[1].length}ch` }}
          >
            <input
              type="checkbox"
              checked={checked[index] ?? false}
              onChange={() => toggle(index)}
              className="mt-1 h-3.5 w-3.5 shrink-0 accent-[var(--red)]"
            />
            <span
              className={
                checked[index]
                  ? "whitespace-pre-wrap line-through opacity-60"
                  : "whitespace-pre-wrap"
              }
            >
              {match[2]}
            </span>
          </label>
        );
      })}
    </div>
  );
}

export function PromptCard({
  label,
  title,
  subtitle,
  body,
  filename,
  checklistKey,
}: PromptCardProps) {
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

  const handleDownload = () => {
    if (!filename) return;
    const blob = new Blob([body], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${filename}`);
  };

  return (
    <article
      className="paper-card paper-card-lift relative ink-in"
      aria-label={`${label} — ${title}`}
    >
      {/* Header strip with stamp label and copy/download buttons */}
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-6 py-5">
        <div className="min-w-0">
          <div className="stamp">{label}</div>
          <h3 className="mt-2 text-balance font-display text-2xl leading-tight text-foreground sm:text-3xl">
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {filename && (
            <button
              type="button"
              onClick={handleDownload}
              aria-label={`Download ${title} as ${filename}`}
              title={`Download ${filename}`}
              className="inline-flex items-center gap-2 border border-border bg-background px-3 py-2 font-mono text-xs uppercase tracking-widest text-foreground transition-colors duration-150 ease-out hover:border-primary hover:bg-primary hover:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Download className="h-3.5 w-3.5" strokeWidth={2} />
              <span className="hidden sm:inline">.md</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleCopy}
            aria-label={`Copy ${title} to clipboard`}
            className="inline-flex items-center gap-2 border border-border bg-background px-3 py-2 font-mono text-xs uppercase tracking-widest text-foreground transition-colors duration-150 ease-out hover:border-primary hover:bg-primary hover:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
        </div>
      </header>

      {/* Body — monospaced, on a denser grid to feel like dot-matrix paper */}
      <div className="graph-paper-dense">
        {checklistKey ? (
          <ChecklistBody body={body} storageKey={checklistKey} />
        ) : (
          <pre className="overflow-x-auto px-6 py-6 font-mono text-[13px] leading-relaxed text-foreground sm:text-sm">
{body}
          </pre>
        )}
      </div>
    </article>
  );
}
