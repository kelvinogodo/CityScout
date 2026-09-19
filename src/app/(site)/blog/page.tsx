import type { Metadata } from "next";
import { PostCard } from "@/components/site/post-card";
import { Pagination } from "@/components/site/pagination";
import { RevealGroup, RevealItem } from "@/components/site/reveal";
import { getPostsPage } from "@/lib/data/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Property tips, industry news, and updates from CityScout Realtors.",
};

const PAGE_SIZE = 9;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: rawPage } = await searchParams;
  const parsed = Number(rawPage);
  const page = Number.isFinite(parsed) && parsed >= 1 ? Math.floor(parsed) : 1;

  const { items, totalPages } = await getPostsPage({}, page, PAGE_SIZE);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold">CityScout Blog</h1>
      <p className="mt-2 text-muted-foreground">
        Property tips, industry news, and investment insights.
      </p>

      {items.length > 0 ? (
        <>
          <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((post) => (
              <RevealItem key={post.id}>
                <PostCard post={post} />
              </RevealItem>
            ))}
          </RevealGroup>
          <Pagination
            page={page}
            totalPages={totalPages}
            basePath="/blog"
            params={{}}
          />
        </>
      ) : (
        <p className="mt-8 text-muted-foreground">
          No posts published yet — check back soon.
        </p>
      )}
    </div>
  );
}
