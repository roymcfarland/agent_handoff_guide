/*
 * CommandPalette — ⌘K / Ctrl+K (or "/" outside a text field) opens a
 * drafting-styled quick-jump over every section, Field Note, and prompt on
 * the page. Built directly on @radix-ui/react-dialog (already a dependency
 * via Sheet) rather than pulling in a command-menu library — the index is
 * small and static, so a custom filter is simpler than a new dependency.
 *
 * Design: paper-card dialog, mono stamps for category, drafting-red active
 * row. No bouncy springs — same mechanical timing as the rest of the site.
 */

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CornerDownLeft, Search } from "lucide-react";
import { FIELD_NOTES, PROMPT_LIBRARY, SECTIONS } from "@/lib/content";

type PaletteCategory = "Section" | "Field Note" | "Prompt";

type PaletteItem = {
  key: string;
  anchor: string; // element id to jump to, without the leading #
  category: PaletteCategory;
  label: string;
  hint: string;
};

function buildIndex(): PaletteItem[] {
  const sections: PaletteItem[] = SECTIONS.map(s => ({
    key: `section-${s.id}`,
    anchor: s.id,
    category: "Section",
    label: s.label,
    hint: s.number,
  }));

  const notes: PaletteItem[] = FIELD_NOTES.map(note => ({
    key: `note-${note.n}`,
    anchor: `note-${note.n}`,
    category: "Field Note",
    label: note.title,
    hint: `#${note.n}`,
  }));

  const prompts: PaletteItem[] = PROMPT_LIBRARY.flatMap(group =>
    group.items.map(item => ({
      key: `prompt-${item.id}`,
      anchor: `prompt-${item.id}`,
      category: "Prompt" as const,
      label: item.title,
      hint: group.scenarioTag,
    }))
  );

  return [...sections, ...notes, ...prompts];
}

const CATEGORY_ORDER: PaletteCategory[] = ["Section", "Field Note", "Prompt"];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(buildIndex, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = !q
      ? index
      : index.filter(
          item =>
            item.label.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q) ||
            item.hint.toLowerCase().includes(q)
        );
    return [...matches].sort(
      (a, b) =>
        CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category)
    );
  }, [index, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  // Global open shortcuts: Cmd/Ctrl+K always; bare "/" only when the user
  // isn't already typing somewhere (an input, textarea, or contentEditable).
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(o => !o);
        return;
      }
      if (open) return;
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const jumpTo = (item: PaletteItem) => {
    setOpen(false);
    setQuery("");
    // A tick so the dialog's own unmount doesn't fight the scroll-into-view.
    window.setTimeout(() => {
      window.location.hash = item.anchor;
    }, 0);
  };

  const onInputKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[activeIndex];
      if (item) jumpTo(item);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Search — jump to a section, field note, or prompt"
          title="Search (⌘K)"
          className="hidden h-9 shrink-0 items-center gap-2 border border-border bg-background px-3 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary sm:inline-flex"
        >
          <Search className="h-3.5 w-3.5" strokeWidth={2.25} />
          <span className="hidden lg:inline">Jump to…</span>
          <kbd className="hidden border border-border px-1 py-0.5 text-[10px] leading-none lg:inline">
            ⌘K
          </kbd>
        </button>
      </Dialog.Trigger>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Search — jump to a section, field note, or prompt"
          className="grid h-9 w-9 shrink-0 place-items-center border border-border bg-background text-foreground transition-colors hover:border-primary hover:text-primary sm:hidden"
        >
          <Search className="h-4 w-4" strokeWidth={2.25} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content
          onOpenAutoFocus={e => {
            e.preventDefault();
            inputRef.current?.focus();
          }}
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed left-1/2 top-[14%] z-50 w-[92%] max-w-xl -translate-x-1/2 border border-border bg-card shadow-[var(--card-shadow)] duration-150"
        >
          <Dialog.Title className="sr-only">
            Jump to a section, field note, or prompt
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            Type to filter, use the arrow keys to select, and press Enter to
            jump.
          </Dialog.Description>
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search
              className="h-4 w-4 shrink-0 text-muted-foreground"
              strokeWidth={2.25}
            />
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder="Jump to a section, field note, or prompt…"
              className="w-full bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <div className="max-h-80 overflow-y-auto">
            {filtered.length === 0 && (
              <p className="px-4 py-6 text-center font-mono text-xs text-muted-foreground">
                Nothing on the page matches that.
              </p>
            )}
            {filtered.map((item, i) => (
              <button
                key={item.key}
                type="button"
                onClick={() => jumpTo(item)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex w-full items-center justify-between gap-4 border-b border-border/60 px-4 py-2.5 text-left transition-colors last:border-b-0 ${
                  i === activeIndex
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground"
                }`}
              >
                <span className="min-w-0 truncate font-mono text-sm">
                  {item.label}
                </span>
                <span
                  className={`shrink-0 font-mono text-[10px] uppercase tracking-widest ${
                    i === activeIndex
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.category} · {item.hint}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center justify-end gap-4 border-t border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span>↑↓ navigate</span>
            <span className="inline-flex items-center gap-1">
              <CornerDownLeft className="h-3 w-3" strokeWidth={2.25} /> select
            </span>
            <span>esc close</span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
