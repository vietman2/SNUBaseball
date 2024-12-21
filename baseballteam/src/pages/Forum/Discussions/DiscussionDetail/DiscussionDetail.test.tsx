import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { DiscussionDetail } from "./DiscussionDetail";
import * as AuthContext from "@contexts/auth";
import { sampleDiscussionDetail } from "@data/forum";
import { sampleAdmin, sampleProfile } from "@data/user";
import * as DiscussionsAPI from "@services/board/discussions";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@contexts/auth", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useAuth: jest.fn(),
}));

describe("<DiscussionDetail />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "alert").mockImplementation(() => null);
    jest.spyOn(window, "confirm").mockImplementation(() => true);
    jest.spyOn(window, "open").mockImplementation(() => null);
    jest.spyOn(Router, "useParams").mockReturnValue({
      discussionId: "1",
    });
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleProfile,
      logout: jest.fn(),
      login: jest.fn(),
    });
    jest
      .spyOn(DiscussionsAPI, "getDiscussionDetails")
      .mockResolvedValue(sampleDiscussionDetail);
  });

  it("handles error correctly", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({});
    renderWithProviders(<DiscussionDetail />);

    await waitFor(() => fireEvent.click(screen.getByText("뒤로가기")));
  });

  it("handles bad response correctly", async () => {
    jest.spyOn(DiscussionsAPI, "getDiscussionDetails").mockResolvedValue(null);
    renderWithProviders(<DiscussionDetail />);

    await waitFor(() => fireEvent.click(screen.getByText("뒤로가기")));
  });

  it("renders correctly and handles edit, like and delete", async () => {
    jest.spyOn(DiscussionsAPI, "likeDiscussion").mockResolvedValue(true);
    jest.spyOn(DiscussionsAPI, "deleteDiscussion").mockResolvedValue(true);
    renderWithProviders(<DiscussionDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("toggle"));
      fireEvent.click(screen.getByText("수정하기"));
      fireEvent.click(screen.getByTestId("like"));
      fireEvent.click(screen.getByText("삭제하기"));
    });
  });

  it("handles like and delete fail and handles go back", async () => {
    jest.spyOn(DiscussionsAPI, "likeDiscussion").mockResolvedValue(null);
    jest.spyOn(DiscussionsAPI, "deleteDiscussion").mockResolvedValue(null);
    renderWithProviders(<DiscussionDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("like"));
      fireEvent.click(screen.getByText("삭제하기"));
      fireEvent.click(screen.getByTestId("back"));
    });
  });

  it("handles non-author but admin and cancel delete", async () => {
    jest.spyOn(window, "confirm").mockImplementation(() => false);
    jest.spyOn(DiscussionsAPI, "getDiscussionDetails").mockResolvedValue({
      ...sampleDiscussionDetail,
      is_author: false,
    });
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleAdmin,
      logout: jest.fn(),
      login: jest.fn(),
    });
    renderWithProviders(<DiscussionDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("삭제하기"));
    });
  });

  it("handles non-author and non-admin and handles attachments", async () => {
    jest.spyOn(window, "confirm").mockImplementation(() => false);
    jest.spyOn(DiscussionsAPI, "getDiscussionDetails").mockResolvedValue({
      ...sampleDiscussionDetail,
      is_author: false,
      is_liked: false,
      attachments: [
        { name: "attachment", file: "file", created_at: "2021-09-01" },
      ],
    });
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleProfile,
      logout: jest.fn(),
      login: jest.fn(),
    });
    renderWithProviders(<DiscussionDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("attachment"));
    });
  });
});
