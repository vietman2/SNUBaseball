import { Feedback } from "./Feedback";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Feedback", () => ({
  FeedbackList: () => <div>FeedbackList</div>,
}));

describe("<Feedback />", () => {
  it("renders correctly", () => {
    renderWithProviders(<Feedback />);
  });
});
