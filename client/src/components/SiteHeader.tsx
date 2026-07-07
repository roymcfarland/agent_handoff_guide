/*
 * SiteHeader — sticky top nav. Mono "stamp" links, drafting-red active marker.
 *
 * Responsive strategy:
 *   - md+ (≥ 768px): inline nav, no horizontal scroll. Short labels swap in
 *     for full labels below 2xl. Brand wordmark hidden when the nav is densest
 *     (md → lg) so the full nav fits a half-laptop window.
 *   - < md (≤ 767px, includes phones and narrow split windows): hamburger
 *     button on the right opens a slide-in Sheet. Active section is mirrored
 *     in both the inline nav and the sheet menu via IntersectionObserver.
 *
 * Design philosophy: the header is graph-paper precise. No wrapping, no
 * horizontal scroll, no cramped labels. The hamburger is the escape valve;
 * the desktop nav stays clean.
 */

import { useEffect, useState } from "react";
import { Menu, Monitor, Moon, Sun, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme, type Theme } from "@/contexts/ThemeContext";
import { SECTIONS } from "@/lib/content";

// Short labels swap in below 2xl on desktop. The number prefix carries the
// wayfinding; the short text is enough to disambiguate at a glance.
const SHORT_LABEL: Record<string, string> = {
  overview: "Overview",
  diagnosis: "Diagnosis",
  schema: "Schema",
  install: "Install",
  prompts: "Prompts",
  "build-verify": "Build & Verify",
  "phase-2": "Operate",
  "meta-prs": "META-PRs",
  references: "Refs",
};

const THEME_META = {
  light: { icon: Sun, label: "light" },
  dark: { icon: Moon, label: "dark" },
  system: { icon: Monitor, label: "system" },
} as const;

// Mirrors ThemeContext's toggle cycle: light -> dark -> system -> light.
const NEXT_THEME: Record<Theme, Theme> = {
  light: "dark",
  dark: "system",
  system: "light",
};

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const Icon = THEME_META[theme].icon;
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Theme: ${THEME_META[theme].label}. Switch to ${THEME_META[NEXT_THEME[theme]].label}.`}
      title={`Theme: ${THEME_META[theme].label} · click for ${THEME_META[NEXT_THEME[theme]].label}`}
      className="grid h-9 w-9 shrink-0 place-items-center border border-border bg-background text-foreground transition-colors hover:border-primary hover:text-primary"
    >
      <Icon className="h-4 w-4" strokeWidth={2.25} />
    </button>
  );
}

export function SiteHeader() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
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
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 shadow-[inset_0_-1px_0_0_color-mix(in_oklch,var(--primary)_22%,transparent)] supports-[backdrop-filter]:bg-background/88 supports-[backdrop-filter]:backdrop-blur-sm">
      <div className="container flex items-center justify-between gap-4 py-4">
        {/* Brand */}
        <a href="#overview" className="flex shrink-0 items-center gap-3 group">
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center border border-foreground bg-background font-mono text-[11px] font-bold tracking-widest text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
          >
            AHF
          </span>
          {/* Wordmark visibility: shown on phones (sm hidden = block by default
              up through sm), hidden on md/lg where the inline nav is densest,
              shown again on xl+ where there's plenty of horizontal room. */}
          <span className="font-display text-base font-bold leading-tight md:hidden xl:block">
            Agent Handoff Framework
          </span>
        </a>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Desktop nav: inline from md up. No overflow, no scroll. */}
          <nav className="hidden items-center md:flex">
            {SECTIONS.map(({ id, label, number }) => {
              const isActive = active === id;
              const short = SHORT_LABEL[id] ?? label;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative whitespace-nowrap px-1.5 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.1em] transition-colors duration-150 ease-out lg:px-2 lg:text-[10.5px] lg:tracking-[0.12em] ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="opacity-60">{number}</span>
                  {/* Short label up to 2xl; full label only on widest screens. */}
                  <span className="ml-1 2xl:hidden">{short}</span>
                  <span className="ml-1 hidden 2xl:inline">{label}</span>
                  {isActive && (
                    <span className="absolute inset-x-1.5 -bottom-px h-px bg-primary lg:inset-x-2" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Theme toggle: visible at every breakpoint. */}
          <ThemeToggle />

          {/* Mobile menu trigger: visible below md. */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open navigation menu"
                className="grid h-9 w-9 place-items-center border border-border bg-background text-foreground transition-colors hover:border-primary hover:text-primary md:hidden"
              >
                <Menu className="h-4 w-4" strokeWidth={2.25} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[78%] max-w-sm border-l border-border bg-background p-0"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="grid h-8 w-8 place-items-center border border-foreground bg-background font-mono text-[10px] font-bold tracking-widest text-foreground"
                  >
                    AHF
                  </span>
                  <SheetTitle className="font-display text-sm font-bold leading-tight">
                    Agent Handoff Framework
                  </SheetTitle>
                </div>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="grid h-8 w-8 place-items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="h-4 w-4" strokeWidth={2.25} />
                </button>
              </div>
              <nav className="flex flex-col py-2">
                {SECTIONS.map(({ id, label, number }) => {
                  const isActive = active === id;
                  return (
                    <a
                      key={id}
                      href={`#${id}`}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex items-baseline gap-3 border-l-2 px-5 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.12em] transition-colors ${
                        isActive
                          ? "border-primary bg-muted/40 text-primary"
                          : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/20 hover:text-foreground"
                      }`}
                    >
                      <span className="w-8 shrink-0 opacity-60">{number}</span>
                      <span>{label}</span>
                    </a>
                  );
                })}
              </nav>
              <div className="mt-2 border-t border-border px-5 py-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  Tap a section to jump.
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
