import { FeedbackDetail } from "./FeedbackDetail";
import { renderWithProviders } from "@utils/test-utils";

describe("<FeedbackDetail />", () => {
  it("renders", () => {
    renderWithProviders(<FeedbackDetail feedbackId={1} />);
  });
});
