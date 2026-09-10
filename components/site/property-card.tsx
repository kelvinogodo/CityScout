import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Property } from "@/lib/data/properties";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group block overflow-hidden rounded-lg border border-border bg-surface transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.front_view_image}
          alt={property.description}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-medium capitalize text-accent-foreground">
          {property.type}
        </span>
      </div>
      <div className="space-y-2 p-4">
        <p className="text-lg font-semibold">{formatPrice(property.price)}</p>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          {property.location}
        </p>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {property.description}
        </p>
      </div>
    </Link>
  );
}
