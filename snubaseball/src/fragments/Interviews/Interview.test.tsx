import { Interview } from "./Interview";
import { sampleInterviews } from "@data/archives";
import { renderWithProviders } from "@utils/test-utils";

describe("<Interview />", () => {
  it("renders correctly", () => {
    renderWithProviders(<Interview interview={sampleInterviews[0]} />);
  });
});
