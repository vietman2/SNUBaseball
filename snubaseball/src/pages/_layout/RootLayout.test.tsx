import { waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { RootLayout } from "./RootLayout";
import * as NavigationContext from "@contexts/navigation";
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

  beforeEach(() => {
    const { tabs } = jest.requireActual("@contexts/navigation");

    jest.spyOn(NavigationContext, "useNavigation").mockReturnValue({
      currentTab: tabs[1],
      tabs,
      setCurrentTab: jest.fn(),
      setCurrentSubTab: jest.fn(),
    });
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/about/history",
      state: null,
      search: "",
      hash: "",
      key: "",
    });
  });

  it("renders both wide and mobile layouts", async () => {
    const { getByText } = renderWithProviders(<RootLayout />);

    expect(getByText("WideLayout")).toBeInTheDocument();

    await waitFor(() => {
      resizeWindow(600, 600);
    });

    expect(getByText("MobileLayout")).toBeInTheDocument();
  });

  it("handles existing tab", async () => {
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/",
      state: null,
      search: "",
      hash: "",
      key: "",
    });

    renderWithProviders(<RootLayout />);
  });

  it("handles non-existing tab", async () => {
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/404",
      state: null,
      search: "",
      hash: "",
      key: "",
    });

    renderWithProviders(<RootLayout />);
  });

  it("handles non-existing subtab", async () => {
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/about/404",
      state: null,
      search: "",
      hash: "",
      key: "",
    });

    renderWithProviders(<RootLayout />);
  });
});
