import { fireEvent, render, screen } from "@testing-library/react";

import RootLayout from "./RootLayout";

jest.unmock("@components/RootLayout");

describe("<RootLayout />", () => {
  it("should render", () => {
    render(<RootLayout />);

    fireEvent.click(screen.getByTestId("sidebar"));
  });
});
