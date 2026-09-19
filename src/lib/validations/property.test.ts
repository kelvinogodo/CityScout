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
  listingStatus: "for_sale",
  bedrooms: "",
  bathrooms: "",
  landSizeSqm: "",
  titleDocument: "",
  priceNegotiable: null,
  isPublished: "on",
};

describe("listing detail fields", () => {
  const images = {
    frontViewImage: makeFile(),
    sideViewImage: makeFile(),
    backViewImage: makeFile(),
  };

  it("treats blank optional fields as not provided", () => {
    const result = createPropertySchema.safeParse({ ...baseFields, ...images });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.bedrooms).toBeUndefined();
      expect(result.data.landSizeSqm).toBeUndefined();
      expect(result.data.titleDocument).toBeUndefined();
      expect(result.data.priceNegotiable).toBe(false);
    }
  });

  it("parses numeric details from form strings", () => {
    const result = createPropertySchema.safeParse({
      ...baseFields,
      ...images,
      bedrooms: "4",
      bathrooms: "3",
      landSizeSqm: "648.5",
      titleDocument: "c_of_o",
      priceNegotiable: "on",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.bedrooms).toBe(4);
      expect(result.data.landSizeSqm).toBe(648.5);
      expect(result.data.titleDocument).toBe("c_of_o");
      expect(result.data.priceNegotiable).toBe(true);
    }
  });

  it("treats an unticked published checkbox as a draft", () => {
    const result = createPropertySchema.safeParse({
      ...baseFields,
      ...images,
      isPublished: null,
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.isPublished).toBe(false);
  });

  it("rejects an unknown title document", () => {
    const result = createPropertySchema.safeParse({
      ...baseFields,
      ...images,
      titleDocument: "receipt",
    });
    expect(result.success).toBe(false);
  });

  it("rejects negative bedrooms and a zero land size", () => {
    expect(
      createPropertySchema.safeParse({ ...baseFields, ...images, bedrooms: "-1" })
        .success,
    ).toBe(false);
    expect(
      createPropertySchema.safeParse({ ...baseFields, ...images, landSizeSqm: "0" })
        .success,
    ).toBe(false);
  });

  it("rejects an invalid listing status", () => {
    const result = createPropertySchema.safeParse({
      ...baseFields,
      ...images,
      listingStatus: "sold",
    });
    expect(result.success).toBe(false);
  });
});

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
