import { render } from "@testing-library/react";

import { Scoreboard } from "./Scoreboard";
import { sampleGameResult } from "@data/records/games";

describe("<Scoreboard />", () => {
  it("renders without errors", () => {
    render(<Scoreboard game={sampleGameResult} />);
  });
});
