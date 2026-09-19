import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Skeleton className="h-9 w-48" />
      <Skeleton className="mt-2 h-5 w-72" />
      <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="aspect-[16/10] rounded-2xl" />
            <Skeleton className="mt-5 h-3 w-40" />
            <Skeleton className="mt-3 h-6 w-full" />
            <Skeleton className="mt-3 h-4 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}
