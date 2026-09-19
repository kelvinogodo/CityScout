import { createClient } from "@/lib/supabase/server";
import type { PostRow } from "@/lib/supabase/database.types";
import type { Page } from "@/lib/data/properties";

export type Post = PostRow;
export type PostCategory = PostRow["category"];

export type PostFilters = {
  category?: PostCategory;
  limit?: number;
};

export async function getPostsPage(
  filters: PostFilters = {},
  page = 1,
  pageSize = 9,
): Promise<Page<Post>> {
  const supabase = await createClient();
  const from = (page - 1) * pageSize;

  let query = supabase
    .from("posts")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, from + pageSize - 1);

  if (filters.category) {
    query = query.eq("category", filters.category);
  }

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);

  const total = count ?? 0;
  return {
    items: data ?? [],
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function getPosts(filters: PostFilters = {}): Promise<Post[]> {
  const { items } = await getPostsPage(filters, 1, filters.limit ?? 1000);
  return items;
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
