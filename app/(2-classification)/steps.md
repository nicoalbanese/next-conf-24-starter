In this project, we want to pass the model a number of support requests and ask it to classify those requests into categories.

1. Open `classification.ts`. Notice we are using `generateText` like before. We then prompt the model to classify the support requests (which are passed in as a JSON object).
```typescript
import "dotenv/config";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import supportRequests from "./support_requests.json";

async function main() {
  const result = await generateText({
    model: openai("gpt-4o-mini"),
    prompt:
      "Classify the following support requests. The categories are (billing, product issues, enterprise sales, account issues, product feedback).\n\n" +
      JSON.stringify(supportRequests),
  });
  console.log(result.text);
}

main().catch(console.error);
```

2. Run the script
```bash
pnpm classification
```
Response:
```bash
Here are the classified support requests:

1. **Account Issues**: "I'm having trouble logging into my account. Can you please assist?" (id: 1)
2. **Product Issues**: "The export feature isn't working correctly. Is there a known issue?" (id: 2)
3. **Enterprise Sales**: "Can you provide more information about your enterprise pricing plans?" (id: 4)
4. **Account Issues**: "I'm having trouble cancelling my account. Please can you help?" (id: 5)
5. **Product Issues**: "The dashboard is not displaying real-time data. How can I fix this?" (id: 6)
6. **Product Feedback**: "Do you offer technical support for self-hosted installations?" (id: 7)

(Note: The request about API integration (id: 3) was not classified as it does not fit neatly into the provided categories.)
```
Notice how the model is able to classify the support requests into the correct categories. This is great, but generating a big plain text chunk isn't super useful. Notice, the model also generates extraneous information like "Here are the classified support requests:" and "(Note: The request about API integration (id: 3) was not classified as it does not fit neatly into the provided categories.)". We can solve this with the `generateObject` function.

3. Update to use `generateObject` instead of `generateText`
```typescript
import "dotenv/config";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import supportRequests from "./support_requests.json";

async function main() {
  const result = await generateObject({
    model: openai("gpt-4o-mini"),
    prompt:
      "Classify the following support requests. The categories are (billing, product issues, enterprise sales, account issues, product feedback).\n\n" +
      JSON.stringify(supportRequests),
  });
  console.log(result.object);
}

main().catch(console.error);
```

4. Define a schema for the output and set the output mode to "array".
```typescript
import "dotenv/config";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import supportRequests from "./support_requests.json";
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
    }),
    output: "array",
  });
  console.log(result.object);
}

main().catch(console.error);
```

Now the output is nicely constrained to the exact format we specified.
```bash
[
  {
    request: "I'm having trouble logging into my account. Can you please assist?",
    category: 'account_issues'
  },
  {
    request: "The export feature isn't working correctly. Is there a known issue?",
    category: 'product_issues'
  },
  {
    request: 'I need help integrating your API with our existing system.',
    category: 'product_issues'
  },
  {
    request: 'Can you provide more information about your enterprise pricing plans?',
    category: 'enterprise_sales'
  },
  {
    request: "I'm having trouble cancelling my account. Please can you help?",
    category: 'account_issues'
  },
  {
    request: 'The dashboard is not displaying real-time data. How can I fix this?',
    category: 'product_issues'
  },
  {
    request: 'Do you offer technical support for self-hosted installations?',
    category: 'product_issues'
  }
]
```

5. update the schema to estimate the urgency of the request
```typescript
import "dotenv/config";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import supportRequests from "./support_requests.json";
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
    }),
    output: "array",
  });
  console.log(result.object);
}

main().catch(console.error);
```

This is super powerful. A lot of these models are multi-lingual too, so we could pass in support requests in different languages and the model would still be able to classify them. This is a great example of how we can use AI to automate a task that would otherwise be very time-consuming.

6. Update the import to use the multi-lingual support requests. Add a language field to the schema too.
```typescript
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
      language: z.string(),
    }),
    output: "array",
  });
  console.log(result.object);
}

main().catch(console.error);
```

7. Note that the model is identifying the language correctly, but it's returning the language as a country code rather than the full name. Note: you can also use the `describe` method to give the model more information about what you want it to generate.
```typescript
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
```