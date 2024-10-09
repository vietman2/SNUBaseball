import { render } from "@testing-library/react";

import { AppIcon } from "./AppIcon";

jest.unmock("@components/Icons");

describe("<AppIcon />", () => {
  it("should render all icons", () => {
    render(
      <>
        <AppIcon icon="about" size={1} color="black" />
        <AppIcon icon="archive" size={1} color="black" />
        <AppIcon icon="baseball" size={1} color="black" />
        <AppIcon icon="bat" size={1} color="black" />
        <AppIcon icon="calendar" size={1} color="black" />
        <AppIcon icon="checkbox" size={1} color="black" />
        <AppIcon icon="event" size={1} color="black" />
        <AppIcon icon="field" size={1} color="black" />
        <AppIcon icon="game" size={1} color="black" />
        <AppIcon icon="graduate" size={1} color="black" />
        <AppIcon icon="helmet" size={1} color="black" />
        <AppIcon icon="home" size={1} color="black" />
        <AppIcon icon="interview" size={1} color="black" />
        <AppIcon icon="manager" size={1} color="black" />
        <AppIcon icon="menu" size={1} color="black" />
        <AppIcon icon="player" size={1} color="black" />
        <AppIcon icon="question" size={1} color="black" />
        <AppIcon icon="record" size={1} color="black" />
        <AppIcon icon="staff" size={1} color="black" />
        <AppIcon icon="user" size={1} color="black" />
        <AppIcon icon="unknown" size={1} color="black" />
      </>
    );
  });
});
