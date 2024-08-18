import { render } from "@testing-library/react";

import { TextInput } from "./TextInput";

jest.unmock("@components/TextInputs");

describe("<TextInput />", () => {
  it("should render", () => {
    render(
      <TextInput
        value=""
        onChange={jest.fn()}
        placeholder="Placeholder"
      />
    );
  });

  it("should render with title", () => {
    render(
      <TextInput
        title="Title"
        value=""
        onChange={jest.fn()}
        placeholder="Placeholder"
      />
    );
  });
});
