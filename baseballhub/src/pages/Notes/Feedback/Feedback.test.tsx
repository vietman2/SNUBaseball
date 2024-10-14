import { fireEvent, screen } from "@testing-library/react";

import { Feedback } from "./Feedback";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Feedback", () => ({
  FeedbackDetail: ({ goBack }: { goBack: () => void }) => (
    <button onClick={goBack}>FeedbackDetail</button>
  ),
  FeedbackSimple: () => <div>FeedbackSimple</div>,
}));

describe("<Feedback />", () => {
  it("renders correctly", () => {
    renderWithProviders(<Feedback />);

    fireEvent.click(screen.getByTestId("feedback-1"));
    fireEvent.click(screen.getByTestId("feedback-2"));
    fireEvent.click(screen.getByTestId("feedback-3"));
    fireEvent.click(screen.getByTestId("feedback-4"));
    fireEvent.click(screen.getByText("FeedbackDetail"));
  });
});
