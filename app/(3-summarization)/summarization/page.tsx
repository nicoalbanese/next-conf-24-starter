"use client";

import { MessageList } from "./message-list";
import { Button } from "@/components/ui/button";
import messages from "./messages.json";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl pt-8">
      <div className="flex space-x-4 items-center mb-2">
        <h3 className="font-bold">Comments</h3>
        <Button
          variant={"secondary"}
          onClick={async () => {
            // generate summary
          }}
        >
          Summary
        </Button>
      </div>
      <MessageList messages={messages} />
    </main>
  );
}
