import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { NoticeWrite } from "./NoticeWrite";
import { sampleNoticeCategories, sampleNoticeDetail } from "@data/forum";
import * as NoticesAPI from "@services/board/notices";
import { renderWithProviders } from "@utils/test-utils";

describe("<NoticeWrite />: new", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(Router, "useParams").mockReturnValue({});
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/forum/notices/write",
      search: "",
      hash: "",
      state: null,
      key: "testKey",
    });
    jest.spyOn(NoticesAPI, "getNoticeCategories").mockResolvedValue({
      status: 200,
      data: sampleNoticeCategories,
    });
  });

  it("handles category fetch fail", async () => {
    jest.spyOn(NoticesAPI, "getNoticeCategories").mockResolvedValue(null);

    renderWithProviders(<NoticeWrite />);

    await waitFor(() =>
      expect(screen.getByText("뒤로가기")).toBeInTheDocument()
    );
  });

  it("handles file upload cancel", async () => {
    await waitFor(() => renderWithProviders(<NoticeWrite />));

    await waitFor(() =>
      expect(screen.getByText("파일 첨부")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText("파일 첨부"));

    await waitFor(() =>
      fireEvent.change(screen.getByTestId("file-upload"), {
        target: { files: null },
      })
    );
  });

  it("renders and handles submit", async () => {
    jest.spyOn(NoticesAPI, "createNotice").mockResolvedValue({
      status: 201,
      data: {},
    });

    renderWithProviders(<NoticeWrite />);

    await waitFor(() => expect(screen.getByText("등록")).toBeInTheDocument());
    fireEvent.click(screen.getByText("파일 첨부"));

    const file = new File(["dummy content"], "example.pdf", {
      type: "application/pdf",
    });
    await waitFor(() => {
      fireEvent.change(screen.getByTestId("content-input"), {
        target: { value: "content" },
      });
      fireEvent.change(screen.getByTestId("file-upload"), {
        target: { files: [file] },
      });
    });

    fireEvent.click(screen.getByTestId("category-일반"));
    fireEvent.click(screen.getByTestId("category-긴급"));
    fireEvent.click(screen.getByTestId("remove-attachment"));

    await waitFor(() => fireEvent.click(screen.getByText("등록")));
  });

  it("handles submit fail", async () => {
    jest.spyOn(NoticesAPI, "createNotice").mockResolvedValue(null);

    await waitFor(() => renderWithProviders(<NoticeWrite />));

    await waitFor(() => fireEvent.click(screen.getByText("등록")));
  });
});

describe("<NoticeWrite />: edit", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(Router, "useParams").mockReturnValue({ noticeId: "1" });
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/forum/notices/1/edit",
      search: "",
      hash: "",
      state: null,
      key: "testKey",
    });
    jest.spyOn(NoticesAPI, "getNoticeCategories").mockResolvedValue({
      status: 200,
      data: sampleNoticeCategories,
    });
    jest.spyOn(NoticesAPI, "getNoticeDetails").mockResolvedValue({
      status: 200,
      data: sampleNoticeDetail,
    });
  });

  it("handles bad response correctly", async () => {
    jest.spyOn(NoticesAPI, "getNoticeDetails").mockResolvedValue(null);
    renderWithProviders(<NoticeWrite />);

    await waitFor(() => fireEvent.click(screen.getByText("뒤로가기")));
  });

  it("handles error correctly", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({});
    renderWithProviders(<NoticeWrite />);

    await waitFor(() => fireEvent.click(screen.getByText("뒤로가기")));
  });

  it("renders and handles submit", async () => {
    jest.spyOn(NoticesAPI, "updateNotice").mockResolvedValue({
      status: 200,
      data: {},
    });

    renderWithProviders(<NoticeWrite />);

    await waitFor(() => fireEvent.click(screen.getByText("등록")));
  });

  it("handles submit fail", async () => {
    jest.spyOn(NoticesAPI, "updateNotice").mockResolvedValue(null);

    await waitFor(() => renderWithProviders(<NoticeWrite />));

    await waitFor(() => fireEvent.click(screen.getByText("등록")));
  });
});
