import { describe, expect, it } from "vitest";
import { createPostSchema, updatePostSchema } from "./post";

function makeFile({
  size = 1024,
  type = "image/jpeg",
  name = "cover.jpg",
}: { size?: number; type?: string; name?: string } = {}) {
  return new File([new Uint8Array(size)], name, { type });
}

const baseFields = {
  title: "5 tips for buying land in Ebonyi State",
  body: "<p>Some rich text content.</p>",
  author: "CityScout Realtors",
  category: "normal",
  alt: "A plot of land",
  seoTitle: "Buying land in Ebonyi State — tips",
  meta: "What to check before you buy land in Ebonyi State.",
};

describe("createPostSchema", () => {
  it("accepts valid input with an image", () => {
    const result = createPostSchema.safeParse({
      ...baseFields,
      image: makeFile(),
    });
    expect(result.success).toBe(true);
  });

  it("rejects a missing title", () => {
    const result = createPostSchema.safeParse({
      ...baseFields,
      title: "",
      image: makeFile(),
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid category", () => {
    const result = createPostSchema.safeParse({
      ...baseFields,
      category: "breaking-news",
      image: makeFile(),
    });
    expect(result.success).toBe(false);
  });

  it("rejects a missing image", () => {
    const result = createPostSchema.safeParse(baseFields);
    expect(result.success).toBe(false);
  });
});

describe("updatePostSchema", () => {
  it("treats an empty (untouched) file input as no change", () => {
    const result = updatePostSchema.safeParse({
      ...baseFields,
      image: makeFile({ size: 0 }),
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.image).toBeUndefined();
    }
  });

  it("accepts a genuine replacement image", () => {
    const result = updatePostSchema.safeParse({
      ...baseFields,
      image: makeFile(),
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.image).toBeInstanceOf(File);
    }
  });
});
