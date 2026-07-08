/*
 * RobotMark — the brand glyph: a lego-minifig-ish robot head. Draws with
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
      strokeWidth="2"
      strokeLinecap="square"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M9.5 4V2h5v2" />
      <rect x="4" y="4" width="16" height="15.5" rx="2.5" />
      <rect
        className="robot-eye"
        x="7.75"
        y="8.75"
        width="2.7"
        height="2.7"
        fill="currentColor"
        stroke="none"
      />
      <rect
        className="robot-eye"
        x="13.55"
        y="8.75"
        width="2.7"
        height="2.7"
        fill="currentColor"
        stroke="none"
      />
      <path d="M9 15v1.6M12 15v1.6M15 15v1.6" strokeWidth="1.7" />
    </svg>
  );
}
