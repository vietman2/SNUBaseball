import { fireEvent, screen, waitFor } from "@testing-library/react";

import { Notices } from "./Notices";
import * as AuthContext from "@contexts/auth";
import { sampleProfile, sampleAdmin } from "@data/user";
import { sampleNotices } from "@data/forum";
import * as NoticesAPI from "@services/board/notices";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("@contexts/auth", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useAuth: jest.fn(),
}));
jest.mock("@fragments/Notices", () => ({
  NoticeCreate: () => <div>NoticeCreate</div>,
  NoticeDetail: ({ goBack }: { goBack: () => void }) => (
    <button onClick={goBack}>NoticeDetail</button>
  ),
  NoticeSimple: () => <div>NoticeSimple</div>,
  NoticeSimpleWide: () => <div>NoticeSimpleWide</div>,
  NoticeSimpleWideHeader: () => <div>NoticeSimpleWideHeader</div>,
}));

describe("<Notices />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleProfile,
      logout: jest.fn(),
      setToken: jest.fn(),
      login: jest.fn(),
    });
    jest.spyOn(NoticesAPI, "getNotices").mockResolvedValue({
      status: 200,
      data: sampleNotices,
    });
  });

  it("handles bad response correctly", async () => {
    jest.spyOn(NoticesAPI, "getNotices").mockResolvedValue(null);

    await waitFor(() => renderWithProviders(<Notices />));

    await waitFor(() =>
      expect(screen.getByText("새로고침")).toBeInTheDocument()
    );
    waitFor(() => fireEvent.click(screen.getByText("새로고침")));
  });

  it("renders wide mode correctly and handles modals", async () => {
    renderWithProviders(<Notices />);

    await waitFor(() => resizeWindow(800, 800));
    await waitFor(() => fireEvent.click(screen.getByTestId("notice-1")));
    fireEvent.click(screen.getByText("NoticeDetail"));
  });

  it("handles write mode correctly in wide mode", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleAdmin,
      logout: jest.fn(),
      setToken: jest.fn(),
      login: jest.fn(),
    });
    renderWithProviders(<Notices />);

    await waitFor(() => resizeWindow(800, 800));

    fireEvent.click(screen.getByText("새 공지 등록"));

    await waitFor(() =>
      expect(screen.getByText("NoticeCreate")).toBeInTheDocument()
    );
  });

  it("renders mobile mode correctly", async () => {
    renderWithProviders(<Notices />);

    await waitFor(() => resizeWindow(600, 600));
    await waitFor(() => fireEvent.click(screen.getByTestId("notice-1")));
    fireEvent.click(screen.getByText("NoticeDetail"));
  });

  it("handles write mode correctly in mobile mode", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleAdmin,
      logout: jest.fn(),
      setToken: jest.fn(),
      login: jest.fn(),
    });
    renderWithProviders(<Notices />);

    await waitFor(() => resizeWindow(600, 600));

    fireEvent.click(screen.getByText("새 공지 등록"));
  });
});
