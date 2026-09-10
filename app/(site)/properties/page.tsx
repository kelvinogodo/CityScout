import type { Metadata } from "next";
import { Suspense } from "react";
import { PropertyCard } from "@/components/site/property-card";
import { PropertyFilters } from "@/components/site/property-filters";
import { getProperties, type PropertyType } from "@/lib/data/properties";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse property listings for sale in Abakaliki, Ebonyi State with CityScout Realtors.",
};

type SearchParams = Promise<{
  location?: string;
  type?: string;
  minPrice?: string;
  maxPrice?: string;
}>;

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const properties = await getProperties({
    location: params.location,
    type:
      params.type === "house" || params.type === "land"
        ? (params.type as PropertyType)
        : undefined,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold">Property listings</h1>
      <p className="mt-2 text-muted-foreground">
        {properties.length} propert{properties.length === 1 ? "y" : "ies"}{" "}
        available
      </p>

      <div className="mt-6">
        <Suspense>
          <PropertyFilters />
        </Suspense>
      </div>

      {properties.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-muted-foreground">
          No properties match your search. Try a broader filter.
        </p>
      )}
    </div>
  );
}
