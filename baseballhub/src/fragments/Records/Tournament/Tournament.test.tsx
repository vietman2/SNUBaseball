import { render } from "@testing-library/react";

import { Tournament } from "./Tournament";
import { Tournament1 } from "@data/records/games";
import * as useWindowSize from "@hooks/useWindowSize";

jest.mock("./GamePortrait", () => ({
  GamePortrait: () => <div>GamePortrait</div>,
}));

describe("<Tournament />", () => {
  it("should render 1 column", () => {
    jest.spyOn(useWindowSize, "useWindowSize").mockReturnValue({
      width: 800,
      height: 600,
    });
    render(<Tournament tournament={Tournament1} onSelectGame={jest.fn()} />);
  });

  it("should render 2 columns", () => {
    jest.spyOn(useWindowSize, "useWindowSize").mockReturnValue({
      width: 1200,
      height: 600,
    });
    render(<Tournament tournament={Tournament1} onSelectGame={jest.fn()} />);
  });

  it("should render 3 columns", () => {
    jest.spyOn(useWindowSize, "useWindowSize").mockReturnValue({
      width: 1600,
      height: 600,
    });
    render(<Tournament tournament={Tournament1} onSelectGame={jest.fn()} />);
  });

  it("should render 4 columns", () => {
    jest.spyOn(useWindowSize, "useWindowSize").mockReturnValue({
      width: 1800,
      height: 600,
    });
    render(<Tournament tournament={Tournament1} onSelectGame={jest.fn()} />);
  });
});
