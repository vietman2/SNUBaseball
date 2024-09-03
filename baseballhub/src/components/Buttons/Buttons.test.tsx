import { fireEvent, render, screen } from "@testing-library/react";

import { TextButton } from "./TextButton";

jest.unmock("@components/Buttons");

describe("<TextButton />", () => {
  it("should render", () => {
    render(<TextButton text="Test" onClick={jest.fn()} />);

    fireEvent.click(screen.getByTestId("button"));
  });
});
