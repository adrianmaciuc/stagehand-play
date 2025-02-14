import { Page, Stagehand } from "@browserbasehq/stagehand";
import { printExtracted, printObserved } from "../utils/utils.js";
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
  const aboutLink = await page.observe({
    instruction: "Find in the header the About link",
    returnAction: true,
  });
  printObserved(aboutLink);
  await page.act(aboutLink[0]);

  await stagehand.close();
}

test1(await runSetup());
