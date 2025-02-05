import { Page, Stagehand } from "@browserbasehq/stagehand";
import { printExtracted, printObserved } from "../utils/utils.js";
import { z } from "zod";
import { runSetup } from "../src/setup.js";

export async function test({
  page,
  stagehand,
}: {
  page: Page;
  stagehand: Stagehand;
}) {
  // perform any playwright standard actions
  await page.goto("https://blog.martioli.com/");
  await page.getByText("Playwright tips and trick #4").first().click();

  // extract method is to be used only for values found in view
  const pageExtract = await page.extract({
    instruction:
      "Extract only text from header menu. Clean it up and return it.",
    schema: z.object({
      text: z.string(),
    }),
  });
  printExtracted(pageExtract.text);

  // observe method will first scroll the entire page and then return what you requested
  const observed = await page.observe({
    instruction:
      "Find any reference to the word Cypress and if found store the entire text from that paragraph",
  });

  printObserved(observed);

  await stagehand.close();
}

test(await runSetup());
