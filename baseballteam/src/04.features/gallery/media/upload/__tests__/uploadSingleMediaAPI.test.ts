import { beforeEach, describe, expect, it, vi } from "vitest";

import { uploadSingleMedia } from "../api/uploadSingleMedia";
import * as AxiosAPI from "@shared/lib/axios";
import * as StorageAPI from "@shared/lib/storage";

describe("uploadSingleMedia", () => {
  const testData = {
    albumID: 1,
    file: new File(["content"], "test1.jpg", { type: "image/jpeg" }),
    onProgress: vi.fn(),
  };

  beforeEach(() => {
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "post").mockResolvedValue({
      data: {
        url: "https://s3.mockedurl.com/upload",
        fields: { key: "mocked-key" },
      },
    });
  });

  it("should handle progress successfully", async () => {
    vi.spyOn(StorageAPI, "uploadToS3").mockImplementation(async (params) => {
      // Simulate progress updates
      for (let p = 0; p <= 100; p += 20) {
        params.onProgress?.(p);
        await new Promise((r) => setTimeout(r, 10)); // simulate async delay
      }
    });

    const result = await uploadSingleMedia(
      testData.albumID,
      testData.file,
      testData.onProgress
    );
    expect(result?.data.key).toBe("mocked-key");
    expect(result?.data.original_filename).toBe("test1.jpg");
    expect(result?.status).toBe("SUCCESS");
    expect(testData.onProgress).toHaveBeenCalled();
  });

  it("should fail s3 upload", async () => {
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "post").mockResolvedValue({});
    vi.spyOn(StorageAPI, "uploadToS3").mockRejectedValue(
      new Error("Failed to upload to S3")
    );

    const result = await uploadSingleMedia(
      testData.albumID,
      testData.file,
      testData.onProgress
    );
    expect(result).toBe(null);
    expect(testData.onProgress).toHaveBeenCalledWith(0);
  });
});
