import Link from "next/link";
import { siteConfig, whatsappLink } from "@/lib/site-config";

const headingClass =
  "text-sm font-semibold uppercase tracking-wide text-muted-foreground";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <h2 className={headingClass}>Company</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/properties" className="hover:text-accent">
                Properties
              </Link>
            </li>
            <li>
              <Link href="/service" className="hover:text-accent">
                Service
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-accent">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-accent">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className={headingClass}>Partners</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Tansian Geospatial Consult</li>
            <li>Beloved Global Concept Developers</li>
          </ul>
        </div>

        <div>
          <h2 className={headingClass}>Reach us</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent"
              >
                WhatsApp {siteConfig.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`tel:${siteConfig.phone}`} className="hover:text-accent">
                Call {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-accent"
              >
                Email
              </a>
            </li>
            <li>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className={headingClass}>Visit us</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            {siteConfig.address}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Message us on WhatsApp to hear about new properties before they go
            public.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-2 border-t border-border px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <p className="flex gap-4">
          <Link href="/privacy" className="hover:text-accent">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-accent">
            Terms
          </Link>
        </p>
      </div>
    </footer>
  );
}
