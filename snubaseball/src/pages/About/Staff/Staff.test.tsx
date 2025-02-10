import { Staff } from "./Staff";
import { renderWithProviders } from "@utils/test-utils";

describe("<Staff />", () => {
  it("renders", () => {
    renderWithProviders(<Staff />);
  });
});
