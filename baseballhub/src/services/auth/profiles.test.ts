import axios from "axios";

import { getProfile } from "./profiles";

describe("getProfile", () => {
  it("should return a user object if the request is successful", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    await getProfile();
  });

  it("should return null if the request is unsuccessful", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    await getProfile();
  });
});
