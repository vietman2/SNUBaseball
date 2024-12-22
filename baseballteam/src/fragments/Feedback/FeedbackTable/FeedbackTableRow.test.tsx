import { FeedbackTableHeader, FeedbackTableRow } from "./FeedbackTableRow";
import { sampleFeedbacks } from "@data/training";
import { renderWithProviders } from "@utils/test-utils";

describe("<FeedbackTableHeader />", () => {
  it("renders correctly", () => {
    renderWithProviders(<FeedbackTableHeader />);
  });
});

describe("<FeedbackTableRow />", () => {
  it("renders correctly", () => {
    renderWithProviders(<FeedbackTableRow feedback={sampleFeedbacks[0]} />);
  });
});
