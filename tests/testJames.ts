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
    await expect(page.locator("footer")).toContainText("0");
  } catch {
    console.log("Playwright failed to expect");
    const aiResponse = await page.extract({
      instruction: "how many items are left. return just the number",
      schema: z.object({
        txt: z.string(),
      }),
    });
    printExtracted(aiResponse.txt);
    expect(aiResponse.txt).toBe("0");
  }

  await stagehand.close();
}

test1(await runSetup());
