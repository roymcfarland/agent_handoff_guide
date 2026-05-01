import { useId } from "react";
import { PHASE_TWO_PHASES } from "@/lib/content";
import { DiagramShell } from "./DiagramShell";
import { D } from "./diagramTokens";

/** Fig. 7 — Operating model: bounded install versus steady-state code PR review. */
export function PhaseModelDiagram() {
  const uid = useId().replace(/:/g, "");
  const pid = `${uid}-ph`;

  const p1 = PHASE_TWO_PHASES[0];
  const p2 = PHASE_TWO_PHASES[1];

  return (
    <DiagramShell
      figure="Fig. 7"
      title="Two-phase operating model"
      legend="Install → steady state"
      caption="Phase 1 ends with a coherent PROJECT.md. Phase 2 never ends — the Verifier audits every merge-boundary."
    >
      <svg
        viewBox="0 0 880 340"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-auto w-full"
        role="img"
        aria-label="Phase 1 spec authoring with finite exit versus Phase 2 feature review that runs indefinitely."
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
              strokeOpacity="0.3"
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
        </defs>
        <rect x="0" y="0" width="880" height="340" fill={D.paper} />
        <rect x="0" y="0" width="880" height="340" fill={`url(#${pid}-grid)`} />

        {/* Phase 1 panel */}
        <rect
          x="32"
          y="48"
          width="370"
          height="260"
          fill={D.paper}
          stroke={D.ink}
          strokeWidth="1.5"
        />
        <text
          x="48"
          y="78"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontWeight="700"
          fontSize="10"
          letterSpacing="0.18em"
          fill={D.red}
        >
          PHASE 1
        </text>
        <text
          x="217"
          y="102"
          textAnchor="middle"
          fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
          fontWeight="700"
          fontSize="16"
          fill={D.ink}
        >
          {p1.name}
        </text>
        <MiniRow label="Trigger" body={p1.trigger} y={118} x={48} w={334} />
        <MiniRow label="Builder" body={p1.builderJob} y={168} x={48} w={334} />
        <MiniRow label="Verifier" body={p1.verifierJob} y={218} x={48} w={334} />
        <rect
          x="56"
          y="276"
          width="320"
          height="22"
          fill={D.paper}
          stroke={D.red}
          strokeWidth="1"
        />
        <text
          x="216"
          y="292"
          textAnchor="middle"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontWeight="700"
          fontSize="9"
          fill={D.red}
        >
          EXIT · {p1.exit}
        </text>

        {/* Gate */}
        <rect
          x="418"
          y="168"
          width="44"
          height="64"
          fill={D.paper}
          stroke={D.red}
          strokeWidth="2"
        />
        <text
          x="440"
          y="198"
          textAnchor="middle"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontWeight="700"
          fontSize="9"
          fill={D.red}
        >
          GATE
        </text>
        <text
          x="440"
          y="214"
          textAnchor="middle"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize="7"
          fill={D.inkSoft}
        >
          CLOSE
        </text>
        <text
          x="400"
          y="250"
          textAnchor="end"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize="7"
          fill={D.inkSoft}
        >
          VERDICT:
        </text>
        <path
          d="M 404 254 H 418"
          fill="none"
          stroke={D.red}
          strokeWidth="2"
          markerEnd={`url(#${pid}-ar)`}
        />
        <path
          d="M 462 254 H 478"
          fill="none"
          stroke={D.red}
          strokeWidth="2"
          markerEnd={`url(#${pid}-ar)`}
        />

        {/* Phase 2 panel */}
        <rect
          x="478"
          y="48"
          width="370"
          height="260"
          fill={D.paper}
          stroke={D.ink}
          strokeWidth="1.5"
        />
        <text
          x="494"
          y="78"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontWeight="700"
          fontSize="10"
          letterSpacing="0.18em"
          fill={D.red}
        >
          PHASE 2
        </text>
        <text
          x="663"
          y="102"
          textAnchor="middle"
          fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
          fontWeight="700"
          fontSize="16"
          fill={D.ink}
        >
          {p2.name}
        </text>
        <MiniRow label="Trigger" body={p2.trigger} y={118} x={494} w={334} />
        <MiniRow label="Builder" body={p2.builderJob} y={168} x={494} w={334} />
        <MiniRow label="Verifier" body={p2.verifierJob} y={218} x={494} w={334} />
        <rect
          x="502"
          y="276"
          width="320"
          height="22"
          fill={D.paper}
          stroke={D.ink}
          strokeWidth="1"
        />
        <text
          x="662"
          y="292"
          textAnchor="middle"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontWeight="700"
          fontSize="9"
          fill={D.inkSoft}
        >
          NO EXIT — {p2.duration}
        </text>
      </svg>
    </DiagramShell>
  );
}

function MiniRow({
  label,
  body,
  x,
  y,
  w,
}: {
  label: string;
  body: string;
  x: number;
  y: number;
  w: number;
}) {
  const trimmed =
    body.length > 140 ? `${body.slice(0, 137).trim()}…` : body;
  return (
    <g>
      <text
        x={x}
        y={y}
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        fontWeight="700"
        fontSize="8"
        letterSpacing="0.1em"
        fill={D.red}
      >
        {label.toUpperCase()}
      </text>
      <text
        x={x}
        y={y + 14}
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        fontSize="9"
        fill={D.ink}
      >
        {trimmed}
      </text>
    </g>
  );
}
