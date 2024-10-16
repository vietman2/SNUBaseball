import axios from "axios";

import { getInformations, getInformationDetails } from "./information";

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

describe("getInformationDetails", () => {
  it("should return information details", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    await getInformationDetails(1);
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await getInformationDetails(1);
    expect(response).toBeNull();
  });
});
