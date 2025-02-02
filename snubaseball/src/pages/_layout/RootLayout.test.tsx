import { waitFor } from "@testing-library/react";

import { RootLayout } from "./RootLayout";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("./Wide/WideLayout", () => ({
  WideLayout: () => <div>WideLayout</div>,
}));
jest.mock("./Mobile/MobileLayout", () => ({
  MobileLayout: () => <div>MobileLayout</div>,
}));

describe("<RootLayout />", () => {
  const resizeWindow = (x: number, y: number) => {
    window.innerWidth = x;
    window.innerHeight = y;
    window.dispatchEvent(new Event("resize"));
  };

  it("renders both wide and mobile layouts", async () => {
    const { getByText } = renderWithProviders(<RootLayout />);

    expect(getByText("WideLayout")).toBeInTheDocument();

    await waitFor(() => {
      resizeWindow(600, 600);
    });

    expect(getByText("MobileLayout")).toBeInTheDocument();
  });
});
