import { waitFor } from "@testing-library/react";

import { HistorySimple, HistorySimpleHeader } from "./HistorySimple";
import { sampleHistory } from "@data/accountings";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

describe("<HistorySimple />", () => {
  it("renders correctly", async () => {
    renderWithProviders(
      <>
        <HistorySimple history={sampleHistory[0]} />
        <HistorySimple history={sampleHistory[1]} />
      </>
    );

    await waitFor(() => resizeWindow(600, 600));
    await waitFor(() => resizeWindow(800, 800));
    await waitFor(() => resizeWindow(1200, 1200));
  });
});

describe("<HistorySimpleHeader />", () => {
  it("renders correctly", async () => {
    renderWithProviders(<HistorySimpleHeader />);

    await waitFor(() => resizeWindow(600, 600));
    await waitFor(() => resizeWindow(800, 800));
    await waitFor(() => resizeWindow(1200, 1200));
  });
});
