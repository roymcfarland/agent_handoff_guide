/*
 * SiteHeader — sticky top nav. Mono "stamp" links, drafting-red active marker.
 * Tracks the active section via IntersectionObserver. Mobile collapses to a single
 * row of pill links that horizontally scroll.
 */

import { useEffect, useState } from "react";
import { SECTIONS } from "@/lib/content";

export function SiteHeader() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
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
      <div className="container flex items-center justify-between gap-6 py-4">
        <a href="#overview" className="flex items-center gap-3 group">
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center border border-foreground bg-background font-mono text-[11px] font-bold tracking-widest text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
          >
            AHF
          </span>
          <span className="hidden font-display text-lg font-bold leading-tight sm:block">
            Agent Handoff Framework
          </span>
        </a>

        <nav className="-mr-2 flex items-center gap-1 overflow-x-auto sm:gap-2">
          {SECTIONS.map(({ id, label, number }) => {
            const isActive = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative whitespace-nowrap px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-150 ease-out ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="opacity-60">{number}</span>
                <span className="ml-2">{label}</span>
                {isActive && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-primary" />
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
