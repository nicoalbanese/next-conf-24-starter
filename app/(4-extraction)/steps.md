1. Create an `actions.ts` file
```typescript
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
```

2. Update the `page.tsx` with the following code:
```tsx
"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  AppointmentDetails,
  AppointmentDetailsProps,
} from "./calendar-appointment";
import { extractAppointment } from "./actions";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] =
    useState<AppointmentDetailsProps | null>(null);
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-semibold">Extraction</h1>
      <Card>
        <CardContent className="p-4">
          <form
            className="flex"
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              const formData = new FormData(e.target as HTMLFormElement);
              const input = formData.get("appointment") as string;
              const details = await extractAppointment(input);
              setAppointment(details);
              setLoading(false);
            }}
          >
            <Input name="appointment" />
            <Button type="submit" disabled={loading}>
              Submit{loading ? "ting" : ""}
            </Button>
          </form>
        </CardContent>
      </Card>
      {appointment && <AppointmentDetails {...appointment} />}
    </div>
  );
}
```