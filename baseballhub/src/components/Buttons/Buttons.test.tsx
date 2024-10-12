import { fireEvent, screen } from "@testing-library/react";

import { TextButton } from "./TextButton";
import { ToggleButton } from "./ToggleButton";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("@components/Buttons");

describe("<TextButton />", () => {
  it("should render", () => {
    renderWithProviders(<TextButton text="Test" onClick={jest.fn()} />);

    fireEvent.click(screen.getByTestId("button"));
  });
});

describe("<ToggleButton />", () => {
  it("should render on", () => {
    renderWithProviders(<ToggleButton isOn onClick={jest.fn()} />);

    fireEvent.click(screen.getByTestId("button"));
  });
  
  it("should render off", () => {
    renderWithProviders(<ToggleButton isOn={false} onClick={jest.fn()} />);

    fireEvent.click(screen.getByTestId("button"));
  });
});
