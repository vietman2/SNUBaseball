import { fireEvent, screen } from "@testing-library/react";

import { GameStory } from "./GameStory";
import { renderWithProviders } from "@utils/test-utils";

describe("<GameStory />", () => {
  it("should render without crashing", () => {
    renderWithProviders(<GameStory />);

    fireEvent.click(screen.getAllByText("김유안")[0]);
  });
});
