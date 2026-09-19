import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How CityScout Realtors collects, uses and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: 19 September 2026
      </p>

      <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
        <p>
          {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a real
          estate agency in Abakaliki, Ebonyi State, Nigeria. This policy
          explains what personal data we collect through this website and how
          we handle it, in line with the Nigeria Data Protection Act 2023.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Enquiries.</strong> If you use the contact form we collect
            your name, phone number, optional email address and your message.
          </li>
          <li>
            <strong>WhatsApp, phone and email.</strong> If you contact us
            through WhatsApp, a phone call or email, those services process
            your details under their own policies, and we keep the messages
            needed to respond to you.
          </li>
          <li>
            <strong>Usage data.</strong> We use Vercel Web Analytics to count
            visits and see which pages are popular. It does not use cookies to
            track you across websites.
          </li>
          <li>
            <strong>Staff accounts.</strong> Our team signs in to an admin area
            to manage listings. Sign-in is handled by Supabase.
          </li>
        </ul>

        <h2>How we use it</h2>
        <p>
          We use your details to reply to your enquiry, arrange property
          inspections, and improve this website. We do not sell your personal
          data.
        </p>

        <h2>Who processes it for us</h2>
        <p>
          We rely on trusted providers to run the site: Vercel (hosting and
          analytics), Supabase (database and file storage), and EmailJS
          (delivering contact-form messages to our inbox). The contact page
          embeds a Google Map, and Google may set its own cookies when it
          loads.
        </p>

        <h2>How long we keep it</h2>
        <p>
          We keep enquiry details only as long as needed to deal with your
          request and any resulting transaction, or as the law requires.
        </p>

        <h2>Your rights</h2>
        <p>
          You may ask to access, correct or delete the personal data we hold
          about you, or withdraw consent, by contacting us at{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. You
          also have the right to complain to the Nigeria Data Protection
          Commission.
        </p>

        <h2>Contact</h2>
        <p>
          {siteConfig.name}, {siteConfig.address}. Phone:{" "}
          {siteConfig.phoneDisplay}.
        </p>
      </div>
    </div>
  );
}
