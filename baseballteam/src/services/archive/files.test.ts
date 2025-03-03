import axios from "axios";

import { uploadFiles, getFiles, getMediaDetails, deleteMedia } from "./files";

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

describe("getFiles", () => {
  it("should get files", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });
    const response = await getFiles(1, 2, 3);

    expect(response).toEqual({});
  });

  it("should return null if request fails", async () => {
    jest.spyOn(axios, "get").mockRejectedValueOnce(new Error());
    const response = await getFiles(1, 2, 3);

    expect(response).toBe(null);
  });
});

describe("getMediaDetails", () => {
  it("should get media details", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });
    const response = await getMediaDetails(1);

    expect(response).toEqual({});
  });

  it("should return null if request fails", async () => {
    jest.spyOn(axios, "get").mockRejectedValueOnce(new Error());
    const response = await getMediaDetails(1);

    expect(response).toBe(null);
  });
});

describe("deleteMedia", () => {
  it("should delete media", async () => {
    jest.spyOn(axios, "delete").mockResolvedValue({ data: {} });
    const response = await deleteMedia(1);

    expect(response).toEqual(true);
  });

  it("should return null if request fails", async () => {
    jest.spyOn(axios, "delete").mockRejectedValueOnce(new Error());
    const response = await deleteMedia(1);

    expect(response).toBe(false);
  });
});
