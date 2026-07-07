/*
 * prerender — injects the rendered app into the built index.html.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (entry-server):
 * imports the SSR bundle, renders the page to a string, and replaces the
 * empty root div in dist/public/index.html. The result is a fully static
 * HTML document that hydrates on load (main.tsx feature-detects children).
 *
 * Run via the build script; not useful standalone before the two builds.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const HTML_PATH = join(ROOT, "dist/public/index.html");
const EMPTY_ROOT = '<div id="root"></div>';

const { render } = (await import(
  join(ROOT, "dist/ssr/entry-server.js")
)) as { render: (url: string) => string };

const markup = render("/");
if (!markup.includes("field-notes")) {
  throw new Error("prerender produced markup without expected sections — refusing to write");
}

const template = readFileSync(HTML_PATH, "utf8");
if (!template.includes(EMPTY_ROOT)) {
  throw new Error(`dist/public/index.html has no ${EMPTY_ROOT} marker — template changed?`);
}

writeFileSync(HTML_PATH, template.replace(EMPTY_ROOT, `<div id="root">${markup}</div>`));
console.log(`Prerendered / into dist/public/index.html (${(markup.length / 1024).toFixed(0)}kB of markup)`);
