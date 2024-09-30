import { fireEvent, screen, waitFor } from "@testing-library/react";

import { Sidebar } from "./Sidebar";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.unmock("@components/Sidebar");

describe("<Sidebar />", () => {
  it("should render: open", async () => {
    renderWithProviders(
      <Sidebar isSidebarOpen={true} toggleSidebar={jest.fn()} />
    );

    await waitFor(() => {
      resizeWindow(1200, 600);
    });

    fireEvent.mouseEnter(screen.getByTestId("Home"));
    fireEvent.click(screen.getByTestId("toggle"));

    await waitFor(() => {
      resizeWindow(600, 600);
    });
  });

  it("should render: closed", async () => {
    renderWithProviders(
      <Sidebar isSidebarOpen={false} toggleSidebar={jest.fn()} />
    );

    await waitFor(() => {
      resizeWindow(1200, 600);
    });

    fireEvent.click(screen.getByTestId("Home"));

    await waitFor(() => {
      resizeWindow(600, 600);
    });
  });
});
