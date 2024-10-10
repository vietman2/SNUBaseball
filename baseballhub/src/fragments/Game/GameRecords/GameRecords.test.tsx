import { GameRecords } from "./GameRecords";
import { sampleGameResult } from "@data/records";
import { renderWithProviders } from "@utils/test-utils";

describe("<GameRecords />", () => {
  it("renders", () => {
    renderWithProviders(
      <GameRecords
        lineup={sampleGameResult.lineup}
        pitchers={sampleGameResult.pitchers}
      />
    );
  });
});
