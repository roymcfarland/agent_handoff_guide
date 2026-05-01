import { useId } from "react";
import { PROMPT_LIBRARY } from "@/lib/content";
import { DiagramShell } from "./DiagramShell";
import { D } from "./diagramTokens";

function wrapCadence(s: string): string[] {
  if (s.length <= 52) return [s];
  const words = s.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length <= 52) cur = next;
    else {
      if (cur) lines.push(cur);
      cur = w;
      if (lines.length >= 2) break;
    }
  }
  if (cur && lines.length < 3) lines.push(cur);
  return lines.slice(0, 3);
}

/** Fig. 5 — Prompt library organized by execution scenario (data from PROMPT_LIBRARY). */
export function PromptScenariosDiagram() {
  const uid = useId().replace(/:/g, "");
  const pid = `${uid}-scen`;

  return (
    <DiagramShell
      figure="Fig. 5"
      title="Prompt scenario map"
      legend="Install → loop → recovery"
      caption="Each column is a scenario: finish prompts in one column before switching workflows."
    >
      <svg
        viewBox="0 0 900 300"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-auto w-full"
        role="img"
        aria-label="Three columns for install, recurring slice loop, and recovery prompts with item counts."
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
        <rect x="0" y="0" width="900" height="300" fill={D.paper} />
        <rect x="0" y="0" width="900" height="300" fill={`url(#${pid}-grid)`} />

        {PROMPT_LIBRARY.map((group, i) => {
          const x = 40 + i * 280;
          const w = 250;
          const mid = x + w / 2;
          return (
            <g key={group.scenarioTag}>
              <rect
                x={x}
                y="36"
                width={w}
                height="220"
                fill={D.paper}
                stroke={D.ink}
                strokeWidth="1.5"
              />
              <text
                x={mid}
                y="64"
                textAnchor="middle"
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                fontWeight="700"
                fontSize="11"
                letterSpacing="0.14em"
                fill={D.red}
              >
                {group.scenarioTag}
              </text>
              <text
                x={mid}
                y="86"
                textAnchor="middle"
                fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
                fontWeight="700"
                fontSize="13"
                fill={D.ink}
              >
                {group.scenario.split(" — ")[0]}
              </text>
              <text
                x={mid}
                y="104"
                textAnchor="middle"
                fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
                fontWeight="500"
                fontSize="11"
                fill={D.inkSoft}
              >
                {group.scenario.includes(" — ")
                  ? `— ${group.scenario.split(" — ")[1]}`
                  : ""}
              </text>
              <line
                x1={x + 14}
                y1="118"
                x2={x + w - 14}
                y2="118"
                stroke={D.border}
                strokeWidth="1"
              />
              <text
                x={x + 18}
                y="140"
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                fontSize="9"
                fill={D.inkSoft}
              >
                CADENCE
              </text>
              {wrapCadence(group.cadence).map((line, li) => (
                <text
                  key={li}
                  x={x + 18}
                  y={158 + li * 13}
                  fontFamily="'JetBrains Mono', ui-monospace, monospace"
                  fontSize="9"
                  fill={D.ink}
                >
                  {line}
                </text>
              ))}
              <rect
                x={x + 16}
                y="208"
                width={w - 32}
                height="36"
                fill={D.paper}
                stroke={D.red}
                strokeWidth="1"
              />
              <text
                x={mid}
                y="228"
                textAnchor="middle"
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                fontWeight="700"
                fontSize="11"
                fill={D.red}
              >
                {group.items.length}{" "}
                {group.items.length === 1 ? "ARTIFACT" : "ARTIFACTS"}
              </text>
              <text
                x={mid}
                y="242"
                textAnchor="middle"
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                fontSize="8"
                fill={D.inkSoft}
                letterSpacing="0.06em"
              >
                TOP TO BOTTOM IN SECTION
              </text>
              {i < PROMPT_LIBRARY.length - 1 && (
                <path
                  d={`M ${x + w + 4} 146 H ${x + w + 24}`}
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
