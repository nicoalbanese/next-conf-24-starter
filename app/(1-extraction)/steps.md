1. Import generateText from AI SDK and call it.
```typescript highlight={3,9}
import "dotenv/config";
import fs from "fs";
import { generateText } from "ai";

// import essay
const essay = fs.readFileSync("app/(1-extraction)/essay.txt", "utf-8");

async function main() {
  const result = await generateText({});
}

main().catch(console.error);
```

2. Import OpenAI provider and select your model
```typescript highlight={4,11}
import "dotenv/config";
import fs from "fs";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

// import essay
const essay = fs.readFileSync("app/(1-extraction)/essay.txt", "utf-8");

async function main() {
  const result = await generateText({
    model: openai("gpt-4o-mini"),
  });
}

main().catch(console.error);
```

3. Add a prompt
```typescript
import "dotenv/config";
import fs from "fs";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

// import essay
const essay = fs.readFileSync("app/(1-extraction)/essay.txt", "utf-8");

async function main() {
  const result = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: "Extract all the names mentioned in this essay." + "\n\n" + essay,
  });
}

main().catch(console.error);
```

4. Log the resulting text generation
```typescript
import "dotenv/config";
import fs from "fs";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

// import essay
const essay = fs.readFileSync("app/(1-extraction)/essay.txt", "utf-8");

async function main() {
  const result = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: "Extract all the names mentioned in this essay." + "\n\n" + essay,
  });

  console.log(result.text);
}

main().catch(console.error);
```

5. Run the script
```bash
pnpm extraction
```

6. Play around with the prompt to ask for different things like, "What is the key takeaway of this piece in 50 words?"
```typescript
import "dotenv/config";
import fs from "fs";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

// import essay
const essay = fs.readFileSync("app/(1-extraction)/essay.txt", "utf-8");

async function main() {
  const result = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: "What is the key takeaway of this piece in 50 words?" + "\n\n" + essay,
  });

  console.log(result.text);
}

main().catch(console.error);
```

7. Play around with a different model to see how the response changes
```typescript
import "dotenv/config";
import fs from "fs";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

// import essay
const essay = fs.readFileSync("app/(1-extraction)/essay.txt", "utf-8");

async function main() {
  const result = await generateText({
    model: openai("gpt-4o"),
    prompt: "What is the key takeaway of this piece in 50 words?" + "\n\n" + essay,
  });

  console.log(result.text);
}

main().catch(console.error);
```
