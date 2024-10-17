import { fireEvent, screen, waitFor } from "@testing-library/react";

import { NoticeDetail } from "./NoticeDetail";
import {
  sampleNoticeDetail,
  sampleNoticeDetailWithAttachment,
} from "@data/forum";
import * as NoticesAPI from "@services/board/notices";
import { renderWithProviders } from "@utils/test-utils";

jest.spyOn(window, "open").mockImplementation(() => null);

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

  it("renders correctly with attachments", async () => {
    jest.spyOn(NoticesAPI, "getNoticeDetails").mockResolvedValue({
      status: 200,
      data: sampleNoticeDetailWithAttachment,
    });
    await waitFor(() =>
      renderWithProviders(<NoticeDetail noticeId={1} goBack={jest.fn()} />)
    );

    await waitFor(() =>
      fireEvent.click(screen.getByTestId("유계결석 인정 요청서"))
    );
  });
});
