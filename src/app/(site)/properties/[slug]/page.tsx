import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Bath,
  BedDouble,
  FileCheck,
  House,
  LandPlot,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
  Tag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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

  const isRent = property.listing_status === "for_rent";
  const TypeIcon = property.type === "house" ? House : LandPlot;

  const facts: { icon: LucideIcon; label: string; value: string }[] = [
    {
      icon: Tag,
      label: "Status",
      value: LISTING_STATUS_LABELS[property.listing_status ?? "for_sale"],
    },
    {
      icon: TypeIcon,
      label: "Type",
      value: property.type === "house" ? "House" : "Land",
    },
  ];
  if (property.bedrooms != null) {
    facts.push({ icon: BedDouble, label: "Bedrooms", value: String(property.bedrooms) });
  }
  if (property.bathrooms != null) {
    facts.push({ icon: Bath, label: "Bathrooms", value: String(property.bathrooms) });
  }
  if (property.land_size_sqm != null) {
    facts.push({
      icon: Ruler,
      label: "Land size",
      value: `${property.land_size_sqm.toLocaleString("en-NG")} sqm`,
    });
  }
  if (property.title_document) {
    facts.push({
      icon: FileCheck,
      label: "Title document",
      value: TITLE_DOCUMENT_LABELS[property.title_document],
    });
  }

  const enquiry = `Hello CityScout Realtors, I'm interested in the property at ${property.location} (${formatPrice(property.price)}). ${siteConfig.url}/properties/${property.slug}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid h-[320px] grid-cols-3 grid-rows-2 gap-2 sm:h-[480px] sm:gap-3">
        <div className="relative col-span-2 row-span-2 overflow-hidden rounded-2xl bg-muted">
          <Image
            src={images[0]!}
            alt={`${property.type} in ${property.location}`}
            fill
            sizes="(min-width: 1152px) 760px, 66vw"
            className="object-cover"
            priority
          />
        </div>
        {images.slice(1).map((src, index) => (
          <div
            key={src}
            className="relative overflow-hidden rounded-2xl bg-muted"
          >
            <Image
              src={src}
              alt={`${property.type} in ${property.location}, view ${index + 2}`}
              fill
              sizes="(min-width: 1152px) 380px, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {property.is_sample && (
            <p className="mb-6 rounded-xl border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
              This is a sample listing shown for illustration. It is not a
              property currently available.
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold capitalize text-accent-foreground">
              <TypeIcon className="h-3.5 w-3.5" />
              {property.type}
            </span>
            {property.price_negotiable && (
              <span className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold">
                Price negotiable
              </span>
            )}
          </div>

          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            {formatPrice(property.price)}
            {isRent && (
              <span className="text-lg font-normal text-muted-foreground">
                {" "}
                / year
              </span>
            )}
          </h1>
          <p className="mt-3 flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            {property.location}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {facts.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-border bg-surface p-4"
              >
                <Icon className="h-5 w-5 text-accent" />
                <dt className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">
                  {label}
                </dt>
                <dd className="mt-1 text-sm font-semibold leading-snug">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-10 text-xl font-semibold">About this property</h2>
          <p className="mt-3 whitespace-pre-line leading-relaxed text-muted-foreground">
            {property.description}
          </p>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-3 rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Interested in this property?</h2>
            <p className="text-sm text-muted-foreground">
              Message us on WhatsApp for the quickest response, or call to
              arrange an inspection.
            </p>
            <Button
              asChild
              size="lg"
              className="w-full gap-2 bg-[#25D366] text-black hover:bg-[#25D366]/90"
            >
              <a href={whatsappLink(enquiry)} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full gap-2">
              <a href={`tel:${siteConfig.phone}`}>
                <Phone className="h-4 w-4" />
                Call {siteConfig.phoneDisplay}
              </a>
            </Button>
            <Button asChild variant="ghost" className="w-full">
              <Link href="/contact">Send a message</Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
