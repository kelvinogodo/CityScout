import type { Metadata } from "next";
import Image from "next/image";
import { Lightbulb, ShieldCheck, Users, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "City Scout Realtors is a reliable property agency based in Abakaliki.",
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

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-semibold">About CityScout Realtors</h1>
          <div className="mt-2 h-1 w-16 bg-accent" />
          <p className="mt-4 leading-relaxed text-muted-foreground">
            CityScout Realtors is a property agent based in Abakaliki. Our
            focus is to help people find and buy legal properties — whether
            buildings or land — in the state. We are also committed to
            delivering quality property development services.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            The team is made up of experienced and young professionals with a
            taste for innovation and quality property brokerage.
          </p>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-lg bg-surface p-8">
          <Image
            src="/cityScoutlogo.png"
            alt="CityScout Realtors logo"
            fill
            className="object-contain p-8"
          />
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">What we stand for</h2>
        <div className="mt-2 h-1 w-16 bg-accent" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {values.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <Icon className="h-6 w-6 text-accent" />
              <h3 className="mt-3 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold">Our Vision</h2>
          <p className="mt-2 text-muted-foreground">
            To easily connect real estate investors to the right properties in
            Ebonyi State and drive seamless acquisition.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold">Our Mission</h2>
          <p className="mt-2 text-muted-foreground">
            To unlock the full potential of real estate in the region through
            technology and innovation.
          </p>
        </div>
      </section>
    </div>
  );
}
