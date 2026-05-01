import { useId } from "react";
import { INSTALL_STEPS } from "@/lib/content";
import { DiagramShell } from "./DiagramShell";
import { D } from "./diagramTokens";

function wrapLines(words: string, maxChars: number, maxLines: number): string[] {
  const w = words.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const word of w) {
    const next = cur ? `${cur} ${word}` : word;
    if (next.length <= maxChars) cur = next;
    else {
      if (cur) lines.push(cur);
      cur = word;
      if (lines.length >= maxLines - 1) break;
    }
  }
  if (cur && lines.length < maxLines) lines.push(cur);
  return lines.slice(0, maxLines);
}

/** Fig. 4 — Install sequence as a timed pipeline (content-driven). */
export function InstallPipelineDiagram() {
  const uid = useId().replace(/:/g, "");
  const pid = `${uid}-inst`;

  return (
    <DiagramShell
      figure="Fig. 4"
      title="Install pipeline (~90 min)"
      legend="Five steps · one owner each"
      caption="Steps map 1:1 to prompts in the library. Step 02 is the human edit pass on PROJECT.md."
    >
      <svg
        viewBox="0 0 980 200"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-auto w-full min-w-[520px] sm:min-w-0"
        role="img"
        aria-label="Five install steps from inventory through calibration, with durations from fifteen to thirty minutes."
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
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={D.ink} />
          </marker>
        </defs>
        <rect x="0" y="0" width="980" height="200" fill={D.paper} />
        <rect x="0" y="0" width="980" height="200" fill={`url(#${pid}-grid)`} />

        {INSTALL_STEPS.map((step, i) => {
          const x = 24 + i * 188;
          const w = 168;
          const cx = x + w / 2;
          const titlePart = step.title.includes("—")
            ? (step.title.split("—")[1]?.trim() ?? step.title)
            : step.title;
          const lines = wrapLines(titlePart, 24, 3);
          const nextBoxStart = x + w + 8;

          return (
            <g key={step.n}>
              <rect
                x={x}
                y="40"
                width={w}
                height="120"
                fill={D.paper}
                stroke={D.ink}
                strokeWidth="1.5"
              />
              <text
                x={x + 12}
                y="62"
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                fontWeight="700"
                fontSize="10"
                letterSpacing="0.14em"
                fill={D.red}
              >
                STEP {step.n}
              </text>
              <text
                x={x + 12}
                y="82"
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                fontSize="9"
                fill={D.inkSoft}
              >
                {step.duration}
              </text>
              {lines.map((line, li) => (
                <text
                  key={li}
                  x={cx}
                  y={102 + li * 14}
                  textAnchor="middle"
                  fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
                  fontWeight="600"
                  fontSize="11"
                  fill={D.ink}
                >
                  {line}
                </text>
              ))}
              {i < INSTALL_STEPS.length - 1 && (
                <line
                  x1={nextBoxStart - 12}
                  y1="100"
                  x2={nextBoxStart + 4}
                  y2="100"
                  stroke={D.ink}
                  strokeWidth="1.25"
                  markerEnd={`url(#${pid}-ar)`}
                />
              )}
            </g>
          );
        })}

        <text
          x="490"
          y="186"
          textAnchor="middle"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize="9"
          fill={D.inkSoft}
          letterSpacing="0.08em"
        >
          LINEAR · NO BRANCHING UNTIL STEP 05 COMPLETES
        </text>
      </svg>
    </DiagramShell>
  );
}
