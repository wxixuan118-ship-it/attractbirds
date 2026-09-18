import { arizonaContent } from "./arizona";
import { californiaContent } from "./california";
import { coloradoContent } from "./colorado";
import { floridaContent } from "./florida";
import { michiganContent } from "./michigan";
import { oregonContent } from "./oregon";
import { rhodeIslandContent } from "./rhode-island";
import { tennesseeContent } from "./tennessee";
import { texasContent } from "./texas";
import type { StateContent } from "./types";

export type { StateContent } from "./types";

const STATE_CONTENT: Record<string, StateContent> = {
  arizona: arizonaContent,
  california: californiaContent,
  colorado: coloradoContent,
  florida: floridaContent,
  michigan: michiganContent,
  oregon: oregonContent,
  "rhode-island": rhodeIslandContent,
  tennessee: tennesseeContent,
  texas: texasContent,
};

export function getStateContent(stateSlug: string): StateContent | undefined {
  return STATE_CONTENT[stateSlug];
}
