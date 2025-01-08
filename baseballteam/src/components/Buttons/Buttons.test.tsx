import { fireEvent, screen } from "@testing-library/react";

import { TextButton } from "./TextButton";
import { ViewButtons } from "./ViewButtons";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("@components/Buttons");

describe("<TextButton />", () => {
  it("should render", () => {
    renderWithProviders(<TextButton text="Test" onClick={jest.fn()} />);

    fireEvent.click(screen.getByTestId("button"));
  });
});

describe("<ViewButtons />", () => {
  it("should render", () => {
    renderWithProviders(
      <ViewButtons
        buttons={[
          { label: "Test", icon: "test" },
          { label: "Test2", icon: "test2" },
        ]}
        selected="Test"
        onClick={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText("Test2"));
  });

  it("should render wide", () => {
    renderWithProviders(
      <ViewButtons
        buttons={[
          { label: "Test", icon: "test" },
          { label: "Test2", icon: "test2" },
        ]}
        selected="Test"
        onClick={jest.fn()}
        wide
      />
    );
  });
});
