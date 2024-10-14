import { fireEvent, screen, waitFor } from "@testing-library/react";

import { Information } from "./Information";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("@fragments/Information", () => ({
  InformationDetail: ({ goBack }: { goBack: () => void }) => (
    <button onClick={goBack}>InformationDetail</button>
  ),
  InformationSimple: () => <div />,
}));

describe("<Information />", () => {
  it("renders wide screen correctly", async () => {
    renderWithProviders(<Information />);

    await waitFor(() => resizeWindow(800, 800));

    fireEvent.click(screen.getByTestId("information-1"));
    fireEvent.click(screen.getByText("InformationDetail"));
  });

  it("renders mobile screen correctly", async () => {
    renderWithProviders(<Information />);

    await waitFor(() => resizeWindow(600, 600));

    fireEvent.click(screen.getByTestId("information-1"));
    fireEvent.click(screen.getByText("InformationDetail"));
  });
});
