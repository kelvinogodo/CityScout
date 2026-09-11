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

const propertyFields = {
  description: z.string().trim().min(1, "Description is required"),
  location: z.string().trim().min(1, "Location is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  type: z.enum(["house", "land"]),
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
