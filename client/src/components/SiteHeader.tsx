/*
 * SiteHeader — sticky top nav. Mono "stamp" links, drafting-red active marker.
 *
 * Responsive strategy:
 *   - lg+ (≥ 1024px): inline nav, no horizontal scroll. Short labels at every
 *     width; number prefixes only at 2xl (the full-label swap retired when
 *     the tenth section arrived). Brand wordmark hidden lg → xl where the
 *     nav is densest.
 *   - < lg (includes phones, tablets, and narrow split windows): hamburger
 *     button on the right opens a slide-in Sheet. Ten sections plus the theme
 *     toggle no longer fit a 768px row without cramping — the hamburger is
 *     the escape valve, per this header's own design philosophy. Active
 *     section is mirrored in both navs via IntersectionObserver.
 *
 * Design philosophy: the header is graph-paper precise. No wrapping, no
 * horizontal scroll, no cramped labels. The hamburger is the escape valve;
 * the desktop nav stays clean.
 */

import { useEffect, useRef, useState } from "react";
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
  "field-notes": "Notes",
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

/*
 * RobotMark — the brand glyph: a lego-minifig-ish robot head. Draws with
 * currentColor only, so the boxes' existing hover inversion and both
 * palettes work unchanged. Static SVG: prerender- and hydration-safe.
 */
function RobotMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M9.5 4V2h5v2" />
      <rect x="4" y="4" width="16" height="15.5" rx="2.5" />
      <rect
        x="7.75"
        y="8.75"
        width="2.7"
        height="2.7"
        fill="currentColor"
        stroke="none"
      />
      <rect
        x="13.55"
        y="8.75"
        width="2.7"
        height="2.7"
        fill="currentColor"
        stroke="none"
      />
      <path d="M9 15v1.6M12 15v1.6M15 15v1.6" strokeWidth="1.7" />
    </svg>
  );
}

/*
 * ReadingProgress — a drafting-red line under the header tracking scroll
 * depth. Writes transform directly on the node (rAF-throttled) instead of
 * setting state, so scrolling never re-renders the header. Initial state is
 * scaleX(0) on both server and client — hydration-safe.
 */
function ReadingProgress() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (lineRef.current) {
        lineRef.current.style.transform = `scaleX(${ratio})`;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={lineRef}
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-primary"
    />
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  // Mounted-gate the theme-dependent bits: the prerendered markup always
  // says "system" (no localStorage at build time), so a client with a
  // pinned theme would hydrate-mismatch on the icon and labels. Until
  // mount, render the neutral system state both sides agree on.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const shown: Theme = mounted ? theme : "system";

  const Icon = THEME_META[shown].icon;
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Theme: ${THEME_META[shown].label}. Switch to ${THEME_META[NEXT_THEME[shown]].label}.`}
      title={`Theme: ${THEME_META[shown].label} · click for ${THEME_META[NEXT_THEME[shown]].label}`}
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
            className="grid h-9 w-9 place-items-center border border-foreground bg-background text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
          >
            <RobotMark className="h-[22px] w-[22px]" />
          </span>
          {/* Wordmark visibility: shown below lg (hamburger mode has room),
              hidden lg → xl where the inline nav is densest, shown again on
              xl+ where there's plenty of horizontal room. */}
          <span className="font-display text-base font-bold leading-tight lg:hidden xl:block">
            Agent Handoff Framework
          </span>
        </a>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Desktop nav: inline from lg up. No overflow, no scroll. */}
          <nav className="hidden items-center lg:flex">
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
                  {/* Number prefix on the widest screens only — below 2xl the
                      ten entries share the row with the wordmark and theme
                      toggle, and the label alone disambiguates. */}
                  <span className="hidden opacity-60 2xl:inline">{number}</span>
                  {/* Short labels at every width: ten sections plus the theme
                      toggle no longer leave room for the full-label swap.
                      Full names live in the sheet and the section headers. */}
                  <span className="2xl:ml-1">{short}</span>
                  {isActive && (
                    <span className="absolute inset-x-1.5 -bottom-px h-px bg-primary lg:inset-x-2" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Theme toggle: visible at every breakpoint. */}
          <ThemeToggle />

          {/* Mobile/tablet menu trigger: visible below lg. */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open navigation menu"
                className="grid h-9 w-9 place-items-center border border-border bg-background text-foreground transition-colors hover:border-primary hover:text-primary lg:hidden"
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
                    className="grid h-8 w-8 place-items-center border border-foreground bg-background text-foreground"
                  >
                    <RobotMark className="h-5 w-5" />
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
      <ReadingProgress />
    </header>
  );
}
