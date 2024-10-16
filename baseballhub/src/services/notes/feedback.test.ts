import axios from "axios";

import { getFeedbacks } from "./feedbacks";

describe("getFeedbacks", () => {
  it("should return an array of feedbacks", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    await getFeedbacks();
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await getFeedbacks();
    expect(response).toBeNull();
  });
});
