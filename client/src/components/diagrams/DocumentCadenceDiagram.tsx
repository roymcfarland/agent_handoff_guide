import { useId } from "react";
import { DiagramShell } from "./DiagramShell";
import { D } from "./diagramTokens";

/** Fig. 3 — Static responsibilities matrix for the three-document split. */
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

  return (
    <DiagramShell
      figure="Fig. 3"
      title="Artifact cadence & responsibilities"
      legend="Split memory · single writer per layer"
      caption="Each file answers a different question: what is true forever, what happened, and what must be true right now."
    >
      <svg
        viewBox="0 0 840 260"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-auto w-full"
        role="img"
        aria-label="Three columns describe PROJECT.md as rarely changing, CHANGELOG.md as append-only, and HANDOFF.md as per slice with acceptance criteria."
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
        </defs>
        <rect x="0" y="0" width="840" height="260" fill={D.paper} />
        <rect x="0" y="0" width="840" height="260" fill={`url(#${pid}-grid)`} />

        {boxes.map((b, i) => {
          const x = 30 + i * 270;
          const isHandoff = b.file === "HANDOFF.md";
          return (
            <g key={b.file}>
              <rect
                x={x}
                y="28"
                width="250"
                height="204"
                fill={D.paper}
                stroke={isHandoff ? D.red : D.ink}
                strokeWidth={isHandoff ? 2 : 1.5}
              />
              <text
                x={x + 125}
                y="56"
                textAnchor="middle"
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                fontWeight="700"
                fontSize="12"
                fill={D.ink}
              >
                {b.file}
              </text>
              <text
                x={x + 125}
                y="78"
                textAnchor="middle"
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                fontWeight="700"
                fontSize="9"
                letterSpacing="0.12em"
                fill={D.red}
              >
                {b.tag}
              </text>
              <line
                x1={x + 16}
                y1="88"
                x2={x + 234}
                y2="88"
                stroke={D.border}
                strokeWidth="1"
              />
              {b.lines.map((line, j) => (
                <text
                  key={line}
                  x={x + 20}
                  y={108 + j * 22}
                  fontFamily="'JetBrains Mono', ui-monospace, monospace"
                  fontSize="10"
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
