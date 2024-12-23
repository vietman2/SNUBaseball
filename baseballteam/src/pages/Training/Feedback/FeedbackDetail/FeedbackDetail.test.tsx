import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { FeedbackDetail } from "./FeedbackDetail";
import * as AuthContext from "@contexts/auth";
import { sampleFeedbackDetail } from "@data/training";
import { sampleAdmin, sampleAuthorProfile, sampleProfile } from "@data/user";
import * as FeedbackAPI from "@services/training/feedbacks";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@contexts/auth", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useAuth: jest.fn(),
}));

describe("<FeedbackDetail />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "confirm").mockImplementation(() => true);
    jest.spyOn(window, "open").mockImplementation(() => null);
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleAdmin,
      logout: jest.fn(),
      login: jest.fn(),
    });
    jest.spyOn(Router, "useParams").mockReturnValue({
      feedbackId: "1",
    });
    jest.spyOn(FeedbackAPI, "getFeedbackDetail").mockResolvedValue({
      status: 200,
      data: sampleFeedbackDetail,
    });
  });

  it("handles error correctly", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({});
    renderWithProviders(<FeedbackDetail />);

    await waitFor(() =>
      expect(screen.getByText("뒤로가기")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText("뒤로가기"));
  });

  it("handles bad response correctly", async () => {
    jest.spyOn(FeedbackAPI, "getFeedbackDetail").mockResolvedValue(null);
    renderWithProviders(<FeedbackDetail />);

    await waitFor(() =>
      expect(screen.getByText("뒤로가기")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText("뒤로가기"));
  });

  it("renders correctly and handles edit and delete", async () => {
    jest.spyOn(window, "confirm").mockImplementationOnce(() => false);
    jest.spyOn(window, "confirm").mockImplementation(() => true);
    jest.spyOn(FeedbackAPI, "deleteFeedback").mockResolvedValue(true);
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleAuthorProfile,
      logout: jest.fn(),
      login: jest.fn(),
    });
    renderWithProviders(<FeedbackDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("toggle"));
      fireEvent.click(screen.getByText("수정하기"));
      fireEvent.click(screen.getByText("삭제하기"));
      fireEvent.click(screen.getByText("삭제하기"));
    });
  });

  it("handles delete fail", async () => {
    jest.spyOn(window, "confirm").mockImplementation(() => true);
    jest.spyOn(window, "alert").mockImplementation(() => null);
    jest.spyOn(FeedbackAPI, "deleteFeedback").mockResolvedValue(null);
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleAdmin,
      logout: jest.fn(),
      login: jest.fn(),
    });
    renderWithProviders(<FeedbackDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("toggle"));
      fireEvent.click(screen.getByText("삭제하기"));
    });
  });

  it("handles normal user", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleProfile,
      logout: jest.fn(),
      login: jest.fn(),
    });
    renderWithProviders(<FeedbackDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("refresh"));
    });
  });
});
