"use client";
import { useState } from "react";
import { FEEDER_CALCULATOR_EMBED_SNIPPET } from "./embed-snippet";

export function EmbedCode() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(FEEDER_CALCULATOR_EMBED_SNIPPET);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="embed-code">
      <h2>Add this bird feeder calculator to your site</h2>
      <p>Free for bird clubs, nature centers, garden centers and blogs. Paste the code into any page; keep the credit line so readers can find the full guide.</p>
      <textarea readOnly rows={5} value={FEEDER_CALCULATOR_EMBED_SNIPPET} aria-label="Embed code for the bird feeder calculator" onFocus={(e) => e.currentTarget.select()} />
      <button type="button" onClick={copy}>{copied ? "Copied" : "Copy embed code"}</button>
    </div>
  );
}
