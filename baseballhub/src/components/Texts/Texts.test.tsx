import { render } from "@testing-library/react";

import { Callout } from "./Callout";

describe("<Callout />", () => {
  it("renders correctly", () => {
    render(<Callout text="Hello, world!" />);
  });
});
