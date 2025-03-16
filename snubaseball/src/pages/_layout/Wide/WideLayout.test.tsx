import { fireEvent, screen } from "@testing-library/react";

import { WideLayout } from "./WideLayout";
import * as NavigationContext from "@contexts/navigation";
import { renderWithProviders } from "@utils/test-utils";

describe("<WideLayout />", () => {
  it("should render and handle navigation", () => {
    const { tabs } = jest.requireActual("@contexts/navigation");

    jest.spyOn(NavigationContext, "useNavigation").mockReturnValue({
      currentTab: tabs[0],
      tabs,
      currentSubTab: null,
    });

    renderWithProviders(<WideLayout />);

    fireEvent.click(screen.getByTestId("home-button"));
    fireEvent.click(screen.getByTestId("tab-일정"));
    fireEvent.click(screen.getByTestId("tab-소개"));
    fireEvent.click(screen.getByTestId("tab-팀 소개"));

    fireEvent.mouseOver(screen.getByTestId("tabs"));
    fireEvent.mouseOut(screen.getByTestId("wide-layout"));
  });
});
