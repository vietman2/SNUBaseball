import { fireEvent, screen } from "@testing-library/react";

import { GameSummary } from "./GameSummary";
import { Games1, sampleGames } from "@data/records/games";
import { renderWithProviders } from "@utils/test-utils";

describe("<GameSummary />", () => {
  it("should render and handle button click", () => {
    renderWithProviders(
      <GameSummary game={Games1[0]} onSelectGame={jest.fn()} />
    );

    fireEvent.click(screen.getByText("기록"));
  });

  it("should render all game types", () => {
    renderWithProviders(
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
