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
  
  it("should render baseball icon", () => {
    render(<AppIcon icon="baseball" size={1} color="black" />);
  });
  
  it("should render bat icon", () => {
    render(<AppIcon icon="bat" size={1} color="black" />);
  });
  
  it("should render checkbox icon", () => {
    render(<AppIcon icon="checkbox" size={1} color="black" />);
  });
  
  it("should render graduate icon", () => {
    render(<AppIcon icon="graduate" size={1} color="black" />);
  });
  
  it("should render null", () => {
    render(<AppIcon icon="null" size={1} color="black" />);
  });
});
