import { render } from "@testing-library/react";

import { AppIcon } from "./AppIcon";
import { Ballpark } from "./Ballpark";
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

describe("<Ballpark />", () => {
  it("should render icon", () => {
    render(<Ballpark />);
  });

  it("should render with players in position", () => {
    render(<Ballpark first="1B" second="2B" third="3B" short="SS" pitcher="P" catcher="C" left="LF" center="CF" right="RF" dh="DH" />);
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
