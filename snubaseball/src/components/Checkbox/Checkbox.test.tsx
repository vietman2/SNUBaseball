import { render } from "@testing-library/react";

import { Checkbox } from "./Checkbox";

describe("<Checkbox />", () => {
  it("should render", () => {
    render(<Checkbox text="asdf" />);
  });
});
