"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TipTapEditor } from "@/components/admin/tiptap-editor";
import type { Post } from "@/lib/data/posts";
import type { ActionState } from "@/app/admin/(dashboard)/posts/actions";

export function PostForm({
  post,
  action,
}: {
  post?: Post;
  action: (
    prevState: ActionState,
    formData: FormData,
  ) => Promise<ActionState>;
}) {
  const [state, formAction, isPending] = useActionState(action, undefined);
  const [body, setBody] = useState(post?.body ?? "");

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={post?.title} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          name="author"
          defaultValue={post?.author ?? "CityScout Realtors"}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          name="category"
          defaultValue={post?.category ?? "normal"}
          className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <option value="normal">Normal</option>
          <option value="featured">Featured</option>
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="alt">Image alt text</Label>
        <Input id="alt" name="alt" defaultValue={post?.alt} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="seoTitle">SEO title</Label>
        <Input
          id="seoTitle"
          name="seoTitle"
          defaultValue={post?.seo_title}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="meta">Meta description</Label>
        <Input id="meta" name="meta" defaultValue={post?.meta} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">
          Cover image {post && "(leave blank to keep current)"}
        </Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          required={!post}
        />
      </div>
      <div className="space-y-2">
        <Label>Body</Label>
        <input type="hidden" name="body" value={body} />
        <TipTapEditor content={body} onChange={setBody} />
      </div>
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : post ? "Save changes" : "Create post"}
      </Button>
    </form>
  );
}
