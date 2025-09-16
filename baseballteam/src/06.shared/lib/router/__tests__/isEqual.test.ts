import { describe, expect, it, vi } from "vitest";

import { isEqual } from "@shared/lib/router";

vi.unmock("@shared/lib/router");

describe("isEqual", () => {
  const sampleLocation = {
    key: "abc123",
    pathname: "/home",
    search: "?query=1",
    hash: "#section1",
    state: null,
  };

  it("should return true if locations are equal", () => {
    const result = isEqual(sampleLocation, sampleLocation);
    expect(result).toBe(true);
  });

  it("should return true if pathname, search, and hash are equal but keys are different", () => {
    const locationA = { ...sampleLocation, key: "key1" };
    const locationB = { ...sampleLocation, key: "key2" };
    const result = isEqual(locationA, locationB);
    expect(result).toBe(true);
  });

  it("should return false if pathname is different", () => {
    const locationA = { ...sampleLocation, pathname: "/home" };
    const locationB = { ...sampleLocation, pathname: "/about" };
    const result = isEqual(locationA, locationB);
    expect(result).toBe(false);
  });
});
