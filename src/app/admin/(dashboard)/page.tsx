import { Building2, Newspaper } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminOverviewPage() {
  const supabase = await createClient();
  const [{ count: propertyCount }, { count: postCount }] = await Promise.all([
    supabase.from("properties").select("*", { count: "exact", head: true }),
    supabase.from("posts").select("*", { count: "exact", head: true }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Overview</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-surface p-6">
          <Building2 className="h-6 w-6 text-accent" />
          <p className="mt-3 text-3xl font-semibold">{propertyCount ?? 0}</p>
          <p className="text-sm text-muted-foreground">Properties listed</p>
        </div>
        <div className="rounded-lg border border-border bg-surface p-6">
          <Newspaper className="h-6 w-6 text-accent" />
          <p className="mt-3 text-3xl font-semibold">{postCount ?? 0}</p>
          <p className="text-sm text-muted-foreground">Blog posts published</p>
        </div>
      </div>
    </div>
  );
}
