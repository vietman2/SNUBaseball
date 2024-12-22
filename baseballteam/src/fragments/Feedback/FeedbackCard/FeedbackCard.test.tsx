import { FeedbackCard } from "./FeedbackCard";
import { sampleFeedbacks } from "@data/training";
import { renderWithProviders } from "@utils/test-utils";

describe("<FeedbackCard />", () => {
  it("renders correctly", () => {
    renderWithProviders(<FeedbackCard feedback={sampleFeedbacks[0]} />);
  });
});
