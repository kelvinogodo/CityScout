import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Check, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Service",
  description:
    "Property brokerage and real estate development services from CityScout Realtors in Ebonyi State, Nigeria.",
};

const services: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  text: string;
  points: string[];
  image: string;
  alt: string;
  cta: { href: string; label: string };
}[] = [
  {
    icon: TrendingUp,
    eyebrow: "Property brokerage",
    title: "Find the right property, without the stress",
    text: "Acquiring the right property can be daunting. Our goal is to take that stress off your shoulders and help you find the best property to meet your investment target.",
    points: [
      "Properties matched to your budget, location and investment target",
      "Inspections arranged so you see a property before you decide",
      "Title documents and survey plans reviewed before any payment",
    ],
    image: "/images/samples/neighbourhood-town.jpg",
    alt: "A busy Nigerian town with hills in the distance",
    cta: { href: "/properties", label: "Browse properties" },
  },
  {
    icon: Building2,
    eyebrow: "Real estate development",
    title: "Develop your land and buildings, professionally",
    text: "Property development becomes easier with professionals. We have a team of architects, surveyors, and engineers who drive quality development of your lands and buildings for higher economic value.",
    points: [
      "A team of architects, surveyors and engineers",
      "Quality development of lands and buildings",
      "Built for higher economic value",
    ],
    image: "/images/samples/lagos-development.jpg",
    alt: "A new apartment development with a central courtyard",
    cta: { href: "/contact", label: "Discuss your project" },
  },
];

export default function ServicePage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Brokerage and development, done properly"
        description="Two services with one goal: helping you own and grow property in Ebonyi State with confidence."
        image="/images/hero/lagos-ikoyi.jpg"
      />

      {services.map(
        ({ icon: Icon, eyebrow, title, text, points, image, alt, cta }, index) => {
          const reverse = index % 2 === 1;
          return (
            <section
              key={eyebrow}
              className={cn(index % 2 === 1 && "bg-surface")}
            >
              <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                  <Reveal className={cn(reverse && "lg:order-2")}>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      {eyebrow}
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                      {title}
                    </h2>
                    <p className="mt-5 leading-relaxed text-muted-foreground">
                      {text}
                    </p>
                    <ul className="mt-8 space-y-4">
                      {points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15">
                            <Check className="h-3.5 w-3.5 text-accent" />
                          </span>
                          <span className="text-sm leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild size="lg" className="mt-10 gap-2 rounded-full">
                      <Link href={cta.href}>
                        {cta.label}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </Reveal>

                  <Reveal delay={0.1} className={cn(reverse && "lg:order-1")}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                      <Image
                        src={image}
                        alt={alt}
                        fill
                        sizes="(min-width: 1024px) 540px, 90vw"
                        className="object-cover"
                      />
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>
          );
        },
      )}
    </>
  );
}
