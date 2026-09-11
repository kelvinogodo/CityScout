import { createClient } from "@/lib/supabase/server";
import type { PostRow } from "@/lib/supabase/database.types";

export type Post = PostRow;
export type PostCategory = PostRow["category"];

export type PostFilters = {
  category?: PostCategory;
  limit?: number;
};

export async function getPosts(filters: PostFilters = {}): Promise<Post[]> {
  const supabase = await createClient();
  let query = supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (filters.category) {
    query = query.eq("category", filters.category);
  }
  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}
