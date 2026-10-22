/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { isRetiredPath } from "../lib/retired-paths";

function pointsToRetiredPage(href: string, origin: string): boolean {
  try {
    const url = new URL(href, origin);
    return url.origin === origin && isRetiredPath(url.pathname);
  } catch {
    return false;
  }
}

async function stripRetiredLinks(response: Response, origin: string): Promise<Response> {
  if (!response.headers.get("content-type")?.includes("text/html")) return response;

  const html = await response.text();
  const cleaned = html
    .replace(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>[\s\S]*?<\/a>/gi,
      (tag, href: string) => pointsToRetiredPage(href, origin) ? "" : tag)
    .replace(/<link\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi,
      (tag, href: string) => pointsToRetiredPage(href, origin) ? "" : tag);
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(cleaned, { status: response.status, statusText: response.statusText, headers });
}

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (isRetiredPath(url.pathname)) {
      return new Response("Not Found", {
        status: 404,
        headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" },
      });
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return stripRetiredLinks(await handler.fetch(request, env, ctx), url.origin);
  },
};

export default worker;
