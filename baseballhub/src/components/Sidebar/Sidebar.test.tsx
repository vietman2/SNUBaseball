import { fireEvent, render, screen } from "@testing-library/react";

import { Sidebar } from "./Sidebar";

jest.unmock("@components/Sidebar");

describe("<Sidebar />", () => {
  it("should render: open", async () => {
    render(<Sidebar isSidebarOpen={true} toggleSidebar={jest.fn()} />);

    fireEvent.mouseEnter(screen.getByTestId("Home"));
    fireEvent.click(screen.getByTestId("Home"));
    fireEvent.mouseLeave(screen.getByTestId("Home"));
    fireEvent.mouseEnter(screen.getByTestId("스케줄"));
    fireEvent.click(screen.getByTestId("스케줄"));
    fireEvent.click(screen.getByTestId("훈련참가표"));
    fireEvent.click(screen.getByTestId("toggle"));
  });

  it("should render: closed", () => {
    render(<Sidebar isSidebarOpen={false} toggleSidebar={jest.fn()} />);

    fireEvent.click(screen.getByTestId("Home"));
  });
});
