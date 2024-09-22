import { fireEvent, render, screen } from "@testing-library/react";

import { GameSummary } from "./GameSummary";
import { Games1, sampleGames } from "@data/records/games";

describe("<GameSummary />", () => {
  it("should render and handle button click", () => {
    render(<GameSummary game={Games1[0]} onSelectGame={jest.fn()} />);

    fireEvent.click(screen.getByText("기록"));
  });

  it("should render all game types", () => {
    render(
      <>
        <GameSummary game={Games1[2]} onSelectGame={jest.fn()} />
        <GameSummary game={Games1[3]} onSelectGame={jest.fn()} />
        <GameSummary game={Games1[4]} onSelectGame={jest.fn()} />
        <GameSummary game={sampleGames[0]} onSelectGame={jest.fn()} />
        <GameSummary game={sampleGames[1]} onSelectGame={jest.fn()} />
      </>
    );
  });
});
