import { z } from "zod";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const requiredImage = z
  .instanceof(File)
  .refine((file) => file.size > 0, "Image is required")
  .refine((file) => file.size < MAX_IMAGE_BYTES, "Image must be under 5MB")
  .refine((file) => file.type.startsWith("image/"), "File must be an image");

const optionalImage = z.preprocess(
  (value) => (value instanceof File && value.size === 0 ? undefined : value),
  requiredImage.optional(),
);

const blankToUndefined = (value: unknown) =>
  value === "" || value === null ? undefined : value;

const optionalCount = z.preprocess(
  blankToUndefined,
  z.coerce.number().int("Must be a whole number").min(0).max(50).optional(),
);

const optionalSize = z.preprocess(
  blankToUndefined,
  z.coerce.number().positive("Size must be greater than 0").optional(),
);

export const TITLE_DOCUMENTS = [
  "c_of_o",
  "deed_of_assignment",
  "survey_plan",
  "governors_consent",
  "other",
] as const;

const optionalTitle = z.preprocess(
  blankToUndefined,
  z.enum(TITLE_DOCUMENTS).optional(),
);

// HTML checkboxes submit "on" when ticked and are absent when not.
const checkbox = z.preprocess((value) => value === "on" || value === true, z.boolean());

const propertyFields = {
  description: z.string().trim().min(1, "Description is required"),
  location: z.string().trim().min(1, "Location is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  type: z.enum(["house", "land"]),
  listingStatus: z.enum(["for_sale", "for_rent"]),
  bedrooms: optionalCount,
  bathrooms: optionalCount,
  landSizeSqm: optionalSize,
  titleDocument: optionalTitle,
  priceNegotiable: checkbox,
  isPublished: checkbox,
};

export const createPropertySchema = z.object({
  ...propertyFields,
  frontViewImage: requiredImage,
  sideViewImage: requiredImage,
  backViewImage: requiredImage,
});

export const updatePropertySchema = z.object({
  ...propertyFields,
  frontViewImage: optionalImage,
  sideViewImage: optionalImage,
  backViewImage: optionalImage,
});

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>;
