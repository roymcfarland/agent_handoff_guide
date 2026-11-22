import { inject } from "@vercel/analytics";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Vercel Web Analytics loads same-origin from /_vercel/insights (allowed by CSP); enable Analytics in the Vercel project for production.
inject();

// Production builds are prerendered (scripts/prerender.ts), so the root
// arrives with server markup and must hydrate; dev serves an empty root
// and renders from scratch. Feature-detect rather than flag so both paths
// stay correct without configuration.
//
// Only "/" is prerendered, but the SPA rewrite serves the same HTML for
// every path — hydrating home markup on an unknown URL would mismatch the
// router's 404 and flash the wrong page. Off the prerendered route, drop
// the stale markup and client-render.
const root = document.getElementById("root")!;
const onPrerenderedRoute = window.location.pathname === "/";
if (root.hasChildNodes() && onPrerenderedRoute) {
  hydrateRoot(root, <App />);
} else {
  if (root.hasChildNodes()) {
    root.replaceChildren();
  }
  createRoot(root).render(<App />);
}
