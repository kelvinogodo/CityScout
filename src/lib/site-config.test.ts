import { describe, expect, it } from "vitest";
import { siteConfig, whatsappLink } from "./site-config";

describe("whatsappLink", () => {
  it("uses the international number with no plus or leading zero", () => {
    expect(siteConfig.whatsapp).toBe("2347042244539");
    expect(whatsappLink()).toBe("https://wa.me/2347042244539");
  });

  it("url-encodes a prefilled message", () => {
    expect(whatsappLink("Hi & hello?")).toBe(
      "https://wa.me/2347042244539?text=Hi%20%26%20hello%3F",
    );
  });
});
