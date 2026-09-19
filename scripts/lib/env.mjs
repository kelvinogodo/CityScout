import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

// Node 20 has no global WebSocket and supabase-js's realtime module insists
// one exists, even though these scripts never use realtime.
globalThis.WebSocket ??= class WebSocket {};

function loadEnvFile(path) {
  let contents;
  try {
    contents = readFileSync(path, "utf8");
  } catch {
    return;
  }
  for (const line of contents.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

export function getAdminClient() {
  loadEnvFile(".env.local");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY in .env.local");
    process.exit(1);
  }
  return createClient(url, key, { auth: { persistSession: false } });
}
