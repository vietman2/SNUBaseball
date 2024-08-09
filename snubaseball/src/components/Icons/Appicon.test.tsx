import { render } from "@testing-library/react";

import { AppIcon } from "./AppIcon";

jest.unmock("@components/Icons");

describe("<AppIcon />", () => {
  it("should render menu icon", () => {
    render(<AppIcon icon="menu" size={1} color="black" />);
  });
  
  it("should render user icon", () => {
    render(<AppIcon icon="user" size={1} color="black" />);
  });
  
  it("should render null", () => {
    render(<AppIcon icon="null" size={1} color="black" />);
  });
});
