"use client";
import { useState } from "react";

type Unit = "cups" | "floz" | "ml";
const ML_PER: Record<Unit, number> = { cups: 236.6, floz: 29.57, ml: 1 };
const RATIO = { hummingbird: 4, oriole: 6 } as const;
/** Granulated sugar weighs about 200 g per US cup. */
const SUGAR_G_PER_ML = 200 / 236.6;

/** Round to the nearest eighth and print as a kitchen fraction, e.g. 1.25 → "1 ¼". */
function kitchenFraction(value: number) {
  const eighths = Math.round(value * 8);
  const whole = Math.floor(eighths / 8);
  const part = ["", "⅛", "¼", "⅜", "½", "⅝", "¾", "⅞"][eighths % 8];
  if (!whole && !part) return "a pinch under ⅛";
  return [whole || "", part].filter(Boolean).join(" ");
}

function sugarText(sugarMl: number, unit: Unit) {
  const grams = Math.round(sugarMl * SUGAR_G_PER_ML);
  if (unit === "ml") return { main: `${Math.round(sugarMl)} ml`, alt: `about ${grams} g of white sugar` };
  const cups = sugarMl / ML_PER.cups;
  const tbsp = Math.round(cups * 16 * 2) / 2;
  return { main: cups < 0.25 ? `${tbsp} tbsp` : `${kitchenFraction(cups)} cup${cups > 1.06 ? "s" : ""}`, alt: cups < 0.25 ? `about ${grams} g of white sugar` : `${tbsp} tbsp · about ${grams} g of white sugar` };
}

export function NectarCalculator() {
  const [amount, setAmount] = useState("2");
  const [unit, setUnit] = useState<Unit>("cups");
  const [bird, setBird] = useState<keyof typeof RATIO>("hummingbird");
  const water = Number(amount);
  const valid = Number.isFinite(water) && water > 0;
  const sugar = valid ? sugarText((water * ML_PER[unit]) / RATIO[bird], unit) : null;
  const unitLabel = unit === "cups" ? (water === 1 ? "cup" : "cups") : unit === "floz" ? "fl oz" : "ml";

  return (
    <div className="calculator">
      <label>Water (how much nectar you want)
        <input type="number" inputMode="decimal" min="0" step="any" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </label>
      <label>Unit
        <select value={unit} onChange={(e) => setUnit(e.target.value as Unit)}>
          <option value="cups">US cups</option>
          <option value="floz">Fluid ounces</option>
          <option value="ml">Milliliters</option>
        </select>
      </label>
      <label>Mix for
        <select value={bird} onChange={(e) => setBird(e.target.value as keyof typeof RATIO)}>
          <option value="hummingbird">Hummingbirds (1:4)</option>
          <option value="oriole">Orioles (1:6)</option>
        </select>
      </label>
      <div className="calculator-result" aria-live="polite">
        <small>Sugar to add</small>
        {sugar ? (
          <>
            <strong>{sugar.main}</strong>
            <p>{sugar.alt}, dissolved in {amount} {unitLabel} of boiling water — a 1:{RATIO[bird]} mix by volume. Let it cool before filling.</p>
          </>
        ) : (
          <strong>Enter an amount of water</strong>
        )}
        <p>No red food coloring, honey or sweeteners — plain white sugar only. Change the nectar and clean the feeder every couple of days, sooner if it turns cloudy.</p>
      </div>
    </div>
  );
}
