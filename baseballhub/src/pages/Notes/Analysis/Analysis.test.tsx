import { fireEvent, screen, waitFor } from "@testing-library/react";

import { Analysis } from "./Analysis";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("@fragments/Analysis", () => ({
  AnalysisDetail: ({ goBack }: { goBack: () => void }) => (
    <button onClick={goBack}>AnalysisDetail</button>
  ),
  AnalysisSimple: () => <div>AnalysisSimple</div>,
}));

describe("<Analysis />", () => {
  it("renders wide screen", async () => {
    renderWithProviders(<Analysis />);

    await waitFor(() => resizeWindow(800, 800));

    fireEvent.click(screen.getByTestId("analysis-1"));
    fireEvent.click(screen.getByText("AnalysisDetail"));
  });

  it("renders mobile screen", async () => {
    renderWithProviders(<Analysis />);

    await waitFor(() => resizeWindow(600, 600));

    fireEvent.click(screen.getByTestId("analysis-1"));
    fireEvent.click(screen.getByText("AnalysisDetail"));
  });
});
