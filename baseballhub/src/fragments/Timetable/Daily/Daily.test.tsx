import { fireEvent, screen } from "@testing-library/react";
import { Daily } from "./Daily";
import { renderWithProviders } from "@utils/test-utils";

describe("<Daily />", () => {
  it("renders correctly and handles go back", () => {
    renderWithProviders(<Daily handleDayChange={jest.fn()} />);

    fireEvent.click(screen.getByText("뒤로"));
  });
});
