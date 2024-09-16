import { render } from "@testing-library/react";

import { GameStory } from "./GameStory";

describe("<GameStory />", () => {
  it("renders without errors", () => {
    render(<GameStory />);
  });
});
