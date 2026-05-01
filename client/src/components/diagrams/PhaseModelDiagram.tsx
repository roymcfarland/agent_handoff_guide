import { useId } from "react";
import { PHASE_TWO_PHASES } from "@/lib/content";
import { DiagramShell } from "./DiagramShell";
import { D } from "./diagramTokens";
import { wrapWords } from "./svgText";

function Field({
  label,
  text,
  x,
  y,
  maxW,
}: {
  label: string;
  text: string;
  x: number;
  y: number;
  maxW: number;
}) {
  const lines = wrapWords(text, maxW, 2);
  return (
    <g>
      <text
        x={x}
        y={y}
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        fontWeight="700"
        fontSize="8"
        letterSpacing="0.12em"
        fill={D.red}
      >
        {label.toUpperCase()}
      </text>
      {lines.map((line, li) => (
        <text
          key={li}
          x={x}
          y={y + 16 + li * 13}
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize="10"
          fill={D.ink}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

/** Fig. 7 — Two-phase operating model with wrapped fields. */
export function PhaseModelDiagram() {
  const uid = useId().replace(/:/g, "");
  const pid = `${uid}-ph`;

  const p1 = PHASE_TWO_PHASES[0];
  const p2 = PHASE_TWO_PHASES[1];

  const panelW = 382;
  const panelH = 352;
  const gateW = 48;
  const leftX = 36;
  const gateX = leftX + panelW + 8;
  const rightX = gateX + gateW + 8;
  const vbW = rightX + panelW + 36;
  const vbH = 416;
  const maxChars = 46;

  function PanelHeader({ x, phase, title }: { x: number; phase: string; title: string }) {
    return (
      <g>
        <rect
          x={x}
          y={48}
          width={panelW}
          height={panelH}
          rx="2"
          fill={D.paper}
          stroke={D.ink}
          strokeWidth="1.5"
        />
        <text
          x={x + 14}
          y={78}
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontWeight="700"
          fontSize="10"
          letterSpacing="0.16em"
          fill={D.red}
        >
          {phase}
        </text>
        <text
          x={x + panelW / 2}
          y={104}
          textAnchor="middle"
          fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
          fontWeight="700"
          fontSize="17"
          fill={D.ink}
        >
          {title}
        </text>
      </g>
    );
  }

  return (
    <DiagramShell
      figure="Fig. 7"
      title="Two-phase operating model"
      legend="Install → steady state"
      caption="Phase 1 converges the spec. Phase 2 runs at every merge — the Verifier is permanent infrastructure, not a launch checklist."
      contentClassName="overflow-x-auto"
    >
      <svg
        viewBox={`0 0 ${vbW} ${vbH}`}
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto block h-auto min-w-[760px] w-full max-w-6xl"
        role="img"
        aria-label="Phase 1 spec authoring with finite exit versus Phase 2 feature review that runs indefinitely."
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
        </defs>
        <rect x="0" y="0" width={vbW} height={vbH} fill={D.paper} />
        <rect x="0" y="0" width={vbW} height={vbH} fill={`url(#${pid}-grid)`} />

        <PanelHeader x={leftX} phase="PHASE 1" title={p1.name} />
        <Field
          label="Trigger"
          text={p1.trigger}
          x={leftX + 14}
          y={126}
          maxW={maxChars}
        />
        <Field
          label="Builder"
          text={p1.builderJob}
          x={leftX + 14}
          y={198}
          maxW={maxChars}
        />
        <Field
          label="Verifier"
          text={p1.verifierJob}
          x={leftX + 14}
          y={270}
          maxW={maxChars}
        />
        <rect
          x={leftX + 14}
          y={334}
          width={panelW - 28}
          height="54"
          rx="2"
          fill={D.paper}
          stroke={D.red}
          strokeWidth="1"
        />
        {wrapWords(`EXIT · ${p1.exit}`, maxChars, 2).map((line, li) => (
          <text
            key={li}
            x={leftX + panelW / 2}
            y={354 + li * 14}
            textAnchor="middle"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontWeight="700"
            fontSize="9"
            fill={D.red}
          >
            {line}
          </text>
        ))}

        <rect
          x={gateX}
          y="176"
          width={gateW}
          height="84"
          rx="2"
          fill={D.paper}
          stroke={D.red}
          strokeWidth="2"
        />
        <text
          x={gateX + gateW / 2}
          y={212}
          textAnchor="middle"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontWeight="700"
          fontSize="9"
          fill={D.red}
        >
          GATE
        </text>
        <text
          x={gateX + gateW / 2}
          y={232}
          textAnchor="middle"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize="8"
          fill={D.inkSoft}
        >
          CLOSE
        </text>
        <text
          x={gateX - 8}
          y={250}
          textAnchor="end"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize="8"
          fill={D.inkSoft}
        >
          VERDICT:
        </text>
        <path
          d={`M ${leftX + panelW} 218 H ${gateX}`}
          fill="none"
          stroke={D.red}
          strokeWidth="2"
          markerEnd={`url(#${pid}-ar)`}
        />
        <path
          d={`M ${gateX + gateW} 218 H ${rightX}`}
          fill="none"
          stroke={D.red}
          strokeWidth="2"
          markerEnd={`url(#${pid}-ar)`}
        />

        <PanelHeader x={rightX} phase="PHASE 2" title={p2.name} />
        <Field
          label="Trigger"
          text={p2.trigger}
          x={rightX + 14}
          y={126}
          maxW={maxChars}
        />
        <Field
          label="Builder"
          text={p2.builderJob}
          x={rightX + 14}
          y={198}
          maxW={maxChars}
        />
        <Field
          label="Verifier"
          text={p2.verifierJob}
          x={rightX + 14}
          y={270}
          maxW={maxChars}
        />
        <rect
          x={rightX + 14}
          y={334}
          width={panelW - 28}
          height="54"
          rx="2"
          fill={D.paper}
          stroke={D.ink}
          strokeWidth="1"
        />
        {wrapWords(`NO EXIT · ${p2.duration}`, maxChars, 2).map((line, li) => (
          <text
            key={li}
            x={rightX + panelW / 2}
            y={354 + li * 14}
            textAnchor="middle"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontWeight="700"
            fontSize="9"
            fill={D.inkSoft}
          >
            {line}
          </text>
        ))}
      </svg>
    </DiagramShell>
  );
}
