import { fireEvent, screen, waitFor } from "@testing-library/react";

import { Login } from "./Login";
import * as AuthContext from "@contexts/auth";
import { sampleProfile } from "@data/user";
import * as AuthAPI from "@services/auth/auth";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@contexts/auth", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useAuth: jest.fn(),
}));

describe("<Login />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: null,
      logout: jest.fn(),
      login: jest.fn(),
    });
  });

  it("handles navigate to signup", async () => {
    renderWithProviders(<Login />);

    await waitFor(() =>
      expect(screen.getByTestId("button-회원가입")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByTestId("button-회원가입"));
  });

  it("handle login fail", async () => {
    jest.spyOn(AuthAPI, "login").mockResolvedValue(null);

    renderWithProviders(<Login />);

    await waitFor(() =>
      expect(screen.getByTestId("button-로그인")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByTestId("button-로그인"));
  });

  it("handles key presses and login success", async () => {
    jest.spyOn(AuthAPI, "login").mockResolvedValue({
      status: 200,
      data: { access: "token", user: sampleProfile },
    });

    renderWithProviders(<Login />);

    await waitFor(() => {
      fireEvent.keyDown(window, { key: "Enter", code: "Enter" });
      fireEvent.keyDown(window, { key: "A", code: "KeyA" });
    });
  });

  it("handles auto navigate to home if user is logged in", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleProfile,
      logout: jest.fn(),
      login: jest.fn(),
    });

    await waitFor(() => renderWithProviders(<Login />));
  });
});
