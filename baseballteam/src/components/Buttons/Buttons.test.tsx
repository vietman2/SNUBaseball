import { fireEvent, screen } from "@testing-library/react";

import { TextButton } from "./TextButton";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("@components/Buttons");

describe("<TextButton />", () => {
  it("should render", () => {
    renderWithProviders(<TextButton text="Test" onClick={jest.fn()} />);

    fireEvent.click(screen.getByTestId("button"));
  });
});
