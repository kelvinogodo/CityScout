import { createClient } from "@/lib/supabase/server";
import type { PropertyRow } from "@/lib/supabase/database.types";

export type Property = PropertyRow;
export type PropertyType = PropertyRow["type"];

export type PropertyFilters = {
  location?: string;
  type?: PropertyType;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
};

export async function getProperties(
  filters: PropertyFilters = {},
): Promise<Property[]> {
  const supabase = await createClient();
  let query = supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (filters.location) {
    query = query.ilike("location", `%${filters.location}%`);
  }
  if (filters.type) {
    query = query.eq("type", filters.type);
  }
  if (filters.minPrice !== undefined) {
    query = query.gte("price", filters.minPrice);
  }
  if (filters.maxPrice !== undefined) {
    query = query.lte("price", filters.maxPrice);
  }
  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getPropertyBySlug(
  slug: string,
): Promise<Property | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}
