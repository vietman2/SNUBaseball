import axios from "axios";

import { getMinutes } from "./minutes";

describe("getMinutes", () => {
  it("should return the minutes", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });
    const minutes = await getMinutes("query");

    expect(minutes).toEqual({});
  });

  it("should return null if the minutes are not found", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());
    const minutes = await getMinutes("query");

    expect(minutes).toBeNull();
  });
});
