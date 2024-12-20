import { fireEvent, screen } from "@testing-library/react";

import { MobileLayout } from "./Mobile";
import * as AuthAPI from "@services/auth/auth";
import { renderWithProviders } from "@utils/test-utils";

describe("<MobileLayout />", () => {
  it("handles menu and tabs", () => {
    jest.spyOn(AuthAPI, "logout").mockResolvedValue(true);
    renderWithProviders(<MobileLayout />);

    fireEvent.click(screen.getByTestId("toggle-tabs")); // open tabs
    fireEvent.click(screen.getByTestId("Home")); // navigate to Home
    fireEvent.click(screen.getByTestId("menu")); // open menu
    fireEvent.click(screen.getByText("로그아웃")); // open menu
  });
});
