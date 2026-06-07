import { useId } from "react";
import { FAILURE_MODES } from "@/lib/content";
import { DiagramShell } from "./DiagramShell";
import { D } from "./diagramTokens";
import { wrapWords } from "./svgText";

/** Fig. 2 — Lightweight index: titles only; full prose stays in the cards. */
export function FailureModesMatrixDiagram() {
  const uid = useId().replace(/:/g, "");
  const pid = `${uid}-fail`;

  const colW = 360;
  const rowH = 108;
  const gapY = 20;
  const padX = 32;
  const topY = 36;
  const colGap = 24;
  const vbW = padX * 2 + colW * 2 + colGap;
  const rows = Math.ceil(FAILURE_MODES.length / 2);
  const vbH = topY + rows * rowH + (rows - 1) * gapY + 32;

  return (
    <DiagramShell
      figure="Fig. 2"
      title="Failure-mode index"
      legend="Eight classes · workflow, not model"
      caption="Skim the map first; each numbered card below expands the same idea in full."
    >
      <svg
        viewBox={`0 0 ${vbW} ${vbH}`}
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto block h-auto w-full max-w-3xl"
        role="img"
        aria-label="Grid of eight numbered failure mode titles from committing to main through trusting the report over the repo."
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
        </defs>
        <rect x="0" y="0" width={vbW} height={vbH} fill={D.paper} />
        <rect x="0" y="0" width={vbW} height={vbH} fill={`url(#${pid}-grid)`} />

        {FAILURE_MODES.map((mode, i) => {
          const col = i % 2;
          const row = Math.floor(i / 2);
          const x = padX + col * (colW + colGap);
          const y = topY + row * (rowH + gapY);
          const n = String(i + 1).padStart(2, "0");
          const titleLines = wrapWords(mode.title, 34, 2);

          return (
            <g key={mode.title}>
              <rect
                x={x}
                y={y}
                width={colW}
                height={rowH}
                fill={D.paper}
                stroke={D.ink}
                strokeWidth="1.25"
                rx="2"
              />
              <text
                x={x + 16}
                y={y + 28}
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                fontWeight="700"
                fontSize="12"
                fill={D.red}
              >
                {n}
              </text>
              {titleLines.map((line, li) => (
                <text
                  key={li}
                  x={x + 48}
                  y={y + 28 + li * 18}
                  fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
                  fontWeight="700"
                  fontSize="15"
                  fill={D.ink}
                >
                  {line}
                </text>
              ))}
              <text
                x={x + 16}
                y={y + rowH - 16}
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                fontSize="9"
                fill={D.inkSoft}
                letterSpacing="0.04em"
              >
                SEE CARD {n} ↓
              </text>
            </g>
          );
        })}
      </svg>
    </DiagramShell>
  );
}
