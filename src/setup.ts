import { BrowserContext, Page, Stagehand } from "@browserbasehq/stagehand";
import StagehandConfig from "./stagehand.config.js";
import dotenv from "dotenv";
import { AISdkClient } from "../external_clients/aisdk.js";
import { google } from "@ai-sdk/google";

dotenv.config();

export async function runSetup() {
  const stagehand = new Stagehand({
    ...StagehandConfig,
    enableCaching: true,
    llmClient: new AISdkClient({
      model: google("gemini-2.0-flash-exp"),
    }),
  });

  await stagehand.init();

  const page: Page = stagehand.page;
  const context: BrowserContext = stagehand.context;
  // await main({
  //   page,
  //   context,
  //   stagehand,
  // });
  return { page, context };
}
