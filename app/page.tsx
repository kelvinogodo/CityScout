import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-semibold">CityScout Realtors</h1>
      <p className="max-w-md text-muted-foreground">
        Rewrite in progress — Next.js App Router + TypeScript + Tailwind +
        Supabase scaffold is live. Public pages and the admin dashboard land
        in the phases that follow.
      </p>
      <Button variant="accent">Coming soon</Button>
    </main>
  );
}
