import type { AppLoadContext } from "@remix-run/cloudflare";
import type { PlatformProxy } from "wrangler";
import type { Env } from "@/worker-configuration";

export type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
  }
}

export type GetLoadContext = (args: {
  request: Request;
  context: { cloudflare: Cloudflare }; // load context _before_ augmentation
}) => AppLoadContext;

export const getLoadContext: GetLoadContext = ({ context }) => {
  return {
    ...context,
  };
};
