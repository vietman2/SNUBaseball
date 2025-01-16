import axios from "axios";

import {
  createMinutes,
  deleteMinutes,
  editMinutes,
  getMinutes,
  getMinutesDetails,
} from "./minutes";
import { forEachChild } from "typescript";

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

describe("getMinutesDetails", () => {
  it("should return the minutes details", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });
    const minutes = await getMinutesDetails("minutesId");

    expect(minutes).toEqual({});
  });

  it("should return null if the minutesId is not provided", async () => {
    const minutes = await getMinutesDetails(undefined);

    expect(minutes).toBeNull();
  });

  it("should return null if the minutes details are not found", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());
    const minutes = await getMinutesDetails("minutesId");

    expect(minutes).toBeNull();
  });
});

describe("createMinutes", () => {
  it("should create the minutes", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: {} });
    const file = new File([""], "file");
    const minutes = await createMinutes("title", "content", [file]);

    expect(minutes).toEqual({});
  });

  it("should return null if the minutes are not created", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error());
    const minutes = await createMinutes("title", "content", []);

    expect(minutes).toBeNull();
  });
});

describe("deleteMinutes", () => {
  it("should delete the minutes", async () => {
    jest.spyOn(axios, "delete").mockResolvedValue({ data: {} });
    const minutes = await deleteMinutes("minutesId");

    expect(minutes).toEqual(true);
  });

  it("should return null if the minutesId is not provided", async () => {
    const minutes = await deleteMinutes(undefined);

    expect(minutes).toBeNull();
  });

  it("should return null if the minutes are not deleted", async () => {
    jest.spyOn(axios, "delete").mockRejectedValue(new Error());
    const minutes = await deleteMinutes("minutesId");

    expect(minutes).toBeNull();
  });
});

describe("editMinutes", () => {
  it("should edit the minutes", async () => {
    jest.spyOn(axios, "put").mockResolvedValue({ data: {} });
    const file = new File([""], "file");
    const minutes = await editMinutes("minutesId", "title", "content", [file]);

    expect(minutes).toEqual({});
  });

  it("should return null if the minutesId is not provided", async () => {
    const minutes = await editMinutes(undefined, "title", "content", []);

    expect(minutes).toBeNull();
  });

  it("should return null if the minutes are not edited", async () => {
    jest.spyOn(axios, "put").mockRejectedValue(new Error());
    const minutes = await editMinutes("minutesId", "title", "content", []);

    expect(minutes).toBeNull();
  });
});
