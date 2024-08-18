import { fireEvent, render, screen } from "@testing-library/react";

import { TextButton } from "./TextButton";

jest.unmock("@components/Buttons");

describe("<TextButton />", () => {
  it("should render", () => {
    render(<TextButton text="Text Button" onClick={() => {}} />);

    fireEvent.click(screen.getByTestId("button"));
  });
});
