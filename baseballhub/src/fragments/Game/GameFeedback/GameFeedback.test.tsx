import { GameFeedback } from "./GameFeedback";
import { sampleGameResult } from "@data/records";
import { renderWithProviders } from "@utils/test-utils";

describe("<GameFeedback />", () => {
  it("renders without crashing", () => {
    renderWithProviders(<GameFeedback game={sampleGameResult} />);
  });
});
