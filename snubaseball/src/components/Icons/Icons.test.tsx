import { render } from "@testing-library/react";

import { AppIcon } from "./AppIcon";
import { Logo } from "./Logo";

jest.mock("./menu.svg", () => ({
  ReactComponent: () => <div>Menu Icon</div>,
}));
jest.unmock("@components/Icons");

describe("<AppIcon />", () => {
  it("renders correctly", () => {
    render(<AppIcon icon="menu" size={36} color="blue" />);
  });

  it("handles invalid input correctly", () => {
    render(<AppIcon icon="null" />);
  });
});

describe("<Logo />", () => {
  it("renders correctly", () => {
    render(<Logo />);
  });
});
