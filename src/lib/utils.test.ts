import { describe, expect, it } from "vitest";
import { cn, formatPrice, shortLocation, slugify } from "./utils";

describe("shortLocation", () => {
  it("keeps the first two parts by default", () => {
    expect(shortLocation("Old Enugu Road, Abakaliki, Ebonyi State")).toBe(
      "Old Enugu Road, Abakaliki",
    );
  });

  it("leaves short locations alone and ignores stray commas", () => {
    expect(shortLocation("Ishielu")).toBe("Ishielu");
    expect(shortLocation(" , Ishielu, , Ebonyi ")).toBe("Ishielu, Ebonyi");
  });
});

describe("cn", () => {
  it("merges class names and resolves Tailwind conflicts", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("drops falsy values", () => {
    expect(cn("a", false && "b", undefined, "c")).toBe("a c");
  });
});

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Abakaliki, Ebonyi State")).toBe("abakaliki-ebonyi-state");
  });

  it("trims leading/trailing hyphens from stray punctuation", () => {
    expect(slugify("--Hello World!--")).toBe("hello-world");
  });
});

describe("formatPrice", () => {
  it("formats as whole-number Naira currency", () => {
    expect(formatPrice(5000000)).toBe("₦5,000,000");
  });

  it("handles zero", () => {
    expect(formatPrice(0)).toBe("₦0");
  });
});
