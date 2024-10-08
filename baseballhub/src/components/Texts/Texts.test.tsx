import { render } from "@testing-library/react";

import { Callout } from "./Callout";
import { Subtitle, Title } from "./Title";
import { renderWithProviders } from "@utils/test-utils";

describe("<Callout />", () => {
  it("renders correctly", () => {
    renderWithProviders(<Callout text="Hello, world!" />);
  });
});

describe("<Subtitle />", () => {
  it("renders correctly", () => {
    renderWithProviders(<Subtitle>Hello, world!</Subtitle>);
  });
});

describe("<Title />", () => {
  it("renders correctly", () => {
    render(<Title>Hello, world!</Title>);
  });
});
