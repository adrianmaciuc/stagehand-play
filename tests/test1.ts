import { Page, Stagehand } from "@browserbasehq/stagehand";
import { printExtracted } from "../utils/utils.js";
import { z } from "zod";
import { runSetup } from "../src/setup.js";

export async function test1({
  page,
  stagehand,
}: {
  page: Page;
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
  printExtracted(pageExtract.allText);

  // act still returns an error
  await page.act({
    action: "Click on search icon",
  });

  await stagehand.close();
}

test1(await runSetup());
