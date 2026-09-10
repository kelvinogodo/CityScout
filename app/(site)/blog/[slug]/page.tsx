import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import parse from "html-react-parser";
import { getPostBySlug } from "@/lib/data/posts";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Post not found" };

  return {
    title: post.seo_title || post.title,
    description: post.meta,
  };
}

export default async function PostDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-wide text-accent">
        {post.category}
      </p>
      <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{post.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {post.author} ·{" "}
        {new Date(post.created_at).toLocaleDateString("en-NG", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>

      <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-lg">
        <Image
          src={post.image}
          alt={post.alt}
          fill
          sizes="(min-width: 640px) 768px, 100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
        {parse(post.body)}
      </div>
    </article>
  );
}
