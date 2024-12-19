import { render } from "@testing-library/react";

import { AppIcon } from "./AppIcon";
import { MainLogo } from "./MainLogo";

jest.unmock("@components/Icons");

describe("<AppIcon />", () => {
  it("should render icon", () => {
    render(<AppIcon icon="chevron-down" size={16} color="black" />);
  });

  it("should render null", () => {
    render(<AppIcon icon="invalid" size={16} color="black" />);
  });
});

describe("<MainLogo />", () => {
  it("should render blue logo", () => {
    render(<MainLogo />);
  });

  it("should render white logo", () => {
    render(<MainLogo color="white" />);
  });
});
