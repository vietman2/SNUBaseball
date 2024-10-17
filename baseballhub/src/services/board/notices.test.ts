import axios from "axios";

import {
  createNotice,
  getNoticeDetails,
  getNotices,
  getNoticeCategories,
  updateNotice,
  deleteNotice,
  createNoticeComment,
  editNoticeComment,
  deleteNoticeComment,
} from "./notices";

describe("createNotice", () => {
  it("should return null if category_label is empty", async () => {
    const response = await createNotice("title", "content", "", []);
    expect(response).toBeNull();
  });

  it("should create a notice", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: {} });

    await createNotice("title", "content", "category_label", []);
  });

  it("should create notice with attachments", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: {} });

    await createNotice("title", "content", "category_label", [
      new File([""], "file"),
    ]);
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error());

    const response = await createNotice(
      "title",
      "content",
      "category_label",
      []
    );
    expect(response).toBeNull();
  });
});

describe("getNotices", () => {
  it("should return an array of notices", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    await getNotices();
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await getNotices();
    expect(response).toBeNull();
  });
});

describe("getNoticeDetails", () => {
  it("should return a notice object if the notice ID is valid", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    await getNoticeDetails(1);
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await getNoticeDetails(1);
    expect(response).toBeNull();
  });
});

describe("getNoticeCategories", () => {
  it("should return an array of notice categories", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    await getNoticeCategories();
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await getNoticeCategories();
    expect(response).toBeNull();
  });
});

describe("updateNotice", () => {
  it("should return null if category_label is empty", async () => {
    const response = await updateNotice(1, "title", "content", "", []);
    expect(response).toBeNull();
  });

  it("should update a notice", async () => {
    jest.spyOn(axios, "put").mockResolvedValue({ data: {} });

    await updateNotice(1, "title", "content", "category_label", []);
  });

  it("should update notice with attachments", async () => {
    jest.spyOn(axios, "put").mockResolvedValue({ data: {} });

    await updateNotice(1, "title", "content", "category_label", [
      new File([""], "file"),
    ]);
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "put").mockRejectedValue(new Error());

    const response = await updateNotice(
      1,
      "title",
      "content",
      "category_label",
      []
    );
    expect(response).toBeNull();
  });
});

describe("deleteNotice", () => {
  it("should return null if the notice ID is invalid", async () => {
    const response = await deleteNotice(undefined);
    expect(response).toBeNull();
  });

  it("should delete a notice", async () => {
    jest.spyOn(axios, "delete").mockResolvedValue({ data: {} });

    await deleteNotice(1);
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "delete").mockRejectedValue(new Error());

    const response = await deleteNotice(1);
    expect(response).toBeNull();
  });
});

describe("createNoticeComment", () => {
  it("should return null if the notice ID is invalid", async () => {
    const response = await createNoticeComment(undefined, "content");
    expect(response).toBeNull();
  });

  it("should create a comment", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: {} });

    await createNoticeComment(1, "content");
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error());

    const response = await createNoticeComment(1, "content");
    expect(response).toBeNull();
  });
});

describe("editNoticeComment", () => {
  it("should return null if the comment ID is invalid", async () => {
    const response = await editNoticeComment(1, undefined, "content");
    expect(response).toBeNull();
  });

  it("should edit a comment", async () => {
    jest.spyOn(axios, "put").mockResolvedValue({ data: {} });

    await editNoticeComment(1, 1, "content");
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "put").mockRejectedValue(new Error());

    const response = await editNoticeComment(1, 1, "content");
    expect(response).toBeNull();
  });
});

describe("deleteNoticeComment", () => {
  it("should return null if the comment ID is invalid", async () => {
    const response = await deleteNoticeComment(1, undefined);
    expect(response).toBeNull();
  });

  it("should delete a comment", async () => {
    jest.spyOn(axios, "delete").mockResolvedValue({ data: {} });

    await deleteNoticeComment(1, 1);
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "delete").mockRejectedValue(new Error());

    const response = await deleteNoticeComment(1, 1);
    expect(response).toBeNull();
  });
});
