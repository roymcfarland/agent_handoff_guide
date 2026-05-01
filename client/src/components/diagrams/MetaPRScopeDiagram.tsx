import { useId } from "react";
import { DiagramShell } from "./DiagramShell";
import { D } from "./diagramTokens";

/** Fig. 8 — META-PR chain: three wide steps, minimal text per row. */
export function MetaPRScopeDiagram() {
  const uid = useId().replace(/:/g, "");
  const pid = `${uid}-meta`;

  const vbW = 880;
  const vbH = 260;

  return (
    <DiagramShell
      figure="Fig. 8"
      title="META-PR verification chain"
      legend="Scope · diff · verdict"
      caption="The PR body carries immutable scope. The branch’s spec file is evidence, not the rubric."
    >
      <svg
        viewBox={`0 0 ${vbW} ${vbH}`}
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto block h-auto w-full max-w-6xl"
        role="img"
        aria-label="Meta pull request, scope in pull request body, verifier compares diff to scope."
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

        <g>
          <rect
            x="36"
            y="44"
            width="234"
            height="172"
            rx="3"
            fill={D.paper}
            stroke={D.red}
            strokeWidth="2"
          />
          <text
            x="52"
            y="76"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontWeight="700"
            fontSize="10"
            fill={D.red}
          >
            A · META-PR
          </text>
          <text
            x="152"
            y="104"
            textAnchor="middle"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontSize="11"
            fill={D.ink}
          >
            Diff touches spec file
          </text>
          <text
            x="152"
            y="126"
            textAnchor="middle"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontSize="11"
            fill={D.ink}
          >
            (HANDOFF or PROJECT)
          </text>
          <line
            x1="52"
            y1="142"
            x2="252"
            y2="142"
            stroke={D.border}
            strokeWidth="1"
          />
          <text
            x="152"
            y="168"
            textAnchor="middle"
            fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
            fontWeight="600"
            fontSize="12"
            fill={D.inkSoft}
          >
            That file ≠ authority
          </text>
          <text
            x="152"
            y="190"
            textAnchor="middle"
            fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
            fontWeight="600"
            fontSize="12"
            fill={D.inkSoft}
          >
            while it is changing
          </text>
        </g>

        <path
          d="M 270 130 H 312"
          fill="none"
          stroke={D.red}
          strokeWidth="2"
          markerEnd={`url(#${pid}-ar)`}
        />

        <g>
          <rect
            x="316"
            y="44"
            width="248"
            height="172"
            rx="3"
            fill={D.paper}
            stroke={D.ink}
            strokeWidth="1.5"
          />
          <text
            x="332"
            y="76"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontWeight="700"
            fontSize="10"
            fill={D.red}
          >
            B · PR BODY
          </text>
          <text
            x="440"
            y="108"
            textAnchor="middle"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontSize="11"
            fill={D.ink}
          >
            Builder Brief (Phase 1)
          </text>
          <text
            x="440"
            y="130"
            textAnchor="middle"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontSize="11"
            fill={D.ink}
          >
            or Spec Update Proposal
          </text>
          <text
            x="440"
            y="152"
            textAnchor="middle"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontSize="11"
            fill={D.ink}
          >
            (Phase 2)
          </text>
          <line
            x1="332"
            y1="166"
            x2="548"
            y2="166"
            stroke={D.border}
            strokeWidth="1"
          />
          <text
            x="440"
            y="194"
            textAnchor="middle"
            fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
            fontSize="12"
            fill={D.inkSoft}
          >
            Verifier rubric lives here
          </text>
        </g>

        <path
          d="M 564 130 H 606"
          fill="none"
          stroke={D.red}
          strokeWidth="2"
          markerEnd={`url(#${pid}-ar)`}
        />

        <g>
          <rect
            x="610"
            y="44"
            width="234"
            height="172"
            rx="3"
            fill={D.paper}
            stroke={D.ink}
            strokeWidth="1.5"
          />
          <text
            x="626"
            y="76"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontWeight="700"
            fontSize="10"
            fill={D.red}
          >
            C · VERIFIER
          </text>
          <text
            x="726"
            y="108"
            textAnchor="middle"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontSize="11"
            fill={D.ink}
          >
            Grade diff vs. pasted scope
          </text>
          <text
            x="726"
            y="132"
            textAnchor="middle"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontSize="11"
            fill={D.ink}
          >
            Flag silent scope creep
          </text>
          <text
            x="726"
            y="156"
            textAnchor="middle"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontSize="11"
            fill={D.ink}
          >
            Evidence · no code fixes
          </text>
          <text
            x="726"
            y="196"
            textAnchor="middle"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontWeight="700"
            fontSize="10"
            fill={D.red}
          >
            NO FIXES PROPOSED
          </text>
        </g>
      </svg>
    </DiagramShell>
  );
}
