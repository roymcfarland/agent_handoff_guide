import { useId } from "react";
import { DiagramShell } from "./DiagramShell";
import { D } from "./diagramTokens";

/** Fig. 8 — Why META-PRs need an external scope document for the Verifier. */
export function MetaPRScopeDiagram() {
  const uid = useId().replace(/:/g, "");
  const pid = `${uid}-meta`;

  return (
    <DiagramShell
      figure="Fig. 8"
      title="META-PR verification chain"
      legend="Scope · diff · verdict"
      caption="When the diff edits the spec file under review, the pasted Builder Brief or Spec Update Proposal becomes the authority — not the file in the branch."
    >
      <svg
        viewBox="0 0 820 240"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-auto w-full"
        role="img"
        aria-label="Flow from meta pull request through scope document in the pull request body to verifier grading diff against that scope."
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
        <rect x="0" y="0" width="820" height="240" fill={D.paper} />
        <rect x="0" y="0" width="820" height="240" fill={`url(#${pid}-grid)`} />

        {/* Step A */}
        <rect
          x="32"
          y="56"
          width="200"
          height="128"
          fill={D.paper}
          stroke={D.red}
          strokeWidth="2"
        />
        <text
          x="48"
          y="84"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontWeight="700"
          fontSize="9"
          fill={D.red}
        >
          A · META-PR
        </text>
        <text
          x="132"
          y="108"
          textAnchor="middle"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize="9"
          fill={D.ink}
        >
          Diff changes HANDOFF.md
        </text>
        <text
          x="132"
          y="124"
          textAnchor="middle"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize="9"
          fill={D.ink}
        >
          or PROJECT.md
        </text>
        <text
          x="132"
          y="158"
          textAnchor="middle"
          fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
          fontWeight="600"
          fontSize="10"
          fill={D.inkSoft}
        >
          File-in-diff cannot be
        </text>
        <text
          x="132"
          y="172"
          textAnchor="middle"
          fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
          fontWeight="600"
          fontSize="10"
          fill={D.inkSoft}
        >
          its own ground truth
        </text>

        <path
          d="M 232 120 H 268"
          fill="none"
          stroke={D.red}
          strokeWidth="2"
          markerEnd={`url(#${pid}-ar)`}
        />

        {/* Step B */}
        <rect
          x="272"
          y="56"
          width="236"
          height="128"
          fill={D.paper}
          stroke={D.ink}
          strokeWidth="1.5"
        />
        <text
          x="288"
          y="84"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontWeight="700"
          fontSize="9"
          fill={D.red}
        >
          B · PR BODY
        </text>
        <text
          x="390"
          y="108"
          textAnchor="middle"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize="9"
          fill={D.ink}
        >
          Paste scope: Builder Brief (Ph 1)
        </text>
        <text
          x="390"
          y="124"
          textAnchor="middle"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize="9"
          fill={D.ink}
        >
          or Spec Update Proposal (Ph 2)
        </text>
        <text
          x="390"
          y="158"
          textAnchor="middle"
          fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
          fontStyle="italic"
          fontSize="11"
          fill={D.inkSoft}
        >
          Verifier grades against this
        </text>

        <path
          d="M 508 120 H 544"
          fill="none"
          stroke={D.red}
          strokeWidth="2"
          markerEnd={`url(#${pid}-ar)`}
        />

        {/* Step C */}
        <rect
          x="548"
          y="56"
          width="240"
          height="128"
          fill={D.paper}
          stroke={D.ink}
          strokeWidth="1.5"
        />
        <text
          x="564"
          y="84"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontWeight="700"
          fontSize="9"
          fill={D.red}
        >
          C · VERIFIER
        </text>
        <text
          x="668"
          y="112"
          textAnchor="middle"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize="9"
          fill={D.ink}
        >
          Compare every hunk to the
        </text>
        <text
          x="668"
          y="128"
          textAnchor="middle"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize="9"
          fill={D.ink}
        >
          declared scope · flag silent
        </text>
        <text
          x="668"
          y="144"
          textAnchor="middle"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize="9"
          fill={D.ink}
        >
          edits to unnamed sections
        </text>
        <text
          x="668"
          y="172"
          textAnchor="middle"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontWeight="700"
          fontSize="8"
          fill={D.red}
        >
          NO FIXES PROPOSED
        </text>
      </svg>
    </DiagramShell>
  );
}
