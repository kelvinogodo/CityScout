"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function DeleteButton({
  action,
  confirmMessage,
}: {
  action: () => Promise<void>;
  confirmMessage: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="destructive"
      size="icon"
      disabled={isPending}
      aria-label="Delete"
      onClick={() => {
        if (!window.confirm(confirmMessage)) return;
        startTransition(async () => {
          try {
            await action();
            toast.success("Deleted successfully.");
          } catch {
            toast.error("Failed to delete. Please try again.");
          }
        });
      }}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
