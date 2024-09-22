import { fireEvent, screen } from "@testing-library/react";

import RootLayout from "./RootLayout";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("@components/RootLayout");

describe("<RootLayout />", () => {
  it("should render", () => {
    renderWithProviders(<RootLayout />);

    fireEvent.click(screen.getByTestId("sidebar"));
  });
});
