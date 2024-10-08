import { fireEvent, screen, waitFor } from "@testing-library/react";

import { Desktop } from "./Desktop";
import { Mobile } from "./Mobile";
import RootLayout from "./RootLayout";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.unmock("@components/RootLayout");

describe("<Desktop />", () => {
  it("should render", async () => {
    renderWithProviders(<Desktop />);

    fireEvent.click(screen.getByTestId("toggle"));
    fireEvent.click(screen.getByTestId("toggle"));
    fireEvent.click(screen.getByTestId("Home"));
  });
});

describe("<Mobile />", () => {
  it("should render", async () => {
    renderWithProviders(<Mobile />);

    fireEvent.click(screen.getByTestId("toggle"));
    fireEvent.click(screen.getByTestId("Home"));
  });
});

describe("<RootLayout />", () => {
  it("should render", async () => {
    renderWithProviders(<RootLayout />);

    await waitFor(() => resizeWindow(500, 500));
    await waitFor(() => resizeWindow(1000, 1000));
  });
});
