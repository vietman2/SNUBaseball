import { fireEvent, screen } from "@testing-library/react";

import { GameSummary } from "./GameSummary";
import {
  sampleGameSummary_draw,
  sampleGameSummary_loss,
  sampleGameSummary_win,
} from "@data/records";
import { renderWithProviders } from "@utils/test-utils";

describe("<GameSummary />", () => {
  it("should render and handle button click", () => {
    renderWithProviders(
      <GameSummary game={sampleGameSummary_draw} onSelectGame={jest.fn()} />
    );

    fireEvent.click(screen.getByText("기록"));
  });

  it("should render all game types", () => {
    renderWithProviders(
      <>
        <GameSummary game={sampleGameSummary_draw} onSelectGame={jest.fn()} />
        <GameSummary game={sampleGameSummary_loss} onSelectGame={jest.fn()} />
        <GameSummary game={sampleGameSummary_win} onSelectGame={jest.fn()} />
      </>
    );
  });
});
