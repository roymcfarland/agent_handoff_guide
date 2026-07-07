/*
 * SiteFooter — minimal footer in keeping with the notebook aesthetic.
 * No social-link spam, no gradient. Mono attribution, a drawing title block
 * (the methodology's revision history), and a final ruled line.
 */
import { REVISION_TABLE } from "@/lib/content";

const CURRENT_REV = REVISION_TABLE[REVISION_TABLE.length - 1];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-12">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <div className="h-1 w-16 bg-primary/35" aria-hidden />
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="stamp">END OF DOCUMENT</div>
            <p className="mt-3 max-w-md font-display text-2xl leading-tight text-foreground">
              A working guide for shipping with agents — not a manifesto.
            </p>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <p>
              rev {CURRENT_REV.rev} · {CURRENT_REV.date}
            </p>
            <p className="mt-1">Print, paste, and improve as you learn.</p>
            <p className="mt-3 normal-case tracking-normal">
              <a
                className="text-foreground underline decoration-muted-foreground/60 underline-offset-4 hover:decoration-foreground"
                href="https://github.com/roymcfarland/agent_handoff_guide"
                rel="noopener noreferrer"
                target="_blank"
              >
                Source on GitHub
              </a>
            </p>
          </div>
        </div>

        {/* Drawing title block — the methodology's revision history */}
        <div className="mt-10">
          <div className="stamp">TITLE BLOCK · REVISIONS</div>
          <div className="mt-3 overflow-x-auto border border-border bg-background/60">
            <table className="w-full border-collapse text-left font-mono">
              <caption className="sr-only">
                Methodology revision history
              </caption>
              <thead>
                <tr className="border-b border-border bg-secondary/40 text-[10px] uppercase tracking-widest text-muted-foreground">
                  <th scope="col" className="px-3 py-2 font-bold">
                    Rev
                  </th>
                  <th scope="col" className="px-3 py-2 font-bold">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-2 font-bold">
                    Description
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-2 font-bold sm:table-cell"
                  >
                    Drawn
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-2 font-bold sm:table-cell"
                  >
                    Checked
                  </th>
                </tr>
              </thead>
              <tbody>
                {REVISION_TABLE.map(row => (
                  <tr
                    key={row.rev}
                    className="border-b border-border align-top last:border-b-0"
                  >
                    <td className="whitespace-nowrap px-3 py-2 text-[11px] font-bold text-primary">
                      {row.rev}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-[11px] text-foreground/80">
                      {row.date}
                    </td>
                    <td className="px-3 py-2 text-[11px] leading-relaxed text-foreground/85">
                      {row.description}
                    </td>
                    <td className="hidden whitespace-nowrap px-3 py-2 text-[10px] uppercase tracking-widest text-muted-foreground sm:table-cell">
                      {row.drawn}
                    </td>
                    <td className="hidden whitespace-nowrap px-3 py-2 text-[10px] uppercase tracking-widest text-muted-foreground sm:table-cell">
                      {row.checked}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="ruled mt-10" />
        <p className="mt-6 text-center font-mono text-[10px] leading-relaxed text-muted-foreground sm:text-[11px]">
          Built by{" "}
          <a
            className="font-semibold text-foreground underline decoration-muted-foreground/60 underline-offset-4 hover:decoration-foreground"
            href="https://brightline.io/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Brightline Labs
          </a>
          <span className="mx-2 text-border">·</span>
          <span className="text-foreground/90">
            © {new Date().getFullYear()} Roy McFarland
          </span>
        </p>
      </div>
    </footer>
  );
}
