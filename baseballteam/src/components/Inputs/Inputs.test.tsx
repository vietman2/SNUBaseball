import { fireEvent, screen } from "@testing-library/react";

import { TextInput } from "./TextInput";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("@components/Inputs");

describe("<TextInput />", () => {
  it("should render", () => {
    renderWithProviders(
      <TextInput placeholder="Test" value="test" onChange={jest.fn()} />,
      { withRouter: false }
    );

    fireEvent.change(screen.getByTestId("text-input"), {
      target: { value: "test2" },
    });
  });

  it("should render password", () => {
    renderWithProviders(
      <TextInput
        placeholder="Test"
        value="test"
        password
        onChange={jest.fn()}
      />,
      { withRouter: false }
    );
  });

  it("should render wide", () => {
    renderWithProviders(
      <TextInput placeholder="Test" value="test" wide onChange={jest.fn()} />,
      { withRouter: false }
    );

    fireEvent.change(screen.getByTestId("text-input"), {
      target: { value: "test2" },
    });
  });

  it("should render disabled", () => {
    renderWithProviders(
      <TextInput
        placeholder="Test"
        value="test"
        wide
        password
        onChange={jest.fn()}
      />,
      { withRouter: false }
    );
  });

  it("should render compact", () => {
    renderWithProviders(
      <TextInput
        placeholder="Test"
        value="test"
        wide
        compact
        onChange={jest.fn()}
      />,
      { withRouter: false }
    );
  });
});
