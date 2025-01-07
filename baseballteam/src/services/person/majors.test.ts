import axios from "axios";

import { getMajors } from "./majors";

describe("getMajors", () => {
  it("should return majors", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });
    const result = await getMajors();
    expect(result).toEqual({});
  });

  it("should return null if there is an error", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error("Network Error"));
    const result = await getMajors();
    expect(result).toBeNull();
  });
});
