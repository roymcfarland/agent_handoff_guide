import { useId } from "react";
import { PROMPT_LIBRARY } from "@/lib/content";
import { DiagramShell } from "./DiagramShell";
import { D } from "./diagramTokens";
import { wrapWords } from "./svgText";

function cadenceLines(s: string): string[] {
  return wrapWords(s, 44, 4);
}

/** Fig. 5 — Prompt scenarios with generous vertical rhythm. */
export function PromptScenariosDiagram() {
  const uid = useId().replace(/:/g, "");
  const pid = `${uid}-scen`;

  const w = 268;
  const gap = 32;
  const pad = 40;
  const vbW = pad * 2 + w * 3 + gap * 2;
  const vbH = 348;

  return (
    <DiagramShell
      figure="Fig. 5"
      title="Prompt scenario map"
      legend="Install → loop → recovery"
      caption="Work one column at a time. Artifact counts match the expandable cards further down the page."
    >
      <svg
        viewBox={`0 0 ${vbW} ${vbH}`}
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto block h-auto w-full max-w-6xl"
        role="img"
        aria-label="Three columns for install, recurring slice loop, and recovery prompts with artifact counts."
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

        {PROMPT_LIBRARY.map((group, i) => {
          const x = pad + i * (w + gap);
          const mid = x + w / 2;
          const scenarioLines = wrapWords(group.scenario.replace(/ — /g, " · "), 36, 2);

          return (
            <g key={group.scenarioTag}>
              <rect
                x={x}
                y="44"
                width={w}
                height="252"
                rx="2"
                fill={D.paper}
                stroke={D.ink}
                strokeWidth="1.5"
              />
              <text
                x={mid}
                y="76"
                textAnchor="middle"
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                fontWeight="700"
                fontSize="12"
                letterSpacing="0.14em"
                fill={D.red}
              >
                {group.scenarioTag}
              </text>
              {scenarioLines.map((line, li) => (
                <text
                  key={`${group.scenarioTag}-${li}`}
                  x={mid}
                  y={100 + li * 18}
                  textAnchor="middle"
                  fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
                  fontWeight="700"
                  fontSize="14"
                  fill={D.ink}
                >
                  {line}
                </text>
              ))}
              <line
                x1={x + 16}
                y1="140"
                x2={x + w - 16}
                y2="140"
                stroke={D.border}
                strokeWidth="1"
              />
              <text
                x={x + 20}
                y="162"
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                fontSize="9"
                fill={D.inkSoft}
              >
                CADENCE
              </text>
              {cadenceLines(group.cadence).map((line, li) => (
                <text
                  key={li}
                  x={x + 20}
                  y={182 + li * 15}
                  fontFamily="'JetBrains Mono', ui-monospace, monospace"
                  fontSize="10"
                  fill={D.ink}
                >
                  {line}
                </text>
              ))}
              <rect
                x={x + 18}
                y="252"
                width={w - 36}
                height="40"
                rx="2"
                fill={D.paper}
                stroke={D.red}
                strokeWidth="1"
              />
              <text
                x={mid}
                y="274"
                textAnchor="middle"
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                fontWeight="700"
                fontSize="12"
                fill={D.red}
              >
                {group.items.length}{" "}
                {group.items.length === 1 ? "ARTIFACT" : "ARTIFACTS"}
              </text>
              <text
                x={mid}
                y="288"
                textAnchor="middle"
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                fontSize="8"
                fill={D.inkSoft}
                letterSpacing="0.05em"
              >
                RUN TOP → BOTTOM
              </text>
              {i < PROMPT_LIBRARY.length - 1 && (
                <path
                  d={`M ${x + w + 6} 170 H ${x + w + gap - 6}`}
                  fill="none"
                  stroke={D.red}
                  strokeWidth="2"
                  markerEnd={`url(#${pid}-ar)`}
                />
              )}
            </g>
          );
        })}
      </svg>
    </DiagramShell>
  );
}
