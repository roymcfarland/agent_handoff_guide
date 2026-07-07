/*
 * SectionHeader — uppercase mono "stamp" + serif display title + optional kicker.
 * Keeps the typographic rhythm consistent across all sections.
 */

import type { ReactNode } from "react";
import { Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

type SectionHeaderProps = {
  number: string; // e.g. "02"
  label: string; // e.g. "DIAGNOSIS"
  title: string;
  kicker?: ReactNode;
  /**
   * Optional id applied to the rendered <h2>. The wrapping <section> can
   * reference this id via aria-labelledby so screen readers announce the
   * heading when the user enters the landmark.
   */
  id?: string;
  /**
   * Optional section anchor (the wrapping <section>'s id). When present, a
   * hover/focus-revealed button copies an absolute link to the section.
   * Clipboard access happens only in the click handler, so the component
   * stays safe to prerender.
   */
  anchor?: string;
};

async function copySectionLink(anchor: string) {
  try {
    await navigator.clipboard.writeText(`${window.location.origin}/#${anchor}`);
    toast.success("Section link copied");
  } catch {
    toast.error("Copy failed — use the address bar instead");
  }
}

export function SectionHeader({
  number,
  label,
  title,
  kicker,
  id,
  anchor,
}: SectionHeaderProps) {
  return (
    <div className="group max-w-3xl border-l-[3px] border-primary/55 pl-5 sm:pl-6">
      <div className="stamp">
        <span>SECTION {number}</span>
        <span className="opacity-60">/ {label}</span>
      </div>
      <h2
        id={id}
        className="mt-4 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl"
      >
        {title}
        {anchor && (
          <button
            type="button"
            onClick={() => copySectionLink(anchor)}
            aria-label={`Copy link to the ${label} section`}
            title="Copy link to this section"
            className="ml-3 inline-flex h-8 w-8 items-center justify-center border border-border align-middle text-muted-foreground opacity-0 transition-opacity hover:border-primary hover:text-primary focus-visible:opacity-100 group-hover:opacity-100"
          >
            <LinkIcon className="h-4 w-4" strokeWidth={2.25} />
          </button>
        )}
      </h2>
      {kicker && (
        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {kicker}
        </p>
      )}
    </div>
  );
}
