import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { NoticeDetail } from "./NoticeDetail";
import * as AuthContext from "@contexts/auth";
import {
  sampleNoticeDetail,
  sampleNoticeDetailWithAttachment,
} from "@data/forum";
import { sampleAdmin, sampleProfile } from "@data/user";
import * as NoticesAPI from "@services/board/notices";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@contexts/auth", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useAuth: jest.fn(),
}));

describe("<NoticeDetail />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "confirm").mockImplementation(() => true);
    jest.spyOn(window, "open").mockImplementation(() => null);
    jest.spyOn(window, "alert").mockImplementation(() => null);
    jest.spyOn(Router, "useParams").mockReturnValue({
      noticeId: "1",
    });
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleProfile,
      logout: jest.fn(),
      login: jest.fn(),
    });
    jest.spyOn(NoticesAPI, "getNoticeDetails").mockResolvedValue({
      status: 200,
      data: sampleNoticeDetail,
    });
  });

  it("handles error correctly", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({});
    renderWithProviders(<NoticeDetail />);

    await waitFor(() =>
      expect(screen.getByText("뒤로가기")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText("뒤로가기"));
  });

  it("handles bad response correctly", async () => {
    jest.spyOn(NoticesAPI, "getNoticeDetails").mockResolvedValue(null);
    renderWithProviders(<NoticeDetail />);

    await waitFor(() =>
      expect(screen.getByText("뒤로가기")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText("뒤로가기"));
  });

  it("renders correctly with attachments", async () => {
    jest.spyOn(NoticesAPI, "getNoticeDetails").mockResolvedValue({
      status: 200,
      data: sampleNoticeDetailWithAttachment,
    });
    renderWithProviders(<NoticeDetail />);

    await waitFor(() => fireEvent.click(screen.getByTestId("refresh")));
    await waitFor(() =>
      fireEvent.click(screen.getByTestId("첨부파일"))
    );
  });

  it("handles delete", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleAdmin,
      logout: jest.fn(),
      login: jest.fn(),
    });
    jest.spyOn(NoticesAPI, "getNoticeDetails").mockResolvedValue({
      status: 200,
      data: {...sampleNoticeDetail, is_author: false},
    });
    jest.spyOn(NoticesAPI, "deleteNotice").mockResolvedValue({
      status: 204,
      data: { message: "success" },
    });
    renderWithProviders(<NoticeDetail />);

    await waitFor(() => fireEvent.click(screen.getByText("삭제하기")));
  });

  it("handles delete cancel", async () => {
    jest.spyOn(window, "confirm").mockImplementation(() => false);
    renderWithProviders(<NoticeDetail />);

    await waitFor(() => fireEvent.click(screen.getByText("삭제하기")));
  });

  it("handles delete fail", async () => {
    jest.spyOn(NoticesAPI, "deleteNotice").mockResolvedValue(null);
    renderWithProviders(<NoticeDetail />);

    await waitFor(() => fireEvent.click(screen.getByText("삭제하기")));
  });

  it("handles edit", async () => {
    renderWithProviders(<NoticeDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("toggle"));
      fireEvent.click(screen.getByText("수정하기"));
    });
  });

  it("handles like", async () => {
    jest.spyOn(NoticesAPI, "likeNotice").mockResolvedValue(true);
    renderWithProviders(<NoticeDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("like"));
    });
  });

  it("handles like fail", async () => {
    jest.spyOn(NoticesAPI, "likeNotice").mockResolvedValue(null);
    renderWithProviders(<NoticeDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("like"));
    });
  });

  it("renders as normal user", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleProfile,
      logout: jest.fn(),
      login: jest.fn(),
    });
    renderWithProviders(<NoticeDetail />);

    await waitFor(() => expect(screen.getByText("내용 1")).toBeInTheDocument());
  });
});
