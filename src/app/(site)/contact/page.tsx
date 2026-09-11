import type { Metadata } from "next";
import { MapPin, Phone, Mail, AtSign, ExternalLink } from "lucide-react";
import { ContactForm } from "@/components/site/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact CityScout Realtors.",
};

const contactDetails = [
  {
    icon: MapPin,
    label: "No. 22 Old Enugu Road, Abakaliki, Ebonyi State",
    href: undefined,
  },
  {
    icon: Phone,
    label: "+234 810 467 3484",
    href: "tel:+2348104673484",
  },
  {
    icon: Mail,
    label: "cityscoutrealtors@gmail.com",
    href: "mailto:cityscoutrealtors@gmail.com",
  },
  {
    icon: AtSign,
    label: "@cityscoutrealtors on Instagram",
    href: "https://www.instagram.com/cityscoutrealtors/",
  },
  {
    icon: ExternalLink,
    label: "CityScout Realtors on Facebook",
    href: "https://web.facebook.com/profile.php?id=100086289660325",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold">Get in touch</h1>
      <p className="mt-2 text-muted-foreground">
        Have a question about a property or our services? Send us a message.
      </p>

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
