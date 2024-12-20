import { fireEvent, screen } from "@testing-library/react";
import * as Router from "react-router-dom";

import { RootLayout } from "./RootLayout";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("./Headers/WideHeader", () => ({
  Header: () => <div>Header</div>,
}));

describe("<RootLayout />", () => {
  it("toggles sidebar and handles navigate", () => {
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/home",
      state: {},
      search: "",
      hash: "",
      key: "",
    });
    renderWithProviders(<RootLayout />);

    fireEvent.click(screen.getByTestId("toggle"));
    fireEvent.click(screen.getByTestId("Home"));
  });
});
