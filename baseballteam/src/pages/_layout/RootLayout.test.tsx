import { screen, waitFor } from "@testing-library/react";

import { RootLayout } from "./RootLayout";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("./Desktop/Desktop", () => ({
  DesktopLayout: () => <div data-testid="desktop" />,
}));
jest.mock("./Mobile/Mobile", () => ({
  MobileLayout: () => <div data-testid="mobile" />,
}));

describe("<RootLayout />", () => {
  it("renders both mobile and desktop", async() => {
    renderWithProviders(<RootLayout />);

    await waitFor(() => {
      resizeWindow(800, 800);
      expect(screen.getByTestId("desktop")).toBeInTheDocument();
    });

    await waitFor(() => {
      resizeWindow(400, 400);
      expect(screen.getByTestId("mobile")).toBeInTheDocument();
    });
  });
});
