import { AccountingsContainer } from "./AccountingsContainer";
import { renderWithProviders } from "@utils/test-utils";

describe("<AccountingsContainer />", () => {
  it("should render successfully", () => {
    renderWithProviders(<AccountingsContainer />);
  });
});
