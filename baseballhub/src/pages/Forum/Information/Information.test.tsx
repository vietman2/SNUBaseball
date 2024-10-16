import { fireEvent, screen, waitFor } from "@testing-library/react";

import { Information } from "./Information";
import { sampleInformations } from "@data/forum";
import * as InformationAPI from "@services/board/information";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("@fragments/Information", () => ({
  InformationDetail: ({ goBack }: { goBack: () => void }) => (
    <button onClick={goBack}>InformationDetail</button>
  ),
  InformationSimple: () => <div />,
  InformationSimpleWide: () => <div />,
  InformationSimpleWideHeader: () => <div />,
}));

describe("<Information />", () => {
  it("handles bad response correctly", async () => {
    jest.spyOn(InformationAPI, "getInformations").mockResolvedValue(null);
    await waitFor(() => renderWithProviders(<Information />));

    await waitFor(() =>
      expect(screen.getByText("새로고침")).toBeInTheDocument()
    );
    waitFor(() => fireEvent.click(screen.getByText("새로고침")));
  });

  it("renders wide screen correctly", async () => {
    jest.spyOn(InformationAPI, "getInformations").mockResolvedValue({
      status: 200,
      data: sampleInformations,
    });
    renderWithProviders(<Information />);

    await waitFor(() => resizeWindow(800, 800));

    await waitFor(() => fireEvent.click(screen.getByTestId("information-1")));
    fireEvent.click(screen.getByText("InformationDetail"));
  });

  it("renders mobile screen correctly", async () => {
    jest.spyOn(InformationAPI, "getInformations").mockResolvedValue({
      status: 200,
      data: sampleInformations,
    });
    renderWithProviders(<Information />);

    await waitFor(() => resizeWindow(600, 600));

    await waitFor(() => fireEvent.click(screen.getByTestId("information-1")));
    fireEvent.click(screen.getByText("InformationDetail"));
  });
});
