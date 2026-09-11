import { describe, expect, it } from "vitest";
import { createPropertySchema, updatePropertySchema } from "./property";

function makeFile({
  size = 1024,
  type = "image/jpeg",
  name = "photo.jpg",
}: { size?: number; type?: string; name?: string } = {}) {
  const file = new File([new Uint8Array(size)], name, { type });
  return file;
}

const baseFields = {
  description: "A lovely 3-bedroom bungalow",
  location: "Abakaliki, Ebonyi State",
  price: "5000000",
  type: "house",
};

describe("createPropertySchema", () => {
  it("accepts valid input with three images", () => {
    const result = createPropertySchema.safeParse({
      ...baseFields,
      frontViewImage: makeFile(),
      sideViewImage: makeFile(),
      backViewImage: makeFile(),
    });
    expect(result.success).toBe(true);
  });

  it("rejects a missing description", () => {
    const result = createPropertySchema.safeParse({
      ...baseFields,
      description: "",
      frontViewImage: makeFile(),
      sideViewImage: makeFile(),
      backViewImage: makeFile(),
    });
    expect(result.success).toBe(false);
  });

  it("rejects a negative price", () => {
    const result = createPropertySchema.safeParse({
      ...baseFields,
      price: "-100",
      frontViewImage: makeFile(),
      sideViewImage: makeFile(),
      backViewImage: makeFile(),
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid property type", () => {
    const result = createPropertySchema.safeParse({
      ...baseFields,
      type: "apartment",
      frontViewImage: makeFile(),
      sideViewImage: makeFile(),
      backViewImage: makeFile(),
    });
    expect(result.success).toBe(false);
  });

  it("rejects a non-image file", () => {
    const result = createPropertySchema.safeParse({
      ...baseFields,
      frontViewImage: makeFile({ type: "application/pdf", name: "doc.pdf" }),
      sideViewImage: makeFile(),
      backViewImage: makeFile(),
    });
    expect(result.success).toBe(false);
  });

  it("rejects an image over 5MB", () => {
    const result = createPropertySchema.safeParse({
      ...baseFields,
      frontViewImage: makeFile({ size: 6 * 1024 * 1024 }),
      sideViewImage: makeFile(),
      backViewImage: makeFile(),
    });
    expect(result.success).toBe(false);
  });

  it("rejects a missing image", () => {
    const result = createPropertySchema.safeParse({
      ...baseFields,
      sideViewImage: makeFile(),
      backViewImage: makeFile(),
    });
    expect(result.success).toBe(false);
  });
});

describe("updatePropertySchema", () => {
  it("treats an empty (untouched) file input as no change", () => {
    const result = updatePropertySchema.safeParse({
      ...baseFields,
      frontViewImage: makeFile({ size: 0 }),
      sideViewImage: makeFile({ size: 0 }),
      backViewImage: makeFile({ size: 0 }),
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.frontViewImage).toBeUndefined();
    }
  });

  it("accepts a genuine replacement image", () => {
    const result = updatePropertySchema.safeParse({
      ...baseFields,
      frontViewImage: makeFile(),
      sideViewImage: makeFile({ size: 0 }),
      backViewImage: makeFile({ size: 0 }),
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.frontViewImage).toBeInstanceOf(File);
    }
  });

  it("still requires the text fields", () => {
    const result = updatePropertySchema.safeParse({
      ...baseFields,
      location: "",
      frontViewImage: makeFile({ size: 0 }),
      sideViewImage: makeFile({ size: 0 }),
      backViewImage: makeFile({ size: 0 }),
    });
    expect(result.success).toBe(false);
  });
});
