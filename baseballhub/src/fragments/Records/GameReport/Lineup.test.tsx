import { render } from "@testing-library/react";

import { Lineup } from "./Lineup";
import { sampleGameResult } from "@data/records/games";

describe("<Lineup />", () => {
  it("renders without errors", () => {
    render(
      <Lineup
        lineup={sampleGameResult.lineup}
        pitcher={sampleGameResult.pitchers[0]}
      />
    );
  });
});
