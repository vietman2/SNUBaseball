import { About } from "./About";
import { renderWithProviders } from "@utils/test-utils";

describe("<About />", () => {
  it("renders", () => {
    renderWithProviders(<About />);
  });
});
