/*
 * DiagnosisSection — extracted from Home.tsx in Slice 01.
 * Original lines: L212-L268.
 * No JSX or copy changes; this is a pure file-move + import-trim.
 */
import { SectionHeader } from "@/components/SectionHeader";
import {
  FailureModesMatrixDiagram,
} from "@/components/diagrams";
import { FAILURE_MODES } from "@/lib/content";
export default function DiagnosisSection() {
  return (
    <section
      id="diagnosis"
      aria-labelledby="diagnosis-heading"
      className="border-t border-border bg-background/60"
    >
      <div className="container grid gap-12 py-20 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-4">
          <SectionHeader
            id="diagnosis-heading"
            number="02"
            label="DIAGNOSIS"
            title="Where agent handoffs actually break down."
            kicker={
              <>
                These are the failure modes that show up over and over when
                teams try to chain agents together. They are usually{" "}
                <em>not</em> a model problem — they are a{" "}
                <span className="pen-circle">workflow</span> problem.
              </>
            }
          />
        </div>

        <div className="lg:col-span-8 lg:mt-2">
          <FailureModesMatrixDiagram />
        </div>

        <div className="lg:col-span-12">
          <ol className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2">
            {FAILURE_MODES.map((mode, i) => (
              <li
                key={mode.title}
                className="paper-card flex flex-col gap-3 p-6"
                style={{ boxShadow: "none" }}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs font-bold tracking-widest text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl font-bold leading-snug">
                    {mode.title}
                  </h3>
                </div>
                <p className="text-[15px] leading-relaxed text-foreground/80">
                  {mode.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
