import { describe, expect, it, vi } from "vitest";

import { isTokenValid } from "@shared/lib/auth";

vi.unmock("@shared/lib/auth");

vi.mock("jwt-decode", () => ({
  jwtDecode: (token: string) => {
    if (token === "invalid.token.string") {
      throw new Error("Invalid token");
    } else if (token === "expired.token.string") {
      return { exp: Date.now() / 1000 - 60 };
    } else {
      return { exp: Date.now() / 1000 + 60 };
    }
  },
}));

describe("isTokenValid", () => {
  it("should return false if no token is found", () => {
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);

    expect(isTokenValid()).toBe(false);
  });

  it("should return false for an invalid token", () => {
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue("invalid.token.string");

    expect(isTokenValid()).toBe(false);
  });

  it("should return false for an expired token", () => {
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue("expired.token.string");

    expect(isTokenValid()).toBe(false);
  });

  it("should return true for a valid token", () => {
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue("valid.token.string");

    expect(isTokenValid()).toBe(true);
  });
});
