import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Company
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
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
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Partners
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Tansian Geospatial Consult</li>
            <li>Beloved Global Concept Developers</li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            We are social
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href="https://web.facebook.com/profile.php?id=100086289660325"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/cityscoutrealtors/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="mailto:cityscoutrealtors@gmail.com"
                className="hover:text-accent"
              >
                Email
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Stay in the loop
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Do not miss any opportunity. Get in touch to stay informed on the
            latest properties, industry trends, and investment tips.
          </p>
        </div>
      </div>

      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} CityScout Realtors. All rights reserved.
      </div>
    </footer>
  );
}
