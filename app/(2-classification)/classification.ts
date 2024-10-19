import "dotenv/config";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import supportRequests from "./support_requests_multilanguage.json";
import { z } from "zod";

async function main() {
  const result = await generateObject({
    model: openai("gpt-4o-mini"),
    prompt:
      "Classify the following support requests.\n\n" +
      JSON.stringify(supportRequests),
    schema: z.object({
      request: z.string(),
      category: z.enum([
        "billing",
        "product_issues",
        "enterprise_sales",
        "account_issues",
        "product_feedback",
      ]),
      urgency: z.enum(["low", "medium", "high"]),
      language: z.string().describe("The language the support request is in. eg. English, Spanish etc."),
    }),
    output: "array",
  });
  console.log(result.object);
}

main().catch(console.error);
