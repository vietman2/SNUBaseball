import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { NoticeList } from "./NoticeList";
import * as AuthContext from "@contexts/auth";
import { sampleNoticeCategories, sampleNotices } from "@data/forum";
import { sampleProfile, sampleAdmin } from "@data/user";
import * as NoticesAPI from "@services/board/notices";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@contexts/auth", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useAuth: jest.fn(),
}));
jest.mock("@fragments/Notices", () => ({
  NoticeCard: () => <div data-testid="NoticeCard" />,
  NoticeTableRow: () => <div data-testid="NoticeTableRow" />,
  NoticeTableHeader: () => <div data-testid="NoticeTableHeader" />,
}));

describe("<NoticeList />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/forum/notices",
      search: "",
      hash: "",
      state: null,
      key: "testKey",
    });
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleProfile,
      logout: jest.fn(),
      login: jest.fn(),
    });
    jest.spyOn(NoticesAPI, "getNotices").mockResolvedValue({
      categories: sampleNoticeCategories,
      notices: sampleNotices,
    });
  });

  it("handles bad response correctly", async () => {
    jest.spyOn(NoticesAPI, "getNotices").mockResolvedValue(null);
    await waitFor(() => renderWithProviders(<NoticeList />));

    await waitFor(() =>
      expect(screen.getByText("새로고침")).toBeInTheDocument()
    );
    waitFor(() => fireEvent.click(screen.getByText("새로고침")));
  });

  it("handles navigation correctly", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleAdmin,
      logout: jest.fn(),
      login: jest.fn(),
    });

    renderWithProviders(<NoticeList />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("보드"));
      fireEvent.click(screen.getByTestId("notice-1"));
      fireEvent.click(screen.getByText("표"));
      fireEvent.click(screen.getByTestId("notice-1"));
      fireEvent.click(screen.getByText("새 공지"));
    });
  });

  it("handles filters correctly", async () => {
    renderWithProviders(<NoticeList />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("all"));
      fireEvent.click(screen.getByTestId("category-일반"));
      fireEvent.click(screen.getByTestId("category-일반"));
    });
  });

  it("renders in the background", async () => {
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/forum/notices/1",
      search: "",
      hash: "",
      state: null,
      key: "testKey",
    });
    await waitFor(() => renderWithProviders(<NoticeList />));
  });
});
