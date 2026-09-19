import Link from "next/link";
import type { Metadata } from "next";
import { FileCheck, KeyRound, MapPinned, MessageCircle } from "lucide-react";
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

export default async function HomePage() {
  const [properties, posts] = await Promise.all([
    getProperties({ limit: 6 }),
    getPosts({ limit: 3 }),
  ]);

  return (
    <>
      <section className="relative flex h-[78vh] min-h-[480px] items-center overflow-hidden">
        <HeroCarousel />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-white sm:px-6">
          <Entrance>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/80 sm:text-sm">
              Abakaliki · Ebonyi State
            </p>
          </Entrance>
          <Entrance delay={0.12}>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-6xl">
              Find a home you&apos;ll be proud to own
            </h1>
          </Entrance>
          <Entrance delay={0.24}>
            <p className="mx-auto mt-5 max-w-xl text-base text-white/90 sm:text-lg">
              CityScout Realtors connects you with verified, worthy properties
              for sale across Ebonyi State.
            </p>
          </Entrance>
          <Entrance delay={0.36}>
            <HeroSearch />
          </Entrance>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal className="flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Featured
            </p>
            <h2 className="mt-2 text-3xl font-semibold">Latest properties</h2>
          </div>
          <Link
            href="/properties"
            className="text-sm font-medium text-accent hover:underline"
          >
            See all properties →
          </Link>
        </Reveal>
        {properties.length > 0 ? (
          <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <RevealItem key={property.id}>
                <PropertyCard property={property} />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <p className="mt-8 rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
            New listings are being added. Contact us to hear about properties
            before they go public.
          </p>
        )}
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              How it works
            </p>
            <h2 className="mt-2 text-3xl font-semibold">
              Buying a property, step by step
            </h2>
            <p className="mt-3 text-muted-foreground">
              A property purchase should never feel rushed. Here is how we work
              with you from first message to keys in hand.
            </p>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <RevealItem
                key={title}
                className="rounded-lg border border-border bg-surface p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                    {index + 1}
                  </span>
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal className="flex items-end justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Insights
              </p>
              <h2 className="mt-2 text-3xl font-semibold">
                Latest from the blog
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-sm font-medium text-accent hover:underline"
            >
              View more posts →
            </Link>
          </Reveal>
          {posts.length > 0 ? (
            <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <RevealItem key={post.id}>
                  <PostCard post={post} />
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <p className="mt-8 rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
              Property tips and market insights are coming soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
