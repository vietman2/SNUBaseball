import axios from "axios";

import { getInformations } from "./information";

describe("getInformations", () => {
  it("should return an array of informations", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    await getInformations();
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await getInformations();
    expect(response).toBeNull();
  });
});
