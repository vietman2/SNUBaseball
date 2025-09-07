import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import * as Router from "react-router";

import { AppRouter } from "../AppRouter";

vi.mock("../layouts/auth/AuthLayout", () => ({
  AuthLayout: () => <div>Auth Layout</div>,
}));
vi.mock("../layouts/modal/ModalLayout", () => ({
  ModalLayout: () => <div>Modal Layout</div>,
}));
vi.mock("../layouts/profile/MyProfileModal", () => ({
  MyProfileModal: () => <div>My Profile Modal</div>,
}));
vi.mock("../layouts/root/RootLayout", () => ({
  RootLayout: () => <div>Root Layout</div>,
}));

vi.mock("@pages/auth/login", () => ({
  LoginPage: () => <div>Login Page</div>,
}));
vi.mock("@pages/auth/signup", () => ({
  SignupPage: () => <div>Signup Page</div>,
}));
vi.mock("@pages/profile/account", () => ({
  AccountPage: () => <div>Account Page</div>,
}));
vi.mock("@widgets/not-found", () => ({
  NotFoundWidget: () => <div>Not Found Widget</div>,
}));

describe("AppRouter", () => {
  it("should render without crashing", () => {
    vi.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/login",
      search: "",
      hash: "",
      state: null,
      key: "test",
    });

    const { container } = render(<AppRouter />);
    expect(container).toBeInTheDocument();
  });

  it("should render modal layout when backgroundLocation is set", () => {
    vi.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/profile/account",
      search: "",
      hash: "",
      state: {
        backgroundLocation: {
          pathname: "/login",
          search: "",
          hash: "",
          state: null,
          key: "test",
        },
      },
      key: "test",
    });

    const { container } = render(<AppRouter />);
    expect(container).toBeInTheDocument();
  });
});
