import { beforeAll, describe, expect, it, vi } from "vitest";
import axios from "axios";

import { uploadToS3 } from "@shared/lib/storage";

vi.unmock("@shared/lib/storage");

describe("uploadToS3", () => {
  const url = "sample-presigned-url";
  const fields = {
    key: "sample-key",
  };
  const mockFile = new File(["(⌐□_□)"], "avatar.png", { type: "image/png" });

  beforeAll(() => {
    vi.spyOn(axios, "post").mockImplementation((_url, _data, config) => {
      const onUploadProgress = config?.onUploadProgress as
        | ((e: { loaded: number; total?: number }) => void)
        | undefined;

      if (onUploadProgress) {
        onUploadProgress({ loaded: 50, total: 100 });
        onUploadProgress({ loaded: 100, total: 100 });
      }
      // Axios는 Response 객체를 반환하지만, 여기선 상태만 쓰므로 최소 형태로 OK
      return Promise.resolve({ status: 204 });
    });
  });

  it("should upload file to S3", async () => {
    await uploadToS3(url, fields, mockFile);

    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  it("should report progress", async () => {
    const progressCallback = vi.fn();
    await uploadToS3(url, fields, mockFile, progressCallback);

    expect(progressCallback).toHaveBeenCalledWith(50);
    expect(progressCallback).toHaveBeenCalledWith(100);
    expect(progressCallback).toHaveBeenCalledTimes(2);
  });
});
