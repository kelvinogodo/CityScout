import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">
        404
      </p>
      <h1 className="text-3xl font-semibold sm:text-4xl">Page not found</h1>
      <p className="max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <Button asChild className="mt-2 gap-2">
        <Link href="/">
          <Home className="h-4 w-4" />
          Back to home
        </Link>
      </Button>
    </main>
  );
}
