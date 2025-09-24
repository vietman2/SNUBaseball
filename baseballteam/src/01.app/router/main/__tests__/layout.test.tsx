import { beforeAll, describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";
import * as Router from "react-router";

import { MainLayout } from "../layout";
import * as AuthAPI from "@entities/user";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/lib/styles");

describe("MainLayout", () => {
  it("should redirect to /login when not authenticated", () => {
    vi.spyOn(AuthAPI, "useUser").mockReturnValue({
      isAuthenticated: false,
      user: null,
    });

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

  describe("Sidebar", () => {
    beforeAll(() => {
      vi.unmock("@shared/lib/router");
      vi.spyOn(Router, "useLocation").mockReturnValue({
        pathname: "/home",
        search: "",
        hash: "",
        state: null,
        key: "default",
      });
    });

    it("should handle sidebar toggle and theme toggle", () => {
      vi.spyOn(AuthAPI, "useUser").mockReturnValue({
        isAuthenticated: true,
        user: AuthAPI.sampleUser,
      });

      const { getByTestId, getByText } = renderWithProviders(<MainLayout />);

      fireEvent.click(getByTestId("toggle-sidebar-button"));
      expect(getByTestId("toggle-sidebar-button")).toHaveClass("collapsed");

      // collapsed 상태에서 theme 토글
      fireEvent.click(getByTestId("toggle-theme-button"));
      expect(getByText("SILVER Logo")).toBeInTheDocument();

      fireEvent.click(getByTestId("toggle-theme-button"));
      expect(getByText("BLUE Logo")).toBeInTheDocument();

      // 다시 sidebar 열기
      fireEvent.click(getByTestId("toggle-sidebar-button"));
      expect(getByTestId("toggle-sidebar-button")).not.toHaveClass("collapsed");

      // 열린 상태에서 theme 토글
      fireEvent.click(getByTestId("dark-mode-button"));
      expect(getByText("SILVER Logo")).toBeInTheDocument();

      // 다크모드에서 다크모드 버튼 클릭 (변화 없음)
      fireEvent.click(getByTestId("dark-mode-button"));
      expect(getByText("SILVER Logo")).toBeInTheDocument();

      // 라이트모드로 변경
      fireEvent.click(getByTestId("light-mode-button"));
      expect(getByText("BLUE Logo")).toBeInTheDocument();

      // 라이트모드에서 라이트모드 버튼 클릭 (변화 없음)
      fireEvent.click(getByTestId("light-mode-button"));
      expect(getByText("BLUE Logo")).toBeInTheDocument();
    });

    it("should open submenu when clicking on a tab with subtabs", () => {
      vi.spyOn(Router, "useLocation").mockReturnValue({
        pathname: "/records/results",
        search: "",
        hash: "",
        state: null,
        key: "default",
      });
      const { getByTestId, getByText } = renderWithProviders(<MainLayout />);

      fireEvent.click(getByTestId("기록실-submenu-collapse"));

      fireEvent.click(getByTestId("게시판-submenu-expand"));
      expect(getByText("공지")).toBeInTheDocument();
    });
  });
});
