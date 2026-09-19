import type { Metadata } from "next";
import Image from "next/image";
import {
  Compass,
  Handshake,
  Lightbulb,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "City Scout Realtors is a reliable property agency based in Abakaliki, helping people find and buy legal properties in Ebonyi State.",
};

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    text: "We employ recent technology and creativity to deliver holistic service.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    text: "We consistently uphold ethical principles and morals. We do not say it, we do it.",
  },
  {
    icon: Users,
    title: "Customer Satisfaction",
    text: "You are important, and that is why your satisfaction comes ahead of anything else.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Growth",
    text: "We learn every day, and we improve every second.",
  },
];

const partners = ["Tansian Geospatial Consult", "Beloved Global Concept Developers"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Real estate you can trust in Ebonyi State"
        description="CityScout Realtors is a property agent based in Abakaliki, helping people find and buy legal properties."
        image="/images/hero/abuja-bungalows.jpg"
      />

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Who we are
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              We help you find, and buy, legal property
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              CityScout Realtors is a property agent based in Abakaliki. Our
              focus is to help people find and buy legal properties, whether
              buildings or land, in the state. We are also committed to
              delivering quality property development services.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              The team is made up of experienced and young professionals with a
              taste for innovation and quality property brokerage.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-2xl shadow-xl lg:max-w-none">
              <Image
                src="/images/samples/abuja-duplex-front.jpg"
                alt="A modern house with a brick-clad upper floor"
                fill
                sizes="(min-width: 1024px) 540px, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <RevealGroup className="grid gap-16 md:grid-cols-2 md:gap-20">
            <RevealItem>
              <Compass className="h-8 w-8 text-[hsl(38_92%_55%)]" />
              <h2 className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
                Our vision
              </h2>
              <p className="mt-4 text-2xl font-medium leading-snug sm:text-3xl">
                To easily connect real estate investors to the right properties
                in Ebonyi State and drive seamless acquisition.
              </p>
            </RevealItem>
            <RevealItem>
              <Handshake className="h-8 w-8 text-[hsl(38_92%_55%)]" />
              <h2 className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
                Our mission
              </h2>
              <p className="mt-4 text-2xl font-medium leading-snug sm:text-3xl">
                To unlock the full potential of real estate in the region
                through technology and innovation.
              </p>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Our values
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            What we stand for
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }) => (
            <RevealItem key={title} className="border-t border-border pt-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Icon className="h-5 w-5 text-accent" />
              </span>
              <h3 className="mt-6 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {text}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Our partners
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                We work alongside trusted firms
              </h2>
            </div>
            <ul className="flex flex-wrap gap-3">
              {partners.map((name) => (
                <li
                  key={name}
                  className="rounded-full border border-border bg-background px-5 py-3 text-sm font-medium"
                >
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
