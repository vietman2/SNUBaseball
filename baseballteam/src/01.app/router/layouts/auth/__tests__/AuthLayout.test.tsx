import { describe, expect, it, vi } from "vitest";

import { AuthLayout } from "../AuthLayout";
import * as UserEntity from "@entities/user";
import { renderWithProviders } from "@test-utils/renderer";

describe("AuthLayout", () => {
  it("should render AuthLayout component", () => {
    const { getByText } = renderWithProviders(<AuthLayout />);
    expect(getByText("Logo")).toBeInTheDocument();
  });

  it("should automatically navigate to /home if user is logged in", () => {
    vi.spyOn(UserEntity, "useUser").mockReturnValue({
      user: UserEntity.sampleUser,
      isAuthenticated: true,
    });

    renderWithProviders(<AuthLayout />);

    expect(window.location.pathname).toBe("/home");
  });
});
