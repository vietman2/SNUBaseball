import { Stats } from "./Stats";
import { renderWithProviders } from "@utils/test-utils";

describe("<Stats />", () => {
  it("renders correctly", () => {
    renderWithProviders(<Stats />);
  });
});
