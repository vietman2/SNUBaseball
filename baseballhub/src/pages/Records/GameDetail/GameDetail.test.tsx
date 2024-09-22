import { GameDetail } from "./GameDetail";
import * as Hook from "@hooks/useWindowSize";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Game", () => ({
  Scoreboard: () => <div>Scoreboard</div>,
}));
jest.mock("@fragments/Records", () => ({
  GameStory: () => <div>GameStory</div>,
  GameReport: () => <div>GameReport</div>,
}));

describe("<GameDetail />", () => {
  it("renders wide", () => {
    jest
      .spyOn(Hook, "useWindowSize")
      .mockReturnValue({ width: 1920, height: 1000 });
    renderWithProviders(<GameDetail selectedGame={1} goBack={jest.fn()} />);
  });

  it("renders narrow", () => {
    jest
      .spyOn(Hook, "useWindowSize")
      .mockReturnValue({ width: 768, height: 1000 });
    renderWithProviders(<GameDetail selectedGame={1} goBack={jest.fn()} />);
  });
});
