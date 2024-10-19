"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-semibold">Extraction</h1>
      <Card>
        <CardContent className="p-4">
          <form
            className="flex"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
            }}
          >
            <Input name="appointment" />
            <Button type="submit" disabled={loading}>
              Submit{loading ? "ting" : ""}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
