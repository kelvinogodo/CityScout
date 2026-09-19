import { cn } from "@/lib/utils";

// Illustrative listings/posts are flagged `is_sample` in the database so they
// are never mistaken for real inventory.
export function SampleBadge({
  show,
  className,
}: {
  show?: boolean;
  className?: string;
}) {
  if (!show) return null;

  return (
    <span
      className={cn(
        "rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur",
        className,
      )}
    >
      Sample listing
    </span>
  );
}
