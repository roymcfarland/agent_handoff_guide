/*
 * SchemaSection — extracted from Home.tsx in Slice 01.
 * Original lines: L271-L401.
 * No JSX or copy changes; this is a pure file-move + import-trim.
 */
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { SectionHeader } from "@/components/SectionHeader";
import {
  DocumentCadenceDiagram,
} from "@/components/diagrams";
import {
  HANDOFF_TEMPLATE,
  SCHEMA_FILES,
} from "@/lib/content";
export default function SchemaSection() {
  return (
    <section
      id="schema"
      aria-labelledby="schema-heading"
      className="border-t border-border"
    >
      <div className="container py-20 lg:py-24">
        <SectionHeader
          id="schema-heading"
          number="03"
          label="DOCUMENT SCHEMA"
          title="Stop using one handoff document. Use three."
          kicker={
            <>
              The single highest-leverage change you can make. Splitting the doc
              into three artifacts — each with a strict role — directly attacks
              context rot and reduces the chance that agents re-read settled
              history every time they boot.
            </>
          }
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {SCHEMA_FILES.map((f, idx) => (
            <article
              key={f.file}
              className="paper-card relative flex flex-col p-6"
            >
              <div className="absolute -top-3 left-6 bg-background px-2 font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
                FILE 0{idx + 1}
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <code className="font-mono text-lg font-bold text-foreground">
                  {f.file}
                </code>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {f.cadence}
                </span>
              </div>
              <p className="mt-1 font-display text-base font-semibold text-primary">
                {f.role}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-foreground/80">
                {f.description}
              </p>
              <ul className="mt-5 space-y-2 border-t border-border pt-4">
                {f.contains.map(line => (
                  <li
                    key={line}
                    className="flex gap-3 text-sm leading-relaxed text-foreground/85"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-px w-3 shrink-0 bg-primary"
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16 lg:mt-20">
          <DocumentCadenceDiagram />
        </div>

        <TemplateBlock />
      </div>
    </section>
  );
}

function TemplateBlock() {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(HANDOFF_TEMPLATE);
      setCopied(true);
      toast.success("HANDOFF.md template copied");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Copy failed — select the text manually");
    }
  };

  return (
    <div className="mt-16 grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <div className="stamp">TEMPLATE</div>
        <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
          The HANDOFF.md the agent works against.
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          This is the template the Closeout agent fills in for the next Builder.
          Keep the Acceptance Criteria literal and the Constraints aggressive —
          they are the guardrails that keep the agent from drifting.
        </p>
      </div>
      <div className="paper-card overflow-hidden lg:col-span-8">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            HANDOFF.md
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 border border-border bg-background px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
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
        <pre className="graph-paper-dense overflow-x-auto px-5 py-5 font-mono text-[13px] leading-relaxed">
          {HANDOFF_TEMPLATE}
        </pre>
      </div>
    </div>
  );
}
