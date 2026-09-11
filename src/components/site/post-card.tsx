import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Post } from "@/lib/data/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-lg border border-border bg-surface transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.image}
          alt={post.alt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {post.category === "featured" && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
            <Star className="h-3.5 w-3.5 fill-current" />
            Featured
          </span>
        )}
      </div>
      <div className="space-y-2 p-4">
        <h3 className="line-clamp-2 text-lg font-semibold">{post.title}</h3>
        <p className="text-sm text-muted-foreground">
          {post.author} ·{" "}
          {new Date(post.created_at).toLocaleDateString("en-NG", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}
