"use client";
import { useState } from "react";

type Answers = { age: string; pattern: string; seed: string; cover: string; predator: string; cleaned: string; sick: string };

type Cause = { title: string; fix: string };

const QUESTIONS: { key: keyof Answers; label: string; options: [string, string][] }[] = [
  { key: "age", label: "How long has the feeder been up?", options: [["", "Choose…"], ["new", "Less than 2 weeks"], ["old", "Longer than that"]] },
  { key: "pattern", label: "What happened?", options: [["", "Choose…"], ["never", "Birds have never come"], ["sudden", "They stopped suddenly"], ["gradual", "They tapered off in late summer or fall"]] },
  { key: "seed", label: "What is in it?", options: [["", "Choose…"], ["sunflower", "Fresh black-oil sunflower"], ["mix", "A cheap mix (milo, wheat, red grain)"], ["stale", "Seed that is old, wet or clumped"]] },
  { key: "cover", label: "Trees or shrubs within about 10–15 feet?", options: [["", "Choose…"], ["yes", "Yes"], ["no", "No — it is in the open"]] },
  { key: "predator", label: "Seen a cat or hawk around the yard?", options: [["", "Choose…"], ["yes", "Yes"], ["no", "No"]] },
  { key: "cleaned", label: "When was it last washed?", options: [["", "Choose…"], ["recent", "In the last 2 weeks"], ["long", "Longer ago, or never"]] },
  { key: "sick", label: "Any birds with swollen, crusty eyes or fluffed-up and lethargic?", options: [["", "Choose…"], ["yes", "Yes"], ["no", "No"]] },
];

/** Most likely causes first, using the seven FeederWatch causes covered in the guide below. */
function diagnose(a: Answers): Cause[] {
  const causes: Cause[] = [];
  if (a.sick === "yes") causes.push({ title: "Disease at the feeder", fix: "Take every feeder down for a couple of weeks. Disinfect in one part bleach to nine parts water for ten minutes, rinse, dry, then rehang." });
  if (a.predator === "yes" || a.pattern === "sudden") causes.push({ title: "A cat or hawk", fix: "Birds avoid a feeder that is being watched. Keep cats indoors, and if a hawk is hunting the yard, take the feeder down for a few days so the birds disperse." });
  if (a.seed === "stale" || a.seed === "mix") causes.push({ title: a.seed === "stale" ? "Stale or wet seed" : "Seed the birds don't want", fix: "Empty it and refill with fresh black-oil sunflower — the food most feeder birds prefer. Offer only what is eaten in a few days, and skip milo." });
  if (a.cleaned === "long") causes.push({ title: "A dirty feeder", fix: "Take it apart and wash it with warm water and dish soap every week or two (more often in wet weather), and rake up hulls underneath." });
  if (a.cover === "no") causes.push({ title: "No cover nearby", fix: "Move the feeder near trees or shrubs — evergreens are ideal — but about ten feet from branches cats and squirrels can jump from." });
  if (a.age === "new" || a.pattern === "never") causes.push({ title: "The feeder is still new", fix: "Birds find feeders by sight and by following each other; it can take days to a few weeks. Scatter a little sunflower on the ground nearby and keep it in an easy-to-see spot." });
  if (a.pattern === "gradual") causes.push({ title: "Natural food is plentiful", fix: "In late summer and fall wild seed and fruit are everywhere, so feeder visits drop. Keep it clean and stocked lightly; birds return as natural food runs out." });
  return causes;
}

const EMPTY: Answers = { age: "", pattern: "", seed: "", cover: "", predator: "", cleaned: "", sick: "" };

export function FeederTroubleshooter() {
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const answered = Object.values(answers).filter(Boolean).length;
  const causes = diagnose(answers);

  return (
    <div className="calculator finder">
      {QUESTIONS.map((q) => (
        <label key={q.key}>
          {q.label}
          <select value={answers[q.key]} onChange={(e) => setAnswers({ ...answers, [q.key]: e.target.value })}>
            {q.options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
          </select>
        </label>
      ))}
      <div className="calculator-result" aria-live="polite">
        {answered === 0 ? (
          <>
            <small>Feeder troubleshooter</small>
            <strong>Answer a few questions to find the cause</strong>
            <p>Seven things explain almost every empty feeder: the seed, the season, cover, a predator, a dirty feeder, disease, or a feeder that is simply new.</p>
          </>
        ) : causes.length === 0 ? (
          <>
            <small>{answered} of {QUESTIONS.length} answered</small>
            <strong>Nothing obvious yet</strong>
            <p>Your setup sounds right. Give it time, check for window reflections near the feeder, and read the full list of causes below.</p>
          </>
        ) : (
          <>
            <small>{answered} of {QUESTIONS.length} answered · most likely first</small>
            <strong>{causes.length === 1 ? "The likely cause" : `${causes.length} likely causes`}</strong>
            <ol>
              {causes.map((c) => <li key={c.title} style={{ marginBottom: "10px" }}><b>{c.title}.</b> {c.fix}</li>)}
            </ol>
          </>
        )}
      </div>
    </div>
  );
}
