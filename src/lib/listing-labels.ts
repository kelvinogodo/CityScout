import type {
  ListingStatus,
  TitleDocument,
} from "@/lib/supabase/database.types";

export const LISTING_STATUS_LABELS: Record<ListingStatus, string> = {
  for_sale: "For sale",
  for_rent: "For rent",
};

export const TITLE_DOCUMENT_LABELS: Record<TitleDocument, string> = {
  c_of_o: "Certificate of Occupancy (C of O)",
  deed_of_assignment: "Deed of Assignment",
  survey_plan: "Survey plan",
  governors_consent: "Governor's Consent",
  other: "Other title documents",
};
