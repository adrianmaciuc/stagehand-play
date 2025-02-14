import { Page, Stagehand } from "@browserbasehq/stagehand";
import { printExtracted } from "../utils/utils.js";
import { Expect } from "@playwright/test";
import { z } from "zod";
import { runSetup } from "../src/setup.js";

export async function test1({
  page,
  stagehand,
  expect,
}: {
  page: Page;
  stagehand: Stagehand;
  expect: Expect;
}) {
  await page.goto("https://todolist.james.am/#/");
  await page.getByPlaceholder("What need's to be done?").fill("Adrian");
  await page.keyboard.press("Enter");
  await page.getByPlaceholder("What need's to be done?").fill("Money");
  await page.keyboard.press("Enter");
  await page.getByRole("checkbox").nth(1).check();
  try {
    await expect(page.locator(".todo-count")).toContainText("1");
  } catch {
    const pageExtract = await page.extract({
      instruction:
        "Validate how many items are left. There should be 1 item left.",
      schema: z.object({
        allText: z.string(),
      }),
    });
    printExtracted(pageExtract.allText);
  }

  await stagehand.close();
}

test1(await runSetup());
