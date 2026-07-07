import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

/** Optional Umami: set both VITE_ANALYTICS_ENDPOINT and VITE_ANALYTICS_WEBSITE_ID (see README.md / .env.example). */
const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
const analyticsWebsiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;
if (analyticsEndpoint && analyticsWebsiteId) {
  const script = document.createElement("script");
  script.defer = true;
  script.src = `${String(analyticsEndpoint).replace(/\/+$/, "")}/umami`;
  script.dataset.websiteId = String(analyticsWebsiteId);
  document.body.appendChild(script);
}

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
