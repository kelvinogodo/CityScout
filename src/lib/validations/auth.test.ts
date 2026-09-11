import { describe, expect, it } from "vitest";
import { loginSchema } from "./auth";

describe("loginSchema", () => {
  it("accepts a valid email and non-empty password", () => {
    const result = loginSchema.safeParse({
      email: "admin@cityscoutrealtors.com",
      password: "hunter2",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "hunter2",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an empty password", () => {
    const result = loginSchema.safeParse({
      email: "admin@cityscoutrealtors.com",
      password: "",
    });
    expect(result.success).toBe(false);
  });
});
