import axios from "axios";

import { checkStudentId, signUp } from "./register";

describe("checkStudentId", () => {
  it("should return a student object if the student ID is valid", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    await checkStudentId("12345678");
  });

  it("should return an error message if the student ID is invalid", async () => {
    jest.spyOn(axios, "get").mockRejectedValue({
      response: {
        status: 400,
        data: {
          error: "Invalid student ID",
        },
      },
    });

    await checkStudentId("12345678");
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    await checkStudentId("12345678");
  });
});

describe("signUp", () => {
  it("should return a success message if the sign-up is successful", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: {} });

    await signUp(1, "test", "password", "password");
  });

  it("should return an error message if the sign-up is unsuccessful", async () => {
    jest.spyOn(axios, "post").mockRejectedValue({
      response: {
        status: 400,
        data: {
          error: "Invalid input",
        },
      },
    });

    await signUp(1, "test", "password", "password");
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error());

    await signUp(1, "test", "password", "password");
  });
});
