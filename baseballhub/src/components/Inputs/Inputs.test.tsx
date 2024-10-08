import { fireEvent, screen } from "@testing-library/react";

import { DateInput } from "./DateInput";
import { TextInput } from "./TextInput";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("@components/Inputs");

describe("<DateInput />", () => {
  it("should render", () => {
    renderWithProviders(
      <DateInput label="Test" value="2021-01-01" onChange={jest.fn()} />
    );

    fireEvent.change(screen.getByTestId("date-input"), {
      target: { value: "2021-01-02" },
    });
  });
});

describe("<TextInput />", () => {
  it("should render", () => {
    renderWithProviders(
      <TextInput placeholder="Test" value="test" onChange={jest.fn()} />
    );

    fireEvent.change(screen.getByTestId("text-input"), {
      target: { value: "test2" },
    });
  });
});
