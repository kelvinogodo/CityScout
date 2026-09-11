"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/supabase/storage";
import type { PostUpdate } from "@/lib/supabase/database.types";
import { slugify } from "@/lib/utils";
import { createPostSchema, updatePostSchema } from "@/lib/validations/post";

export type ActionState = { error?: string } | undefined;

function readPostFormData(formData: FormData) {
  return {
    title: formData.get("title"),
    body: formData.get("body"),
    author: formData.get("author"),
    category: formData.get("category"),
    alt: formData.get("alt"),
    seoTitle: formData.get("seoTitle"),
    meta: formData.get("meta"),
    image: formData.get("image"),
  };
}

export async function createPost(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireUser();

  const parsed = createPostSchema.safeParse(readPostFormData(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { image, seoTitle, ...rest } = parsed.data;
  const imageUrl = await uploadImage("post-images", image);

  const supabase = await createClient();
  const slug = `${slugify(rest.title)}-${Date.now().toString(36)}`;

  const { error } = await supabase.from("posts").insert({
    ...rest,
    slug,
    image: imageUrl,
    seo_title: seoTitle,
  });

  if (error) {
    return { error: "Failed to create post. Please try again." };
  }

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  redirect("/admin/posts");
}

export async function updatePost(
  id: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireUser();

  const parsed = updatePostSchema.safeParse(readPostFormData(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { image, seoTitle, ...rest } = parsed.data;

  const updates: PostUpdate = { ...rest, seo_title: seoTitle };
  if (image) {
    updates.image = await uploadImage("post-images", image);
  }

  const supabase = await createClient();
  const { error } = await supabase.from("posts").update(updates).eq("id", id);

  if (error) {
    return { error: "Failed to update post. Please try again." };
  }

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  await requireUser();

  const supabase = await createClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    throw new Error("Failed to delete post.");
  }

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
}
