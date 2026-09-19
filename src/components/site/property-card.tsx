import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Bath,
  BedDouble,
  House,
  LandPlot,
  MapPin,
  Ruler,
} from "lucide-react";
import { formatPrice, shortLocation } from "@/lib/utils";
import { SampleBadge } from "@/components/site/sample-badge";
import type { Property } from "@/lib/data/properties";

const TYPE_ICON = { house: House, land: LandPlot } as const;

export function PropertyCard({ property }: { property: Property }) {
  const TypeIcon = TYPE_ICON[property.type];
  const isRent = property.listing_status === "for_rent";
  const hasStats =
    property.bedrooms != null ||
    property.bathrooms != null ||
    property.land_size_sqm != null;

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-muted shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
      <Image
        src={property.front_view_image}
        alt={`${property.type} in ${property.location}`}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
        <div className="flex gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold capitalize text-black backdrop-blur">
            <TypeIcon className="h-3.5 w-3.5" />
            {property.type}
          </span>
          {isRent && (
            <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground">
              For rent
            </span>
          )}
        </div>
        <SampleBadge show={property.is_sample} />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="flex flex-wrap items-baseline gap-x-2 text-2xl font-semibold tracking-tight">
              {formatPrice(property.price)}
              {isRent && (
                <span className="text-sm font-normal text-white/70">/ year</span>
              )}
              {property.price_negotiable && (
                <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                  Negotiable
                </span>
              )}
            </p>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-white/80">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="line-clamp-1" title={property.location}>
                {shortLocation(property.location)}
              </span>
            </p>
          </div>
          <span className="flex h-11 w-11 shrink-0 translate-y-2 items-center justify-center rounded-full bg-accent text-accent-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>

        {hasStats && (
          <ul className="mt-4 flex items-center gap-5 border-t border-white/20 pt-4 text-xs font-medium text-white/90">
            {property.bedrooms != null && (
              <li className="flex items-center gap-1.5">
                <BedDouble className="h-4 w-4" />
                {property.bedrooms} bed
              </li>
            )}
            {property.bathrooms != null && (
              <li className="flex items-center gap-1.5">
                <Bath className="h-4 w-4" />
                {property.bathrooms} bath
              </li>
            )}
            {property.land_size_sqm != null && (
              <li className="flex items-center gap-1.5">
                <Ruler className="h-4 w-4" />
                {property.land_size_sqm.toLocaleString("en-NG")} sqm
              </li>
            )}
          </ul>
        )}
      </div>
    </Link>
  );
}
