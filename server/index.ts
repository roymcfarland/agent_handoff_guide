/**
 * Production static server for the built SPA.
 *
 * After `pnpm build`, Vite emits the client to `dist/public` and esbuild emits
 * this file as `dist/index.js`. With NODE_ENV=production, static assets are
 * resolved from `./public` relative to this module (i.e. `dist/public`).
 *
 * The non-production branch points at `../dist/public` for the rare case of
 * running the bundled server without NODE_ENV=production; local development
 * normally uses `pnpm dev` (Vite only), not this process.
 *
 * All unrecognized paths return `index.html` so client-side routing works.
 * Port: process.env.PORT or 3000.
 */
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
