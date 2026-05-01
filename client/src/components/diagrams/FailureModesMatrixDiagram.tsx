import { useId } from "react";
import { FAILURE_MODES } from "@/lib/content";
import { DiagramShell } from "./DiagramShell";
import { D } from "./diagramTokens";

function shortenTitle(raw: string, max = 36): string {
  if (raw.length <= max) return raw;
  return `${raw.slice(0, max - 1).trim()}…`;
}

/** Fig. 2 — Compact index to the six failure classes (diagnosis section). */
export function FailureModesMatrixDiagram() {
  const uid = useId().replace(/:/g, "");
  const pid = `${uid}-fail`;

  return (
    <DiagramShell
      figure="Fig. 2"
      title="Failure-mode index"
      legend="Six classes · workflow, not model"
      caption="Each cell maps to a card in this section. Use it as a quick orientation before reading the full write-ups."
    >
      <svg
        viewBox="0 0 760 320"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-auto w-full"
        role="img"
        aria-label="Grid of six numbered failure modes from committing to main through planning versus building drift."
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
        <rect x="0" y="0" width="760" height="320" fill={D.paper} />
        <rect x="0" y="0" width="760" height="320" fill={`url(#${pid}-grid)`} />

        {FAILURE_MODES.map((mode, i) => {
          const col = i % 2;
          const row = Math.floor(i / 2);
          const x = 28 + col * 366;
          const y = 24 + row * 96;
          const w = 338;
          const h = 88;
          const n = String(i + 1).padStart(2, "0");
          return (
            <g key={mode.title}>
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                fill={D.paper}
                stroke={D.ink}
                strokeWidth="1.25"
              />
              <text
                x={x + 14}
                y={y + 26}
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                fontWeight="700"
                fontSize="11"
                fill={D.red}
              >
                {n}
              </text>
              <text
                x={x + 48}
                y={y + 26}
                fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
                fontWeight="700"
                fontSize="13"
                fill={D.ink}
              >
                {shortenTitle(mode.title, 40)}
              </text>
              <text
                x={x + 14}
                y={y + 48}
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                fontSize="9"
                fill={D.inkSoft}
              >
                {shorten(mode.body, 88)}
              </text>
            </g>
          );
        })}
      </svg>
    </DiagramShell>
  );
}

function shorten(s: string, max: number): string {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trim()}…`;
}
