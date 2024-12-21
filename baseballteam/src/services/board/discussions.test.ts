import axios from "axios";

import {
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  likeDiscussion,
  getDiscussions,
  getDiscussionDetails,
  createDiscussionComment,
  editDiscussionComment,
  deleteDiscussionComment,
} from "./discussions";

describe("createDiscussion", () => {
  it("should create", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: {} });

    const response = await createDiscussion("title", "content", []);
    expect(response).toEqual({ status: 201, data: {} });
  });

  it("should create with attachments", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: {} });

    const response = await createDiscussion("title", "content", [new File([""], "filename")]);
    expect(response).toEqual({ status: 201, data: {} });
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error());

    const response = await createDiscussion("title", "content", []);
    expect(response).toBeNull();
  });
});

describe("updateDiscussion", () => {
  it("should update", async () => {
    jest.spyOn(axios, "put").mockResolvedValue({ data: {} });

    const response = await updateDiscussion(1, "title", "content", []);
    expect(response).toEqual({});
  });

  it("should update with attachments", async () => {
    jest.spyOn(axios, "put").mockResolvedValue({ data: {} });

    const response = await updateDiscussion(1, "title", "content", [new File([""], "filename")]);
    expect(response).toEqual({});
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "put").mockRejectedValue(new Error());

    const response = await updateDiscussion(1, "title", "content", []);
    expect(response).toBeNull();
  });
});

describe("deleteDiscussion", () => {
  it("should handle undefined ID", async () => {
    const response = await deleteDiscussion(undefined);
    expect(response).toBeNull();
  });

  it("should return true if the request is successful", async () => {
    jest.spyOn(axios, "delete").mockResolvedValue({ status: 204 });

    const response = await deleteDiscussion(1);
    expect(response).toBeTruthy();
  });

  it("should return false if an error occurs", async () => {
    jest.spyOn(axios, "delete").mockRejectedValue(new Error());

    const response = await deleteDiscussion(1);
    expect(response).toBeNull();
  });
});

describe("likeDiscussion", () => {
  it("should handle invalid ID", async () => {
    const response = await likeDiscussion(undefined);
    expect(response).toBeNull();
  });

  it("should return true if the request is successful", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ status: 201 });

    const response = await likeDiscussion(1);
    expect(response).toBeTruthy();
  });

  it("should return false if an error occurs", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error());

    const response = await likeDiscussion(1);
    expect(response).toBeNull();
  });
});

describe("getDiscussions", () => {
  it("should return an array of discussions", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: [] });

    const response = await getDiscussions();
    expect(response).toEqual([]);
  });

  it("handles request with query", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: [] });

    const response = await getDiscussions("query");
    expect(response).toEqual([]);
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await getDiscussions();
    expect(response).toBeNull();
  });
});

describe("getDiscussionDetails", () => {
  it("should return a discussion object if the discussion ID is valid", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    const response = await getDiscussionDetails(1);
    expect(response).toEqual({});
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await getDiscussionDetails(1);
    expect(response).toBeNull();
  });
});

describe("createDiscussionComment", () => {
  it("should create", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: {} });

    const response = await createDiscussionComment(1, "content");
    expect(response).toEqual({});
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error());

    const response = await createDiscussionComment(1, "content");
    expect(response).toBeNull();
  });
});

describe("editDiscussionComment", () => {
  it("should update", async () => {
    jest.spyOn(axios, "put").mockResolvedValue({ data: {} });

    const response = await editDiscussionComment(1, 1, "content");
    expect(response).toEqual({});
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "put").mockRejectedValue(new Error());

    const response = await editDiscussionComment(1, 1, "content");
    expect(response).toBeNull();
  });
});

describe("deleteDiscussionComment", () => {
  it("should return true if the request is successful", async () => {
    jest.spyOn(axios, "delete").mockResolvedValue({ status: 204 });

    const response = await deleteDiscussionComment(1, 1);
    expect(response).toBeTruthy();
  });

  it("should return false if an error occurs", async () => {
    jest.spyOn(axios, "delete").mockRejectedValue(new Error());

    const response = await deleteDiscussionComment(1, 1);
    expect(response).toBeNull();
  });
});
