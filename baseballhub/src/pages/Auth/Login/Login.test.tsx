import { fireEvent, screen } from "@testing-library/react";

import { Login } from "./Login";
import { renderWithProviders } from "@utils/test-utils";

describe("<Login />", () => {
  it("renders without crashing", () => {
    renderWithProviders(<Login />);

    fireEvent.click(screen.getByTestId("button-로그인"));
    fireEvent.click(screen.getByTestId("button-회원가입"));
  });
});
