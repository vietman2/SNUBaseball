import { render } from "@testing-library/react";

import { Callout } from "./Callout";
import { Subtitle, Title } from "./Title";

describe("<Callout />", () => {
  it("renders correctly", () => {
    render(<Callout text="Hello, world!" />);
  });
});

describe("<Subtitle />", () => {
  it("renders correctly", () => {
    render(<Subtitle>Hello, world!</Subtitle>);
  });
});

describe("<Title />", () => {
  it("renders correctly", () => {
    render(<Title>Hello, world!</Title>);
  });
});
