/*
 * BuildVerifyDiagram — inline SVG of the two-LLM loop in the notebook style.
 * Hand-drafted feel: ink-navy boxes, mono labels, drafting-red arrows.
 * Unique SVG def IDs via useId to avoid collisions with other figures on the page.
 */

import { useId } from "react";
import { DiagramShell } from "@/components/diagrams/DiagramShell";

export function BuildVerifyDiagram() {
  const uid = useId().replace(/:/g, "");
  const pid = `${uid}-bv`;
  const ink = "var(--ink)";
  const inkSoft = "var(--ink-soft)";
  const red = "var(--red)";
  const paper = "var(--paper)";
  const grid = "var(--grid-strong)";

  return (
    <DiagramShell
      figure="Fig. 6"
      title="The two-LLM loop (per slice)"
      legend="Builder → Verifier → Gatekeeper"
      footer={
        <>
          The Verifier is a different model in a clean context. It reads only the
          diff and{" "}
          <code className="font-mono text-foreground">HANDOFF.md</code>,
          returns a verdict with evidence, and never writes code. The human
          gatekeeper makes the final merge call.
        </>
      }
    >
      <svg
        viewBox="0 0 900 520"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-auto w-full"
        role="img"
        aria-label="Diagram of the two-LLM build-and-verify loop: HANDOFF.md feeds the Builder LLM, which opens a PR. A different Verifier LLM in a clean context returns PASS, CONDITIONAL PASS, or FAIL, and the human gatekeeper decides whether to merge."
      >
        <defs>
          <pattern
            id={`${pid}-grid`}
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke={grid}
              strokeOpacity="0.35"
              strokeWidth="1"
            />
          </pattern>
          <marker
            id={`${pid}-arrow`}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={red} />
          </marker>
          <marker
            id={`${pid}-arrow-ink`}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={ink} />
          </marker>
        </defs>

        <rect x="0" y="0" width="900" height="520" fill={paper} />
        <rect x="0" y="0" width="900" height="520" fill={`url(#${pid}-grid)`} />

        <g
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize="12"
          fill={ink}
        >
          <g>
            <rect
              x="370"
              y="20"
              width="160"
              height="56"
              fill={paper}
              stroke={ink}
              strokeWidth="1.5"
            />
            <text x="450" y="44" textAnchor="middle" fontWeight="700" fontSize="13">
              HANDOFF.md
            </text>
            <text x="450" y="62" textAnchor="middle" fill={inkSoft} fontSize="11">
              current slice
            </text>
          </g>

          <line
            x1="450"
            y1="76"
            x2="450"
            y2="116"
            stroke={red}
            strokeWidth="2"
            markerEnd={`url(#${pid}-arrow)`}
          />

          <g>
            <rect
              x="120"
              y="120"
              width="320"
              height="140"
              fill={paper}
              stroke={ink}
              strokeWidth="1.5"
            />
            <text x="140" y="146" fontWeight="700" fontSize="11" letterSpacing="2" fill={red}>
              STAGE A
            </text>
            <text
              x="140"
              y="170"
              fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
              fontWeight="700"
              fontSize="20"
              fill={ink}
            >
              Builder LLM
            </text>
            <text x="140" y="194" fontSize="11" fill={inkSoft}>
              model A · with project context
            </text>
            <line
              x1="140"
              y1="204"
              x2="420"
              y2="204"
              stroke={ink}
              strokeOpacity="0.25"
              strokeWidth="1"
            />
            <text x="140" y="222" fontSize="11">
              · reads PROJECT.md + HANDOFF.md
            </text>
            <text x="140" y="238" fontSize="11">
              · writes code, runs tests
            </text>
            <text x="140" y="254" fontSize="11">
              · opens PR on feature/&lt;slice&gt;
            </text>
          </g>

          <g>
            <line
              x1="440"
              y1="190"
              x2="540"
              y2="190"
              stroke={red}
              strokeWidth="2"
              markerEnd={`url(#${pid}-arrow)`}
            />
            <text x="490" y="180" textAnchor="middle" fontSize="11" fill={red} fontWeight="700">
              PR opened
            </text>
          </g>

          <g>
            <rect
              x="540"
              y="120"
              width="320"
              height="140"
              fill={paper}
              stroke={ink}
              strokeWidth="1.5"
            />
            <text x="560" y="146" fontWeight="700" fontSize="11" letterSpacing="2" fill={red}>
              STAGE B
            </text>
            <text
              x="560"
              y="170"
              fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
              fontWeight="700"
              fontSize="20"
              fill={ink}
            >
              Verifier LLM
            </text>
            <text x="560" y="194" fontSize="11" fill={inkSoft}>
              model B · clean context · no memory
            </text>
            <line
              x1="560"
              y1="204"
              x2="840"
              y2="204"
              stroke={ink}
              strokeOpacity="0.25"
              strokeWidth="1"
            />
            <text x="560" y="222" fontSize="11">
              · reads ONLY the PR diff + HANDOFF.md
            </text>
            <text x="560" y="238" fontSize="11">
              · checks each Acceptance Criterion
            </text>
            <text x="560" y="254" fontSize="11">
              · returns verdict + evidence (no fixes)
            </text>
          </g>

          <line
            x1="700"
            y1="260"
            x2="700"
            y2="310"
            stroke={red}
            strokeWidth="2"
            markerEnd={`url(#${pid}-arrow)`}
          />

          <g>
            <rect
              x="540"
              y="310"
              width="320"
              height="86"
              fill={paper}
              stroke={ink}
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <text x="560" y="336" fontWeight="700" fontSize="11" letterSpacing="2" fill={red}>
              STAGE C
            </text>
            <text
              x="560"
              y="360"
              fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
              fontWeight="700"
              fontSize="20"
              fill={ink}
            >
              Gatekeeper (you)
            </text>
            <text x="560" y="382" fontSize="11" fill={inkSoft}>
              reviews verdict, makes the merge call
            </text>
          </g>

          <g>
            <line
              x1="600"
              y1="396"
              x2="600"
              y2="450"
              stroke={ink}
              strokeWidth="1.5"
              markerEnd={`url(#${pid}-arrow-ink)`}
            />
            <rect
              x="500"
              y="452"
              width="200"
              height="48"
              fill={paper}
              stroke={ink}
              strokeWidth="1.5"
            />
            <text x="600" y="473" textAnchor="middle" fontWeight="700" fontSize="11" fill={red}>
              PASS
            </text>
            <text x="600" y="490" textAnchor="middle" fontSize="11">
              merge → run next Builder
            </text>
          </g>

          <g>
            <line
              x1="800"
              y1="396"
              x2="800"
              y2="450"
              stroke={ink}
              strokeWidth="1.5"
              markerEnd={`url(#${pid}-arrow-ink)`}
            />
            <rect
              x="710"
              y="452"
              width="180"
              height="48"
              fill={paper}
              stroke={ink}
              strokeWidth="1.5"
            />
            <text x="800" y="473" textAnchor="middle" fontWeight="700" fontSize="11" fill={red}>
              COND. PASS
            </text>
            <text x="800" y="490" textAnchor="middle" fontSize="11">
              merge + follow-up ticket
            </text>
          </g>

          <g>
            <path
              d="M 540 360 C 360 360, 280 320, 280 270"
              fill="none"
              stroke={red}
              strokeWidth="2"
              strokeDasharray="6 4"
              markerEnd={`url(#${pid}-arrow)`}
            />
            <text x="380" y="345" fontSize="11" fontWeight="700" fill={red}>
              FAIL — reopen slice, send verdict back
            </text>
          </g>
        </g>
      </svg>
    </DiagramShell>
  );
}
