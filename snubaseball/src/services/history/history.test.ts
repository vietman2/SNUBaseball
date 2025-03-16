import axios from "axios";

import { getHistory } from "./history";

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
