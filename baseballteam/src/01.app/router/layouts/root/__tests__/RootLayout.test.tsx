import { describe, expect, it, vi } from "vitest";

import { RootLayout } from "../RootLayout";
import * as UserEntity from "@entities/user";
import { renderWithProviders } from "@test-utils/renderer";

describe("RootLayout", () => {
  it("not render anything if there is no user", () => {
    vi.spyOn(UserEntity, "useUser").mockReturnValue({
      isAuthenticated: false,
      user: null,
    });
    renderWithProviders(<RootLayout />);
  });

  it("renders without crashing", () => {
    vi.spyOn(UserEntity, "useUser").mockReturnValue({
      isAuthenticated: true,
      user: UserEntity.sampleUser,
    });

    const { getByText } = renderWithProviders(<RootLayout />);

    expect(getByText("LogoHorizontal")).toBeInTheDocument();
    expect(getByText("Mocked Outlet")).toBeInTheDocument();
  });
});
