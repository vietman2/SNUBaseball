import axios from "axios";

import { uploadFiles } from "./files";

describe("uploadFiles", () => {
  const mockFiles = [new File([""], "file1"), new File([""], "file2")];

  it("should upload files", async () => {
    const onProgress = jest.fn();

    jest.spyOn(axios, "post").mockImplementation((_url, _data, config) => {
      config?.onUploadProgress?.({
        loaded: 1,
        total: 1,
        bytes: 1,
        lengthComputable: true,
      });
      return Promise.resolve({ data: {} });
    });
    const response = await uploadFiles(mockFiles, onProgress);

    expect(response).toBe(true);
  });

  it("should handle no progress", async () => {
    const onProgress = jest.fn();

    jest.spyOn(axios, "post").mockImplementation((_url, _data, config) => {
      config?.onUploadProgress?.({
        loaded: 1,
        bytes: 1,
        lengthComputable: false,
      });
      return Promise.resolve({ data: {} });
    });
    await uploadFiles(mockFiles, onProgress);
  });

  it("should return null if upload fails", async () => {
    const onProgress = jest.fn();

    jest.spyOn(axios, "post").mockRejectedValueOnce(new Error());
    const response = await uploadFiles(mockFiles, onProgress);

    expect(response).toBe(null);
  });
});
