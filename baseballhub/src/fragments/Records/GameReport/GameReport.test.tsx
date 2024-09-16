import { render } from "@testing-library/react";

import { GameReport } from "./GameReport";

jest.mock("./Lineup", () => ({
  Lineup: () => <div>Lineup</div>,
}));
jest.mock("./Notes", () => ({
  Notes: () => <div>Notes</div>,
}));
jest.mock("./Scoreboard", () => ({
  Scoreboard: () => <div>Scoreboard</div>,
}));

describe("<GameReport />", () => {
  it("renders without errors", () => {
    render(<GameReport />);
  });
});
