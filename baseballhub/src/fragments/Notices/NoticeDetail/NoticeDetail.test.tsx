import { fireEvent, screen, waitFor } from "@testing-library/react";

import { NoticeDetail } from "./NoticeDetail";
import * as AuthContext from "@contexts/auth";
import {
  sampleNoticeDetail,
  sampleNoticeDetailWithAttachment,
} from "@data/forum";
import { sampleProfile, sampleAdmin } from "@data/user";
import * as NoticesAPI from "@services/board/notices";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@contexts/auth", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useAuth: jest.fn(),
}));
jest.spyOn(window, "open").mockImplementation(() => null);

describe("<NoticeDetail />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleAdmin,
      logout: jest.fn(),
      setToken: jest.fn(),
      login: jest.fn(),
    });
    jest.spyOn(NoticesAPI, "getNoticeDetails").mockResolvedValue({
      status: 200,
      data: sampleNoticeDetail,
    });
  });

  it("handles null noticeId correctly", async () => {
    renderWithProviders(
      <NoticeDetail noticeId={null} goBack={jest.fn()} handleEdit={jest.fn()} />
    );
  });

  it("handles bad response correctly", async () => {
    jest.spyOn(NoticesAPI, "getNoticeDetails").mockResolvedValue(null);
    waitFor(() =>
      renderWithProviders(
        <NoticeDetail noticeId={1} goBack={jest.fn()} handleEdit={jest.fn()} />
      )
    );
  });

  it("renders correctly", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleProfile,
      logout: jest.fn(),
      setToken: jest.fn(),
      login: jest.fn(),
    });
    await waitFor(() =>
      renderWithProviders(
        <NoticeDetail noticeId={1} goBack={jest.fn()} handleEdit={jest.fn()} />
      )
    );
  });

  it("renders correctly with attachments", async () => {
    jest.spyOn(NoticesAPI, "getNoticeDetails").mockResolvedValue({
      status: 200,
      data: sampleNoticeDetailWithAttachment,
    });
    await waitFor(() =>
      renderWithProviders(
        <NoticeDetail noticeId={1} goBack={jest.fn()} handleEdit={jest.fn()} />
      )
    );

    await waitFor(() =>
      fireEvent.click(screen.getByTestId("유계결석 인정 요청서"))
    );
  });

  it("handles delete correctly", async () => {
    jest.spyOn(window, "confirm").mockImplementation(() => true);
    jest.spyOn(NoticesAPI, "deleteNotice").mockResolvedValue({
      status: 204,
      data: {},
    });
    await waitFor(() =>
      renderWithProviders(
        <NoticeDetail noticeId={1} goBack={jest.fn()} handleEdit={jest.fn()} />
      )
    );

    await waitFor(() => fireEvent.click(screen.getByText("삭제")));
  });

  it("handles delete reject", async () => {
    jest.spyOn(window, "confirm").mockImplementation(() => false);
    await waitFor(() =>
      renderWithProviders(
        <NoticeDetail noticeId={1} goBack={jest.fn()} handleEdit={jest.fn()} />
      )
    );

    await waitFor(() => fireEvent.click(screen.getByText("삭제")));
  });

  it("handles delete fail", async () => {
    jest.spyOn(window, "confirm").mockImplementation(() => true);
    jest.spyOn(NoticesAPI, "deleteNotice").mockResolvedValue(null);
    await waitFor(() =>
      renderWithProviders(
        <NoticeDetail noticeId={1} goBack={jest.fn()} handleEdit={jest.fn()} />
      )
    );

    await waitFor(() => fireEvent.click(screen.getByText("삭제")));
  });
});
