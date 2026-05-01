import { useId } from "react";
import { DiagramShell } from "./DiagramShell";
import { D } from "./diagramTokens";

/** Fig. 1 — High-level system: documents, LLM roles, and the PR surface. */
export function ReferenceArchitectureDiagram() {
  const uid = useId().replace(/:/g, "");
  const pid = `${uid}-ref`;

  return (
    <DiagramShell
      figure="Fig. 1"
      title="Reference architecture"
      legend="Documents · models · human"
      caption="The three files split memory by cadence. The Builder loads context from the docs; the Verifier starts fresh and checks the PR against the scope document."
    >
      <svg
        viewBox="0 0 840 454"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto block h-auto w-full max-w-5xl"
        role="img"
        aria-label="Reference architecture: PROJECT.md, CHANGELOG.md, and HANDOFF.md connect to Builder LLM and Verifier LLM; the human gatekeeper merges pull requests."
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
              stroke={D.grid}
              strokeOpacity="0.2"
              strokeWidth="1"
            />
          </pattern>
          <marker
            id={`${pid}-ar`}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={D.red} />
          </marker>
          <marker
            id={`${pid}-ai`}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={D.ink} />
          </marker>
        </defs>
        <rect x="0" y="0" width="840" height="454" fill={D.paper} />
        <rect x="0" y="0" width="840" height="454" fill={`url(#${pid}-grid)`} />

        <g fontFamily="'JetBrains Mono', ui-monospace, monospace" fill={D.ink}>
          <rect
            x="44"
            y="40"
            width="232"
            height="84"
            rx="2"
            fill={D.paper}
            stroke={D.ink}
            strokeWidth="1.5"
          />
          <text
            x="160"
            y="68"
            textAnchor="middle"
            fontWeight="700"
            fontSize="13"
          >
            PROJECT.md
          </text>
          <text
            x="160"
            y="92"
            textAnchor="middle"
            fill={D.inkSoft}
            fontSize="11"
          >
            stable core
          </text>
          <text
            x="160"
            y="108"
            textAnchor="middle"
            fill={D.inkSoft}
            fontSize="10"
          >
            read-mostly
          </text>

          <rect
            x="304"
            y="40"
            width="232"
            height="84"
            rx="2"
            fill={D.paper}
            stroke={D.ink}
            strokeWidth="1.5"
          />
          <text
            x="420"
            y="68"
            textAnchor="middle"
            fontWeight="700"
            fontSize="13"
          >
            CHANGELOG.md
          </text>
          <text
            x="420"
            y="92"
            textAnchor="middle"
            fill={D.inkSoft}
            fontSize="11"
          >
            append-only
          </text>
          <text
            x="420"
            y="108"
            textAnchor="middle"
            fill={D.inkSoft}
            fontSize="10"
          >
            long memory
          </text>

          <rect
            x="564"
            y="40"
            width="232"
            height="84"
            rx="2"
            fill={D.paper}
            stroke={D.red}
            strokeWidth="2"
          />
          <text
            x="680"
            y="68"
            textAnchor="middle"
            fontWeight="700"
            fontSize="13"
          >
            HANDOFF.md
          </text>
          <text
            x="680"
            y="92"
            textAnchor="middle"
            fill={D.inkSoft}
            fontSize="11"
          >
            current slice
          </text>
          <text
            x="680"
            y="108"
            textAnchor="middle"
            fill={D.inkSoft}
            fontSize="10"
          >
            overwritten each handoff
          </text>
        </g>

        <g>
          <rect
            x="56"
            y="168"
            width="320"
            height="132"
            rx="2"
            fill={D.paper}
            stroke={D.ink}
            strokeWidth="1.5"
          />
          <text
            x="72"
            y="196"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontWeight="700"
            fontSize="10"
            letterSpacing="2"
            fill={D.red}
          >
            BUILDER
          </text>
          <text
            x="216"
            y="224"
            textAnchor="middle"
            fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
            fontWeight="700"
            fontSize="18"
            fill={D.ink}
          >
            Builder LLM
          </text>
          <text
            x="72"
            y="248"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontSize="11"
            fill={D.inkSoft}
          >
            · Reads PROJECT.md + HANDOFF.md
          </text>
          <text
            x="72"
            y="268"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontSize="11"
            fill={D.inkSoft}
          >
            · Ships branch + opens PR
          </text>
        </g>

        <g>
          <rect
            x="464"
            y="168"
            width="320"
            height="132"
            rx="2"
            fill={D.paper}
            stroke={D.ink}
            strokeWidth="1.5"
          />
          <text
            x="480"
            y="196"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontWeight="700"
            fontSize="10"
            letterSpacing="2"
            fill={D.red}
          >
            VERIFIER
          </text>
          <text
            x="624"
            y="224"
            textAnchor="middle"
            fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
            fontWeight="700"
            fontSize="18"
            fill={D.ink}
          >
            Verifier LLM
          </text>
          <text
            x="480"
            y="248"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontSize="11"
            fill={D.inkSoft}
          >
            · Clean context (no Builder chat)
          </text>
          <text
            x="480"
            y="268"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontSize="11"
            fill={D.inkSoft}
          >
            · Reads PR diff + scope doc
          </text>
        </g>

        <path
          d="M 160 124 L 160 152 L 216 152 L 216 168"
          fill="none"
          stroke={D.red}
          strokeWidth="1.5"
          markerEnd={`url(#${pid}-ar)`}
        />
        <path
          d="M 680 124 L 680 160 L 216 160"
          fill="none"
          stroke={D.red}
          strokeWidth="1.5"
        />
        <text
          x="390"
          y="150"
          textAnchor="middle"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize="10"
          fill={D.red}
          fontWeight="700"
        >
          context in
        </text>

        <path
          d="M 376 234 L 464 234"
          fill="none"
          stroke={D.red}
          strokeWidth="2"
          markerEnd={`url(#${pid}-ar)`}
        />
        <text
          x="396"
          y="226"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize="10"
          fontWeight="700"
          fill={D.red}
        >
          pull request
        </text>

        <path
          d="M 624 300 L 624 328 L 420 328 L 420 348"
          fill="none"
          stroke={D.ink}
          strokeWidth="1.5"
          markerEnd={`url(#${pid}-ai)`}
        />
        <text
          x="624"
          y="320"
          textAnchor="middle"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize="10"
          fontWeight="700"
          fill={D.ink}
        >
          verdict
        </text>

        <g>
          <rect
            x="272"
            y="348"
            width="296"
            height="76"
            rx="2"
            fill={D.paper}
            stroke={D.ink}
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <text
            x="420"
            y="378"
            textAnchor="middle"
            fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
            fontWeight="700"
            fontSize="17"
            fill={D.ink}
          >
            Gatekeeper (human)
          </text>
          <text
            x="420"
            y="402"
            textAnchor="middle"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontSize="10"
            fill={D.inkSoft}
          >
            merge · scope · spec decisions
          </text>
        </g>
      </svg>
    </DiagramShell>
  );
}
