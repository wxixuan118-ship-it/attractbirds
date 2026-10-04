"use client";
import { useEffect } from "react";
import { EMBED_HEIGHT_MESSAGE } from "../../tools/bird-feeder-calculator/embed-snippet";

/** Tells the host page how tall the widget is so its iframe never shows a scrollbar. */
export function HeightReporter() {
  useEffect(() => {
    const shell = document.querySelector(".embed-shell");
    if (window.parent === window || !shell) return;
    // Measure the widget itself: the document is never shorter than the iframe, so it can't shrink.
    const post = () => window.parent.postMessage({ type: EMBED_HEIGHT_MESSAGE, height: Math.ceil(shell.getBoundingClientRect().bottom + window.scrollY) }, "*");
    const observer = new ResizeObserver(post);
    observer.observe(shell);
    post();
    return () => observer.disconnect();
  }, []);
  return null;
}
