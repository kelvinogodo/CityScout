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

const postFields = {
  title: z.string().trim().min(1, "Title is required"),
  body: z.string().trim().min(1, "Post body is required"),
  author: z.string().trim().min(1, "Author is required"),
  category: z.enum(["normal", "featured"]),
  alt: z.string().trim().min(1, "Image alt text is required"),
  seoTitle: z.string().trim().min(1, "SEO title is required"),
  meta: z.string().trim().min(1, "Meta description is required"),
};

export const createPostSchema = z.object({
  ...postFields,
  image: requiredImage,
});

export const updatePostSchema = z.object({
  ...postFields,
  image: optionalImage,
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
