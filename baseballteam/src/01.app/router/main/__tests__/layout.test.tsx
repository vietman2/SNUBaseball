import { describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";

import { MainLayout } from "../layout";
import * as AuthAPI from "@entities/user";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/lib/styles");

describe("MainLayout", () => {
  it("should redirect to /login when not authenticated", () => {
    const { container } = renderWithProviders(<MainLayout />);

    expect(container.innerHTML).toBe("");

    expect(window.location.pathname).toBe("/login");
  });

  it("should render MainLayout when authenticated", () => {
    vi.spyOn(AuthAPI, "useUser").mockReturnValue({
      isAuthenticated: true,
      user: AuthAPI.sampleUser,
    });

    const { getByTestId, getByText } = renderWithProviders(<MainLayout />);

    // 초기에는 라이트모드
    expect(getByText("BLUE Logo")).toBeInTheDocument();

    // 다크모드로 변경
    fireEvent.click(getByTestId("dark-mode-button"));
    expect(getByText("SILVER Logo")).toBeInTheDocument();

    // 라이트모드로 변경
    fireEvent.click(getByTestId("light-mode-button"));
    expect(getByText("BLUE Logo")).toBeInTheDocument();
  });
});
