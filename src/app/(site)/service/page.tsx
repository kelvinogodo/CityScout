import type { Metadata } from "next";
import { TrendingUp, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Service",
  description:
    "Property brokerage and real estate development services from CityScout Realtors in Ebonyi State, Nigeria.",
};

const services = [
  {
    icon: TrendingUp,
    title: "Property brokerage",
    text: "Acquiring the right property can be daunting. Our goal is to take that stress off your shoulders and help you find the best property to meet your investment target.",
  },
  {
    icon: Building2,
    title: "Real estate development",
    text: "Property development becomes easier with professionals. We have a team of architects, surveyors, and engineers who drive quality development of your lands and buildings for higher economic value.",
  },
];

export default function ServicePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold">Our services</h1>
      <p className="mt-2 text-muted-foreground">
        Real estate brokerage and development for Ebonyi State, Nigeria.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {services.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-lg border border-border bg-surface p-6"
          >
            <Icon className="h-8 w-8 text-accent" />
            <h2 className="mt-4 text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
