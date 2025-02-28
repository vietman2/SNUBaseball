import axios from "axios";

import { getAlbums, getTags } from "./archive";

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

describe("getTags", () => {
  it("should return data", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: "data" });

    const result = await getTags();

    expect(result).toEqual("data");
  });

  it("should return null if request fails", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(null);

    const result = await getTags();

    expect(result).toBeNull();
  });
});
