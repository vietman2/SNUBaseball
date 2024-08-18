import { render } from "@testing-library/react";

import { Checkbox } from "./Checkbox";

jest.unmock("@components/Checkbox");

describe("<Checkbox />", () => {
  it("should render", () => {
    render(<Checkbox text="asdf" />);
  });
});
