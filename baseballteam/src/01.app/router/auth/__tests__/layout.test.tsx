import { describe, expect, it, vi } from "vitest";

import { AuthLayout } from "../layout";
import * as AuthAPI from "@entities/user";
import { renderWithProviders } from "@test-utils/renderer";

describe("AuthLayout", () => {
  it("should render the logo and outlet when not authenticated", () => {
    const { getByText } = renderWithProviders(<AuthLayout />);

    expect(getByText("Logo")).toBeInTheDocument();
    expect(getByText("Mocked Outlet")).toBeInTheDocument();
  });

  it("should navigate to /home when authenticated", () => {
    vi.spyOn(AuthAPI, "useUser").mockReturnValue({
      isAuthenticated: true,
      user: AuthAPI.sampleUser,
    });

    const { container } = renderWithProviders(<AuthLayout />);

    expect(container.innerHTML).toBe("");

    expect(window.location.pathname).toBe("/home");
  });
});
