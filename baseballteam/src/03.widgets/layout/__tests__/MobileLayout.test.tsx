import { beforeEach, describe, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";
import * as Router from "react-router";

import { RootLayout } from "@widgets/layout";
import * as AuthAPI from "@shared/lib/auth";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@widgets/layout");

describe("MobileLayout", () => {
  beforeEach(() => {
    window.innerWidth = 500;
    vi.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/training/feedback",
      search: "",
      hash: "",
      state: null,
      key: "default",
    });

    vi.spyOn(Router, "useNavigate").mockReturnValue(vi.fn());
  });

  it("handles tabs functions correctly", async () => {
    vi.spyOn(AuthAPI, "useAuth").mockReturnValue({
      user: AuthAPI.sampleCaptain,
      login: vi.fn(),
      logout: vi.fn(),
    });

    const { getByTestId } = renderWithProviders(<RootLayout />);

    fireEvent.click(getByTestId("toggle-tabs")); // Toggle tabs
    fireEvent.click(getByTestId("훈련")); // Click tab
    fireEvent.click(getByTestId("피드백")); // Click Subtab
  });

  it("handles menu functions correctly", async () => {
    vi.spyOn(AuthAPI, "useAuth").mockReturnValue({
      user: { ...AuthAPI.sampleCaptain, profile_image: "" },
      login: vi.fn(),
      logout: vi.fn(),
    });

    const { getByTestId, getByText } = renderWithProviders(<RootLayout />);

    fireEvent.click(getByTestId("menu")); // Toggle menu
    fireEvent.mouseDown(document.body); // Click outside to close menu
    fireEvent.click(getByTestId("menu")); // Reopen menu
    fireEvent.click(getByText("내 프로필")); // Click profile
  });
});
