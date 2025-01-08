import axios from "axios";

import {
  getTeams,
  getTeamDetail,
  getMemberOptions,
  createTeamMember,
} from "./teams";

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
    const response = await getTeamDetail("2021");

    expect(response).toEqual({});
  });

  it("should return null if year is not provided", async () => {
    const response = await getTeamDetail(undefined);

    expect(response).toBe(null);
  });

  it("should return null if there is an error", async () => {
    jest.spyOn(axios, "get").mockRejectedValue({});
    const response = await getTeamDetail("2021");

    expect(response).toBe(null);
  });
});

describe("getMemberOptions", () => {
  it("should return an array of members", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ status: 200, data: [] });
    const response = await getMemberOptions("2021");

    expect(response).toEqual([]);
  });

  it("should return null if year is not provided", async () => {
    const response = await getMemberOptions(undefined);

    expect(response).toBe(null);
  });

  it("should return null if there is an error", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());
    const response = await getMemberOptions("2021");

    expect(response).toBe(null);
  });
});

describe("createTeamMember", () => {
  it("should return a team object", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ status: 200, data: {} });
    const response = await createTeamMember("2021", 1, 10, "asdf", true);

    expect(response).toEqual({});
  });

  it("should return null if year is not provided", async () => {
    const response = await createTeamMember(undefined, 1, 10, "asdf", true);

    expect(response).toBe(null);
  });

  it("should return null if there is an error", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error());
    const response = await createTeamMember("2021", 1, 10, "asdf", true);

    expect(response).toBe(null);
  });
});
