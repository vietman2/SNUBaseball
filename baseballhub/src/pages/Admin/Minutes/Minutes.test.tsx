import { fireEvent, screen, waitFor } from "@testing-library/react";

import { Minutes } from "./Minutes";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("@fragments/Minutes", () => ({
  MinutesDetail: ({ goBack }: { goBack: () => void }) => (
    <div>
      <button onClick={goBack}>MinutesDetail</button>
    </div>
  ),
  MinutesSimple: () => <div />,
}));

describe("<Minutes />", () => {
  it("renders wide screen correctly", async () => {
    renderWithProviders(<Minutes />);

    await waitFor(() => resizeWindow(800, 800));

    fireEvent.click(screen.getByTestId("minutes-1"));
    fireEvent.click(screen.getByText("MinutesDetail"));
  });
  
  it("renders mobile screen correctly", async () => {
    renderWithProviders(<Minutes />);

    await waitFor(() => resizeWindow(600, 600));

    fireEvent.click(screen.getByTestId("minutes-1"));
    fireEvent.click(screen.getByText("MinutesDetail"));
  });
});
