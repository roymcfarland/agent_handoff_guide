/*
 * SiteHeader — sticky top nav. Mono "stamp" links, drafting-red active marker.
 * Tracks the active section via IntersectionObserver. Mobile collapses to a single
 * row of pill links that horizontally scroll.
 */

import { useEffect, useState } from "react";
import { SECTIONS } from "@/lib/content";

// Compact labels swap in below xl. Number prefix carries the wayfinding;
// the short text is enough to disambiguate at a glance.
// 7-section IA. Short labels swap in below 2xl. Long labels on widest screens.
const SHORT_LABEL: Record<string, string> = {
  overview: "Overview",
  diagnosis: "Diagnosis",
  schema: "Schema",
  install: "Install",
  prompts: "Prompts",
  "build-verify": "Build & Verify",
  "phase-2": "Phase 2",
};

export function SiteHeader() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        // Pick the entry closest to the top that is intersecting
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-sm">
      <div className="container flex items-center justify-between gap-4 py-4">
        <a href="#overview" className="flex shrink-0 items-center gap-3 group">
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center border border-foreground bg-background font-mono text-[11px] font-bold tracking-widest text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
          >
            AHF
          </span>
          <span className="hidden font-display text-base font-bold leading-tight xl:block">
            Agent Handoff Framework
          </span>
        </a>

        <nav className="-mr-2 flex items-center gap-0 overflow-x-auto">
          {SECTIONS.map(({ id, label, number }) => {
            const isActive = active === id;
            const short = SHORT_LABEL[id] ?? label;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative whitespace-nowrap px-2 py-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] transition-colors duration-150 ease-out xl:px-2.5 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="opacity-60">{number}</span>
                {/* Short label up to xl, full label only on the largest screens */}
                <span className="ml-1.5 2xl:hidden">{short}</span>
                <span className="ml-1.5 hidden 2xl:inline">{label}</span>
                {isActive && (
                  <span className="absolute inset-x-2 -bottom-px h-px bg-primary xl:inset-x-2.5" />
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
