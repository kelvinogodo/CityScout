import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { getPropertyBySlug } from "@/lib/data/properties";

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
          <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium capitalize text-accent-foreground">
            {property.type}
          </span>
          <h1 className="mt-3 text-3xl font-semibold">
            {formatPrice(property.price)}
          </h1>
          <p className="mt-2 flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {property.location}
          </p>
          <p className="mt-6 whitespace-pre-line leading-relaxed text-foreground">
            {property.description}
          </p>
        </div>

        <div className="h-fit rounded-lg border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold">Interested in this property?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Reach out and our team will get back to you with more details.
          </p>
          <Button asChild className="mt-4 w-full">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
