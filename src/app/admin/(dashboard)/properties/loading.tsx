import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-10 w-36" />
      </div>
      <div className="mt-6 overflow-hidden rounded-lg border border-border">
        <Skeleton className="h-10 rounded-none" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 border-t border-border px-4 py-3"
          >
            <Skeleton className="h-12 w-16 shrink-0" />
            <Skeleton className="h-4 w-48" />
          </div>
        ))}
      </div>
    </div>
  );
}
