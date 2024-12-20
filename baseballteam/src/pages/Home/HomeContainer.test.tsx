import { HomeContainer } from "./HomeContainer";
import { renderWithProviders } from "@utils/test-utils";

describe("<HomeContainer />", () => {
  it("renders without crashing", async () => {
    renderWithProviders(<HomeContainer />);
  });
});
