import { fireEvent, render, screen } from "@testing-library/react";

import FullTopBar from "./FullTopBar";

jest.unmock("@components/TopBar");

describe("<FullTopBar />", () => {
  it("should render and handle mouse", () => {
    render(<FullTopBar navigate={jest.fn()} />);

    fireEvent.mouseEnter(screen.getByTestId("tabs"));
    fireEvent.mouseLeave(screen.getByTestId("tabs"));

    fireEvent.click(screen.getByText("로고"));
    fireEvent.click(screen.getByText("소개"));
    fireEvent.click(screen.getByText("일정"));
    fireEvent.click(screen.getByText("아카이브"));
    fireEvent.click(screen.getByText("사이트맵"));
    fireEvent.click(screen.getByText("문의"));
  });
});
