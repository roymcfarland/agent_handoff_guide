/*
 * SectionHeader — uppercase mono "stamp" + serif display title + optional kicker.
 * Keeps the typographic rhythm consistent across all sections.
 */

import type { ReactNode } from "react";

type SectionHeaderProps = {
  number: string; // e.g. "02"
  label: string;  // e.g. "DIAGNOSIS"
  title: string;
  kicker?: ReactNode;
};

export function SectionHeader({ number, label, title, kicker }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      <div className="stamp">
        <span>SECTION {number}</span>
        <span className="opacity-60">/ {label}</span>
      </div>
      <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
        {title}
      </h2>
      {kicker && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {kicker}
        </p>
      )}
    </div>
  );
}
