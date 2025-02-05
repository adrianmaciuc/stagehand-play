import { Page, BrowserContext } from "@browserbasehq/stagehand";
import { announce } from "./utils.js";
import { z } from "zod";

export async function main({
  page,
  context,
}: {
  page: Page; // Playwright Page with act, extract, and observe methods
  context: BrowserContext; // Playwright BrowserContext
}) {
  await page.goto("https://practice-automation.com/");

  const pageExtract = await page.extract({
    instruction:
      "Extract only text from headers. Clean up the data and make it readable, then store it",
    schema: z.object({
      allText: z.string(),
    }),
  });
  announce(
    `Text extracted from headers: ${JSON.stringify(pageExtract.allText)}`,
    "Extract"
  );

  const javaScriptBtn = await page.observe({
    // your observe logic here
  });
}