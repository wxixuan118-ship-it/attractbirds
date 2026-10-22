import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
const { default: worker } = await import(workerUrl.href);
const source = await readFile(new URL("../lib/retired-paths.ts", import.meta.url), "utf8");
const retired = [...source.matchAll(/^  "(\/[^"]+)",?$/gm)].map((match) => match[1]);

async function render(path) {
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("all 128 retired URLs return real 404 responses", async () => {
  assert.equal(retired.length, 128);
  for (const path of retired) {
    const response = await render(path);
    assert.equal(response.status, 404, path);
  }
  assert.equal((await render("/birds")).status, 200);
  assert.equal((await render("/birds-by-location/california")).status, 200);
});

test("retired URLs are absent from sitemap and visible internal links", async () => {
  const sitemap = await (await render("/sitemap.xml")).text();
  for (const path of retired) {
    assert.ok(!sitemap.includes(`<loc>https://attractbirds.app${path}</loc>`), path);
  }

  for (const path of ["/", "/birds", "/birds-by-location/california", "/how-to-attract"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    for (const href of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
      const url = new URL(href[1], "https://attractbirds.app");
      if (url.origin === "https://attractbirds.app") {
        assert.ok(!retired.includes(url.pathname), `${path} links to ${url.pathname}`);
      }
    }
  }
});
