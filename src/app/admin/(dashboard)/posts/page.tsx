import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { getPosts } from "@/lib/data/posts";
import { deletePost } from "./actions";

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Posts</h1>
        <Button asChild className="gap-2">
          <Link href="/admin/posts/new">
            <Plus className="h-4 w-4" />
            New post
          </Link>
        </Button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Post</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded">
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="line-clamp-1 max-w-xs">{post.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3">{post.author}</td>
                <td className="px-4 py-3 capitalize">{post.category}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Button asChild variant="outline" size="icon">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        aria-label="Edit post"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DeleteButton
                      action={deletePost.bind(null, post.id)}
                      confirmMessage="Delete this post? This cannot be undone."
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <p className="p-6 text-center text-muted-foreground">
            No posts yet.
          </p>
        )}
      </div>
    </div>
  );
}
