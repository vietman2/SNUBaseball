import axios from "axios";

import { getNoticeDetails, getNotices } from "./notices";

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
