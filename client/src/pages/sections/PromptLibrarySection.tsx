/*
 * PromptLibrarySection — extracted from Home.tsx in Slice 01.
 * Original lines: L547-L740.
 * No JSX or copy changes; this is a pure file-move + import-trim.
 */
import { MarkdownBlock } from "@/components/MarkdownBlock";
import { PromptCard } from "@/components/PromptCard";
import { SectionHeader } from "@/components/SectionHeader";
import {
  PromptScenariosDiagram,
} from "@/components/diagrams";
import {
  PROMPT_LIBRARY,
  type LibraryPrompt,
} from "@/lib/content";
export default function PromptLibrarySection() {
  return (
    <section
      id="prompts"
      aria-labelledby="prompts-heading"
      className="border-t border-border bg-background/60"
    >
      <div className="container py-20 lg:py-24">
        <SectionHeader
          id="prompts-heading"
          anchor="prompts"
          number="05"
          label="PROMPT LIBRARY"
          title="Every prompt in one place — organized in the order you run them."
          kicker={
            <>
              Three scenarios, execution-ordered. Click a card to copy the
              prompt or template to your clipboard. Every item is named after
              the file your team would save it as in{" "}
              <code className="font-mono text-foreground">docs/prompts/</code>.
            </>
          }
        />

        {/* Scenario index — small horizontal navigator */}
        <nav
          aria-label="Prompt scenarios"
          className="mt-10 grid gap-3 border-y border-border py-4 sm:grid-cols-3"
        >
          {PROMPT_LIBRARY.map(group => (
            <a
              key={group.scenarioTag}
              href={`#scenario-${group.scenarioTag.toLowerCase()}`}
              className="flex items-baseline gap-3 px-2 py-1 transition-colors hover:text-foreground"
            >
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
                {group.scenarioTag}
              </span>
              <span className="font-display text-[15px] font-semibold text-foreground/90">
                {group.scenario}
              </span>
              <span className="ml-auto font-mono text-[10.5px] uppercase tracking-widest text-muted-foreground">
                {group.items.length}
              </span>
            </a>
          ))}
        </nav>

        <div className="mt-16 lg:mt-20">
          <PromptScenariosDiagram />
        </div>

        {/* The groups */}
        <div className="mt-16 space-y-20">
          {PROMPT_LIBRARY.map(group => (
            <PromptGroup key={group.scenarioTag} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PromptGroup({
  group,
}: {
  group: {
    scenario: string;
    scenarioTag: string;
    cadence: string;
    intro: string;
    items: LibraryPrompt[];
  };
}) {
  return (
    <div id={`scenario-${group.scenarioTag.toLowerCase()}`}>
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="stamp">SCENARIO · {group.scenarioTag}</div>
          <h3 className="mt-3 font-display text-3xl font-bold leading-tight text-foreground">
            {group.scenario}
          </h3>
          <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
            <span className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-primary">
              Cadence —
            </span>{" "}
            {group.cadence}
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">
            {group.intro}
          </p>
        </div>

        <div className="lg:col-span-8">
          <ol className="space-y-6">
            {group.items.map(item => (
              <li
                key={item.id}
                id={`prompt-${item.id}`}
                className="scroll-mt-28"
              >
                <PromptLibraryItem item={item} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function PromptLibraryItem({ item }: { item: LibraryPrompt }) {
  const label = `${item.kind === "template" ? "TEMPLATE" : item.kind === "checklist" ? "CHECKLIST" : "PROMPT"} ${item.order}`;
  const actorLabel =
    item.actor === "builder"
      ? "Builder LLM"
      : item.actor === "verifier"
        ? "Verifier LLM · clean context"
        : "Human";

  // The Edit Pass checklist is long, but it routes to PromptCard anyway:
  // its [ ] lines render as real, localStorage-persisted checkboxes there —
  // the notebook remembers your pencil marks.
  const isInteractiveChecklist = item.id === "edit-pass";

  if (
    !isInteractiveChecklist &&
    (item.kind === "template" || item.body.length > 1800)
  ) {
    // Long content → MarkdownBlock for a scrollable viewer
    return (
      <article className="paper-card p-6">
        <header className="mb-5 flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-4">
          <div>
            <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
              {label}
            </div>
            <h4 className="mt-1 font-display text-xl font-bold leading-tight text-foreground">
              {item.title}
            </h4>
            <p className="mt-1 font-mono text-[10.5px] uppercase tracking-widest text-muted-foreground">
              Actor — {actorLabel}
            </p>
          </div>
        </header>
        <p className="mb-3 text-[14px] leading-relaxed text-foreground/85">
          <span className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-primary">
            When —
          </span>{" "}
          {item.whenToUse}
        </p>
        <p className="mb-5 text-[14px] leading-relaxed text-muted-foreground">
          <span className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-foreground/70">
            Context —
          </span>{" "}
          {item.context}
        </p>
        <MarkdownBlock
          filename={item.filename}
          description={label}
          body={item.body}
          toastLabel={item.toastLabel}
        />
      </article>
    );
  }

  return (
    <article className="paper-card p-6">
      <header className="mb-5 border-b border-border pb-4">
        <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
          {label}
        </div>
        <h4 className="mt-1 font-display text-xl font-bold leading-tight text-foreground">
          {item.title}
        </h4>
        <p className="mt-1 font-mono text-[10.5px] uppercase tracking-widest text-muted-foreground">
          Actor — {actorLabel} · File —{" "}
          <code className="font-mono">{item.filename}</code>
        </p>
      </header>
      <p className="mb-3 text-[14px] leading-relaxed text-foreground/85">
        <span className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-primary">
          When —
        </span>{" "}
        {item.whenToUse}
      </p>
      <p className="mb-5 text-[14px] leading-relaxed text-muted-foreground">
        <span className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-foreground/70">
          Context —
        </span>{" "}
        {item.context}
      </p>
      <PromptCard
        label={label}
        title={item.title}
        subtitle={item.whenToUse}
        body={item.body}
        filename={item.filename}
        checklistKey={isInteractiveChecklist ? "ahf-editpass-v1" : undefined}
      />
    </article>
  );
}
