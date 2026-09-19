// Hand-written to match supabase/migrations/0001..0003. Shaped the same way
// `supabase gen types typescript` would generate it, so swapping in the real
// generated file later is a drop-in replacement.

export type ListingStatus = "for_sale" | "for_rent";

export type TitleDocument =
  | "c_of_o"
  | "deed_of_assignment"
  | "survey_plan"
  | "governors_consent"
  | "other";

export type PropertyRow = {
  id: string;
  slug: string;
  description: string;
  location: string;
  price: number;
  type: "house" | "land";
  front_view_image: string;
  side_view_image: string;
  back_view_image: string;
  listing_status: ListingStatus;
  bedrooms: number | null;
  bathrooms: number | null;
  land_size_sqm: number | null;
  title_document: TitleDocument | null;
  price_negotiable: boolean;
  is_published: boolean;
  is_sample: boolean;
  created_at: string;
  updated_at: string;
};

type PropertyDefaulted =
  | "id"
  | "created_at"
  | "updated_at"
  | "listing_status"
  | "bedrooms"
  | "bathrooms"
  | "land_size_sqm"
  | "title_document"
  | "price_negotiable"
  | "is_published"
  | "is_sample";

export type PropertyInsert = Omit<PropertyRow, PropertyDefaulted> &
  Partial<Pick<PropertyRow, PropertyDefaulted>>;

export type PropertyUpdate = Partial<PropertyInsert>;

export type PostRow = {
  id: string;
  slug: string;
  title: string;
  body: string;
  image: string;
  author: string;
  category: "normal" | "featured";
  alt: string;
  seo_title: string;
  meta: string;
  is_published: boolean;
  is_sample: boolean;
  created_at: string;
  updated_at: string;
};

type PostDefaulted =
  | "id"
  | "created_at"
  | "updated_at"
  | "is_published"
  | "is_sample";

export type PostInsert = Omit<PostRow, PostDefaulted> &
  Partial<Pick<PostRow, PostDefaulted>>;

export type PostUpdate = Partial<PostInsert>;

export type Database = {
  public: {
    Tables: {
      properties: {
        Row: PropertyRow;
        Insert: PropertyInsert;
        Update: PropertyUpdate;
        Relationships: [];
      };
      posts: {
        Row: PostRow;
        Insert: PostInsert;
        Update: PostUpdate;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
