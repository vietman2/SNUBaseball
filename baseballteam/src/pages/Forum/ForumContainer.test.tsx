import { ForumContainer } from "./ForumContainer";
import { renderWithProviders } from "@utils/test-utils";

describe("<ForumContainer />", () => {
  it("renders without crashing", () => {
    renderWithProviders(<ForumContainer />);
  });
});
