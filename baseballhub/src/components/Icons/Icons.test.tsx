import { render } from "@testing-library/react";

import { AppIcon } from "./AppIcon";

jest.unmock("@components/Icons");

describe("<AppIcon />", () => {
  it("should render all icons", () => {
    render(
      <>
        <AppIcon icon="add" size={16} color="black" />
        <AppIcon icon="admin" size={16} color="black" />
        <AppIcon icon="archive" size={16} color="black" />
        <AppIcon icon="calendar" size={16} color="black" />
        <AppIcon icon="chevron-left" size={16} color="black" />
        <AppIcon icon="chevron-right" size={16} color="black" />
        <AppIcon icon="diary" size={16} color="black" />
        <AppIcon icon="home" size={16} color="black" />
        <AppIcon icon="record" size={16} color="black" />
        <AppIcon icon="storage" size={16} color="black" />
      </>
    );
  });

  it("should render null", () => {
    render(<AppIcon icon="invalid" size={16} color="black" />);
  });
});
