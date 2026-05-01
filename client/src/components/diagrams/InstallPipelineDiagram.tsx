import { useId } from "react";
import { INSTALL_STEPS } from "@/lib/content";
import { DiagramShell } from "./DiagramShell";
import { D } from "./diagramTokens";
import { wrapWords } from "./svgText";

/** Fig. 4 — Vertical timeline reads cleanly at any viewport width. */
export function InstallPipelineDiagram() {
  const uid = useId().replace(/:/g, "");
  const pid = `${uid}-inst`;

  const cardW = 400;
  const cardH = 112;
  const gap = 28;
  const top = 40;
  const padX = 48;
  const vbH = top + INSTALL_STEPS.length * cardH + (INSTALL_STEPS.length - 1) * gap + 56;
  const vbW = padX * 2 + cardW;

  return (
    <DiagramShell
      figure="Fig. 4"
      title="Install pipeline (~90 min)"
      legend="Five steps · one owner each"
      caption="Run top to bottom once per repo. Prompt links sit in the detailed step list below this figure."
      contentClassName="flex justify-center"
    >
      <svg
        viewBox={`0 0 ${vbW} ${vbH}`}
        xmlns="http://www.w3.org/2000/svg"
        className="block h-auto w-full max-w-md"
        role="img"
        aria-label="Vertical timeline of five install steps from inventory through calibration with durations."
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
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={D.ink} />
          </marker>
        </defs>
        <rect x="0" y="0" width={vbW} height={vbH} fill={D.paper} />
        <rect x="0" y="0" width={vbW} height={vbH} fill={`url(#${pid}-grid)`} />

        {INSTALL_STEPS.map((step, i) => {
          const y = top + i * (cardH + gap);
          const cx = padX + cardW / 2;
          const titlePart = step.title.includes("—")
            ? (step.title.split("—")[1]?.trim() ?? step.title)
            : step.title;
          const lines = wrapWords(titlePart, 46, 3);

          return (
            <g key={step.n}>
              <rect
                x={padX}
                y={y}
                width={cardW}
                height={cardH}
                rx="2"
                fill={D.paper}
                stroke={D.ink}
                strokeWidth="1.5"
              />
              <text
                x={padX + 20}
                y={y + 28}
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                fontWeight="700"
                fontSize="11"
                letterSpacing="0.14em"
                fill={D.red}
              >
                STEP {step.n}
              </text>
              <text
                x={padX + cardW - 20}
                y={y + 28}
                textAnchor="end"
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                fontSize="10"
                fill={D.inkSoft}
              >
                {step.duration}
              </text>
              {lines.map((line, li) => (
                <text
                  key={li}
                  x={cx}
                  y={y + 52 + li * 17}
                  textAnchor="middle"
                  fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
                  fontWeight="600"
                  fontSize="13"
                  fill={D.ink}
                >
                  {line}
                </text>
              ))}
              {i < INSTALL_STEPS.length - 1 && (
                <line
                  x1={cx}
                  y1={y + cardH}
                  x2={cx}
                  y2={y + cardH + gap}
                  stroke={D.ink}
                  strokeWidth="1.5"
                  markerEnd={`url(#${pid}-ar)`}
                />
              )}
            </g>
          );
        })}

        <text
          x={vbW / 2}
          y={vbH - 22}
          textAnchor="middle"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize="9"
          fill={D.inkSoft}
          letterSpacing="0.06em"
        >
          LINEAR SEQUENCE — COMPLETE STEP 05 BEFORE LOOPING
        </text>
      </svg>
    </DiagramShell>
  );
}
