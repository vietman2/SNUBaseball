import axios from "axios";

import { getMemories } from "./memories";

describe("getMemories", () => {
  it("should return an array of memories", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });
    const memories = await getMemories();

    expect(memories).toEqual({});
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue({});
    const memories = await getMemories();

    expect(memories).toBeNull();
  });
});
