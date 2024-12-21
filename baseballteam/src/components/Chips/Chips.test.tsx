import { fireEvent, render, screen } from "@testing-library/react";

import { Chip } from "./Chip";

jest.unmock("@components/Chips");

describe("<Chip />", () => {
  it("should render small", () => {
    render(<Chip label="Test" size="small" icon="icon" />);

    fireEvent.click(screen.getByTestId("chip"));
  });
  
  it("should render medium", () => {
    render(<Chip label="Test" icon="icon" />);

    fireEvent.click(screen.getByTestId("chip"));
  });
});
