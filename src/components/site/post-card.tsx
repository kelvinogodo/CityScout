import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { SampleBadge } from "@/components/site/sample-badge";
import type { Post } from "@/lib/data/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block focus-visible:outline-none"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted shadow-sm transition-shadow duration-500 group-hover:shadow-xl group-focus-visible:ring-2 group-focus-visible:ring-accent group-focus-visible:ring-offset-2">
        <Image
          src={post.image}
          alt={post.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          {post.category === "featured" ? (
            <span className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground">
              <Star className="h-3.5 w-3.5 fill-current" />
              Featured
            </span>
          ) : (
            <span />
          )}
          <SampleBadge show={post.is_sample} />
        </div>
      </div>

      <div className="pt-5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {new Date(post.created_at).toLocaleDateString("en-NG", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}{" "}
          · {post.author}
        </p>
        <h3 className="mt-2 line-clamp-2 text-xl font-semibold leading-snug transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
          Read article
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
