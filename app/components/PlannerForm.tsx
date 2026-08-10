"use client";

import { FormEvent, useState } from "react";

export function PlannerForm() {
  const [result, setResult] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setResult(true); }
  return <form className="planner-card" onSubmit={submit}>
    <div className="planner-progress"><span>01</span><i><b /></i><small>YOUR SPACE</small></div>
    <label>Where is your yard?<input required name="location" placeholder="City, state, or ZIP code" /></label>
    <div className="form-row"><label>Yard size<select name="size" defaultValue="small"><option value="balcony">Balcony / patio</option><option value="small">Small — under 1,000 sq ft</option><option value="medium">Medium — 1,000–5,000 sq ft</option><option value="large">Large — over 5,000 sq ft</option></select></label><label>Sunlight<select name="sun" defaultValue="mixed"><option value="full">Mostly sunny</option><option value="mixed">Sun and shade</option><option value="shade">Mostly shaded</option></select></label></div>
    <label>Who would you love to attract?<select name="goal" defaultValue="hummingbirds"><option value="hummingbirds">Hummingbirds</option><option value="cardinals">Cardinals</option><option value="songbirds">Colorful songbirds</option><option value="local">More local birds</option></select></label>
    <button className="button button-primary planner-button" type="submit">Build my starter plan <span>→</span></button>
    {result && <div className="mini-result" role="status"><strong>Your starter habitat is ready.</strong><span>Begin with native salvia, a shallow water source, and one easy-to-clean feeder placed near protective cover.</span></div>}
    <small className="privacy-note">No signup required. Recommendations use verified habitat relationships.</small>
  </form>;
}
