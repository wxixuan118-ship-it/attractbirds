import { SITE, URL_REGISTRY } from "../../../lib/url-registry";

/** Message the embed page posts to its parent so the host can size the iframe. */
export const EMBED_HEIGHT_MESSAGE = "attractbirds:embed-height";

const embedUrl = `${SITE.origin}${URL_REGISTRY.embed.feederCalculator}`;
const toolUrl = `${SITE.origin}${URL_REGISTRY.tools.feederCalculator}`;

// The credit link sits outside the iframe so it lives in the host page's own HTML.
// Branded anchor text, not the target keyword, so it reads as a natural attribution.
export const FEEDER_CALCULATOR_EMBED_SNIPPET = [
  `<iframe src="${embedUrl}" title="Bird feeder calculator" width="100%" height="600" loading="lazy" style="border:0;max-width:820px;display:block"></iframe>`,
  `<p style="font-size:13px;margin:6px 0 0">Bird feeder calculator by <a href="${toolUrl}">AttractBirds.app</a></p>`,
  `<script>addEventListener("message",function(e){if(e.origin==="${SITE.origin}"&&e.data&&e.data.type==="${EMBED_HEIGHT_MESSAGE}"){document.querySelectorAll('iframe[src^="${embedUrl}"]').forEach(function(f){f.style.height=e.data.height+"px"})}})</script>`,
].join("\n");
