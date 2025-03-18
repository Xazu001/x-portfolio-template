import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { getLoadContext } from "./server/load-context";
import path from "path";

declare module "@remix-run/cloudflare" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, ""),
      "#": path.resolve(__dirname, "app"),
      $: path.resolve(__dirname, "server"),
    },
  },
  plugins: [
    remixCloudflareDevProxy({
      getLoadContext,
    }),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("/", "routes/_index.tsx", { index: true });

          route("/projects/project/:project", "routes/projects/project.tsx", {
            index: true,
          });

          route("/search/projects", "routes/projects/search.tsx", {
            index: true,
          });

          // ----- Info
          route("/404", "routes/info/404.tsx", { index: true });
          route("/cookies", "routes/info/cookies.tsx", { index: true });
        });
      },
    }),
    tsconfigPaths(),
  ],
});
