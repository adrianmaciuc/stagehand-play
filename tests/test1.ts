import { Page, BrowserContext } from "@browserbasehq/stagehand";
import { announce } from "../utils/utils.js";
import { z } from "zod";
import { runSetup } from "../src/setup.js";

export async function test1({
  page,
  context,
}: {
  page: Page; // Playwright Page with act, extract, and observe methods
  context: BrowserContext; // Playwright BrowserContext
}) {
  await page.goto("https://example.com/");

  const pageExtract = await page.extract({
    instruction:
      "Extract only text from paragraphs. Clean up the data and make it readable, then store it",
    schema: z.object({
      allText: z.string(),
    }),
  });
  announce(
    `Text extracted from paragraphs: ${JSON.stringify(pageExtract.allText)}`,
    "Extract"
  );

  const someButton = await page.observe({
    // your observe logic here
  });
}

test1(await runSetup());
