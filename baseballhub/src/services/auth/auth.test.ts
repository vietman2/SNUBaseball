import axios from "axios";

import { login, refresh } from "./auth";

describe("login", () => {
  it("should return a user object if the login is successful", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: {} });

    await login("test", "password");
  });

  it("should return null if the login is unsuccessful", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error());

    await login("test", "password");
  });
});

describe("refresh", () => {
  it("should return a new access token if the refresh is successful", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: {} });

    await refresh();
  });

  it("should return null if the refresh is unsuccessful", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error());

    await refresh();
  });
});
