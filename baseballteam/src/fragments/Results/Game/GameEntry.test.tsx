import { GameEntry } from "./GameEntry";
import { sampleLineup } from "@data/records";
import { renderWithProviders } from "@utils/test-utils";

describe("<GameEntry />", () => {
  it("should render without errors", () => {
    renderWithProviders(<GameEntry lineup={sampleLineup} />);
  });
});
