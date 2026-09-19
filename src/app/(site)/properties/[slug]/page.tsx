import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { House, LandPlot, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { getPropertyBySlug } from "@/lib/data/properties";
import {
  LISTING_STATUS_LABELS,
  TITLE_DOCUMENT_LABELS,
} from "@/lib/listing-labels";
import { siteConfig, whatsappLink } from "@/lib/site-config";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) return { title: "Property not found" };

  return {
    title: `${property.location} — ${formatPrice(property.price)}`,
    description: property.description,
    openGraph: {
      title: `${property.location} — ${formatPrice(property.price)}`,
      description: property.description,
      images: [property.front_view_image],
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) notFound();

  const images = [
    property.front_view_image,
    property.side_view_image,
    property.back_view_image,
  ];

  const TypeIcon = property.type === "house" ? House : LandPlot;
  const isRent = property.listing_status === "for_rent";

  const facts: [string, string][] = [
    ["Status", LISTING_STATUS_LABELS[property.listing_status ?? "for_sale"]],
    ["Type", property.type === "house" ? "House" : "Land"],
  ];
  if (property.bedrooms != null) facts.push(["Bedrooms", String(property.bedrooms)]);
  if (property.bathrooms != null) facts.push(["Bathrooms", String(property.bathrooms)]);
  if (property.land_size_sqm != null) {
    facts.push(["Land size", `${property.land_size_sqm} sqm`]);
  }
  if (property.title_document) {
    facts.push(["Title document", TITLE_DOCUMENT_LABELS[property.title_document]]);
  }

  const enquiry = `Hello CityScout Realtors, I'm interested in the property at ${property.location} (${formatPrice(property.price)}). ${siteConfig.url}/properties/${property.slug}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid gap-2 sm:grid-cols-3">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg sm:col-span-2 sm:aspect-[16/9]">
          <Image
            src={images[0]!}
            alt={property.description}
            fill
            sizes="(min-width: 640px) 66vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
          {images.slice(1).map((src, index) => (
            <div
              key={src}
              className="relative aspect-[4/3] overflow-hidden rounded-lg"
            >
              <Image
                src={src}
                alt={`${property.description} view ${index + 2}`}
                fill
                sizes="33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {property.is_sample && (
            <p className="mb-4 rounded-md border border-border bg-muted px-3 py-2 text-sm text-muted-foreground">
              This is a sample listing shown for illustration. It is not a
              property currently available for sale.
            </p>
          )}
          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-medium capitalize text-accent-foreground">
            <TypeIcon className="h-3.5 w-3.5" />
            {property.type}
          </span>
          <h1 className="mt-3 text-3xl font-semibold">
            {formatPrice(property.price)}
            {isRent && (
              <span className="text-lg font-normal text-muted-foreground">
                {" "}
                / year
              </span>
            )}
          </h1>
          {property.price_negotiable && (
            <p className="mt-1 text-sm font-medium text-accent">
              Price negotiable
            </p>
          )}
          <p className="mt-2 flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {property.location}
          </p>

          <dl className="mt-6 grid gap-x-8 gap-y-3 rounded-lg border border-border bg-surface p-5 text-sm sm:grid-cols-2">
            {facts.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="text-right font-medium">{value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 whitespace-pre-line leading-relaxed text-foreground">
            {property.description}
          </p>
        </div>

        <div className="h-fit space-y-3 rounded-lg border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold">Interested in this property?</h2>
          <p className="text-sm text-muted-foreground">
            Message us on WhatsApp for the quickest response, or call to arrange
            an inspection.
          </p>
          <Button
            asChild
            className="w-full gap-2 bg-[#25D366] text-black hover:bg-[#25D366]/90"
          >
            <a href={whatsappLink(enquiry)} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full gap-2">
            <a href={`tel:${siteConfig.phone}`}>
              <Phone className="h-4 w-4" />
              Call {siteConfig.phoneDisplay}
            </a>
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/contact">Send a message</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
