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
      caption="The three files split memory by cadence. The Builder works with context; the Verifier never shares the Builder’s session."
    >
      <svg
        viewBox="0 0 820 400"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-auto w-full"
        role="img"
        aria-label="Reference architecture: PROJECT.md, CHANGELOG.md, and HANDOFF.md connect to Builder LLM and Verifier LLM; the human gatekeeper merges pull requests. The Verifier uses a clean context."
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
              stroke={D.grid}
              strokeOpacity="0.35"
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
        <rect x="0" y="0" width="820" height="400" fill={D.paper} />
        <rect x="0" y="0" width="820" height="400" fill={`url(#${pid}-grid)`} />

        {/* Three artifacts */}
        <g fontFamily="'JetBrains Mono', ui-monospace, monospace" fill={D.ink}>
          <rect
            x="40"
            y="32"
            width="220"
            height="72"
            fill={D.paper}
            stroke={D.ink}
            strokeWidth="1.5"
          />
          <text x="150" y="58" textAnchor="middle" fontWeight="700" fontSize="12">
            PROJECT.md
          </text>
          <text
            x="150"
            y="78"
            textAnchor="middle"
            fill={D.inkSoft}
            fontSize="10"
          >
            immutable core · read-mostly
          </text>

          <rect
            x="300"
            y="32"
            width="220"
            height="72"
            fill={D.paper}
            stroke={D.ink}
            strokeWidth="1.5"
          />
          <text x="410" y="58" textAnchor="middle" fontWeight="700" fontSize="12">
            CHANGELOG.md
          </text>
          <text
            x="410"
            y="78"
            textAnchor="middle"
            fill={D.inkSoft}
            fontSize="10"
          >
            append-only history
          </text>

          <rect
            x="560"
            y="32"
            width="220"
            height="72"
            fill={D.paper}
            stroke={D.red}
            strokeWidth="2"
          />
          <text x="670" y="58" textAnchor="middle" fontWeight="700" fontSize="12">
            HANDOFF.md
          </text>
          <text
            x="670"
            y="78"
            textAnchor="middle"
            fill={D.inkSoft}
            fontSize="10"
          >
            current slice · overwritten
          </text>
        </g>

        {/* Builder */}
        <g>
          <rect
            x="48"
            y="160"
            width="300"
            height="120"
            fill={D.paper}
            stroke={D.ink}
            strokeWidth="1.5"
          />
          <text
            x="64"
            y="188"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontWeight="700"
            fontSize="10"
            letterSpacing="2"
            fill={D.red}
          >
            BUILDER
          </text>
          <text
            x="198"
            y="212"
            textAnchor="middle"
            fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
            fontWeight="700"
            fontSize="17"
            fill={D.ink}
          >
            Builder LLM
          </text>
          <text
            x="64"
            y="236"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontSize="10"
            fill={D.inkSoft}
          >
            · reads PROJECT.md + HANDOFF.md
          </text>
          <text
            x="64"
            y="254"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontSize="10"
            fill={D.inkSoft}
          >
            · writes code branch + opens PR
          </text>
        </g>

        {/* Verifier */}
        <g>
          <rect
            x="472"
            y="160"
            width="300"
            height="120"
            fill={D.paper}
            stroke={D.ink}
            strokeWidth="1.5"
          />
          <text
            x="488"
            y="188"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontWeight="700"
            fontSize="10"
            letterSpacing="2"
            fill={D.red}
          >
            VERIFIER
          </text>
          <text
            x="622"
            y="212"
            textAnchor="middle"
            fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
            fontWeight="700"
            fontSize="17"
            fill={D.ink}
          >
            Verifier LLM
          </text>
          <text
            x="488"
            y="236"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontSize="10"
            fill={D.inkSoft}
          >
            · clean context (no Builder memory)
          </text>
          <text
            x="488"
            y="254"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontSize="10"
            fill={D.inkSoft}
          >
            · reads PR diff + HANDOFF.md
          </text>
        </g>

        {/* Arrows from docs to Builder (merge above Builder top) */}
        <path
          d="M 150 104 L 150 140 L 198 140 L 198 160"
          fill="none"
          stroke={D.red}
          strokeWidth="1.5"
          markerEnd={`url(#${pid}-ar)`}
        />
        <path
          d="M 670 104 L 670 140 L 198 140"
          fill="none"
          stroke={D.red}
          strokeWidth="1.5"
        />
        <text
          x="355"
          y="124"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize="9"
          fill={D.red}
          fontWeight="700"
        >
          context in
        </text>

        {/* PR to Verifier */}
        <path
          d="M 348 220 L 472 220"
          fill="none"
          stroke={D.red}
          strokeWidth="2"
          markerEnd={`url(#${pid}-ar)`}
        />
        <text
          x="390"
          y="212"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize="9"
          fontWeight="700"
          fill={D.red}
        >
          pull request / diff
        </text>

        {/* Verdict down */}
        <path
          d="M 622 280 L 622 300 L 410 300 L 410 316"
          fill="none"
          stroke={D.ink}
          strokeWidth="1.5"
          markerEnd={`url(#${pid}-ai)`}
        />

        {/* Gatekeeper */}
        <g>
          <rect
            x="280"
            y="316"
            width="260"
            height="64"
            fill={D.paper}
            stroke={D.ink}
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <text
            x="410"
            y="340"
            textAnchor="middle"
            fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
            fontWeight="700"
            fontSize="16"
            fill={D.ink}
          >
            Gatekeeper (human)
          </text>
          <text
            x="410"
            y="360"
            textAnchor="middle"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontSize="10"
            fill={D.inkSoft}
          >
            merge · scope · spec amendments
          </text>
        </g>

        <text
          x="622"
          y="292"
          textAnchor="middle"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize="9"
          fontWeight="700"
          fill={D.ink}
        >
          verdict
        </text>
      </svg>
    </DiagramShell>
  );
}
