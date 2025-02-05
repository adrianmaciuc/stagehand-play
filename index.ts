import { Stagehand } from "@browserbasehq/stagehand";
import StagehandConfig from "./stagehand.config.js";
import { main } from "./main.js";
import { AISdkClient } from "./external_clients/aisdk.js";
import { google } from "@ai-sdk/google";

async function run() {
  const stagehand = new Stagehand({
    ...StagehandConfig,
    enableCaching: true,
    llmClient: new AISdkClient({
      model: google("gemini-2.0-flash-exp"),
    }),
  });

  await stagehand.init();

  const page = stagehand.page;
  const context = stagehand.context;
  await main({
    page,
    context,
    stagehand,
  });
}

run();
