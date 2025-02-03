import { AboutContainer } from "./AboutContainer";
import { renderWithProviders } from "@utils/test-utils";

describe("<AboutContainer />", () => {
  it("renders", () => {
    renderWithProviders(<AboutContainer />);
  });
});
