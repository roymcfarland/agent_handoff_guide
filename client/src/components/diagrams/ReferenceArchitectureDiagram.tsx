import { useId } from "react";
import { DiagramShell } from "./DiagramShell";
import { D } from "./diagramTokens";

/** Fig. 1 — High-level system: the Advisor, documents, LLM roles, and the PR surface. */
export function ReferenceArchitectureDiagram() {
  const uid = useId().replace(/:/g, "");
  const pid = `${uid}-ref`;

  return (
    <DiagramShell
      figure="Fig. 1"
      title="Reference architecture"
      legend="Documents · roles · human"
      caption="The Advisor scopes each slice from repo recon. The three files split memory by cadence: the Builder loads context from the docs; the Verifier starts fresh and checks the PR against the scope document."
      contentClassName="overflow-x-auto"
    >
      <svg
        viewBox="0 0 840 502"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto block h-auto w-full min-w-[680px] max-w-5xl"
        role="img"
        aria-label="Reference architecture: the Advisor scopes HANDOFF.md. PROJECT.md, CHANGELOG.md, and HANDOFF.md feed the Builder LLM, which opens a pull request for the Verifier LLM. The verdict passes through Advisor triage to the human gatekeeper, who makes the merge call."
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
          <marker
            id={`${pid}-ai`}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={D.ink} />
          </marker>
        </defs>
        <rect x="0" y="0" width="840" height="502" fill={D.paper} />
        <rect x="0" y="0" width="840" height="502" fill={`url(#${pid}-grid)`} />

        <g fontFamily="'JetBrains Mono', ui-monospace, monospace" fill={D.ink}>
          {/* Advisor band — upstream of every other lane */}
          <rect
            x="44"
            y="24"
            width="752"
            height="52"
            rx="2"
            fill={D.paper}
            stroke={D.ink}
            strokeWidth="1.5"
          />
          <text
            x="60"
            y="45"
            fontWeight="700"
            fontSize="11"
            letterSpacing="0.14em"
            fill={D.red}
          >
            ADVISOR
          </text>
          <text
            x="60"
            y="66"
            fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
            fontWeight="700"
            fontSize="17"
          >
            Advisor
          </text>
          <text
            x="780"
            y="55"
            textAnchor="end"
            fontSize="10.5"
            fill={D.inkSoft}
          >
            recon · scopes the slice · drafts both prompts · triages the verdict
          </text>
          <path
            d="M 680 76 L 680 112"
            fill="none"
            stroke={D.red}
            strokeWidth="2"
            markerEnd={`url(#${pid}-ar)`}
          />
          <text x="690" y="99" fontWeight="700" fontSize="10" fill={D.red}>
            scopes
          </text>
          <rect
            x="44"
            y="112"
            width="232"
            height="84"
            rx="2"
            fill={D.paper}
            stroke={D.ink}
            strokeWidth="1.5"
          />
          <text
            x="160"
            y="140"
            textAnchor="middle"
            fontWeight="700"
            fontSize="13"
          >
            PROJECT.md
          </text>
          <text
            x="160"
            y="164"
            textAnchor="middle"
            fontSize="11"
            fill={D.inkSoft}
          >
            stable core
          </text>
          <text
            x="160"
            y="180"
            textAnchor="middle"
            fontSize="10"
            fill={D.inkSoft}
          >
            read-mostly
          </text>
          <rect
            x="304"
            y="112"
            width="232"
            height="84"
            rx="2"
            fill={D.paper}
            stroke={D.ink}
            strokeWidth="1.5"
          />
          <text
            x="420"
            y="140"
            textAnchor="middle"
            fontWeight="700"
            fontSize="13"
          >
            CHANGELOG.md
          </text>
          <text
            x="420"
            y="164"
            textAnchor="middle"
            fontSize="11"
            fill={D.inkSoft}
          >
            append-only
          </text>
          <text
            x="420"
            y="180"
            textAnchor="middle"
            fontSize="10"
            fill={D.inkSoft}
          >
            long memory
          </text>
          <rect
            x="564"
            y="112"
            width="232"
            height="84"
            rx="2"
            fill={D.paper}
            stroke={D.red}
            strokeWidth="1.5"
          />
          <text
            x="680"
            y="140"
            textAnchor="middle"
            fontWeight="700"
            fontSize="13"
          >
            HANDOFF.md
          </text>
          <text
            x="680"
            y="164"
            textAnchor="middle"
            fontSize="11"
            fill={D.inkSoft}
          >
            current slice
          </text>
          <text
            x="680"
            y="180"
            textAnchor="middle"
            fontSize="10"
            fill={D.inkSoft}
          >
            overwritten each handoff
          </text>
          <g>
            <rect
              x="56"
              y="240"
              width="320"
              height="132"
              rx="2"
              fill={D.paper}
              stroke={D.ink}
              strokeWidth="1.5"
            />
            <text
              x="72"
              y="268"
              fontWeight="700"
              fontSize="11"
              letterSpacing="0.14em"
              fill={D.red}
            >
              BUILDER
            </text>
            <text
              x="216"
              y="296"
              textAnchor="middle"
              fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
              fontWeight="700"
              fontSize="20"
            >
              Builder LLM
            </text>
            <text x="72" y="320" fontSize="11.5" fill={D.inkSoft}>
              · Reads PROJECT.md + HANDOFF.md
            </text>
            <text x="72" y="340" fontSize="11.5" fill={D.inkSoft}>
              · Ships branch + opens PR
            </text>
          </g>
          <g>
            <rect
              x="464"
              y="240"
              width="320"
              height="132"
              rx="2"
              fill={D.paper}
              stroke={D.ink}
              strokeWidth="1.5"
            />
            <text
              x="480"
              y="268"
              fontWeight="700"
              fontSize="11"
              letterSpacing="0.14em"
              fill={D.red}
            >
              VERIFIER
            </text>
            <text
              x="624"
              y="296"
              textAnchor="middle"
              fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
              fontWeight="700"
              fontSize="20"
            >
              Verifier LLM
            </text>
            <text x="480" y="320" fontSize="11.5" fill={D.inkSoft}>
              · Clean context (no Builder chat)
            </text>
            <text x="480" y="340" fontSize="11.5" fill={D.inkSoft}>
              · Reads PR diff + scope doc
            </text>
          </g>
          <path
            d="M 160 196 L 160 224 L 216 224 L 216 240"
            fill="none"
            stroke={D.red}
            strokeWidth="1.5"
            markerEnd={`url(#${pid}-ar)`}
          />
          <path
            d="M 680 196 L 680 232 L 216 232"
            fill="none"
            stroke={D.red}
            strokeWidth="1.5"
          />
          <text
            x="390"
            y="222"
            textAnchor="middle"
            fontWeight="700"
            fontSize="10"
            fill={D.red}
          >
            context in
          </text>
          <path
            d="M 376 306 L 464 306"
            fill="none"
            stroke={D.red}
            strokeWidth="2"
            markerEnd={`url(#${pid}-ar)`}
          />
          <text
            x="420"
            y="298"
            textAnchor="middle"
            fontWeight="700"
            fontSize="10"
            fill={D.red}
          >
            pull request
          </text>
          <path
            d="M 624 372 L 624 412"
            fill="none"
            stroke={D.ink}
            strokeWidth="1.5"
            markerEnd={`url(#${pid}-ai)`}
          />
          <text x="634" y="396" fontWeight="700" fontSize="10">
            verdict
          </text>
          {/* Advisor triage — the verdict is read before the merge call */}
          <rect
            x="504"
            y="412"
            width="240"
            height="48"
            rx="2"
            fill={D.paper}
            stroke={D.ink}
            strokeWidth="1.5"
          />
          <text
            x="624"
            y="432"
            textAnchor="middle"
            fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
            fontWeight="700"
            fontSize="14"
          >
            Advisor triage
          </text>
          <text
            x="624"
            y="449"
            textAnchor="middle"
            fontSize="9.5"
            fill={D.inkSoft}
          >
            real defect — or defective check?
          </text>
          <path
            d="M 504 436 L 440 436"
            fill="none"
            stroke={D.ink}
            strokeWidth="1.5"
            markerEnd={`url(#${pid}-ai)`}
          />
          <rect
            x="144"
            y="398"
            width="296"
            height="76"
            rx="2"
            fill={D.paper}
            stroke={D.ink}
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <text
            x="292"
            y="428"
            textAnchor="middle"
            fontFamily="'IBM Plex Serif', ui-serif, Georgia, serif"
            fontWeight="700"
            fontSize="18"
          >
            Gatekeeper (human)
          </text>
          <text
            x="292"
            y="452"
            textAnchor="middle"
            fontSize="11"
            fill={D.inkSoft}
          >
            merge · scope · spec decisions
          </text>
        </g>
      </svg>
    </DiagramShell>
  );
}
