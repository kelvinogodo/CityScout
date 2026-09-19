"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/supabase/storage";
import type { PropertyUpdate } from "@/lib/supabase/database.types";
import { slugify } from "@/lib/utils";
import {
  createPropertySchema,
  updatePropertySchema,
  type UpdatePropertyInput,
} from "@/lib/validations/property";

export type ActionState = { error?: string } | undefined;

function readPropertyFormData(formData: FormData) {
  return {
    description: formData.get("description"),
    location: formData.get("location"),
    price: formData.get("price"),
    type: formData.get("type"),
    listingStatus: formData.get("listingStatus"),
    bedrooms: formData.get("bedrooms"),
    bathrooms: formData.get("bathrooms"),
    landSizeSqm: formData.get("landSizeSqm"),
    titleDocument: formData.get("titleDocument"),
    priceNegotiable: formData.get("priceNegotiable"),
    isPublished: formData.get("isPublished"),
    frontViewImage: formData.get("frontViewImage"),
    sideViewImage: formData.get("sideViewImage"),
    backViewImage: formData.get("backViewImage"),
  };
}

type TextFields = Omit<
  UpdatePropertyInput,
  "frontViewImage" | "sideViewImage" | "backViewImage"
>;

function toColumns(data: TextFields) {
  return {
    description: data.description,
    location: data.location,
    price: data.price,
    type: data.type,
    listing_status: data.listingStatus,
    bedrooms: data.bedrooms ?? null,
    bathrooms: data.bathrooms ?? null,
    land_size_sqm: data.landSizeSqm ?? null,
    title_document: data.titleDocument ?? null,
    price_negotiable: data.priceNegotiable,
    is_published: data.isPublished,
  };
}

export async function createProperty(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireUser();

  const parsed = createPropertySchema.safeParse(
    readPropertyFormData(formData),
  );
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { frontViewImage, sideViewImage, backViewImage, ...rest } =
    parsed.data;

  const [frontUrl, sideUrl, backUrl] = await Promise.all([
    uploadImage("property-images", frontViewImage),
    uploadImage("property-images", sideViewImage),
    uploadImage("property-images", backViewImage),
  ]);

  const supabase = await createClient();
  const slug = `${slugify(rest.location)}-${Date.now().toString(36)}`;

  const { error } = await supabase.from("properties").insert({
    ...toColumns(rest),
    slug,
    front_view_image: frontUrl,
    side_view_image: sideUrl,
    back_view_image: backUrl,
  });

  if (error) {
    return {
      error:
        "Failed to create property. If this keeps happening, make sure the latest database migrations have been run.",
    };
  }

  revalidatePath("/admin/properties");
  revalidatePath("/properties");
  revalidatePath("/");
  redirect("/admin/properties");
}

export async function updateProperty(
  id: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireUser();

  const parsed = updatePropertySchema.safeParse(
    readPropertyFormData(formData),
  );
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { frontViewImage, sideViewImage, backViewImage, ...rest } =
    parsed.data;

  const updates: PropertyUpdate = toColumns(rest);
  if (frontViewImage) {
    updates.front_view_image = await uploadImage(
      "property-images",
      frontViewImage,
    );
  }
  if (sideViewImage) {
    updates.side_view_image = await uploadImage(
      "property-images",
      sideViewImage,
    );
  }
  if (backViewImage) {
    updates.back_view_image = await uploadImage(
      "property-images",
      backViewImage,
    );
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("properties")
    .update(updates)
    .eq("id", id);

  if (error) {
    return {
      error:
        "Failed to update property. If this keeps happening, make sure the latest database migrations have been run.",
    };
  }

  revalidatePath("/admin/properties");
  revalidatePath("/properties");
  revalidatePath("/");
  redirect("/admin/properties");
}

export async function deleteProperty(id: string) {
  await requireUser();

  const supabase = await createClient();
  const { error } = await supabase.from("properties").delete().eq("id", id);

  if (error) {
    throw new Error("Failed to delete property.");
  }

  revalidatePath("/admin/properties");
  revalidatePath("/properties");
  revalidatePath("/");
}
