import { fireEvent, screen, waitFor } from "@testing-library/react";

import { Feedback } from "./Feedback";
import * as ThemeContext from "@contexts/theme";
import { sampleFeedbacks } from "@data/notes";
import * as FeedbacksAPI from "@services/notes/feedbacks";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("@contexts/theme", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useTheme: jest.fn(),
}));
jest.mock("@fragments/Feedback", () => ({
  FeedbackDetail: ({ goBack }: { goBack: () => void }) => (
    <button onClick={goBack}>FeedbackDetail</button>
  ),
  FeedbackSimple: () => <div>FeedbackSimple</div>,
}));

describe("<Feedback />", () => {
  it("handles bad response correctly", async () => {
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: true,
      toggleTheme: jest.fn(),
    });
    jest.spyOn(FeedbacksAPI, "getFeedbacks").mockResolvedValue(null);
    await waitFor(() => renderWithProviders(<Feedback />));

    await waitFor(() => {
      expect(screen.getByText("새로고침")).toBeInTheDocument();
    });
    waitFor(() => fireEvent.click(screen.getByText("새로고침")));
  });

  it("renders correctly with feedback list in dark mode and wide screen", async () => {
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: true,
      toggleTheme: jest.fn(),
    });
    jest.spyOn(FeedbacksAPI, "getFeedbacks").mockResolvedValue({
      status: 200,
      data: sampleFeedbacks,
    });
    await waitFor(() => renderWithProviders(<Feedback />));

    await waitFor(() => resizeWindow(800, 800));

    fireEvent.click(screen.getByTestId("feedback-1"));
    fireEvent.click(screen.getByTestId("feedback-2"));
    fireEvent.click(screen.getByTestId("feedback-3"));
    fireEvent.click(screen.getByTestId("feedback-4"));
    fireEvent.click(screen.getByText("FeedbackDetail"));
  });

  it("renders correctly in light mode and mobile screen", async () => {
    jest.spyOn(ThemeContext, "useTheme").mockReturnValue({
      isDarkMode: false,
      toggleTheme: jest.fn(),
    });
    jest.spyOn(FeedbacksAPI, "getFeedbacks").mockResolvedValue({
      status: 200,
      data: sampleFeedbacks,
    });
    await waitFor(() => renderWithProviders(<Feedback />));

    await waitFor(() => resizeWindow(600, 600));
  });
});
