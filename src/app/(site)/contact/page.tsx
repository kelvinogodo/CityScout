import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Mail,
  AtSign,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { ContactForm } from "@/components/site/contact-form";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact CityScout Realtors by WhatsApp, phone, email or message.",
};

const contactDetails = [
  { icon: MapPin, label: siteConfig.address, href: undefined },
  {
    icon: Phone,
    label: siteConfig.phoneDisplay,
    href: `tel:${siteConfig.phone}`,
  },
  {
    icon: MessageCircle,
    label: `WhatsApp ${siteConfig.whatsappDisplay}`,
    href: whatsappLink(),
  },
  {
    icon: Mail,
    label: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: AtSign,
    label: "@cityscoutrealtors on Instagram",
    href: siteConfig.social.instagram,
  },
  {
    icon: ExternalLink,
    label: "CityScout Realtors on Facebook",
    href: siteConfig.social.facebook,
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold">Get in touch</h1>
      <p className="mt-2 text-muted-foreground">
        The fastest way to reach us is WhatsApp. You can also call or send a
        message below.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button
          asChild
          className="gap-2 bg-[#25D366] text-black hover:bg-[#25D366]/90"
        >
          <a
            href={whatsappLink(
              "Hello CityScout Realtors, I'd like to make an enquiry.",
            )}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </Button>
        <Button asChild variant="outline" className="gap-2">
          <a href={`tel:${siteConfig.phone}`}>
            <Phone className="h-4 w-4" />
            Call us
          </a>
        </Button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <ContactForm />

        <div className="space-y-6">
          <ul className="space-y-4">
            {contactDetails.map(({ icon: Icon, label, href }) => (
              <li key={label} className="flex items-center gap-3">
                <Icon className="h-5 w-5 shrink-0 text-accent" />
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="text-sm hover:text-accent"
                  >
                    {label}
                  </a>
                ) : (
                  <span className="text-sm">{label}</span>
                )}
              </li>
            ))}
          </ul>

          <div className="overflow-hidden rounded-lg border border-border">
            <iframe
              title="CityScout Realtors location"
              src="https://maps.google.com/maps?q=no%2022%20old%20enugu%20road%20abakaliki%20ebonyi%20state%20nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="h-[300px] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
