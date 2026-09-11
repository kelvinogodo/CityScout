import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Skeleton className="h-9 w-48" />
      <Skeleton className="mt-2 h-5 w-72" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg border border-border"
          >
            <Skeleton className="aspect-[16/10] rounded-none" />
            <div className="space-y-2 p-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
