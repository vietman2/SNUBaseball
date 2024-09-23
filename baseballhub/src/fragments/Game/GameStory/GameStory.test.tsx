import { GameStory } from "./GameStory";
import { renderWithProviders } from "@utils/test-utils";

describe("<GameStory />", () => {
  it("should render without crashing", () => {
    renderWithProviders(<GameStory />);
  });
});
