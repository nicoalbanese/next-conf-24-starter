Run the dev server and navigate to the `/summarization` route
```bash
pnpm run dev
```
You should see a comment list. This list is populated with data from `messages.json`, containing 20 messages from team members discussing project updates, client feedback, timelines, and preparation for an upcoming client call.

We are busy people, wouldn't it be great to get a summary of all the comments so we didn't have to read through everything. Let's build this with the `generateObject` function.

1. Create a new file called `action.ts` in the `summarization` directory. This will be our server-side environment where we will interact with the model.

```typescript
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
      headline: z.string(),
      context: z.string(),
      discussionPoints: z.string(),
      takeaways: z.string(),
    }),
  });
  return result.object;
};
```

2. Update the `page.tsx` with the following code:
```tsx
"use client";

import { MessageList } from "./message-list";
import { Button } from "@/components/ui/button";
import messages from "./messages.json";
import { generateSummary } from "./action";
import { useState } from "react";
import { SummaryCard } from "./summary-card";

export default function Home() {
  const [summary, setSummary] = useState<Awaited<
    ReturnType<typeof generateSummary>
  > | null>(null);
  const [loading, setLoading] = useState(false);
  return (
    <main className="mx-auto max-w-2xl pt-8">
      <div className="flex space-x-4 items-center mb-2">
        <h3 className="font-bold">Comments</h3>
        <Button
          variant={"secondary"}
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            // generate summary
            setSummary(await generateSummary(messages));
            setLoading(false);
          }}
        >
          Summar{loading ? "izing..." : "ize"}
        </Button>
      </div>
      <div className="mb-4">{summary && <SummaryCard {...summary} />}</div>
      <MessageList messages={messages} />
    </main>
  );
}
```

Head back to the browser and click generate! You should see a summary of the comments. This is great. But the format of the text isn't great. Let's use the describe function to improve the generation.

4. Update the `action.ts` file with the following code:
```typescript
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
```
