import { Page, Stagehand } from "@browserbasehq/stagehand";
import { printExtracted, printObserved } from "../utils/utils.js";
import { Expect } from "@playwright/test";
import { z } from "zod";
import { runSetup } from "../src/setup.js";

export async function test({
  page,
  stagehand,
  expect,
}: {
  page: Page;
  stagehand: Stagehand;
  expect: Expect;
}) {
  // perform any playwright standard actions
  await page.goto("https://blog.martioli.com/");
  await page.getByText("Playwright tips and trick #4").first().click();

  // extract method is to be used only for values found in view
  const headerText = await page.extract(
    "Extract only text from header menu. Clean it up and return it."
  );
  printExtracted(headerText.extraction);
  expect(headerText.extraction).toContain("More Playwright");

  const cypressReference = await page.observe(
    "Find any reference to the word Cypress and if found store the entire text from that paragraph"
  );
  printObserved(cypressReference);
  expect(cypressReference[0].description).toContain(
    "Imagine you navigate thru your web app"
  );

  const waitForReqText = await page.observe({
    instruction: "Find the link with the text waitForRequest()",
    returnAction: true,
  });
  printObserved(waitForReqText);
  await page.act(waitForReqText[0]);

  const countConst = await page.extract(
    "Count how many times the word const on the page. return only the number"
  );
  printExtracted(countConst.extraction);
  expect(countConst.extraction).toBe("6");

  await stagehand.close();
}

test(await runSetup());
