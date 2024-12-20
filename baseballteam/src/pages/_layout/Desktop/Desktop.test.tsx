import { fireEvent, screen } from "@testing-library/react";
import * as Router from "react-router-dom";

import { DesktopLayout } from "./Desktop";
import * as AuthAPI from "@services/auth/auth";
import { renderWithProviders } from "@utils/test-utils";

describe("<DesktopLayout />", () => {
  it("handles sidebar", () => {
    jest.spyOn(Router, "useNavigate").mockReturnValue(jest.fn());
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/",
      search: "",
      key: "abc",
      hash: "",
      state: null,
    });

    renderWithProviders(<DesktopLayout />);

    fireEvent.click(screen.getByTestId("toggle"));
    fireEvent.click(screen.getByTestId("Home"));
  });

  it("handles header", () => {
    jest.spyOn(Router, "useNavigate").mockReturnValue(jest.fn());
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/home",
      search: "",
      key: "abc",
      hash: "",
      state: null,
    });
    jest.spyOn(AuthAPI, "logout").mockResolvedValue(true);

    renderWithProviders(<DesktopLayout />);

    fireEvent.mouseOver(screen.getByTestId("menu"));
    fireEvent.mouseOut(screen.getByTestId("menu"));
    fireEvent.click(screen.getByText("홈"));
    fireEvent.click(screen.getByText("로그아웃"));
  });
});
