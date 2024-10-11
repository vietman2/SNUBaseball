import { fireEvent, screen } from "@testing-library/react";

import { Feedback } from "./Feedback";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Feedback", () => ({
  FeedbackDetail: () => <div>FeedbackDetail</div>,
  FeedbackList: ({
    onSelect,
  }: {
    onSelect: (feedbackId: number) => void;
  }) => <button onClick={() => onSelect(1)}>FeedbackList</button>,
}));

describe("<Feedback />", () => {
  it("renders correctly", () => {
    renderWithProviders(<Feedback />);

    fireEvent.click(screen.getByText("FeedbackList"));
  });
});
