import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function buildPageHref(
  basePath: string,
  params: Record<string, string | undefined>,
  page: number,
) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value && key !== "page") query.set(key, value);
  }
  if (page > 1) query.set("page", String(page));
  const qs = query.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

// Current page plus up to two neighbours either side, with the first and
// last pages always reachable.
export function pageWindow(page: number, totalPages: number) {
  const pages = new Set<number>([1, totalPages]);
  for (let p = page - 2; p <= page + 2; p++) {
    if (p >= 1 && p <= totalPages) pages.add(p);
  }
  return [...pages].sort((a, b) => a - b);
}

export function Pagination({
  page,
  totalPages,
  basePath,
  params,
}: {
  page: number;
  totalPages: number;
  basePath: string;
  params: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;

  const window = pageWindow(page, totalPages);
  const linkClass =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-border px-3 text-sm hover:bg-muted";

  return (
    <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {page > 1 && (
        <Link
          href={buildPageHref(basePath, params, page - 1)}
          className={linkClass}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      )}
      {window.map((p, index) => (
        <span key={p} className="flex items-center gap-2">
          {index > 0 && p - (window[index - 1] ?? p) > 1 && (
            <span className="text-muted-foreground">…</span>
          )}
          <Link
            href={buildPageHref(basePath, params, p)}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              linkClass,
              p === page && "border-accent bg-accent text-accent-foreground hover:bg-accent",
            )}
          >
            {p}
          </Link>
        </span>
      ))}
      {page < totalPages && (
        <Link
          href={buildPageHref(basePath, params, page + 1)}
          className={linkClass}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
