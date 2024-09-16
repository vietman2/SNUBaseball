import { render } from "@testing-library/react";

import { GameDetail } from "./GameDetail";

describe("<GameDetail />", () => {
  it("renders", () => {
    render(<GameDetail selectedGame={1} goBack={jest.fn()} />);
  });
});
