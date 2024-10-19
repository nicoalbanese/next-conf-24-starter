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
