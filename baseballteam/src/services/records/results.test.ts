import axios from "axios";

import { getResults } from "./results";

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
