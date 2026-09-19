import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { JsonLd } from "@/components/json-ld";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: { icon: "/favicon.jpg" },
  verification: {
    google: "86z9OJ5FVPHC2yFxjeOv3bVreQDTlY3O73ERR0TJqyc",
  },
  // Social preview images come from src/app/opengraph-image.tsx.
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

const agencyJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/cityScoutlogo.png`,
  description: siteConfig.description,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "No. 22 Old Enugu Road",
    addressLocality: "Abakaliki",
    addressRegion: "Ebonyi State",
    addressCountry: "NG",
  },
  areaServed: { "@type": "State", name: "Ebonyi State" },
  sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen font-sans antialiased">
        <JsonLd data={agencyJsonLd} />
        <Providers>{children}</Providers>
        <Toaster position="top-right" />
        <Analytics />
      </body>
    </html>
  );
}
