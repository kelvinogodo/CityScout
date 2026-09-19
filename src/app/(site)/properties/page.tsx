import type { Metadata } from "next";
import { Suspense } from "react";
import { MessageCircle } from "lucide-react";
import { PropertyCard } from "@/components/site/property-card";
import { Pagination } from "@/components/site/pagination";
import { RevealGroup, RevealItem } from "@/components/site/reveal";
import { PropertyFilters } from "@/components/site/property-filters";
import { Button } from "@/components/ui/button";
import {
  getPropertiesPage,
  type ListingStatus,
  type PropertyType,
} from "@/lib/data/properties";
import { whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse property listings for sale and rent in Abakaliki, Ebonyi State with CityScout Realtors.",
};

const PAGE_SIZE = 9;

type SearchParams = Promise<{
  location?: string;
  type?: string;
  status?: string;
  bedrooms?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: string;
}>;

function toNumber(value?: string) {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const page = Math.max(1, Math.floor(toNumber(params.page) ?? 1));

  const { items, total, totalPages } = await getPropertiesPage(
    {
      location: params.location,
      type:
        params.type === "house" || params.type === "land"
          ? (params.type as PropertyType)
          : undefined,
      status:
        params.status === "for_sale" || params.status === "for_rent"
          ? (params.status as ListingStatus)
          : undefined,
      minBedrooms: toNumber(params.bedrooms),
      minPrice: toNumber(params.minPrice),
      maxPrice: toNumber(params.maxPrice),
    },
    page,
    PAGE_SIZE,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold">Property listings</h1>
      <p className="mt-2 text-muted-foreground">
        {total} propert{total === 1 ? "y" : "ies"} available
      </p>

      <div className="mt-6">
        <Suspense>
          <PropertyFilters />
        </Suspense>
      </div>

      {items.length > 0 ? (
        <>
          <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((property) => (
              <RevealItem key={property.id}>
                <PropertyCard property={property} />
              </RevealItem>
            ))}
          </RevealGroup>
          <Pagination
            page={page}
            totalPages={totalPages}
            basePath="/properties"
            params={params}
          />
        </>
      ) : (
        <div className="mt-8 rounded-lg border border-dashed border-border p-8 text-center">
          <p className="text-muted-foreground">
            No properties match your search right now.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Tell us what you&apos;re looking for and we&apos;ll let you know
            when something suitable comes up.
          </p>
          <Button
            asChild
            className="mt-4 gap-2 bg-[#25D366] text-black hover:bg-[#25D366]/90"
          >
            <a
              href={whatsappLink(
                "Hello CityScout Realtors, I'm looking for a property. Can you help?",
              )}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
              Tell us on WhatsApp
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}
