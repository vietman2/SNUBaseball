import { fireEvent, screen, waitFor } from "@testing-library/react";

import { NoticeWrite } from "./NoticeWrite";
import { sampleNoticeCategories, sampleNoticeDetail } from "@data/forum";
import * as NoticeAPI from "@services/board/notices";
import * as MediaAPI from "@services/media/image";
import { renderWithProviders } from "@utils/test-utils";

const mockFile = new File([""], "file.png");

jest.mock("@components/Inputs", () => {
  return {
    ContentInput: ({ uploadImage }: { uploadImage: (file: File) => void }) => (
      <button onClick={() => uploadImage(mockFile)}>ContentInput</button>
    ),
    TextInput: () => <div>TextInput</div>,
  };
});
jest.spyOn(window, "alert").mockImplementation(() => {});

describe("<NoticeWrite />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(NoticeAPI, "getNoticeCategories")
      .mockResolvedValue({ status: 200, data: sampleNoticeCategories });
  });

  it("handles bad response correctly", async () => {
    jest.spyOn(NoticeAPI, "getNoticeCategories").mockResolvedValue(null);

    await waitFor(() =>
      renderWithProviders(
        <NoticeWrite noticeId={1} editMode={false} goBack={jest.fn()} />
      )
    );

    await waitFor(() =>
      expect(screen.getByText("뒤로가기")).toBeInTheDocument()
    );
  });

  it("renders correctly", async () => {
    waitFor(() =>
      renderWithProviders(
        <NoticeWrite noticeId={1} editMode={false} goBack={jest.fn()} />
      )
    );

    await waitFor(() => expect(screen.getByText("긴급")).toBeInTheDocument());

    fireEvent.click(screen.getByText("긴급"));
    fireEvent.click(screen.getByText("일반"));
  });

  it("handles image upload correctly", async () => {
    jest
      .spyOn(MediaAPI, "uploadImage")
      .mockResolvedValue({ status: 200, data: "" });

    waitFor(() =>
      renderWithProviders(
        <NoticeWrite noticeId={1} editMode={false} goBack={jest.fn()} />
      )
    );

    await waitFor(() =>
      expect(screen.getByText("ContentInput")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("ContentInput"));
  });

  it("handles image upload fail", async () => {
    jest.spyOn(MediaAPI, "uploadImage").mockResolvedValue(null);

    waitFor(() =>
      renderWithProviders(
        <NoticeWrite noticeId={1} editMode={false} goBack={jest.fn()} />
      )
    );

    await waitFor(() =>
      expect(screen.getByText("ContentInput")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("ContentInput"));
  });

  it("handles create notice with file upload", async () => {
    jest
      .spyOn(NoticeAPI, "createNotice")
      .mockResolvedValue({ status: 201, data: {} });

    waitFor(() =>
      renderWithProviders(
        <NoticeWrite noticeId={1} editMode={false} goBack={jest.fn()} />
      )
    );

    await waitFor(() =>
      expect(screen.getByText("파일 첨부")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText("파일 첨부"));

    const file = new File(["dummy content"], "example.pdf", {
      type: "application/pdf",
    });
    await waitFor(() =>
      fireEvent.change(screen.getByTestId("file-upload"), {
        target: { files: [file] },
      })
    );

    await waitFor(() => fireEvent.click(screen.getByText("등록")));
  });

  it("handles file upload cancel", async () => {
    waitFor(() =>
      renderWithProviders(
        <NoticeWrite noticeId={1} editMode={false} goBack={jest.fn()} />
      )
    );

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

  it("handles create notice fail", async () => {
    jest.spyOn(NoticeAPI, "createNotice").mockResolvedValue(null);

    waitFor(() =>
      renderWithProviders(<NoticeWrite noticeId={1} editMode={false} goBack={jest.fn()} />)
    );

    await waitFor(() => fireEvent.click(screen.getByText("등록")));
  });

  it("handles bad config", async () => {
    waitFor(() =>
      renderWithProviders(<NoticeWrite noticeId={null} editMode goBack={jest.fn()} />)
    );
  });

  it("handles edit mode initial load fail", async () => {
    jest.spyOn(NoticeAPI, "getNoticeDetails").mockResolvedValue(null);

    waitFor(() =>
      renderWithProviders(
        <NoticeWrite noticeId={1} editMode goBack={jest.fn()} />
      )
    );
  });

  it("handles edit mode correctly", async () => {
    jest.spyOn(NoticeAPI, "getNoticeDetails").mockResolvedValue({
      status: 200,
      data: sampleNoticeDetail,
    });
    jest.spyOn(NoticeAPI, "updateNotice").mockResolvedValue({ status: 200, data: {} });

    waitFor(() =>
      renderWithProviders(
        <NoticeWrite noticeId={1} editMode goBack={jest.fn()} />
      )
    );

    await waitFor(() => expect(screen.getByText("등록")).toBeInTheDocument());

    fireEvent.click(screen.getByText("등록"));
  });

  it("handles edit mode fail", async () => {
    jest.spyOn(NoticeAPI, "getNoticeDetails").mockResolvedValue({
      status: 200,
      data: sampleNoticeDetail,
    });
    jest
      .spyOn(NoticeAPI, "updateNotice")
      .mockResolvedValue(null);

    waitFor(() =>
      renderWithProviders(
        <NoticeWrite noticeId={1} editMode goBack={jest.fn()} />
      )
    );

    await waitFor(() => expect(screen.getByText("등록")).toBeInTheDocument());

    fireEvent.click(screen.getByText("등록"));
  });
});
