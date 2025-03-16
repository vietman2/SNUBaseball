import axios from "axios";

import { getAlbums, getAlbumImages, getMedia } from "./gallery";

describe("getAlbums", () => {
  it("should return an array of albums", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });
    const albums = await getAlbums();

    expect(albums).toEqual({});
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue({});
    const albums = await getAlbums();

    expect(albums).toBeNull();
  });
});

describe("getAlbumImages", () => {
  it("should return an array of images", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });
    const images = await getAlbumImages("1");

    expect(images).toEqual({});
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue({});
    const images = await getAlbumImages("1");

    expect(images).toBeNull();
  });
});

describe("getMedia", () => {
  it("should return a media object", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });
    const media = await getMedia("1");

    expect(media).toEqual({});
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue({});
    const media = await getMedia("1");

    expect(media).toBeNull();
  });
});
