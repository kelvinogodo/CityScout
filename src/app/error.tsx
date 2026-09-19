"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">
        Something went wrong
      </p>
      <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
        We couldn&apos;t load this page
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        This is on our side. Please try again, or reach us directly on{" "}
        <a
          href={whatsappLink()}
          className="text-accent underline"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>{" "}
        or {siteConfig.phoneDisplay}.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button asChild variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </main>
  );
}
