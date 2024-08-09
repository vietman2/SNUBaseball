import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import RootLayout from "./RootLayout";

describe("<RootLayout", () => {
  it("should render sidebar", () => {
    render(
      <MemoryRouter>
        <RootLayout />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("open-sidebar"));
    fireEvent.click(screen.getByTestId("sidebar-navigate"));
    fireEvent.click(screen.getByTestId("sidebar"));
  });

  it("should render topbar", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches: query.includes("(orientation: landscape)"),
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }),
    });

    render(
      <MemoryRouter>
        <RootLayout />
      </MemoryRouter>
    );
  });
});
