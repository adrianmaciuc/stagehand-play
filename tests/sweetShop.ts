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

  const aiResponse = await page.extract({
    instruction:
      "Extract the values of the items in the basket and return only total. Remove the pound sign",
    schema: z.object({
      txt: z.string(),
    }),
  });
  printExtracted(aiResponse.txt);
  expect(aiResponse.txt).toBe("1.75");

  const aiResponseShipping = await page.extract({
    instruction:
      "Extract only the item that is the lowest from the basket and add the value of that item the standard shipping fee, then return the total sum, only the number",
    schema: z.object({
      txt: z.string(),
    }),
  });
  printExtracted(aiResponseShipping.txt);
  expect(aiResponseShipping.txt).toBe("2.74");

  await stagehand.close();
}

test1(await runSetup());
