import { fireEvent, screen, waitFor } from "@testing-library/react";

import RootLayout from "./RootLayout";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.unmock("@components/RootLayout");

describe("<RootLayout />", () => {
  

  it("should render", async () => {
    renderWithProviders(<RootLayout />);

    fireEvent.click(screen.getByTestId("sidebar"));

    await waitFor(() => {
      resizeWindow(600, 600);
    });
    
    fireEvent.click(screen.getByTestId("sidebar"));
  });
});
