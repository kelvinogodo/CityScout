// Removes every sample listing/post and its stored images.
//   node scripts/clear-sample.mjs
// Only touches rows where is_sample = true and files under the sample/ prefix.

import { getAdminClient } from "./lib/env.mjs";

const supabase = getAdminClient();

function storagePathFromUrl(url, bucket) {
  const marker = `/object/public/${bucket}/`;
  const index = url.indexOf(marker);
  return index === -1 ? null : decodeURIComponent(url.slice(index + marker.length));
}

async function clearTable(table, bucket, imageColumns) {
  const { data, error } = await supabase.from(table).select("*").eq("is_sample", true);
  if (error) throw new Error(`${table}: ${error.message}`);
  if (!data.length) {
    console.log(table, "no sample rows");
    return;
  }

  const paths = new Set();
  for (const row of data) {
    for (const column of imageColumns) {
      const path = storagePathFromUrl(row[column] ?? "", bucket);
      if (path?.startsWith("sample/")) paths.add(path);
    }
  }

  if (paths.size) {
    const { error: removeError } = await supabase.storage.from(bucket).remove([...paths]);
    if (removeError) throw new Error(`${bucket}: ${removeError.message}`);
  }

  const { error: deleteError } = await supabase.from(table).delete().eq("is_sample", true);
  if (deleteError) throw new Error(`${table}: ${deleteError.message}`);
  console.log(table, `removed ${data.length} rows, ${paths.size} images`);
}

async function main() {
  await clearTable("properties", "property-images", [
    "front_view_image",
    "side_view_image",
    "back_view_image",
  ]);
  await clearTable("posts", "post-images", ["image"]);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
