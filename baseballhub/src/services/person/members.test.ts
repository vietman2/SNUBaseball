import axios from "axios";

import { getMembers, addMember } from "./members";
import { samplePeople } from "@constants/data/people";

describe("getMembers", () => {
  it("should return an array of members", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: samplePeople });

    const response = await getMembers("");
    expect(response).toEqual(samplePeople);
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await getMembers("");
    expect(response).toBeNull();
  });
});

describe("addMember", () => {
  it("should return the new member", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: samplePeople[0] });

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
    expect(response).toEqual(samplePeople[0]);
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
