import { describe, expect, it, vi } from "vitest";

import { toPresignRequestFile } from "@shared/lib/storage";

vi.unmock("@shared/lib/storage");

describe("toPresignRequestFile", () => {
  it("should convert File to PresignRequestFile", () => {
    const file = new File(["file content"], "example.png", {
      type: "image/png",
      lastModified: 0,
    });

    const result = toPresignRequestFile(file);

    expect(result).toEqual({
      filename: "example.png",
      content_type: "image/png",
      size: file.size,
    });
  });
});
