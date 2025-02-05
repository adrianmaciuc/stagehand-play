import { Page, BrowserContext, Stagehand } from "@browserbasehq/stagehand";
import { announce } from "../utils/utils.js";
import { z } from "zod";
import { runSetup } from "../src/setup.js";

export async function test1({
  page,
  context,
  stagehand,
}: {
  page: Page;
  context: BrowserContext;
  stagehand: Stagehand;
}) {
  await page.goto("https://blog.martioli.com/");
  const pageExtract = await page.extract({
    instruction:
      "Extract all text about cypress from the page. Clean it up and return it.",
    schema: z.object({
      allText: z.string(),
    }),
  });
  announce(
    `Text extracted from page: ${JSON.stringify(pageExtract.allText)}`,
    "Extract"
  );
  await page.act({
    action: "Click on search icon",
  });
  await stagehand.close();
}

test1(await runSetup());
