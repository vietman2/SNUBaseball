import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { GalleryMainPage } from "@pages/gallery/main";
import { GalleryProvider, sampleAlbums, sampleTags } from "@entities/gallery";
import * as AuthAPI from "@entities/user";
import * as AxiosAPI from "@shared/lib/axios";
import { ViewsProvider } from "@shared/lib/views";
import { renderWithProviders } from "@test-utils/renderer";

describe("GalleryMainPage", () => {
  const render = () => {
    return renderWithProviders(
      <GalleryProvider>
        <ViewsProvider>
          <GalleryMainPage />
        </ViewsProvider>
      </GalleryProvider>
    );
  };

  beforeEach(() => {
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "get").mockResolvedValue({
      data: { albums: sampleAlbums, tags: sampleTags },
    });
  });

  it("should render correctly with albums", async () => {
    const { getByText, queryByText } = render();

    await waitFor(() => {
      expect(getByText("앨범 목록")).toBeInTheDocument();
      // 기본적으로 useUser는 일반 멤버를 반환하기 때문에, 생성 버튼이 보이지 않음
      expect(queryByText("새 앨범 추가")).not.toBeInTheDocument();
    });
  });

  it("should handle fetch albums error", async () => {
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "get").mockRejectedValueOnce(
      new Error("Failed to fetch albums")
    );

    const { getByText } = render();

    await waitFor(() => {
      expect(getByText("앨범을 불러오는 데 실패했습니다")).toBeInTheDocument();
    });

    // 다시시도하면 성공
    fireEvent.click(getByText("다시 시도"));

    await waitFor(() => {
      expect(getByText("기본 앨범")).toBeInTheDocument();
      expect(getByText("빈 앨범")).toBeInTheDocument();
      expect(getByText("부원 전용 앨범")).toBeInTheDocument();
    });
  });

  it("handle create new album as an ops member", async () => {
    vi.spyOn(AuthAPI, "useUser").mockReturnValue({
      isAuthenticated: true,
      user: AuthAPI.sampleAdmin,
    });

    const { getByTestId, getByText } = render();

    await waitFor(() => {
      expect(getByText("새 앨범 추가")).toBeInTheDocument();
    });

    // 모달 열기
    fireEvent.click(getByText("새 앨범 추가"));

    // 아무 변화 없이 제춣하면 아무일도 일어나지 않음
    fireEvent.submit(getByTestId("new-album-form"));

    await waitFor(() => {
      expect(getByTestId("new-album-form")).toBeInTheDocument();
    });

    fireEvent.change(getByTestId("album-title-input"), {
      target: { value: "테스트 앨범" },
    });
    fireEvent.click(getByTestId("album-members-only-checkbox")); // 부원 전용 체크

    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "post").mockResolvedValueOnce({
      data: {
        id: 4,
        title: "테스트 앨범",
        members_only: true,
        cover_images: [],
        num_images: 0,
        num_videos: 0,
      },
    });
    fireEvent.submit(getByTestId("new-album-form"));

    await waitFor(() => {
      expect(getByText("테스트 앨범")).toBeInTheDocument();
    });
  });
});
