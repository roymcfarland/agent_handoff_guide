/*
 * FieldNotesSection — the receipts. Curated lessons from operating the
 * framework on real repositories, including this one. Two notes cite
 * verifiable events in this repo's own PR history.
 */
import { SectionHeader } from "@/components/SectionHeader";
import { FIELD_NOTES, FIELD_NOTES_INTRO } from "@/lib/content";

export default function FieldNotesSection() {
  return (
    <section
      id="field-notes"
      aria-labelledby="field-notes-heading"
      className="border-t border-border bg-background/60"
    >
      <div className="container py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader
              id="field-notes-heading"
              number="07"
              label="FIELD NOTES"
              title={FIELD_NOTES_INTRO.pull}
              kicker={
                <>
                  {FIELD_NOTES_INTRO.body}{" "}
                  <a
                    href={FIELD_NOTES_INTRO.auditHref}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="underline decoration-primary underline-offset-4 hover:text-foreground"
                  >
                    {FIELD_NOTES_INTRO.auditLabel}
                  </a>
                  .
                </>
              }
            />
          </div>

          <div className="lg:col-span-8 lg:mt-2">
            <ol className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2">
              {FIELD_NOTES.map(note => (
                <li
                  key={note.n}
                  className="paper-card flex flex-col gap-3 p-6"
                  style={{ boxShadow: "none" }}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-bold tracking-widest text-primary">
                      {note.n}
                    </span>
                    <h3 className="font-display text-xl font-bold leading-snug">
                      {note.title}
                    </h3>
                  </div>
                  <p className="text-[15px] leading-relaxed text-foreground/80">
                    {note.story}
                  </p>
                  <div className="mt-auto border-l-2 border-primary bg-primary/5 px-4 py-3">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                      Rule
                    </div>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-foreground/85">
                      {note.rule}
                    </p>
                  </div>
                  {"receipt" in note && note.receipt && (
                    <p className="font-mono text-[11px] uppercase tracking-widest">
                      <a
                        href={note.receipt.href}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="text-muted-foreground underline decoration-muted-foreground/60 underline-offset-4 hover:text-foreground hover:decoration-foreground"
                      >
                        Receipt: {note.receipt.label} ↗
                      </a>
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
