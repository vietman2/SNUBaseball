import { Team } from "./Team";
import { renderWithProviders } from "@utils/test-utils";

describe("<Team />", () => {
  it("renders", () => {
    renderWithProviders(<Team />);
  });
});
