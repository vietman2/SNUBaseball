import { render } from "@testing-library/react";

import { AppIcon } from "./AppIcon";
import { MainLogo } from "./MainLogo";

jest.unmock("@components/Icons");

describe("<AppIcon />", () => {
  it("should render all icons", () => {
    render(
      <>
        <AppIcon icon="add" size={16} color="black" />
        <AppIcon icon="admin" size={16} color="black" />
        <AppIcon icon="archive" size={16} color="black" />
        <AppIcon icon="baseball" size={16} color="black" />
        <AppIcon icon="baseball2" size={16} color="black" />
        <AppIcon icon="calendar" size={16} color="black" />
        <AppIcon icon="chat" size={16} color="black" />
        <AppIcon icon="check" size={16} color="black" />
        <AppIcon icon="checklist" size={16} color="black" />
        <AppIcon icon="chevron-down" size={16} color="black" />
        <AppIcon icon="chevron-left" size={16} color="black" />
        <AppIcon icon="chevron-right" size={16} color="black" />
        <AppIcon icon="chevron-up" size={16} color="black" />
        <AppIcon icon="close" size={16} color="black" />
        <AppIcon icon="diary" size={16} color="black" />
        <AppIcon icon="down" size={16} color="black" />
        <AppIcon icon="feedback" size={16} color="black" />
        <AppIcon icon="field" size={16} color="black" />
        <AppIcon icon="forum" size={16} color="black" />
        <AppIcon icon="gallery" size={16} color="black" />
        <AppIcon icon="guide" size={16} color="black" />
        <AppIcon icon="heart" size={16} color="black" />
        <AppIcon icon="home" size={16} color="black" />
        <AppIcon icon="lightbulb" size={16} color="black" />
        <AppIcon icon="like" size={16} color="black" />
        <AppIcon icon="lock" size={16} color="black" />
        <AppIcon icon="menu" size={16} color="black" />
        <AppIcon icon="moon" size={16} color="black" />
        <AppIcon icon="people" size={16} color="black" />
        <AppIcon icon="person" size={16} color="black" />
        <AppIcon icon="plus" size={16} color="black" />
        <AppIcon icon="record" size={16} color="black" />
        <AppIcon icon="storage" size={16} color="black" />
        <AppIcon icon="sun" size={16} color="black" />
      </>
    );
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
