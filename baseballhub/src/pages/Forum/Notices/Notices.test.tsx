import { waitFor } from "@testing-library/react";

import { Notices } from "./Notices";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("@fragments/Notices", () => ({
  NoticeSimple: () => <div>NoticeSimple</div>,
  NoticeSimpleWide: () => <div>NoticeSimpleWide</div>,
  NoticeSimpleWideHeader: () => <div>NoticeSimpleWideHeader</div>,
}));

describe("<Notices />", () => {
  it("renders correctly", async () => {
    renderWithProviders(<Notices />);

    await waitFor(() => resizeWindow(800, 800));
    await waitFor(() => resizeWindow(600, 600));
  });
});
