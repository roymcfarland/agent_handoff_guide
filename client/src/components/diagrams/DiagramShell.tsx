import type { ReactNode } from "react";

type DiagramShellProps = {
  figure: string;
  title: string;
  legend?: string;
  caption?: ReactNode;
  /** Optional textbook-style note below the SVG (legends, caveats). */
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Applied to the padded wrapper around `children` (e.g. overflow-x-auto). */
  contentClassName?: string;
};

/**
 * Textbook-style figure chrome: figure number, title strip, optional legend,
 * graph-paper padded content area. Matches BuildVerifyDiagram / notebook UI.
 */
export function DiagramShell({
  figure,
  title,
  legend,
  caption,
  footer,
  children,
  className,
  contentClassName,
}: DiagramShellProps) {
  return (
    <figure
      className={`paper-card ink-in overflow-hidden ${className ?? ""}`}
    >
      <figcaption className="flex flex-col gap-2 border-b border-border px-5 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            {figure} — {title}
          </span>
          {caption && (
            <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
              {caption}
            </p>
          )}
        </div>
        {legend && (
          <span className="shrink-0 rounded-sm border border-border bg-secondary/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
            {legend}
          </span>
        )}
      </figcaption>
      <div
        className={`bg-background px-4 py-8 sm:px-8 sm:py-10 ${contentClassName ?? ""}`}
      >
        {children}
      </div>
      {footer ? (
        <div className="border-t border-border px-5 py-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {footer}
        </div>
      ) : null}
    </figure>
  );
}
