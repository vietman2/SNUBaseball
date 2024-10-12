import { GameEntry } from "./GameEntry";
import { sampleGameResult } from "@data/records";
import { renderWithProviders } from "@utils/test-utils";

describe("<GameEntry />", () => {
  it("renders without crashing", () => {
    renderWithProviders(<GameEntry game={sampleGameResult} />);
  });
});
