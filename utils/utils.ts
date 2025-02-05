import { ObserveResult } from "@browserbasehq/stagehand";

import boxen from "boxen";
export function announce(message: string, title?: string) {
  console.log(
    boxen(message, {
      padding: 1,
      margin: 3,
      title: title || "Stagehand",
    })
  );
}

export function printObserved(message: ObserveResult[], title?: string) {
  let cleanMsg = message.map((r) => r.description).join("\n");
  console.log(
    boxen(cleanMsg, {
      padding: 1,
      margin: 3,
      title: title || "Observed",
    })
  );
}

export function printExtracted(message: string, title?: string) {
  let msg = JSON.stringify(message);
  console.log(
    boxen(msg, {
      padding: 1,
      margin: 3,
      title: title || "Extracted",
    })
  );
}
