import { redirect } from "next/navigation";
import { createClient } from "./server";

// Every mutating Server Action calls this first. A proxy matcher alone does
// not protect Server Actions on excluded paths, so each action must verify
// the session itself rather than relying on proxy.ts.
export async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return user;
}
