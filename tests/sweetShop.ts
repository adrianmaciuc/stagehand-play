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
  await page.goto("https://sweetshop.netlify.app/sweets", {
    waitUntil: "domcontentloaded",
  });
  await page.getByText("Add to Basket").first().click();
  await expect(page.locator(".badge-success")).toContainText("1");
  await page.getByText("Add to Basket").nth(1).click();
  await page.getByRole("link", { name: "Basket" }).click();

  const totalInEur = await page.extract({
    instruction:
      "Extract total from the basket and convert it into euro based on the logic that 1.2 Euro is 1 pound",
    schema: z.object({
      x: z.string(),
    }),
  });
  printExtracted(totalInEur.x);
  expect(totalInEur.x).toBe("2.10");

  const lowestAndShipping = await page.extract({
    instruction:
      "Extract only the item that is the lowest from the basket and add the value of that item the standard shipping fee, then return the total sum, only the number",
    schema: z.object({
      x: z.string(),
    }),
  });
  printExtracted(lowestAndShipping.x);
  expect(lowestAndShipping.x).toBe("2.74");

  await stagehand.close();
}

test1(await runSetup());
