import axios from "axios";

import {
  getMembers,
  //getMemberDetail,
  //addMember,
  //deleteMember,
} from "./members";
import { sampleMembers } from "@data/user";

describe("getMembers", () => {
  it("should return an array of members", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: sampleMembers });

    const response = await getMembers("");
    expect(response).toEqual(sampleMembers);
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await getMembers("");
    expect(response).toBeNull();
  });
});
/*
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
  it("should handle no major", async () => {
    const response = await addMember(
      "Doe",
      "John",
      "123456789",
      "123-456-7890",
      "email@email.com",
      undefined,
      "Member",
      true
    );
    expect(response).toBeNull();
  });

  it("should return the new member", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: sampleMembers[0] });

    const response = await addMember(
      "Doe",
      "John",
      "123456789",
      "123-456-7890",
      "email@email.com",
      1,
      "Member",
      true
    );
    expect(response).toEqual(sampleMembers[0]);
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error());

    jest.mock("form-data", () => {
      return jest.fn().mockImplementation(() => {
        return {
          append: jest.fn(),
        };
      });
    });

    const response = await addMember(
      "Doe",
      "John",
      "123456789",
      "123-456-7890",
      "email@email.com",
      1,
      "Member",
      false
    );
    expect(response).toBeNull();
  });
});

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
