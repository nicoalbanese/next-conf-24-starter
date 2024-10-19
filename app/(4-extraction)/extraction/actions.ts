"use server";

import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export const extractAppointment = async (input: string) => {
  const result = await generateObject({
    model: openai("gpt-4o-mini"),
    prompt: "Extract calendar info for the following input: " + input,
    schema: z.object({
      title: z.string().describe("The title of the event. Keep this as close to the users input as possible. You can clean up formatting."),
      emoji: z.string().describe("An emoji that describes the event"),
      startTime: z.string().optional().describe("format HH:MM"),
      endTime: z.string().optional().describe("format HH:MM"),
      attendees: z.array(z.string()).optional(),
      location: z.string().optional(),
      date: z.string().default("Today"),
    }),
  });
  return result.object;
};
