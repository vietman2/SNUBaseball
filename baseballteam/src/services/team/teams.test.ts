import axios from "axios";

import { getTeams, getTeamDetail } from "./teams";

describe("getTeams", () => {
  it("should return an array of teams", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ status: 200, data: [] });
    const response = await getTeams();

    expect(response).toEqual([]);
  });

  it("should return null if there is an error", async () => {
    jest.spyOn(axios, "get").mockRejectedValue({});
    const response = await getTeams();

    expect(response).toBe(null);
  });
});

describe("getTeamDetail", () => {
  it("should return a team object", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ status: 200, data: {} });
    const response = await getTeamDetail(2021);

    expect(response).toEqual({});
  });

  it("should return null if year is not provided", async () => {
    const response = await getTeamDetail(undefined);

    expect(response).toBe(null);
  });

  it("should return null if there is an error", async () => {
    jest.spyOn(axios, "get").mockRejectedValue({});
    const response = await getTeamDetail(2021);

    expect(response).toBe(null);
  });
});
