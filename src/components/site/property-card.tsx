import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, House, LandPlot, MapPin, Ruler } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { SampleBadge } from "@/components/site/sample-badge";
import type { Property } from "@/lib/data/properties";

const TYPE_ICON = { house: House, land: LandPlot } as const;

export function PropertyCard({ property }: { property: Property }) {
  const TypeIcon = TYPE_ICON[property.type];
  const isRent = property.listing_status === "for_rent";

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group block overflow-hidden rounded-lg border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.front_view_image}
          alt={property.description}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-medium capitalize text-accent-foreground">
            <TypeIcon className="h-3.5 w-3.5" />
            {property.type}
          </span>
          {isRent && (
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-black">
              For rent
            </span>
          )}
        </div>
        <SampleBadge
          show={property.is_sample}
          className="absolute right-3 top-3"
        />
      </div>
      <div className="space-y-2 p-4">
        <p className="text-lg font-semibold">
          {formatPrice(property.price)}
          {isRent && (
            <span className="text-sm font-normal text-muted-foreground">
              {" "}
              / year
            </span>
          )}
          {property.price_negotiable && (
            <span className="ml-2 text-xs font-medium text-accent">
              Negotiable
            </span>
          )}
        </p>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          {property.location}
        </p>
        {(property.bedrooms != null ||
          property.bathrooms != null ||
          property.land_size_sqm != null) && (
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {property.bedrooms != null && (
              <li className="flex items-center gap-1">
                <BedDouble className="h-3.5 w-3.5" />
                {property.bedrooms} bed
              </li>
            )}
            {property.bathrooms != null && (
              <li className="flex items-center gap-1">
                <Bath className="h-3.5 w-3.5" />
                {property.bathrooms} bath
              </li>
            )}
            {property.land_size_sqm != null && (
              <li className="flex items-center gap-1">
                <Ruler className="h-3.5 w-3.5" />
                {property.land_size_sqm} sqm
              </li>
            )}
          </ul>
        )}
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {property.description}
        </p>
      </div>
    </Link>
  );
}
