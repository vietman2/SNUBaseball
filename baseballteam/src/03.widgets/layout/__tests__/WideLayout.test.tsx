import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";

import { RootLayout } from "@widgets/layout";
import * as AuthAPI from "@shared/lib/auth";
import * as ColorAPI from "@shared/lib/colors";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@widgets/layout");

describe("RootLayout", () => {
  beforeEach(() => {
    window.innerWidth = 1024;
    vi.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/",
      search: "",
      hash: "",
      state: null,
      key: "default",
    });
    vi.spyOn(Router, "useNavigate").mockReturnValue(vi.fn());
  });

  it("handles sidebar functions correctly", async () => {
    vi.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/forum/notices",
      search: "",
      hash: "",
      state: null,
      key: "default",
    });
    vi.spyOn(AuthAPI, "useAuth").mockReturnValue({
      user: AuthAPI.sampleCaptain,
      login: vi.fn(),
      logout: vi.fn(),
    });
    vi.spyOn(ColorAPI, "useColors").mockReturnValue({
      colors: ColorAPI.light,
      isDarkMode: false,
      toggleTheme: vi.fn(),
    });

    const { getByTestId } = renderWithProviders(<RootLayout />);

    fireEvent.click(getByTestId("toggle-sidebar")); // Toggle sidebar
    fireEvent.click(getByTestId("게시판")); // Click tab

    await waitFor(() => {
      expect(getByTestId("공지")).toBeInTheDocument();
      expect(getByTestId("자유게시판")).toBeInTheDocument();
    });
  });

  it("handles header functions correctly", async () => {
    vi.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/home/notices",
      search: "",
      hash: "",
      state: null,
      key: "default",
    });
    vi.spyOn(AuthAPI, "useAuth").mockReturnValue({
      user: { ...AuthAPI.sampleCaptain, profile_image: "" },
      login: vi.fn(),
      logout: vi.fn(),
    });
    vi.spyOn(ColorAPI, "useColors").mockReturnValue({
      colors: ColorAPI.dark,
      isDarkMode: true,
      toggleTheme: vi.fn(),
    });

    const { getByTestId, getByText } = renderWithProviders(<RootLayout />);

    fireEvent.mouseOver(getByTestId("header-menu")); // Hover over header menu
    fireEvent.mouseOut(getByTestId("header-menu")); // Mouse out of header menu

    fireEvent.click(getByTestId("홈")); // Click subtab

    fireEvent.click(getByTestId("toggle-theme")); // Toggle theme

    fireEvent.click(getByText("내 프로필")); // Click profile
  });
});
