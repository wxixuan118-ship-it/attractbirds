import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);

async function render(path = "/") {
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept:"text/html" } }), { ASSETS:{ fetch:async()=>new Response("Not found",{status:404}) } }, { waitUntil(){}, passThroughOnException(){} });
}

test("renders the AttractBirds homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Bring more/);
  assert.match(html, /AttractBirds\.app/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
});
