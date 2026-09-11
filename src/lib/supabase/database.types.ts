// Hand-written to match supabase/migrations/0001_init.sql. Shaped the same
// way `supabase gen types typescript` would generate it, so swapping in the
// real generated file later is a drop-in replacement.

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
  created_at: string;
  updated_at: string;
};

export type PropertyInsert = Omit<
  PropertyRow,
  "id" | "created_at" | "updated_at"
> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

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
  created_at: string;
  updated_at: string;
};

export type PostInsert = Omit<PostRow, "id" | "created_at" | "updated_at"> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

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
