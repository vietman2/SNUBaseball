import { waitFor } from "@testing-library/react";

import { NoticeDetail } from "./NoticeDetail";
import { sampleNoticeDetail } from "@data/forum";
import * as NoticesAPI from "@services/board/notices";
import { renderWithProviders } from "@utils/test-utils";

describe("<NoticeDetail />", () => {
  it("handles null noticeId correctly", async () => {
    renderWithProviders(<NoticeDetail noticeId={null} goBack={jest.fn()} />);
  });

  it("handles bad response correctly", async () => {
    jest.spyOn(NoticesAPI, "getNoticeDetails").mockResolvedValue(null);
    waitFor(() =>
      renderWithProviders(<NoticeDetail noticeId={1} goBack={jest.fn()} />)
    );
  });

  it("renders correctly", async () => {
    jest.spyOn(NoticesAPI, "getNoticeDetails").mockResolvedValue({
      status: 200,
      data: sampleNoticeDetail,
    });
    await waitFor(() =>
      renderWithProviders(<NoticeDetail noticeId={1} goBack={jest.fn()} />)
    );
  });
});
