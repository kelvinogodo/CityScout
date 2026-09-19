export function DraftBadge({ show }: { show?: boolean }) {
  if (!show) return null;

  return (
    <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
      Draft
    </span>
  );
}
