import axios from "axios";

import {
  getGuidelines,
  getGuidelinesDetail,
  createGuideline,
  deleteGuideline,
  editGuideline,
  likeGuideline,
  createGuidelineComment,
  deleteGuidelineComment,
  editGuidelineComment,
} from "./guidelines";

describe("getGuidelines", () => {
  it("should return guidelines", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    await getGuidelines("카테고리", "필터");
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await getGuidelines("카테고리", "필터");
    expect(response).toBeNull();
  });
});

describe("getGuidelinesDetail", () => {
  it("should return a guideline detail", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    await getGuidelinesDetail(1);
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await getGuidelinesDetail(1);
    expect(response).toBeNull();
  });
});

describe("createGuideline", () => {
  it("should return a guideline", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: {} });

    await createGuideline(
      "제목",
      "내용",
      "비디오 링크",
      "서브카테고리",
      true,
      true,
      1,
      2
    );
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error());

    const response = await createGuideline(
      "제목",
      "내용",
      "비디오 링크",
      "서브카테고리",
      true,
      true,
      1,
      2
    );
    expect(response).toBeNull();
  });
});

describe("deleteGuideline", () => {
  it("should return true if a guideline is deleted", async () => {
    jest.spyOn(axios, "delete").mockResolvedValue({});

    const response = await deleteGuideline(1);
    expect(response).toBe(true);
  });

  it("should return false if an error occurs", async () => {
    jest.spyOn(axios, "delete").mockRejectedValue(new Error());

    const response = await deleteGuideline(1);
    expect(response).toBe(null);
  });

  it("should return false if guidelineId is undefined", async () => {
    const response = await deleteGuideline(undefined);
    expect(response).toBe(null);
  });
});

describe("editGuideline", () => {
  it("should return a guideline", async () => {
    jest.spyOn(axios, "put").mockResolvedValue({ data: {} });

    await editGuideline(1, "제목", "내용", "비디오 링크", "서브카테고리", true, true, 1, 2);
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "put").mockRejectedValue(new Error());

    const response = await editGuideline(
      1,
      "제목",
      "내용",
      "비디오 링크",
      "서브카테고리",
      true,
      true,
      1,
      2
    );
    expect(response).toBeNull();
  });
});

describe("likeGuideline", () => {
  it("should return true if a guideline is liked", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({});

    const response = await likeGuideline(1);
    expect(response).toBe(true);
  });

  it("should return false if an error occurs", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error());

    const response = await likeGuideline(1);
    expect(response).toBe(null);
  });

  it("should return false if guidelineId is undefined", async () => {
    const response = await likeGuideline(undefined);
    expect(response).toBe(null);
  });
});

describe("createGuidelineComment", () => {
  it("should return a comment", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: {} });

    await createGuidelineComment(1, "내용");
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error());

    const response = await createGuidelineComment(1, "내용");
    expect(response).toBeNull();
  });

  it("should return null if content is empty", async () => {
    const response = await createGuidelineComment(1, "");
    expect(response).toBeNull();
  });
});

describe("deleteGuidelineComment", () => {
  it("should return true if a comment is deleted", async () => {
    jest.spyOn(axios, "delete").mockResolvedValue({});

    const response = await deleteGuidelineComment(1, 1);
    expect(response).toBe(true);
  });

  it("should return false if an error occurs", async () => {
    jest.spyOn(axios, "delete").mockRejectedValue(new Error());

    const response = await deleteGuidelineComment(1, 1);
    expect(response).toBeNull();
  });

  it("should return false if commentId is undefined", async () => {
    const response = await deleteGuidelineComment(1, undefined);
    expect(response).toBeNull();
  });
});

describe("editGuidelineComment", () => {
  it("should return a comment", async () => {
    jest.spyOn(axios, "put").mockResolvedValue({ data: {} });

    await editGuidelineComment(1, 1, "내용");
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "put").mockRejectedValue(new Error());

    const response = await editGuidelineComment(1, 1, "내용");
    expect(response).toBeNull();
  });

  it("should return null if commentId is null", async () => {
    const response = await editGuidelineComment(1, null, "내용");
    expect(response).toBeNull();
  });

  it("should return null if content is empty", async () => {
    const response = await editGuidelineComment(1, 1, "");
    expect(response).toBeNull();
  });
});
