import axios from "axios";

import { getResults, getResultsDetail } from "./results";

describe("getResults", () => {
  it("returns results", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    const response = await getResults(2021);

    expect(response).toEqual({});
  });

  it("returns null when an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await getResults(2021);

    expect(response).toBeNull();
  });
});

describe("getResultsDetail", () => {
  it("returns results detail", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    const response = await getResultsDetail("gameId");

    expect(response).toEqual({});
  });

  it("returns null when an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await getResultsDetail("gameId");

    expect(response).toBeNull();
  });

  it("returns null when gameId is not provided", async () => {
    const response = await getResultsDetail(undefined);

    expect(response).toBeNull();
  });
});
