"use server";

import { generateObject } from "ai";
import { Comment } from "./types";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export const generateSummary = async (comments: Comment[]) => {
  const result = await generateObject({
    model: openai("gpt-4o"),
    prompt: `Please summarise the following comments.
    ---
    Comments:
    ${JSON.stringify(comments)}
`,
    schema: z.object({
      headline: z
        .string()
        .describe("The headline of the summary. Max 5 words."),
      context: z
        .string()
        .describe(
          "What is the relevant context that prompted discussion. Max 2 sentences.",
        ),
      discussionPoints: z
        .string()
        .describe("What are the key discussion points? Max 2 sentences."),
      takeaways: z
        .string()
        .describe(
          "What are the key takeaways / next steps? Include names. Max 2 sentences.",
        ),
    }),
  });
  return result.object;
};
