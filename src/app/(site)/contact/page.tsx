import type { Metadata } from "next";
import {
  ArrowUpRight,
  AtSign,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ContactForm } from "@/components/site/contact-form";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact CityScout Realtors by WhatsApp, phone, email or message.",
};

const channels: {
  icon: LucideIcon;
  label: string;
  value: string;
  note: string;
  href: string;
  external?: boolean;
  featured?: boolean;
}[] = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: siteConfig.whatsappDisplay,
    note: "Fastest response",
    href: whatsappLink("Hello CityScout Realtors, I'd like to make an enquiry."),
    external: true,
    featured: true,
  },
  {
    icon: Phone,
    label: "Call us",
    value: siteConfig.phoneDisplay,
    note: "Speak to our team",
    href: `tel:${siteConfig.phone}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    note: "For detailed enquiries",
    href: `mailto:${siteConfig.email}`,
  },
];

const directionsHref =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Old Enugu Road, Abakaliki, Ebonyi State, Nigeria");

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your next property"
        description="Tell us what you're looking for. We'll help you find it, inspect it, and complete the purchase properly."
        image="/images/hero/abuja-hillside.jpg"
        overlap
      />

      <div className="relative z-10 mx-auto -mt-20 max-w-6xl px-4 sm:-mt-24 sm:px-6">
        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {channels.map(
            ({ icon: Icon, label, value, note, href, external, featured }) => (
              <RevealItem key={label}>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-border bg-background p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={
                        featured
                          ? "flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-black"
                          : "flex h-12 w-12 items-center justify-center rounded-full bg-muted text-foreground"
                      }
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {label} · {note}
                    </p>
                    <p className="mt-2 break-words text-lg font-semibold">
                      {value}
                    </p>
                  </div>
                </a>
              </RevealItem>
            ),
          )}
        </RevealGroup>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <h2 className="text-3xl font-semibold">Send us a message</h2>
            <p className="mt-2 text-muted-foreground">
              Prefer to write? Fill in the form and we&apos;ll get back to you
              as soon as we can.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <h2 className="text-3xl font-semibold">Visit our office</h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border shadow-sm">
              <iframe
                title="CityScout Realtors location"
                src="https://maps.google.com/maps?q=Old%20Enugu%20Road%2C%20Abakaliki%2C%20Ebonyi%20State%2C%20Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="h-[280px] w-full"
                loading="lazy"
              />
              <div className="space-y-4 bg-surface p-6">
                <p className="flex items-start gap-3 text-sm">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  {siteConfig.address}
                </p>
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                >
                  <Navigation className="h-4 w-4" />
                  Get directions
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                <AtSign className="h-4 w-4" />
                Instagram
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                <ExternalLink className="h-4 w-4" />
                Facebook
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
