import { Scoreboard } from "./Scoreboard";
import { sampleGameResult } from "@data/records";
import { renderWithProviders } from "@utils/test-utils";

describe("<Scoreboard />", () => {
  it("renders without errors", () => {
    renderWithProviders(<Scoreboard game={sampleGameResult} />);
  });
});
