import { FeedbackSimple } from "./FeedbackSimple";
import { sampleFeedbacks } from "@data/notes";
import { renderWithProviders } from "@utils/test-utils";

describe("<FeedbackSimple />", () => {
  it("renders correctly", () => {
    renderWithProviders(<FeedbackSimple feedback={sampleFeedbacks.new.data[0]} />);
  });
});
