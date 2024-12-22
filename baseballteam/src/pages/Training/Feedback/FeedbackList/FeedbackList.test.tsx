import { fireEvent, screen, waitFor } from "@testing-library/react";

import { FeedbackList } from "./FeedbackList";
import { sampleClassification, sampleFeedbacks } from "@data/training";
import * as FeedbackAPI from "@services/training/feedbacks";
import * as MembersAPI from "@services/person/members";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";
import { sampleMembers } from "@data/user";

jest.mock("@contexts/theme", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useTheme: jest.fn(),
}));
jest.mock("@fragments/Feedback", () => ({
  FeedbackCard: () => <div>FeedbackCard</div>,
  FeedbackTableHeader: () => <div>FeedbackTableHeader</div>,
  FeedbackTableRow: () => <div>FeedbackTableRow</div>,
}));

describe("<FeedbackList />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(FeedbackAPI, "getFeedbacks").mockResolvedValue({
      feedbacks: sampleFeedbacks,
      classifications: sampleClassification,
    });
    jest.spyOn(MembersAPI, "getMembers").mockResolvedValue(sampleMembers);
  });

  it("handles bad response correctly", async () => {
    jest.spyOn(FeedbackAPI, "getFeedbacks").mockResolvedValue(null);
    renderWithProviders(<FeedbackList />);

    await waitFor(() => fireEvent.click(screen.getByText("새로고침")));
  });

  it("renders and handles clicks", async () => {
    jest.spyOn(localStorage.__proto__, "getItem").mockReturnValue("표");
    renderWithProviders(<FeedbackList />);
    await waitFor(() =>
      expect(screen.getByText("새 피드백")).toBeInTheDocument()
    );
    await waitFor(() => resizeWindow(800, 800));

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("feedback-1"));
      fireEvent.click(screen.getByText("새 피드백"));
      fireEvent.click(screen.getByText("보드"));
      fireEvent.click(screen.getByTestId("feedback-1"));
      fireEvent.click(screen.getByText("표"));
      fireEvent.click(screen.getByTestId("all"));
      fireEvent.click(screen.getByTestId("classification-타격"));
      fireEvent.click(screen.getByTestId("classification-타격"));
      fireEvent.change(screen.getByTestId("player-select"), {
        target: { value: "1" },
      });
    });

    await waitFor(() => resizeWindow(600, 600));

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("feedback-1"));
    });
  });
});
