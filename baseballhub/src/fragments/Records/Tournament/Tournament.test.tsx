import { fireEvent, render, screen } from "@testing-library/react";

import { Tournament } from "./Tournament";
import { Tournament1 } from "@data/records/games";

jest.mock("./GameLandscape", () => ({
  GameLandscape: () => <div>GameLandscape</div>,
}));
jest.mock("./GamePortrait", () => ({
  GamePortrait: () => <div>GamePortrait</div>,
}));

describe("<Tournament />", () => {
  it("should render landscape", () => {
    render(
      <Tournament
        orientation={1}
        tournament={Tournament1}
        onSelectGame={jest.fn()}
      />
    );

    fireEvent.click(screen.getByTestId("header"));
  });
  
  it("should render portrait", () => {
    render(
      <Tournament
        orientation={2}
        tournament={Tournament1}
        onSelectGame={jest.fn()}
      />
    );

    fireEvent.click(screen.getByTestId("header"));
  });
});
