import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

import { AppRouter } from "../AppRouter";

vi.mock("../layouts/auth/AuthLayout", () => ({
  AuthLayout: () => <div>Auth Layout</div>,
}));
vi.mock("../layouts/root/RootLayout", () => ({
  RootLayout: () => <div>Root Layout</div>,
}));
vi.mock("@pages/auth/login", () => ({
  LoginPage: () => <div>Login Page</div>,
}));
vi.mock("@widgets/not-found", () => ({
  NotFoundWidget: () => <div>Not Found Widget</div>,
}));

describe("AppRouter", () => {
  it("should render without crashing", () => {
    const { container } = render(<AppRouter />);
    expect(container).toBeInTheDocument();
  });
});
