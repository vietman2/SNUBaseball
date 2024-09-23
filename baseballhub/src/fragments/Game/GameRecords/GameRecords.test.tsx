import { BattersGameRecords } from "./BattersGameRecords";
import { PitchersGameRecords } from "./PitchersGameRecords";
import { sampleGameResult } from "@data/records/games";
import { renderWithProviders } from "@utils/test-utils";

describe("<BattersGameRecords />", () => {
  it("renders", () => {
    renderWithProviders(
      <BattersGameRecords lineup={sampleGameResult.lineup} />
    );
  });
});

describe("<PitchersGameRecords />", () => {
  it("renders", () => {
    renderWithProviders(
      <PitchersGameRecords pitchers={sampleGameResult.pitchers} />
    );
  });
});
