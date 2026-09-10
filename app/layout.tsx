import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CityScout Realtors",
    template: "%s | CityScout Realtors",
  },
  description:
    "CityScout Realtors helps you find properties for sale in Abakaliki, Ebonyi State.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
