import { fireEvent, screen, waitFor } from "@testing-library/react";

import { Notices } from "./Notices";
import { sampleNotices } from "@data/forum";
import * as NoticesAPI from "@services/board/notices";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("@fragments/Notices", () => ({
  NoticeDetail: ({ goBack }: { goBack: () => void }) => (
    <button onClick={goBack}>NoticeDetail</button>
  ),
  NoticeSimple: () => <div>NoticeSimple</div>,
  NoticeSimpleWide: () => <div>NoticeSimpleWide</div>,
  NoticeSimpleWideHeader: () => <div>NoticeSimpleWideHeader</div>,
}));

describe("<Notices />", () => {
  it("handles bad response correctly", async () => {
    jest.spyOn(NoticesAPI, "getNotices").mockResolvedValue(null);
    renderWithProviders(<Notices />);
  });

  it("renders wide mode correctly and handles modals", async () => {
    jest.spyOn(NoticesAPI, "getNotices").mockResolvedValue({
      status: 200,
      data: sampleNotices,
    });
    renderWithProviders(<Notices />);

    await waitFor(() => resizeWindow(800, 800));
    await waitFor(() => fireEvent.click(screen.getByTestId("notice-1")));
    fireEvent.click(screen.getByText("NoticeDetail"));
  });

  it("renders mobile mode correctly", async () => {
    jest.spyOn(NoticesAPI, "getNotices").mockResolvedValue({
      status: 200,
      data: sampleNotices,
    });
    renderWithProviders(<Notices />);

    await waitFor(() => resizeWindow(600, 600));
    await waitFor(() => fireEvent.click(screen.getByTestId("notice-1")));
    fireEvent.click(screen.getByText("NoticeDetail"));
  });
});
