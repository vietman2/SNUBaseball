import { fireEvent, screen } from "@testing-library/react";

import { MobileLayout } from "./MobileLayout";
import * as NavigationContext from "@contexts/navigation";
import { renderWithProviders } from "@utils/test-utils";

describe("<MobileLayout />", () => {
  it("should render", () => {
    jest.spyOn(NavigationContext, "useNavigation").mockReturnValue({
      currentTab: {
        title: "Home",
        path: "/",
        subtabs: [],
      },
      tabs: [],
      currentSubTab: null,
    });
    renderWithProviders(<MobileLayout />);
  });

  it("handle navigation", () => {
    const { tabs } = jest.requireActual("@contexts/navigation");

    jest.spyOn(NavigationContext, "useNavigation").mockReturnValue({
      currentTab: tabs[1],
      currentSubTab: tabs[1].subtabs[0],
      tabs,
    });

    renderWithProviders(<MobileLayout />);

    fireEvent.click(screen.getByTestId("menu-button"));
    fireEvent.click(screen.getByTestId("home-button-sidebar"));
    fireEvent.click(screen.getByTestId("home-button"));
    fireEvent.click(screen.getByTestId("tab-Home")); // navigate to another tab
    fireEvent.click(screen.getByTestId("tab-소개")); // open subtabs
    fireEvent.click(screen.getByTestId("tab-소개")); // close subtabs
    fireEvent.click(screen.getByTestId("tab-소개")); // open subtabs
    fireEvent.click(screen.getByTestId("tab-연혁")); // navigate to subtab
    fireEvent.click(screen.getByTestId("subtab-연혁")); // navigate to subtab
  });
});
