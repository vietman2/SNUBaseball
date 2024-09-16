import { fireEvent, render, screen } from "@testing-library/react";

import { GameLandscape } from "./GameLandscape";
import { GamePortrait } from "./GamePortrait";
import { Games1, sampleGames } from "@data/records/games";

describe("<GameLandscape />", () => {
  it("should render and handle button click", () => {
    render(<GameLandscape game={Games1[0]} onSelectGame={jest.fn()} />);

    fireEvent.click(screen.getByText("기록"));
  });

  it("should render all game types", () => {
    render(
      <>
        <GameLandscape game={Games1[2]} onSelectGame={jest.fn()} />
        <GameLandscape game={Games1[3]} onSelectGame={jest.fn()} />
        <GameLandscape game={Games1[4]} onSelectGame={jest.fn()} />
        <GameLandscape game={sampleGames[0]} onSelectGame={jest.fn()} />
        <GameLandscape game={sampleGames[1]} onSelectGame={jest.fn()} />
      </>
    );
  });
});

describe("<GamePortrait />", () => {
  it("should render and handle button click", () => {
    render(<GamePortrait game={Games1[0]} onSelectGame={jest.fn()} />);

    fireEvent.click(screen.getByText("기록"));
  });

  it("should render all game types", () => {
    render(
      <>
        <GamePortrait game={Games1[2]} onSelectGame={jest.fn()} />
        <GamePortrait game={Games1[3]} onSelectGame={jest.fn()} />
        <GamePortrait game={Games1[4]} onSelectGame={jest.fn()} />
        <GamePortrait game={sampleGames[0]} onSelectGame={jest.fn()} />
        <GamePortrait game={sampleGames[1]} onSelectGame={jest.fn()} isLast />
      </>
    );
  });
});
