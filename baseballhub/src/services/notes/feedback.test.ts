import axios from "axios";

import { getFeedbacks, getFeedbackDetail } from "./feedbacks";

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

describe("getFeedbackDetail", () => {
  it("should return feedback details", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    await getFeedbackDetail(1);
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await getFeedbackDetail(1);
    expect(response).toBeNull();
  });
});
