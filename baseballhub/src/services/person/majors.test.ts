import axios from "axios";

import { getMajors } from "./majors";

describe("getMajors", () => {
  it("should return an array of majors", async () => {
    const majors = ["Computer Science", "Mathematics"];
    jest.spyOn(axios, "get").mockResolvedValue({ data: majors });

    const response = await getMajors();
    expect(response).toEqual(majors);
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await getMajors();
    expect(response).toBeNull();
  });
});
