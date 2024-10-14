import { fireEvent, screen, waitFor } from "@testing-library/react";

import { History } from "./History";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("@fragments/Accountings", () => ({
  HistoryDetail: ({ goBack }: { goBack: () => void }) => (
    <button onClick={goBack}>HistoryDetail</button>
  ),
  HistorySimple: () => <div />,
  HistorySimpleHeader: () => <div />,
}));

describe("<History />", () => {
  it("renders wide screen correctly", async () => {
    renderWithProviders(<History />);

    await waitFor(() => resizeWindow(800, 800));

    fireEvent.click(screen.getByTestId("history-1"));
    fireEvent.click(screen.getByText("HistoryDetail"));
  });

  it("renders mobile screen correctly", async () => {
    renderWithProviders(<History />);

    await waitFor(() => resizeWindow(600, 600));

    fireEvent.click(screen.getByTestId("history-1"));
    fireEvent.click(screen.getByText("HistoryDetail"));
  });
});
