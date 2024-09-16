import { render } from "@testing-library/react";

import { Callout } from "./Callout";
import { Title } from "./Title";

describe("<Callout />", () => {
  it("renders correctly", () => {
    render(<Callout text="Hello, world!" />);
  });
});

describe("<Title />", () => {
  it("renders correctly", () => {
    render(<Title>Hello, world!</Title>);
  });
});
