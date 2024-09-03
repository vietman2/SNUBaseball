import { screen } from "@testing-library/react";

import { Home } from "./Home";
import { renderWithProviders } from "@utils/test-utils";

describe("<Home />", () => {
  it("renders without crashing", () => {
    renderWithProviders(<Home />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    screen.getByText("Home").click();
  });
});
