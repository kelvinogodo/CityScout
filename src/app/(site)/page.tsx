import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  FileCheck,
  KeyRound,
  MapPinned,
  MessageCircle,
} from "lucide-react";
import { HeroCarousel } from "@/components/site/hero-carousel";
import { HeroSearch } from "@/components/site/hero-search";
import { PropertyCard } from "@/components/site/property-card";
import { PostCard } from "@/components/site/post-card";
import {
  Entrance,
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/site/reveal";
import { getProperties } from "@/lib/data/properties";
import { getPosts } from "@/lib/data/posts";

export const metadata: Metadata = {
  title: { absolute: "Property Agents in Abakaliki" },
  description:
    "City Scout Realtors helps you find properties for sale in Ebonyi State easily.",
};

const steps = [
  {
    icon: MessageCircle,
    title: "Tell us what you need",
    text: "Message us on WhatsApp or call with your budget, location and the kind of property you want.",
  },
  {
    icon: MapPinned,
    title: "Inspect in person",
    text: "We arrange visits to matching properties so you see them for yourself before deciding.",
  },
  {
    icon: FileCheck,
    title: "Check the paperwork",
    text: "Review the title documents and survey plan carefully, ideally with your own lawyer, before any payment.",
  },
  {
    icon: KeyRound,
    title: "Complete with confidence",
    text: "Sign a written agreement, keep every receipt, and take ownership the proper way.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  href,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <Reveal className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{title}</h2>
      </div>
      <Link
        href={href}
        className="group inline-flex items-center gap-2 text-sm font-medium hover:text-accent"
      >
        {linkLabel}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </Reveal>
  );
}

export default async function HomePage() {
  const [properties, posts] = await Promise.all([
    getProperties({ limit: 6 }),
    getPosts({ limit: 3 }),
  ]);

  return (
    <>
      <section className="relative flex h-[82vh] min-h-[520px] items-center overflow-hidden">
        <HeroCarousel />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white sm:px-6">
          <Entrance>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/80 sm:text-sm">
              Abakaliki · Ebonyi State
            </p>
          </Entrance>
          <Entrance delay={0.12}>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
              Find a home you&apos;ll be proud to own
            </h1>
          </Entrance>
          <Entrance delay={0.24}>
            <p className="mx-auto mt-6 max-w-xl text-base text-white/85 sm:text-lg">
              CityScout Realtors connects you with verified, worthy properties
              for sale across Ebonyi State.
            </p>
          </Entrance>
          <Entrance delay={0.36}>
            <HeroSearch />
          </Entrance>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="Featured"
          title="Latest properties"
          href="/properties"
          linkLabel="See all properties"
        />
        {properties.length > 0 ? (
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <RevealItem key={property.id}>
                <PropertyCard property={property} />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <p className="mt-12 rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
            New listings are being added. Contact us to hear about properties
            before they go public.
          </p>
        )}
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(38_92%_55%)]">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">
              Buying a property, without the guesswork
            </h2>
            <p className="mt-5 text-primary-foreground/70">
              A purchase this big should never feel rushed. Here is how we work
              with you, from first message to keys in hand.
            </p>
          </Reveal>

          <RevealGroup className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <RevealItem
                key={title}
                className="relative border-t border-white/15 pt-8"
              >
                <span className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-primary" />
                <Icon className="absolute right-0 top-8 h-6 w-6 text-white/25" />
                <span className="text-5xl font-semibold tracking-tight text-[hsl(38_92%_55%)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/65">
                  {text}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <SectionHeading
            eyebrow="Insights"
            title="Latest from the blog"
            href="/blog"
            linkLabel="View more posts"
          />
          {posts.length > 0 ? (
            <RevealGroup className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <RevealItem key={post.id}>
                  <PostCard post={post} />
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <p className="mt-12 rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
              Property tips and market insights are coming soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
