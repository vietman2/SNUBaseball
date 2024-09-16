import { fireEvent, render, screen } from "@testing-library/react";

import { Chip } from "./Chip";

jest.unmock("@components/Chips");

describe("<Chip />", () => {
  it("should render small", () => {
    render(<Chip label="Test" onClick={jest.fn()} small />);

    fireEvent.click(screen.getByTestId("chip"));
  });

  it("should render chip without onClick", () => {
    render(<Chip label="Test" />);

    expect(screen.getByTestId("chip")).toBeInTheDocument();
  });
});
