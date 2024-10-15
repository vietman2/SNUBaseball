import { fireEvent, screen, waitFor } from "@testing-library/react";

import { Login } from "./Login";
import * as AuthAPI from "@services/auth/auth";
import * as ProfileAPI from "@services/auth/profiles";
import { renderWithProviders } from "@utils/test-utils";
import { sampleProfile } from "@data/user";

jest.spyOn(window, "alert").mockImplementation(() => {});

describe("<Login />", () => {
  it("handle auto login fail (token refresh fail) and navigate to signup", async () => {
    jest.spyOn(AuthAPI, "refresh").mockResolvedValue({ status: 400, data: {} });

    renderWithProviders(<Login />);

    await waitFor(() =>
      expect(screen.getByTestId("button-회원가입")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByTestId("button-회원가입"));
  });

  it("handle login fail", async () => {
    jest.spyOn(AuthAPI, "refresh").mockResolvedValue({ status: 400, data: {} });
    jest.spyOn(AuthAPI, "login").mockResolvedValue({
      status: 400,
      data: {},
    });

    renderWithProviders(<Login />);

    await waitFor(() =>
      expect(screen.getByTestId("button-로그인")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByTestId("button-로그인"));
  });

  it("handle auto login fail (fetch profile fail) and successfully login", async () => {
    jest
      .spyOn(AuthAPI, "refresh")
      .mockResolvedValue({ status: 200, data: { access: "asdf" } });
    jest
      .spyOn(ProfileAPI, "getProfile")
      .mockResolvedValue({ status: 400, data: {} });
    jest.spyOn(AuthAPI, "login").mockResolvedValue(null);

    renderWithProviders(<Login />);

    await waitFor(() =>
      expect(screen.getByTestId("button-로그인")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByTestId("button-로그인"));
  });

  it("handles auto login success", async () => {
    jest
      .spyOn(AuthAPI, "refresh")
      .mockResolvedValue({ status: 200, data: { access: "asdf" } });
    jest
      .spyOn(ProfileAPI, "getProfile")
      .mockResolvedValue({ status: 200, data: sampleProfile });

    waitFor(() => renderWithProviders(<Login />));
  });
});
