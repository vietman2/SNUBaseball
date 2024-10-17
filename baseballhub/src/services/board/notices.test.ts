import axios from "axios";

import { createNotice, getNoticeDetails, getNotices, getNoticeCategories } from "./notices";

describe("createNotice", () => {
  it("should create a notice", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: {} });

    await createNotice("title", "content", "category_label", []);
  });

  it("should create notice with attachments", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: {} });

    await createNotice("title", "content", "category_label", [new File([""], "file")]);
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error());

    const response = await createNotice("title", "content", "category_label", []);
    expect(response).toBeNull();
  });
});

describe("getNotices", () => {
  it("should return an array of notices", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    await getNotices();
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await getNotices();
    expect(response).toBeNull();
  });
});

describe("getNoticeDetails", () => {
  it("should return a notice object if the notice ID is valid", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    await getNoticeDetails(1);
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await getNoticeDetails(1);
    expect(response).toBeNull();
  });
});

describe("getNoticeCategories", () => {
  it("should return an array of notice categories", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    await getNoticeCategories();
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await getNoticeCategories();
    expect(response).toBeNull();
  });
});
