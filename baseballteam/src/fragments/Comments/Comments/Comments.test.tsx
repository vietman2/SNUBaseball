import { fireEvent, screen, waitFor } from "@testing-library/react";

import { CommentsList } from "./Comments";
import * as AuthContext from "@contexts/auth";
import { sampleNoticeDetail } from "@data/forum";
import { sampleAuthorProfile, sampleProfile } from "@data/user";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@contexts/auth", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useAuth: jest.fn(),
}));

describe("<CommentsList />", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(window, "confirm").mockImplementation(() => true);
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleAuthorProfile,
      logout: jest.fn(),
      login: jest.fn(),
    });
  });

  it("renders correctly and write new comment", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleProfile,
      logout: jest.fn(),
      login: jest.fn(),
    });
    const mockCreate = jest.fn().mockResolvedValue({ status: 200, data: {} });
    renderWithProviders(
      <CommentsList
        postId={1}
        comments={sampleNoticeDetail.comments}
        createComment={mockCreate}
        editComment={jest.fn()}
        deleteComment={jest.fn()}
        refresh={jest.fn()}
      />
    );

    await waitFor(() => fireEvent.click(screen.getByTestId("new-comment")));
  });

  it("handles create new comment fail", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleProfile,
      logout: jest.fn(),
      login: jest.fn(),
    });
    const mockCreate = jest.fn().mockResolvedValue(null);
    renderWithProviders(
      <CommentsList
        postId={1}
        comments={sampleNoticeDetail.comments}
        createComment={mockCreate}
        editComment={jest.fn()}
        deleteComment={jest.fn()}
        refresh={jest.fn()}
      />
    );

    await waitFor(() => fireEvent.click(screen.getByTestId("new-comment")));
  });

  it("handles edit comment", async () => {
    const mockEdit = jest.fn().mockResolvedValue({ status: 200, data: {} });
    renderWithProviders(
      <CommentsList
        postId={1}
        comments={sampleNoticeDetail.comments}
        createComment={jest.fn()}
        editComment={mockEdit}
        deleteComment={jest.fn()}
        refresh={jest.fn()}
      />
    );

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("toggle"));
      fireEvent.click(screen.getByText("수정하기"));
      fireEvent.click(screen.getByTestId("confirm-edit"));
    });
  });

  it("handles edit comment fail", async () => {
    const mockEdit = jest.fn().mockResolvedValue(null);
    renderWithProviders(
      <CommentsList
        postId={1}
        comments={sampleNoticeDetail.comments}
        createComment={jest.fn()}
        editComment={mockEdit}
        deleteComment={jest.fn()}
        refresh={jest.fn()}
      />
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("수정하기"));
      fireEvent.click(screen.getByTestId("confirm-edit"));
    });
  });

  it("handles edit comment cancel", async () => {
    const mockEdit = jest.fn().mockResolvedValue({ status: 200, data: {} });
    renderWithProviders(
      <CommentsList
        postId={1}
        comments={sampleNoticeDetail.comments}
        createComment={jest.fn()}
        editComment={mockEdit}
        deleteComment={jest.fn()}
        refresh={jest.fn()}
      />
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("수정하기"));
      fireEvent.click(screen.getByTestId("cancel-edit"));
    });
  });

  it("handles delete comment", async () => {
    const mockDelete = jest.fn().mockResolvedValue({ status: 200, data: {} });
    renderWithProviders(
      <CommentsList
        postId={1}
        comments={sampleNoticeDetail.comments}
        createComment={jest.fn()}
        editComment={jest.fn()}
        deleteComment={mockDelete}
        refresh={jest.fn()}
      />
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("삭제하기"));
    });
  });

  it("handles delete comment fail", async () => {
    const mockDelete = jest.fn().mockResolvedValue(null);
    renderWithProviders(
      <CommentsList
        postId={1}
        comments={sampleNoticeDetail.comments}
        createComment={jest.fn()}
        editComment={jest.fn()}
        deleteComment={mockDelete}
        refresh={jest.fn()}
      />
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("삭제하기"));
    });
  });

  it("handles delete comment cancel", async () => {
    jest.spyOn(window, "confirm").mockImplementation(() => false);
    renderWithProviders(
      <CommentsList
        postId={1}
        comments={sampleNoticeDetail.comments}
        createComment={jest.fn()}
        editComment={jest.fn()}
        deleteComment={jest.fn()}
        refresh={jest.fn()}
      />
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("삭제하기"));
    });
  });

  it("handles error (no user)", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: null,
      logout: jest.fn(),
      login: jest.fn(),
    });
    renderWithProviders(
      <CommentsList
        postId={1}
        comments={sampleNoticeDetail.comments}
        createComment={jest.fn()}
        editComment={jest.fn()}
        deleteComment={jest.fn()}
        refresh={jest.fn()}
      />
    );

    await waitFor(() => expect(screen.getByText("댓글 1")).toBeTruthy());
  });
});
