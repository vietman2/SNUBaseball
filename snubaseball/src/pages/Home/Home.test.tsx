import { fireEvent, screen } from "@testing-library/react";

import { Home } from "./Home";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@assets/images/main1.jpg", () => "main1.jpg");
jest.mock("@assets/images/main2.jpg", () => "main2.jpg");
jest.mock("@assets/images/main3.jpg", () => "main3.jpg");

describe("<Home />", () => {
  it("renders and handles slider correctly", () => {
    renderWithProviders(<Home />);

    fireEvent.click(screen.getByTestId("left"));
    fireEvent.click(screen.getByTestId("right"));
  });
});
