import axios from "axios";

import { getInformations, getInformationDetails, createInformation, updateInformation, deleteInformation } from "./information";

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

describe("createInformation", () => {
  it("should create an information", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: {} });

    await createInformation("title", "content", false, []);
  });

  it("should create an information with attachments", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: {} });

    await createInformation("title", "content", false, [new File([""], "filename")]);
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error());

    const response = await createInformation("title", "content", false, []);
    expect(response).toBeNull();
  });
});

describe("updateInformation", () => {
  it("should update an information", async () => {
    jest.spyOn(axios, "put").mockResolvedValue({ data: {} });

    await updateInformation(1, "title", "content", false, []);
  });

  it("should update an information with attachments", async () => {
    jest.spyOn(axios, "put").mockResolvedValue({ data: {} });

    await updateInformation(1, "title", "content", false, [new File([""], "filename")]);
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "put").mockRejectedValue(new Error());

    const response = await updateInformation(1, "title", "content", false, []);
    expect(response).toBeNull();
  });
});

describe("deleteInformation", () => {
  it("should delete an information", async () => {
    jest.spyOn(axios, "delete").mockResolvedValue({ data: {} });

    await deleteInformation(1);
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "delete").mockRejectedValue(new Error());

    const response = await deleteInformation(1);
    expect(response).toBeNull();
  });
});
