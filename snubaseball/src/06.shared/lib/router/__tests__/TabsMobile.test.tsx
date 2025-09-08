import { fireEvent } from "@testing-library/react";

import { TabsMobile } from "@shared/lib/router";
import { renderWithProviders } from "@test-utils/renderer";

describe("TabsMobile", () => {
  it("renders and handles sidebar toggle", () => {
    const { getByTestId, getByText } = renderWithProviders(<TabsMobile />);
    
    fireEvent.click(getByTestId("toggle-sidebar-button"));
    fireEvent.click(getByText("소개"));
  });
});
