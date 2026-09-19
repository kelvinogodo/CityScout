// Seeds clearly-labelled sample listings and posts.
//   node scripts/seed-sample.mjs            # write
//   node scripts/seed-sample.mjs --dry-run  # show what would happen
// Idempotent: re-running updates the same rows (matched on slug).
// Requires supabase/migrations/0002_sample_flag.sql to have been run.

import { readFileSync } from "node:fs";
import { getAdminClient } from "./lib/env.mjs";
import { sampleProperties, samplePosts } from "./sample-data.mjs";

const dryRun = process.argv.includes("--dry-run");
const supabase = getAdminClient();

async function upload(bucket, relativePath) {
  const storagePath = `sample/${relativePath.replace(/^[^/]+\//, "")}`;
  if (dryRun) return `(dry-run) ${bucket}/${storagePath}`;

  const file = readFileSync(`public/images/${relativePath}`);
  const { error } = await supabase.storage
    .from(bucket)
    .upload(storagePath, file, { contentType: "image/jpeg", upsert: true });
  if (error) throw new Error(`Upload failed for ${relativePath}: ${error.message}`);

  return supabase.storage.from(bucket).getPublicUrl(storagePath).data.publicUrl;
}

async function main() {
  const { error: probe } = await supabase
    .from("properties")
    .select("id, is_sample, is_published, bedrooms, listing_status")
    .limit(1);
  if (probe) {
    console.error(
      `Database is missing columns (${probe.message}). Run supabase/migrations/0002_sample_flag.sql and 0003_listing_details_and_publishing.sql first.`,
    );
    process.exit(1);
  }

  for (const p of sampleProperties) {
    const [front, side, back] = await Promise.all([
      upload("property-images", p.images.front),
      upload("property-images", p.images.side),
      upload("property-images", p.images.back),
    ]);
    const row = {
      slug: p.slug,
      description: p.description,
      location: p.location,
      price: p.price,
      type: p.type,
      listing_status: p.listing_status,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      land_size_sqm: p.land_size_sqm,
      title_document: p.title_document,
      price_negotiable: p.price_negotiable,
      front_view_image: front,
      side_view_image: side,
      back_view_image: back,
      is_sample: true,
    };
    if (dryRun) {
      console.log("property", p.slug, "-> would upsert");
      continue;
    }
    const { error } = await supabase.from("properties").upsert(row, { onConflict: "slug" });
    if (error) throw new Error(`Property ${p.slug}: ${error.message}`);
    console.log("property", p.slug, "ok");
  }

  for (const post of samplePosts) {
    const image = await upload("post-images", post.image);
    const row = {
      slug: post.slug,
      title: post.title,
      body: post.body,
      image,
      author: post.author,
      category: post.category,
      alt: post.alt,
      seo_title: post.seo_title,
      meta: post.meta,
      is_sample: true,
    };
    if (dryRun) {
      console.log("post", post.slug, "-> would upsert");
      continue;
    }
    const { error } = await supabase.from("posts").upsert(row, { onConflict: "slug" });
    if (error) throw new Error(`Post ${post.slug}: ${error.message}`);
    console.log("post", post.slug, "ok");
  }

  console.log(dryRun ? "Dry run complete." : "Sample content seeded.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
