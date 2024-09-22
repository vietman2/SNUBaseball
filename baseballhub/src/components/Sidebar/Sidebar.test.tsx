import { fireEvent, screen } from "@testing-library/react";

import { Sidebar } from "./Sidebar";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("@components/Sidebar");

describe("<Sidebar />", () => {
  it("should render: open", async () => {
    renderWithProviders(
      <Sidebar isSidebarOpen={true} toggleSidebar={jest.fn()} />
    );

    fireEvent.mouseEnter(screen.getByTestId("Home"));
    fireEvent.click(screen.getByTestId("toggle"));
  });

  it("should render: closed", () => {
    renderWithProviders(
      <Sidebar isSidebarOpen={false} toggleSidebar={jest.fn()} />
    );

    fireEvent.click(screen.getByTestId("Home"));
  });
});
