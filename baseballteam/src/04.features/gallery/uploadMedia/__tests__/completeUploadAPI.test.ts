import { describe, expect, it, vi } from "vitest";

import { completeUpload } from "../api/complete";
import * as AxiosAPI from "@shared/lib/axios";

describe("completeUpload", () => {
  vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "post").mockResolvedValue({
    status: 200,
    data: {},
  });

  it("should return true when the API call is successful", async () => {
    const result = await completeUpload(
      1,
      [1, 2],
      [
        { key: "file1.jpg", original_filename: "file1.jpg" },
        { key: "file2.jpg", original_filename: "file2.jpg" },
      ]
    );
    expect(result).toBe(true);
  });

  it("should return false when the API call fails", async () => {
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "post").mockRejectedValueOnce(
      new Error("Network Error")
    );

    const result = await completeUpload(
      1,
      [1, 2],
      [
        { key: "file1.jpg", original_filename: "file1.jpg" },
        { key: "file2.jpg", original_filename: "file2.jpg" },
      ]
    );
    expect(result).toBe(false);
  });
});
