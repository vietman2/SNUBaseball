import axios from "axios";

import { getAccounts } from "./accounts";

describe("getAccounts", () => {
  it("should return accounts", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    const result = await getAccounts();

    expect(result).toEqual({});
  });

  it("should return null when request fails", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(null);

    const result = await getAccounts();

    expect(result).toBeNull();
  });
});
