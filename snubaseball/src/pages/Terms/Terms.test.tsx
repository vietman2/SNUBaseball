import { Terms } from "./Terms";

import { renderWithProviders } from "@utils/test-utils";

describe("<Terms />", () => {
  it("renders without crashing", () => {
    renderWithProviders(<Terms />);
  });
});
