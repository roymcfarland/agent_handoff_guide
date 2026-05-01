import { useId } from "react";
import { DiagramShell } from "./DiagramShell";
import { D } from "./diagramTokens";

/** Fig. 3 — Three artifacts with breathing room between columns. */
export function DocumentCadenceDiagram() {
  const uid = useId().replace(/:/g, "");
  const pid = `${uid}-cad`;

  const boxes = [
    {
      file: "PROJECT.md",
      tag: "RARELY CHANGES",
      lines: [
        "Goal · architecture · constraints",
        "Directory map · stack truth",
        "Agents read for alignment",
      ],
    },
    {
      file: "CHANGELOG.md",
      tag: "APPEND-ONLY",
      lines: [
        "One paragraph per closed slice",
        "Debt declared explicitly",
        "Never rewritten backward",
      ],
    },
    {
      file: "HANDOFF.md",
      tag: "PER SLICE",
      lines: [
        "Acceptance criteria · constraints",
        "Only doc Builder executes against",
        "Closeout rewrites each handoff",
      ],
    },
  ] as const;

  const colW = 278;
  const gap = 28;
  const pad = 36;
  const vbW = pad * 2 + colW * 3 + gap * 2;
  const vbH = 312;

  return (
    <DiagramShell
      figure="Fig. 3"
      title="Artifact cadence & responsibilities"
      legend="Split memory · single writer per layer"
      caption="Each file answers a different question: what is true forever, what happened, and what must be true right now."
    >
      <svg
        viewBox={`0 0 ${vbW} ${vbH}`}
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto block h-auto w-full max-w-6xl"
        role="img"
        aria-label="Three columns describe PROJECT.md as rarely changing, CHANGELOG.md as append-only, and HANDOFF.md as per slice."
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

        {boxes.map((b, i) => {
          const x = pad + i * (colW + gap);
          const isHandoff = b.file === "HANDOFF.md";
          return (
            <g key={b.file}>
              <rect
                x={x}
                y="40"
                width={colW}
                height="244"
                rx="2"
                fill={D.paper}
                stroke={isHandoff ? D.red : D.ink}
                strokeWidth={isHandoff ? 2 : 1.5}
              />
              <text
                x={x + colW / 2}
                y="76"
                textAnchor="middle"
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                fontWeight="700"
                fontSize="13"
                fill={D.ink}
              >
                {b.file}
              </text>
              <text
                x={x + colW / 2}
                y="102"
                textAnchor="middle"
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                fontWeight="700"
                fontSize="9"
                letterSpacing="0.14em"
                fill={D.red}
              >
                {b.tag}
              </text>
              <line
                x1={x + 20}
                y1="118"
                x2={x + colW - 20}
                y2="118"
                stroke={D.border}
                strokeWidth="1"
              />
              {b.lines.map((line, j) => (
                <text
                  key={line}
                  x={x + 22}
                  y={142 + j * 28}
                  fontFamily="'JetBrains Mono', ui-monospace, monospace"
                  fontSize="11"
                  fill={D.inkSoft}
                >
                  — {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </DiagramShell>
  );
}
