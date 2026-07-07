/*
 * entry-server — build-time prerender entry.
 *
 * Renders the full App to a string so scripts/prerender.ts can inject the
 * markup into dist/public/index.html. This module is ONLY imported by the
 * SSR build (vite build --ssr); it must never import main.tsx, whose
 * module scope touches the DOM (analytics injection).
 *
 * The markup must stay theme-neutral: the head boot script decides the
 * .dark class pre-paint, and the two theme-consuming widgets (ThemeToggle
 * icon, sonner Toaster) are mounted-gated so server and client initial
 * renders are identical.
 */
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";

export function render(url: string): string {
  return renderToString(
    <Router ssrPath={url}>
      <App />
    </Router>
  );
}
