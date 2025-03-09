import axios from "axios";

import {
  getMembers,
  searchMembers,
  getMemberDetail,
  createMember,
  updateProfileImage,
  updateMember,
} from "./members";

describe("getMembers", () => {
  it("should return an array of members", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    const response = await getMembers("YB");
    expect(response).toEqual({});
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await getMembers("OB");
    expect(response).toBeNull();
    await getMembers("기타");
    await getMembers("qwer");
  });
});

describe("searchMembers", () => {
  it("should return an array of members", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    const response = await searchMembers("John");
    expect(response).toEqual({});
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await searchMembers("Doe");
    expect(response).toBeNull();
  });
});

describe("getMemberDetail", () => {
  it("should return a member", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    const response = await getMemberDetail(1);
    expect(response).toEqual({});
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const response = await getMemberDetail(1);
    expect(response).toBeNull();
  });
});

describe("addMember", () => {
  it("should return the new member", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: {} });

    const response = await createMember("Doe", "John", 2024);
    expect(response).toEqual({});
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error());

    const response = await createMember("Doe", "John", 2024);
    expect(response).toBeNull();
  });
});

describe("updateProfileImage", () => {
  it("should return the updated member", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: {} });
    const file = new File([""], "filename");
    const response = await updateProfileImage("1", file);
    expect(response).toEqual(true);
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error());
    const file = new File([""], "filename");
    const response = await updateProfileImage("1", file);
    expect(response).toBeNull();
  });
});

describe("updateMember", () => {
  const sampleData = {
    admissionYear: 2024,
    studentId: "12345678",
    majorId: 1,
    phone: "010-1234-5678",
    email: "email@email.com",
    address: "Seoul",
    birthDate: "1990-01-01",
    notes: "Notes",
    role: "member",
    status: "active",
    dateJoined: "2023-01-01",
    numSemester: 4,
    hands: "right",
    position: "pitcher",
    backNumber: 10,
    isElite: true,
  };

  it("should return the updated member", async () => {
    jest.spyOn(axios, "put").mockResolvedValue({ data: {} });
    const response = await updateMember("1", sampleData);
    expect(response).toEqual(true);
  });

  it("should return null if id is undefined", async () => {
    const response = await updateMember(undefined, sampleData);
    expect(response).toBeNull();
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "put").mockRejectedValue(new Error());
    const response = await updateMember("1", sampleData);
    expect(response).toBeNull();
  });
});
