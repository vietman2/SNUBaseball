import axios from "axios";

import { getHistory, getMembers } from "./history";

describe("getHistory", () => {
  it("returns data", async () => {
    const sampleHistory = { data: "history" };
    jest.spyOn(axios, "get").mockResolvedValueOnce(sampleHistory);

    const result = await getHistory();

    expect(result).toEqual(sampleHistory.data);
  });

  it("handles api error", async () => {
    jest.spyOn(axios, "get").mockRejectedValueOnce(new Error());

    const result = await getHistory();

    expect(result).toBeNull();
  });
});

describe("getMembers", () => {
  it("returns data", async () => {
    const sampleMembers = { data: "members" };
    jest.spyOn(axios, "get").mockResolvedValueOnce(sampleMembers);

    const result = await getMembers(2022);

    expect(result).toEqual(sampleMembers.data);
  });

  it("handles api error", async () => {
    jest.spyOn(axios, "get").mockRejectedValueOnce(new Error());

    const result = await getMembers(2022);

    expect(result).toBeNull();
  });
});
