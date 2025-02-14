import { Stagehand } from "@browserbasehq/stagehand";
import { expect } from "@playwright/test";
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
  const page = stagehand.page;
  const context = stagehand.context;
  return { page, stagehand, expect, context };
}
