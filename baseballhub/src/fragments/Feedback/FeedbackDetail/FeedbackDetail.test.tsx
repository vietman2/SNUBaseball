import { FeedbackDetail } from "./FeedbackDetail";
import { sampleFeedbacks } from "@data/notes";
import { renderWithProviders } from "@utils/test-utils";

describe("<FeedbackDetail />", () => {
  it("renders", () => {
    renderWithProviders(<FeedbackDetail feedback={sampleFeedbacks.done[0]} />);
  });
});
