import { waitFor } from "@testing-library/react";

import { Information } from "./Information";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("@fragments/Information", () => ({
  InformationSimple: () => <div />,
}));

describe("<Information />", () => {
  it("renders correctly", async () => {
    renderWithProviders(<Information />);

    await waitFor(() => resizeWindow(800, 800));
    await waitFor(() => resizeWindow(600, 600));
  });
});
