import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";

import { AlbumDetails } from "@pages/gallery/album-details";
import { GalleryProvider, sampleAlbumDetails } from "@entities/gallery";
import * as AxiosAPI from "@shared/lib/axios";
import * as ViewsAPI from "@shared/lib/views";
import { renderWithProviders } from "@test-utils/renderer";

describe("AlbumDetails", () => {
  beforeEach(() => {
    vi.spyOn(Router, "useParams").mockReturnValue({ id: "1" });
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "get").mockResolvedValue({
      data: sampleAlbumDetails,
    });
    vi.spyOn(ViewsAPI, "useViews").mockReturnValue({
      activeView: "GRID",
      switchToGrid: vi.fn(),
      switchToList: vi.fn(),
    });
  });

  it("renders correctly (grid view)", async () => {
    // 초기에 AlbumDetail API를 호출하여 데이터를 로드한다.
    const { getByText } = renderWithProviders(<AlbumDetails />);

    await waitFor(() => {
      expect(getByText("기본 앨범")).toBeInTheDocument();
    });
  });

  it("renders correctly (list view)", async () => {
    // 초기에 AlbumDetail API를 호출하여 데이터를 로드한다.
    vi.spyOn(ViewsAPI, "useViews").mockReturnValue({
      activeView: "LIST",
      switchToGrid: vi.fn(),
      switchToList: vi.fn(),
    });
    const { getByText } = renderWithProviders(<AlbumDetails />);

    await waitFor(() => {
      expect(getByText("기본 앨범")).toBeInTheDocument();
    });
  });

  it("handles errors", async () => {
    // 1. URL에 파라미터가 없을 때
    vi.spyOn(Router, "useParams").mockReturnValueOnce({});
    const { getByText, rerender } = renderWithProviders(<AlbumDetails />);

    await waitFor(() => {
      expect(getByText("유효하지 않은 앨범 ID입니다.")).toBeInTheDocument();
    });

    fireEvent.click(getByText("앨범 목록으로 돌아가기"));

    // 2. API 호출이 실패했을 때
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "get").mockRejectedValueOnce(
      new Error("API Error")
    );
    vi.spyOn(Router, "useParams").mockReturnValue({ id: "1" });
    rerender(<AlbumDetails />);

    await waitFor(() => {
      expect(
        getByText("데이터 로딩 중 오류가 발생했습니다.")
      ).toBeInTheDocument();
    });

    fireEvent.click(getByText("앨범 목록으로 돌아가기"));
  });

  it("handles empty album and upload files", async () => {
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "get").mockResolvedValueOnce({
      data: { ...sampleAlbumDetails, media: [] },
    });
    const { getByText } = renderWithProviders(
      <GalleryProvider>
        <AlbumDetails />
      </GalleryProvider>
    );

    await waitFor(() => {
      expect(getByText("아직 업로드된 파일이 없습니다.")).toBeInTheDocument();
      expect(getByText("첫번째 파일을 업로드 해보세요!")).toBeInTheDocument();
    });

    fireEvent.click(getByText("업로드하기"));

    await waitFor(() => {
      expect(
        getByText("마우스로 파일을 끌어오거나 여기를 클릭하세요")
      ).toBeInTheDocument();
    });
  });
});
