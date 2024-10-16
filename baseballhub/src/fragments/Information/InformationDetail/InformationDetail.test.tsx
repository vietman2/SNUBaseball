import { waitFor } from "@testing-library/react";

import { InformationDetail } from "./InformationDetail";
import { sampleInformationDetail } from "@data/forum";
import * as InformationAPI from "@services/board/information";
import { renderWithProviders } from "@utils/test-utils";

describe("<InformationDetail />", () => {
  it("handles null informationId correctly", async () => {
    renderWithProviders(
      <InformationDetail informationId={null} goBack={jest.fn()} />
    );
  });

  it("handles bad response correctly", async () => {
    jest.spyOn(InformationAPI, "getInformationDetails").mockResolvedValue(null);
    waitFor(() =>
      renderWithProviders(
        <InformationDetail informationId={1} goBack={jest.fn()} />
      )
    );
  });

  it("renders correctly", async () => {
    jest.spyOn(InformationAPI, "getInformationDetails").mockResolvedValue({
      status: 200,
      data: sampleInformationDetail,
    });

    await waitFor(() =>
      renderWithProviders(
        <InformationDetail informationId={1} goBack={jest.fn()} />
      )
    );
  });
});
