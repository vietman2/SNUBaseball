import { render } from "@testing-library/react";

import { GameDetail } from "./GameDetail";

jest.mock("@fragments/Records", () => ({
  GameStory: () => <div>GameStory</div>,
  GameReport: () => <div>GameReport</div>,
}));

describe("<GameDetail />", () => {
  it("renders", () => {
    render(<GameDetail selectedGame={1} goBack={jest.fn()} />);
  });
});
