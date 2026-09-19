"use client";

import { MessageCircle, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export function FooterCta() {
  const pathname = usePathname();

  // The contact page already leads with these same actions.
  if (pathname === "/contact") return null;

  return (
    <div className="flex flex-col gap-8 border-b border-white/10 py-16 md:flex-row md:items-center md:justify-between">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Ready to find your next property?
        </h2>
        <p className="mt-3 text-primary-foreground/60">
          Tell us what you&apos;re looking for and we&apos;ll get back to you
          with options that fit.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a
          href={whatsappLink(
            "Hello CityScout Realtors, I'd like to make an enquiry.",
          )}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-semibold text-black transition-opacity hover:opacity-90"
        >
          <MessageCircle className="h-4 w-4" />
          Chat on WhatsApp
        </a>
        <a
          href={`tel:${siteConfig.phone}`}
          className="inline-flex h-12 items-center gap-2 rounded-full border border-white/25 px-6 text-sm font-semibold transition-colors hover:bg-white/10"
        >
          <Phone className="h-4 w-4" />
          Call us
        </a>
      </div>
    </div>
  );
}
