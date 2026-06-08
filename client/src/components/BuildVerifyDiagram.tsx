/*
 * BuildVerifyDiagram — two-LLM loop in the notebook style.
 * Looser vertical rhythm than earlier revisions so labels stay legible.
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
          The Verifier is a different model in a clean context. It reads the PR
          body, diff, and{" "}
          <code className="font-mono text-foreground">HANDOFF.md</code>, returns
          a verdict with evidence, and never writes code. The human gatekeeper
          makes the final merge call.
        </>
      }
      contentClassName="overflow-x-auto"
    >
      <svg
        viewBox="0 0 920 556"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto block h-auto min-w-[680px] w-full max-w-5xl"
        role="img"
        aria-label="Diagram of the two-LLM build-and-verify loop: HANDOFF.md feeds the Builder LLM, which opens a PR. A different Verifier LLM in a clean context reads the PR body, diff, and HANDOFF.md, returns an APPROVE or REJECT verdict, and the human gatekeeper merges on APPROVE or sends the verdict back on REJECT."
      >
        <defs>
          <pattern
            id={`${pid}-grid`}
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke={grid}
              strokeOpacity="0.2"
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

        <rect x="0" y="0" width="920" height="556" fill={paper} />
        <rect x="0" y="0" width="920" height="556" fill={`url(#${pid}-grid)`} />

        <g
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize="12"
          fill={ink}
        >
          <g>
            <rect
              x="380"
              y="28"
              width="160"
              height="60"
              rx="2"
              fill={paper}
              stroke={ink}
              strokeWidth="1.5"
            />
            <text
              x="460"
              y="52"
              textAnchor="middle"
              fontWeight="700"
              fontSize="14"
            >
              HANDOFF.md
            </text>
            <text
              x="460"
              y="72"
              textAnchor="middle"
              fill={inkSoft}
              fontSize="11"
            >
              current slice
            </text>
          </g>

          <line
            x1="460"
            y1="88"
            x2="460"
            y2="118"
            stroke={red}
            strokeWidth="2"
            markerEnd={`url(#${pid}-arrow)`}
          />

          <g>
            <rect
              x="100"
              y="118"
              width="340"
              height="158"
              rx="2"
              fill={paper}
              stroke={ink}
              strokeWidth="1.5"
            />
            <text
              x="120"
              y="148"
              fontWeight="700"
              fontSize="11"
              letterSpacing="2"
              fill={red}
            >
              STAGE A
            </text>
            <text
              x="120"
              y="174"
              fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
              fontWeight="700"
              fontSize="21"
              fill={ink}
            >
              Builder LLM
            </text>
            <text x="120" y="198" fontSize="11" fill={inkSoft}>
              model A · with project context
            </text>
            <line
              x1="120"
              y1="210"
              x2="420"
              y2="210"
              stroke={ink}
              strokeOpacity="0.22"
              strokeWidth="1"
            />
            <text x="120" y="230" fontSize="12">
              · reads PROJECT.md + HANDOFF.md
            </text>
            <text x="120" y="248" fontSize="12">
              · writes code, runs tests
            </text>
            <text x="120" y="266" fontSize="12">
              · opens PR on feature/&lt;slice&gt;
            </text>
          </g>

          <g>
            <line
              x1="440"
              y1="197"
              x2="540"
              y2="197"
              stroke={red}
              strokeWidth="2"
              markerEnd={`url(#${pid}-arrow)`}
            />
            <text
              x="490"
              y="190"
              textAnchor="middle"
              fontSize="11"
              fill={red}
              fontWeight="700"
            >
              PR opened
            </text>
          </g>

          <g>
            <rect
              x="480"
              y="118"
              width="340"
              height="158"
              rx="2"
              fill={paper}
              stroke={ink}
              strokeWidth="1.5"
            />
            <text
              x="500"
              y="148"
              fontWeight="700"
              fontSize="11"
              letterSpacing="2"
              fill={red}
            >
              STAGE B
            </text>
            <text
              x="500"
              y="174"
              fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
              fontWeight="700"
              fontSize="21"
              fill={ink}
            >
              Verifier LLM
            </text>
            <text x="500" y="198" fontSize="11" fill={inkSoft}>
              model B · clean context · no memory
            </text>
            <line
              x1="500"
              y1="210"
              x2="800"
              y2="210"
              stroke={ink}
              strokeOpacity="0.22"
              strokeWidth="1"
            />
            <text x="500" y="230" fontSize="12">
              · reads PR body + diff + HANDOFF.md
            </text>
            <text x="500" y="248" fontSize="12">
              · checks each Acceptance Criterion
            </text>
            <text x="500" y="266" fontSize="12">
              · returns verdict + evidence (no fixes)
            </text>
          </g>

          <line
            x1="650"
            y1="276"
            x2="650"
            y2="312"
            stroke={red}
            strokeWidth="2"
            markerEnd={`url(#${pid}-arrow)`}
          />

          <g>
            <rect
              x="470"
              y="312"
              width="360"
              height="92"
              rx="2"
              fill={paper}
              stroke={ink}
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <text
              x="492"
              y="342"
              fontWeight="700"
              fontSize="11"
              letterSpacing="2"
              fill={red}
            >
              STAGE C
            </text>
            <text
              x="492"
              y="370"
              fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
              fontWeight="700"
              fontSize="21"
              fill={ink}
            >
              Gatekeeper (you)
            </text>
            <text x="492" y="392" fontSize="12" fill={inkSoft}>
              reviews verdict · merge · follow-ups
            </text>
          </g>

          <text
            x="650"
            y="302"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill={ink}
          >
            verdict
          </text>

          <g>
            <line
              x1="650"
              y1="404"
              x2="650"
              y2="458"
              stroke={ink}
              strokeWidth="1.5"
              markerEnd={`url(#${pid}-arrow-ink)`}
            />
            <rect
              x="560"
              y="460"
              width="180"
              height="52"
              rx="2"
              fill={paper}
              stroke={ink}
              strokeWidth="1.5"
            />
            <text
              x="650"
              y="482"
              textAnchor="middle"
              fontWeight="700"
              fontSize="11"
              fill={red}
            >
              APPROVE
            </text>
            <text x="650" y="500" textAnchor="middle" fontSize="11">
              merge → next Builder
            </text>
          </g>

          <g>
            <path
              d="M 470 358 C 300 358, 240 300, 240 240"
              fill="none"
              stroke={red}
              strokeWidth="2"
              strokeDasharray="6 4"
              markerEnd={`url(#${pid}-arrow)`}
            />
            <text x="320" y="330" fontSize="11" fontWeight="700" fill={red}>
              REJECT — send verdict back
            </text>
          </g>
        </g>
      </svg>
    </DiagramShell>
  );
}
