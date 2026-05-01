/*
 * SectionHeader — uppercase mono "stamp" + serif display title + optional kicker.
 * Keeps the typographic rhythm consistent across all sections.
 */

import type { ReactNode } from "react";

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
};

export function SectionHeader({
  number,
  label,
  title,
  kicker,
  id,
}: SectionHeaderProps) {
  return (
    <div className="max-w-3xl border-l-[3px] border-primary/55 pl-5 sm:pl-6">
      <div className="stamp">
        <span>SECTION {number}</span>
        <span className="opacity-60">/ {label}</span>
      </div>
      <h2
        id={id}
        className="mt-4 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl"
      >
        {title}
      </h2>
      {kicker && (
        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {kicker}
        </p>
      )}
    </div>
  );
}
