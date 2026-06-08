import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";

const DEFAULT_DEV_ALLOWED_HOSTS = ["localhost", "127.0.0.1"];

function parseAllowedHosts(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map(host => host.trim())
    .filter(Boolean);
}

function getDevAllowedHosts(extraHosts: string | undefined): string[] {
  return [...DEFAULT_DEV_ALLOWED_HOSTS, ...parseAllowedHosts(extraHosts)];
}

/** Replaces `__SITE_URL__` in `client/index.html` (avoids Vite `%ENV%` warnings when the var is unset). */
function htmlSiteUrlPlugin(siteUrl: string): Plugin {
  return {
    name: "html-site-url",
    transformIndexHtml(html) {
      return html.replaceAll("__SITE_URL__", siteUrl);
    },
  };
}

const plugins = [react(), tailwindcss(), jsxLocPlugin()];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(import.meta.dirname), "VITE_");
  const siteUrl = (env.VITE_SITE_URL ?? "").replace(/\/+$/, "");

  return {
    plugins: [...plugins, htmlSiteUrlPlugin(siteUrl)],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },
    envDir: path.resolve(import.meta.dirname),
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      strictPort: false, // Will find next available port if 3000 is busy
      host: true,
      allowedHosts: getDevAllowedHosts(env.VITE_DEV_ALLOWED_HOSTS),
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
