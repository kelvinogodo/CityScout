import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const [{ data: properties }, { data: posts }] = await Promise.all([
    supabase.from("properties").select("slug, updated_at"),
    supabase.from("posts").select("slug, updated_at"),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "daily", priority: 1 },
    {
      url: `${siteConfig.url}/properties`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/blog`,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/service`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/contact`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const propertyRoutes: MetadataRoute.Sitemap = (properties ?? []).map(
    (property) => ({
      url: `${siteConfig.url}/properties/${property.slug}`,
      lastModified: property.updated_at,
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  const postRoutes: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.updated_at,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...propertyRoutes, ...postRoutes];
}
