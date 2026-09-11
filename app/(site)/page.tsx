import Link from "next/link";
import type { Metadata } from "next";
import { HeroCarousel } from "@/components/site/hero-carousel";
import { PropertyCard } from "@/components/site/property-card";
import { PostCard } from "@/components/site/post-card";
import { Button } from "@/components/ui/button";
import { getProperties } from "@/lib/data/properties";
import { getPosts } from "@/lib/data/posts";

export const metadata: Metadata = {
  title: { absolute: "Property Agents in Abakaliki" },
  description:
    "City Scout Realtors helps you find properties for sale in Ebonyi State easily.",
};

export default async function HomePage() {
  const [properties, posts] = await Promise.all([
    getProperties({ limit: 6 }),
    getPosts({ limit: 3 }),
  ]);

  return (
    <>
      <section className="relative flex h-[70vh] min-h-[420px] items-center overflow-hidden">
        <HeroCarousel />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-white sm:px-6">
          <h1 className="text-3xl font-bold sm:text-5xl">
            The easiest way to find your dream property in Ebonyi State
          </h1>
          <p className="mt-4 text-base text-white/90 sm:text-lg">
            CityScout Realtors connects you with verified, worthy properties
            for sale in Ebonyi State.
          </p>
          <Button asChild size="lg" variant="accent" className="mt-6">
            <Link href="/properties">Explore properties</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Latest properties</h2>
          <Link href="/properties" className="text-sm text-accent hover:underline">
            See all properties
          </Link>
        </div>
        {properties.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-muted-foreground">
            No properties listed yet — check back soon.
          </p>
        )}
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold">Latest from the blog</h2>
            <Link href="/blog" className="text-sm text-accent hover:underline">
              View more posts
            </Link>
          </div>
          {posts.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-muted-foreground">
              No posts published yet — check back soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
