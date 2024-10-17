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
jest.spyOn(window, "alert").mockImplementation(() => null);
jest.spyOn(window, "open").mockImplementation(() => null);

describe("<NoticeDetail />", () => {
  const render = async () => {
    await waitFor(() =>
      renderWithProviders(
        <NoticeDetail noticeId={1} goBack={jest.fn()} handleEdit={jest.fn()} />
      )
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "confirm").mockImplementation(() => true);
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
    await render();
  });

  it("renders correctly", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleProfile,
      logout: jest.fn(),
      setToken: jest.fn(),
      login: jest.fn(),
    });
    await render();
  });

  it("renders correctly with attachments", async () => {
    jest.spyOn(NoticesAPI, "getNoticeDetails").mockResolvedValue({
      status: 200,
      data: sampleNoticeDetailWithAttachment,
    });
    await render();

    await waitFor(() =>
      fireEvent.click(screen.getByTestId("유계결석 인정 요청서"))
    );
  });

  it("handles delete correctly", async () => {
    jest.spyOn(NoticesAPI, "deleteNotice").mockResolvedValue({
      status: 204,
      data: {},
    });
    await render();

    await waitFor(() => fireEvent.click(screen.getByTestId("delete-notice")));
  });

  it("handles delete reject", async () => {
    jest.spyOn(window, "confirm").mockImplementation(() => false);
    await render();

    await waitFor(() => fireEvent.click(screen.getByTestId("delete-notice")));
  });

  it("handles delete fail", async () => {
    jest.spyOn(NoticesAPI, "deleteNotice").mockResolvedValue(null);
    await render();

    await waitFor(() => fireEvent.click(screen.getByTestId("delete-notice")));
  });

  it("handles edit comment correctly", async () => {
    jest.spyOn(NoticesAPI, "editNoticeComment").mockResolvedValue({
      status: 200,
      data: {},
    });
    await render();

    await waitFor(() => fireEvent.click(screen.getByTestId("edit-comment-1")));
    await waitFor(() => fireEvent.click(screen.getByTestId("cancel-edit")));
    await waitFor(() => fireEvent.click(screen.getByTestId("edit-comment-1")));
    await waitFor(() => fireEvent.click(screen.getByTestId("confirm-edit")));
  });

  it("handles edit comment fail", async () => {
    jest.spyOn(NoticesAPI, "editNoticeComment").mockResolvedValue(null);
    await render();

    await waitFor(() => fireEvent.click(screen.getByTestId("edit-comment-1")));
    await waitFor(() => fireEvent.click(screen.getByTestId("confirm-edit")));
  });

  it("handles delete comment correctly", async () => {
    jest.spyOn(NoticesAPI, "deleteNoticeComment").mockResolvedValue({
      status: 204,
      data: {},
    });
    await render();

    await waitFor(() => fireEvent.click(screen.getByTestId("delete-comment-1")));
  });

  it("handles delete comment reject", async () => {
    jest.spyOn(window, "confirm").mockImplementation(() => false);
    await render();

    await waitFor(() => fireEvent.click(screen.getByTestId("delete-comment-1")));
  });

  it("handles delete comment fail", async () => {
    jest.spyOn(NoticesAPI, "deleteNoticeComment").mockResolvedValue(null);
    await render();

    await waitFor(() => fireEvent.click(screen.getByTestId("delete-comment-1")));
  });

  it("handles create comment correctly", async () => {
    jest.spyOn(NoticesAPI, "createNoticeComment").mockResolvedValue({
      status: 201,
      data: {},
    });
    await render();

    await waitFor(() => fireEvent.click(screen.getByTestId("new-comment")));
  });

  it("handles create comment fail", async () => {
    jest.spyOn(NoticesAPI, "createNoticeComment").mockResolvedValue(null);
    await render();

    await waitFor(() => fireEvent.click(screen.getByTestId("new-comment")));
  });
});
