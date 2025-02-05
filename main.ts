import { Page, BrowserContext, Stagehand } from "@browserbasehq/stagehand";
import { announce } from "./utils.js";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

export async function main({
  page,
  context,
  stagehand,
}: {
  page: Page; // Playwright Page with act, extract, and observe methods
  context: BrowserContext; // Playwright BrowserContext
  stagehand: Stagehand; // Stagehand instance
}) {
  await page.goto("https://practice-automation.com/");

  const pageExtract = await page.extract({
    instruction:
      "Extract only text from headers. Clean up the data and make it readable, then store it",
    schema: z.object({
      allText: z.string(),
    }),
  });
  announce(
    `Text extracted from headers: ${JSON.stringify(pageExtract.allText)}`,
    "Extract"
  );

  const javaScriptBtn = await page.observe({
    instruction: `Find any button with the word JavaScript on it, then just let me know what is the text from the first one`,
  });
  announce(
    `${javaScriptBtn.map((r) => `${r.description}`).join("\n")}`,
    "Observe"
  );

  await page.getByText("Form Fields").click();

  // page.act still throws an error undefined (reading 'typeName')
  await page.act({
    action:
      "Find all the form fields and fill them with random letters no longer than 10",
  });

  const pageExtractAfterClick = await page.extract({
    instruction:
      "extract only text that you find as questions. Arrange them nicely as json format",
    schema: z.object({
      allText: z.string(),
    }),
  });
  announce(
    `Text extracted after click: ${JSON.stringify(
      pageExtractAfterClick.allText
    )}`,
    "Extract"
  );

  await stagehand.close();
}
