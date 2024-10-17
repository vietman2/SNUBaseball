import axios from "axios";

import { uploadImage } from "./image";

jest.mock("form-data", () => {
  return jest.fn().mockImplementation(() => {
    return {
      append: jest.fn(),
    };
  });
});

describe("uploadImage", () => {
  it("should return an image object if the upload is successful", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ status: 201, data: {} });

    const file = new File([""], "test.png", { type: "image/png" });
    await uploadImage(file);
  });

  it("should return null if the upload is unsuccessful", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error());

    const file = new File([""], "test.png", { type: "image/png" });
    await uploadImage(file, "asdf");
  });
});
