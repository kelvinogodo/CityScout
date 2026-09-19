import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/site-config";

const headingClass =
  "text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/50";
const linkClass =
  "text-sm text-primary-foreground/80 transition-colors hover:text-[hsl(38_92%_55%)]";

const explore = [
  { href: "/properties", label: "Properties" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/service", label: "Service" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 border-b border-white/10 py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Ready to find your next property?
            </h2>
            <p className="mt-3 text-primary-foreground/60">
              Tell us what you&apos;re looking for and we&apos;ll get back to
              you with options that fit.
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

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                <Image
                  src="/logo-mark.png"
                  alt=""
                  width={30}
                  height={31}
                  className="h-8 w-auto"
                />
              </span>
              <span className="text-xl font-semibold tracking-tight">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/60">
              Helping people find, and buy, legal properties across Ebonyi
              State, with clear guidance at every step.
            </p>
            <p className="mt-6 text-sm text-primary-foreground/60">
              {siteConfig.address}
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className={headingClass}>Explore</h3>
            <ul className="mt-5 space-y-3">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className={headingClass}>Get in touch</h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className={linkClass}
                >
                  WhatsApp {siteConfig.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phone}`} className={linkClass}>
                  Call {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className={headingClass}>Follow</h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className={linkClass}
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className={linkClass}
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-primary-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <p className="hidden sm:block">
            In partnership with Tansian Geospatial Consult and Beloved Global
            Concept Developers
          </p>
          <p className="flex gap-5">
            <Link href="/privacy" className="hover:text-primary-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-primary-foreground">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
