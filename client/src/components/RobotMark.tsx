/*
 * RobotMark — the brand glyph: a round-eyed robot head with an antenna and
 * side bolts, the same head drawn on the share card and favicon. Draws with
 * currentColor only, so container hover inversions and both palettes work
 * unchanged. Static SVG: prerender- and hydration-safe.
 *
 * The eyes carry .robot-eye so a hovered ancestor with .robot-blink can
 * make him blink (see index.css; reduced-motion guarded).
 */
export function RobotMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M12 7V4.5" strokeWidth="1.8" />
      <circle cx="12" cy="3.2" r="1.9" fill="currentColor" stroke="none" />
      <rect
        x="1.2"
        y="11"
        width="2.3"
        height="5"
        rx="0.8"
        fill="currentColor"
        stroke="none"
      />
      <rect
        x="20.5"
        y="11"
        width="2.3"
        height="5"
        rx="0.8"
        fill="currentColor"
        stroke="none"
      />
      <rect x="4.2" y="7.2" width="15.6" height="13.6" rx="3" />
      <circle
        className="robot-eye"
        cx="9"
        cy="12.6"
        r="1.8"
        fill="currentColor"
        stroke="none"
      />
      <circle
        className="robot-eye"
        cx="15"
        cy="12.6"
        r="1.8"
        fill="currentColor"
        stroke="none"
      />
      <path d="M9 17h6" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
