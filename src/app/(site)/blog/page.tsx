import type { Metadata } from "next";
import { PostCard } from "@/components/site/post-card";
import { getPosts } from "@/lib/data/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Property tips, industry news, and updates from CityScout Realtors.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold">CityScout Blog</h1>
      <p className="mt-2 text-muted-foreground">
        Property tips, industry news, and investment insights.
      </p>

      {posts.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-muted-foreground">
          No posts published yet — check back soon.
        </p>
      )}
    </div>
  );
}
