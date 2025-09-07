import { describe, expect, it, vi } from "vitest";

import { formatPhoneKR } from "@shared/lib/formatters";

vi.unmock("@shared/lib/formatters");

describe("formatPhoneKR", () => {
  it("should format Korean phone numbers correctly", () => {
    // 02 numbers
    expect(formatPhoneKR("02")).toBe("02");
    expect(formatPhoneKR("02123")).toBe("02-123");
    expect(formatPhoneKR("021234567")).toBe("02-123-4567");
    expect(formatPhoneKR("02123456789")).toBe("02-1234-5678");

    // Other area codes
    expect(formatPhoneKR("031")).toBe("031");
    expect(formatPhoneKR("0312345")).toBe("031-2345");
    expect(formatPhoneKR("0312345678")).toBe("031-234-5678");

    // mobile numbers
    expect(formatPhoneKR("010")).toBe("010");
    expect(formatPhoneKR("0101234")).toBe("010-1234");
    expect(formatPhoneKR("01012345678")).toBe("010-1234-5678");

    // with non-digit characters
    expect(formatPhoneKR("010-1234-5678")).toBe("010-1234-5678");
    expect(formatPhoneKR("(02) 1234-5678")).toBe("02-1234-5678");
    expect(formatPhoneKR("031.234.5678")).toBe("031-234-5678");

    expect(formatPhoneKR("")).toBe("");
  });
});
