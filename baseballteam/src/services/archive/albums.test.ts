import axios from "axios";

import { createAlbum, getAlbums, removeAlbum, updateAlbum } from "./albums";

describe("createAlbum", () => {
  it("should return data", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: "data" });

    const result = await createAlbum("title", false);

    expect(result).toEqual(true);
  });

  it("should return null if request fails", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(null);

    const result = await createAlbum("title", false);

    expect(result).toBeNull();
  });
});

describe("getAlbums", () => {
  it("should return data", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: "data" });

    const result = await getAlbums();

    expect(result).toEqual("data");
  });

  it("should return null if request fails", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(null);

    const result = await getAlbums();

    expect(result).toBeNull();
  });
});

describe("removeAlbum", () => {
  it("should return true", async () => {
    jest.spyOn(axios, "delete").mockResolvedValue(null);

    const result = await removeAlbum(1);

    expect(result).toBe(true);
  });

  it("should return null if request fails", async () => {
    jest.spyOn(axios, "delete").mockRejectedValue(null);

    const result = await removeAlbum(1);

    expect(result).toBeNull();
  });
});

describe("updateAlbum", () => {
  it("should return true", async () => {
    jest.spyOn(axios, "put").mockResolvedValue(null);

    const result = await updateAlbum(1, "title", false);

    expect(result).toBe(true);
  });

  it("should return null if request fails", async () => {
    jest.spyOn(axios, "put").mockRejectedValue(null);

    const result = await updateAlbum(1, "title", false);

    expect(result).toBeNull();
  });
});
