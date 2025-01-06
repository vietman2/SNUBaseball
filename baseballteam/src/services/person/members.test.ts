import axios from "axios";

import {
  getMembers,
  getMemberDetail,
  createMember,
  //deleteMember,
} from "./members";
import { sampleMembers } from "@data/user";

describe("getMembers", () => {
  it("should return an array of members", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: sampleMembers });

    const response = await getMembers("YB");
    expect(response).toEqual(sampleMembers);
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await getMembers("OB");
    expect(response).toBeNull();
    await getMembers("기타");
    await getMembers("qwer");
  });
});

describe("getMemberDetail", () => {
  it("should return a member", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: sampleMembers[0] });

    const response = await getMemberDetail(1);
    expect(response).toEqual(sampleMembers[0]);
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await getMemberDetail(1);
    expect(response).toBeNull();
  });
});

describe("addMember", () => {
  it("should return the new member", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: sampleMembers[0] });

    const response = await createMember("Doe", "John", 2024);
    expect(response).toEqual(sampleMembers[0]);
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error());

    const response = await createMember("Doe", "John", 2024);
    expect(response).toBeNull();
  });
});
/*
describe("deleteMember", () => {
  it("should handle no id", async () => {
    const response = await deleteMember(undefined);
    expect(response).toBeNull();
  });

  it("should return the status and data", async () => {
    jest.spyOn(axios, "delete").mockResolvedValue({ data: sampleMembers[0] });

    const response = await deleteMember(1);
    expect(response).toEqual({ status: 204, data: sampleMembers[0] });
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "delete").mockRejectedValue(new Error());

    const response = await deleteMember(1);
    expect(response).toBeNull();
  });
});*/
