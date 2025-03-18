import { MetaFunction } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import tailwind from "./tailwind.css?url";
import { useEffect, useState } from "react";
import Stars from "./lib/Stars";

export const links: LinksFunction = () => [
  ...(tailwind ? [{ rel: "stylesheet", href: tailwind }] : []),
  {
    rel: "icon",
    href: "/favicon.ico",
    type: "image/x-icon",
  },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap",
  },
];

export const meta: MetaFunction = () => [
  {
    title: "Temp",
  },
];

export default function Layout() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-bg">
        <div className="relative overflow-hidden">
          {/* <Stars /> */}
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
