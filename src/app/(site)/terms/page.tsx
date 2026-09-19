import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that apply when you use the CityScout Realtors website.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold">Terms of Use</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: 19 September 2026
      </p>

      <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
        <p>
          By using this website you agree to these terms. If you do not agree,
          please do not use the site.
        </p>

        <h2>Listings are for information</h2>
        <p>
          Property details, prices and photographs on this site are provided in
          good faith but are indicative only. Availability and price can change
          without notice. Nothing here is an offer or a contract. A sale or
          rental exists only under a written agreement signed by the parties.
        </p>

        <h2>Do your own checks</h2>
        <p>
          Before paying for any property, inspect it in person and verify the
          title documents, survey plan and ownership independently, ideally
          with your own lawyer and surveyor.
        </p>

        <h2>Sample content</h2>
        <p>
          Any listing or article marked &ldquo;Sample&rdquo; is shown for
          illustration only and is not a property or advice currently on offer.
        </p>

        <h2>Our role</h2>
        <p>
          {siteConfig.name} acts as an agent. We are not responsible for the
          accuracy of information supplied by property owners beyond the steps
          we reasonably take to check it.
        </p>

        <h2>Intellectual property</h2>
        <p>
          The site design, text and our own photographs belong to{" "}
          {siteConfig.name}. Some illustrative images are licensed stock
          photographs. Please do not copy or reuse our content without
          permission.
        </p>

        <h2>Liability</h2>
        <p>
          To the extent the law allows, we are not liable for loss arising from
          reliance on information on this site or from interruptions to it.
        </p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of the Federal Republic of Nigeria.</p>

        <h2>Contact</h2>
        <p>
          Questions about these terms:{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </div>
    </div>
  );
}
