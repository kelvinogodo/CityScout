import { createClient } from "@/lib/supabase/server";
import type { PropertyRow } from "@/lib/supabase/database.types";

export type Property = PropertyRow;
export type PropertyType = PropertyRow["type"];
export type ListingStatus = PropertyRow["listing_status"];

export type PropertyFilters = {
  location?: string;
  type?: PropertyType;
  status?: ListingStatus;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  limit?: number;
};

export type Page<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export async function getPropertiesPage(
  filters: PropertyFilters = {},
  page = 1,
  pageSize = 9,
): Promise<Page<Property>> {
  const supabase = await createClient();
  const from = (page - 1) * pageSize;

  let query = supabase
    .from("properties")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, from + pageSize - 1);

  if (filters.location) {
    query = query.ilike("location", `%${filters.location}%`);
  }
  if (filters.type) {
    query = query.eq("type", filters.type);
  }
  if (filters.status) {
    query = query.eq("listing_status", filters.status);
  }
  if (filters.minPrice !== undefined) {
    query = query.gte("price", filters.minPrice);
  }
  if (filters.maxPrice !== undefined) {
    query = query.lte("price", filters.maxPrice);
  }
  if (filters.minBedrooms !== undefined) {
    query = query.gte("bedrooms", filters.minBedrooms);
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

export async function getProperties(
  filters: PropertyFilters = {},
): Promise<Property[]> {
  const { items } = await getPropertiesPage(filters, 1, filters.limit ?? 1000);
  return items;
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
