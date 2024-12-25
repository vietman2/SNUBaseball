import axios from "axios";

import {
  getFeedbacks,
  getFeedbackDetail,
  getCategoryOptions,
  createFeedback,
  deleteFeedback,
  editFeedback,
  createFeedbackComment,
  deleteFeedbackComment,
  editFeedbackComment,
} from "./feedbacks";

describe("getFeedbacks", () => {
  it("should return an array of feedbacks", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    await getFeedbacks();
  });

  it("should request with params", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    await getFeedbacks("query", "category", 0);
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

describe("getCategoryOptions", () => {
  it("should return an array of category options", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    await getCategoryOptions();
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await getCategoryOptions();
    expect(response).toBeNull();
  });
});

describe("createFeedback", () => {
  it("should create a feedback", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: {} });

    await createFeedback("title", "content", "category", 1, "status");
  });

  it("should return null if player is undefined", async () => {
    const response = await createFeedback("title", "content", "category", undefined, "status");
    expect(response).toBeNull();
  });

  it("should return null if category is null", async () => {
    const response = await createFeedback("title", "content", null, 1, "status");
    expect(response).toBeNull();
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error());

    const response = await createFeedback("title", "content", "category", 1, "status");
    expect(response).toBeNull();
  });
});

describe("deleteFeedback", () => {
  it("should delete a feedback", async () => {
    jest.spyOn(axios, "delete").mockResolvedValue({ data: {} });

    await deleteFeedback(1);
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "delete").mockRejectedValue(new Error());

    const response = await deleteFeedback(1);
    expect(response).toBeNull();
  });
});

describe("editFeedback", () => {
  it("should edit a feedback", async () => {
    jest.spyOn(axios, "patch").mockResolvedValue({ data: {} });

    await editFeedback(1, "title", "content", "category", 1, "status");
  });

  it("should return null if player is undefined", async () => {
    const response = await editFeedback(1, "title", "content", "category", undefined, "status");
    expect(response).toBeNull();
  });

  it("should return null if category is null", async () => {
    const response = await editFeedback(1, "title", "content", null, 1, "status");
    expect(response).toBeNull();
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "patch").mockRejectedValue(new Error());

    const response = await editFeedback(1, "title", "content", "category", 1, "status");
    expect(response).toBeNull();
  });
});

describe("createFeedbackComment", () => {
  it("should create a feedback comment", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: {} });

    await createFeedbackComment(1, "content");
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error());

    const response = await createFeedbackComment(1, "content");
    expect(response).toBeNull();
  });
});

describe("deleteFeedbackComment", () => {
  it("should delete a feedback comment", async () => {
    jest.spyOn(axios, "delete").mockResolvedValue({ data: {} });

    await deleteFeedbackComment(1, 1);
  });

  it("should return null if commentId is undefined", async () => {
    const response = await deleteFeedbackComment(1, undefined);
    expect(response).toBeNull();
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "delete").mockRejectedValue(new Error());

    const response = await deleteFeedbackComment(1, 1);
    expect(response).toBeNull();
  });
});

describe("editFeedbackComment", () => {
  it("should edit a feedback comment", async () => {
    jest.spyOn(axios, "put").mockResolvedValue({ data: {} });

    await editFeedbackComment(1, 1, "content");
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "put").mockRejectedValue(new Error());

    const response = await editFeedbackComment(1, 1, "content");
    expect(response).toBeNull();
  });
});
