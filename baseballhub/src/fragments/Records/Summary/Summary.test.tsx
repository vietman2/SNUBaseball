import { render } from "@testing-library/react";

import { GameSummary } from "./Summary";
import { sampleGames } from "@data/records/games";

describe("<GameSummary />", () => {
  it("renders correctly", () => {
    render(<GameSummary game={sampleGames[0]} />);
  });
});
