import axios from "axios";

import { getMembers, getMemberDetail, addMember } from "./members";
import { sampleMembers } from "@data/user";

jest.mock("form-data", () => {
  return jest.fn().mockImplementation(() => {
    return {
      append: jest.fn(),
    };
  });
});

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

    const response = await addMember(
      "Doe",
      "John",
      "123456789",
      "123-456-7890",
      "email@email.com",
      "2000-01-01",
      "2020-01-01",
      1,
      "Member",
      null
    );
    expect(response).toEqual(sampleMembers[0]);
  });

  it("should add member with profile image", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: sampleMembers[0] });

    const file = new File([""], "test.png", { type: "image/png" });

    const response = await addMember(
      "Doe",
      "John",
      "123456789",
      "123-456-7890",
      "email@email.com",
      "2000-01-01",
      "2020-01-01",
      1,
      "Member",
      file
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
      "2000-01-01",
      "2020-01-01",
      1,
      "Member",
      null
    );
    expect(response).toBeNull();
  });
});
